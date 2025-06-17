
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Globe from "react-globe.gl";

interface User {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
  location: string;
  interests: string[];
  dream: string;
}

interface SpaceGlobeProps {
  users: User[];
  fullscreen?: boolean;
}

const SpaceGlobe = ({ users, fullscreen = false }: SpaceGlobeProps) => {
  const globeEl = useRef<any>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = fullscreen ? 0.2 : 0.4;
      
      if (fullscreen) {
        // Enable more interactive controls for fullscreen
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().minDistance = isMobile ? 150 : 200;
        globeEl.current.controls().maxDistance = isMobile ? 600 : 800;
        // Better touch controls
        globeEl.current.controls().enablePan = true;
        globeEl.current.controls().enableDamping = true;
        globeEl.current.controls().dampingFactor = 0.1;
      }
    }
  }, [fullscreen, isMobile]);

  // Separate current user from other users
  const currentUserData = users.find(u => u.id === user?.id);
  const otherUsers = users.filter(u => u.id !== user?.id);

  const gData = otherUsers.map(user => ({
    ...user,
    size: isMobile ? (fullscreen ? 0.25 : 0.3) : (fullscreen ? 0.15 : 0.2),
    color: fullscreen ? '#00ffff' : '#8b5cf6',
    isCurrentUser: false
  }));

  // Add current user with special styling
  const currentUserPoint = currentUserData ? [{
    ...currentUserData,
    size: isMobile ? (fullscreen ? 0.4 : 0.45) : (fullscreen ? 0.25 : 0.3),
    color: '#ff6b35', // Orange color for current user
    isCurrentUser: true
  }] : [];

  const allPoints = [...gData, ...currentUserPoint];

  const handlePointClick = (point: any) => {
    if (isMobile) {
      // On mobile, first tap shows info, second tap navigates
      if (selectedPoint?.id === point.id) {
        navigate(`/profile/${point.id}`);
      } else {
        setSelectedPoint(point);
        // Auto-hide after 3 seconds
        setTimeout(() => setSelectedPoint(null), 3000);
      }
    } else {
      // On desktop, direct navigation
      navigate(`/profile/${point.id}`);
    }
  };

  const getPointLabel = (d: any) => {
    if (isMobile && selectedPoint?.id !== d.id) {
      // On mobile, only show label for selected point
      return '';
    }

    const isCurrentUser = d.isCurrentUser;
    const borderColor = isCurrentUser ? '#ff6b35' : '#00ffff';
    const titlePrefix = isCurrentUser ? '🌟 You are here!' : '';
    
    return `
      <div style="background: rgba(15,23,42,0.98); padding: ${isMobile ? '20px' : '16px'}; border-radius: 12px; color: white; max-width: ${isMobile ? '320px' : '280px'}; border: 2px solid ${borderColor}; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
        ${isCurrentUser ? `<div style="text-align: center; margin-bottom: 12px; background: linear-gradient(135deg, #ff6b35, #f093fb); padding: ${isMobile ? '12px' : '8px'}; border-radius: 8px; font-weight: bold; font-size: ${isMobile ? '16px' : '14px'};">${titlePrefix}</div>` : ''}
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: ${isMobile ? '56px' : '48px'}; height: ${isMobile ? '56px' : '48px'}; background: linear-gradient(135deg, ${isCurrentUser ? '#ff6b35, #f093fb' : '#8b5cf6, #3b82f6'}); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; border: 2px solid ${borderColor};">
            <span style="color: white; font-weight: bold; font-size: ${isMobile ? '20px' : '16px'};">${d.name.charAt(0)}</span>
          </div>
          <div>
            <strong style="color: ${borderColor}; font-size: ${isMobile ? '20px' : '18px'}; display: block;">${d.name}</strong>
            <span style="color: #e2e8f0; font-size: ${isMobile ? '15px' : '13px'}; display: flex; align-items: center; gap: 4px;">
              <span>📍</span> ${d.location}
            </span>
          </div>
        </div>
        <div style="background: rgba(30,41,59,0.5); padding: ${isMobile ? '16px' : '12px'}; border-radius: 8px; margin-bottom: 12px;">
          <em style="color: #cbd5e1; font-size: ${isMobile ? '16px' : '14px'}; line-height: 1.4; display: block;">"${d.dream}"</em>
        </div>
        <div style="margin-bottom: 12px;">
          ${d.interests.slice(0, 3).map((interest: string) => 
            `<span style="background: ${isCurrentUser ? '#ff6b35' : '#7c3aed'}; padding: ${isMobile ? '6px 12px' : '4px 8px'}; border-radius: 6px; font-size: ${isMobile ? '13px' : '11px'}; margin-right: 4px; margin-bottom: 4px; display: inline-block; color: white;">${interest}</span>`
          ).join('')}
        </div>
        <div style="text-align: center; padding-top: 8px; border-top: 1px solid rgba(148,163,184,0.3);">
          <span style="background: ${borderColor}; color: #0f172a; padding: ${isMobile ? '10px 16px' : '6px 12px'}; border-radius: 6px; font-size: ${isMobile ? '14px' : '12px'}; font-weight: bold; cursor: pointer;">
            ${isMobile ? '👤 Tap Again to View Profile' : '👤 View Profile'}
          </span>
        </div>
      </div>
    `;
  };

  const globeConfig = {
    // Use day textures for better visibility
    globeImageUrl: fullscreen 
      ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      : "//unpkg.com/three-globe/example/img/earth-day.jpg",
    bumpImageUrl: "//unpkg.com/three-globe/example/img/earth-topology.png",
    backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png",
    pointsData: allPoints,
    pointAltitude: "size",
    pointColor: "color",
    onPointClick: handlePointClick,
    pointLabel: getPointLabel,
    width: fullscreen ? window.innerWidth * 0.9 : 400,
    height: fullscreen ? window.innerHeight * 0.7 : 320,
    atmosphereColor: fullscreen ? '#87ceeb' : '#3b82f6',
    atmosphereAltitude: 0.15,
    // Enhanced touch controls
    enablePointerInteraction: true
  };

  return (
    <div className="relative">
      <Globe
        ref={globeEl}
        {...globeConfig}
      />
      {isMobile && fullscreen && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-slate-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
            <p className="text-purple-200 text-sm text-center">
              🌟 Orange pin = You are here • 🔵 Blue pins = Other users • Tap to explore
            </p>
          </div>
        </div>
      )}
      {selectedPoint && isMobile && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-400 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-cyan-400 font-bold text-lg">{selectedPoint.name}</h3>
                <p className="text-purple-200 text-sm">📍 {selectedPoint.location}</p>
                {selectedPoint.isCurrentUser && (
                  <p className="text-orange-400 text-xs font-bold">⭐ This is you!</p>
                )}
              </div>
              <button
                onClick={() => navigate(`/profile/${selectedPoint.id}`)}
                className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceGlobe;
