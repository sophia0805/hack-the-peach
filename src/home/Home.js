import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import logo from '../logo.png';
import skin from './peachskin.jpg';
import fleshtexture from './peachflesh.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const mountRef = useRef(null);

  const navLinks = {
    home: '/home',
    about: '/about',
    schedule: '/schedule',
    sponsors: '/sponsors',
    faq: '/faq'
  };

  const goToPage = (page) => navigate(navLinks[page]);
  const loader = new THREE.TextureLoader();
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const peachRadius = 2;
    const segments = 32;
    
    const fleshGeometry = new THREE.SphereGeometry(peachRadius, segments, segments, Math.PI, Math.PI);
    const fleshMaterial = new THREE.MeshPhongMaterial({
      color: 0xFAC802,
      side: THREE.DoubleSide,
      map: loader.load(skin)
    });
    const flesh = new THREE.Mesh(fleshGeometry, fleshMaterial);
    
    const pitRadius = peachRadius * 0.25;
    const pitGeometry = new THREE.SphereGeometry(pitRadius, segments, segments);
    const pitMaterial = new THREE.MeshPhongMaterial({
      color: 0x8B4513
    });
    const pit = new THREE.Mesh(pitGeometry, pitMaterial);
    
    const surfaceGeometry = new THREE.CircleGeometry(peachRadius-0.2, segments);
    const surfaceMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFEBF5,
      side: THREE.DoubleSide,
      map: loader.load(fleshtexture)
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

    const peachGroup = new THREE.Group();
    peachGroup.add(flesh);
    peachGroup.add(pit);
    peachGroup.add(surface);
    peachGroup.rotation.x = -Math.PI / 6;
    scene.add(peachGroup);

    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      peachGroup.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <a href="#" className="logo-container" onClick={() => goToPage('home')}>  
          <img src={logo} className="peach" alt="logo" />
        </a>
        <div className="nav-links">
          <a className="text cursor" onClick={() => goToPage('about')}>About</a>
          <a className="text cursor" onClick={() => goToPage('schedule')}>Schedule</a>
          <a className="text cursor" onClick={() => goToPage('sponsors')}>Sponsors</a>
          <a className="text cursor" onClick={() => goToPage('faq')}>FAQ</a>
        </div>
      </nav>

      <div className="App">
        <header className="App-header">
          <div ref={mountRef} style={{ width: '400px', height: '400px', margin: '0 auto' }} />
          <h1>Hack The Peach</h1>
          <div className="sign-up-button">Sign Up!</div>
        </header>
      </div>
    </>
  );
};

export default Home;