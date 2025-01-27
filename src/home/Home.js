import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import logo from '../logo.png';
import skin from './peachskin.jpg';
import fleshtexture from './peachflesh.png';
import pittexture from './pit.webp';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const mountRef = useRef(null);
  let hasInteracted = false;
  const navLinks = {
    home: '/home',
    about: '/about',
    schedule: '/schedule',
    sponsors: '/sponsors',
    faq: '/faq'
  };

  const goToPage = (page) => {
    console.log('Navigating to:', page);
    navigate(navLinks[page]);
  };
  const loader = new THREE.TextureLoader();
  const [activeSection, setActiveSection] = useState(null);
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerHeight*.7, window.innerHeight*.7);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    
    controls.update();

    controls.addEventListener('start', () => {
      hasInteracted = true;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const peachRadius = 2;
    const segments = 32;
    
    const fleshGeometry = new THREE.SphereGeometry(peachRadius, segments-2, segments-2, Math.PI, Math.PI);
    const fleshMaterial = new THREE.MeshPhongMaterial({
      color: 0xFAC802,
      side: THREE.DoubleSide,
      map: loader.load(skin)
    });
    const flesh = new THREE.Mesh(fleshGeometry, fleshMaterial);
    
    const pitRadius = peachRadius * 0.25;
    const pitGeometry = new THREE.SphereGeometry(pitRadius, segments, segments);
    const pitMaterial = new THREE.MeshPhongMaterial({
      color: 0x8B4513,
      map: loader.load(pittexture)
    });
    const pit = new THREE.Mesh(pitGeometry, pitMaterial);

    const surfaceGeometry = new THREE.CircleGeometry(peachRadius-0.2, segments);
    const surfaceMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFEBF5,
      side: THREE.DoubleSide,
      map: loader.load(fleshtexture)
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    
    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.05, 0.8, 8);
    const stemMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a3728,
      side: THREE.DoubleSide
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(0, peachRadius * 1.1, 0);
    stem.rotation.x = Math.PI / 12;

    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.5, 0.5, 0, 1);
    leafShape.quadraticCurveTo(-0.5, 0.5, 0, 0);

    const leafGeometry = new THREE.ShapeGeometry(leafShape);
    const leafMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d5a27,
      side: THREE.DoubleSide
    });
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(0.1, peachRadius * 1.2, 0);
    leaf.rotation.set(-1 * Math.PI / 6, Math.PI / 6, Math.PI * -0.3);

    const peachGroup = new THREE.Group();
    peachGroup.add(flesh);
    peachGroup.add(surface);
    peachGroup.add(pit);
    peachGroup.add(leaf);
    peachGroup.add(stem);
    peachGroup.rotation.x = -Math.PI / 12;
    scene.add(peachGroup);

    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredObject = null;
    const originalColors = {
      flesh: 0xFAC802,
      surface: 0xFFEBF5,
      stem: 0x4a3728,
      leaf: 0x2d5a27
    };

    flesh.userData.type = 'flesh';
    surface.userData.type = 'surface';
    stem.userData.type = 'stem';
    leaf.userData.type = 'leaf';

    renderer.domElement.addEventListener('mousemove', (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([flesh, surface, stem, leaf]);
    
      if (hoveredObject) {
        hoveredObject.material.color.setHex(originalColors[hoveredObject.userData.type]);
        hoveredObject = null;
      }

      if (intersects.length > 0) {
        hoveredObject = intersects[0].object;
        const originalColor = new THREE.Color(originalColors[hoveredObject.userData.type]);
        const whiteColor = new THREE.Color(0xffffff);
        originalColor.lerp(whiteColor, 1);
        hoveredObject.material.color.copy(originalColor);
        const section = hoveredObject.userData.type;
        setActiveSection(section);
      } else {
        setActiveSection(null);
      }
    });

    window.addEventListener('resize', () => {
      const size = window.innerHeight * 0.7;
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <>
      <nav className="navbar">
        <a href="#" className="logo-container" onClick={() => goToPage('home')}>  
          <img src={logo} className="peach" alt="logo" />
        </a>
        <div className="nav-links">
          <a className={`${activeSection === 'flesh' ? 'highlight' : ''}`} onClick={() => goToPage('about')}>About</a>
          <a className={`${activeSection === 'surface' ? 'highlight' : ''}`} onClick={() => goToPage('schedule')}>Schedule</a>
          <a className={`${activeSection === 'stem' ? 'highlight' : ''}`} onClick={() => goToPage('sponsors')}>Sponsors</a>
          <a className={`${activeSection === 'leaf' ? 'highlight' : ''}`} onClick={() => goToPage('faq')}>FAQ</a>
        </div>
      </nav>

      <div className="App">
        <header className="app-header">
          <div className="peach-model" ref={mountRef} />
          {!hasInteracted && (
            <div className="move">move me!</div>
          )}
          <h1>Hack The Peach</h1>
          <div className="info">a 48-hour hackathon in downtown atlanta</div>
          <button type="button" className="sign-up" onClick={() => openInNewTab('https://register.hackthepeach.com')}>Sign Up!</button>
        </header>
      </div>
    </>
  );
};

export default Home;
