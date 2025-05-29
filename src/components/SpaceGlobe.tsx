
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = fullscreen ? 0.3 : 0.5;
      
      if (fullscreen) {
        // Enable more interactive controls for fullscreen
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().minDistance = 200;
        globeEl.current.controls().maxDistance = 800;
      }
    }
  }, [fullscreen]);

  const gData = users.map(user => ({
    ...user,
    size: fullscreen ? 0.15 : 0.2,
    color: fullscreen ? '#00ffff' : '#8b5cf6'
  }));

  const handlePointClick = (point: any) => {
    navigate(`/profile/${point.id}`);
  };

  const globeConfig = {
    // Use day textures for better visibility
    globeImageUrl: fullscreen 
      ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      : "//unpkg.com/three-globe/example/img/earth-day.jpg",
    bumpImageUrl: "//unpkg.com/three-globe/example/img/earth-topology.png",
    backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png",
    pointsData: gData,
    pointAltitude: "size",
    pointColor: "color",
    onPointClick: handlePointClick,
    pointLabel: (d: any) => `
      <div style="background: rgba(15,23,42,0.95); padding: 16px; border-radius: 12px; color: white; max-width: 280px; border: 2px solid #00ffff; backdrop-filter: blur(10px);">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #8b5cf6, #3b82f6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; border: 2px solid #00ffff;">
            <span style="color: white; font-weight: bold; font-size: 16px;">${d.name.charAt(0)}</span>
          </div>
          <div>
            <strong style="color: #00ffff; font-size: 18px; display: block;">${d.name}</strong>
            <span style="color: #e2e8f0; font-size: 13px; display: flex; align-items: center; gap: 4px;">
              <span>📍</span> ${d.location}
            </span>
          </div>
        </div>
        <div style="background: rgba(30,41,59,0.5); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
          <em style="color: #cbd5e1; font-size: 14px; line-height: 1.4; display: block;">"${d.dream}"</em>
        </div>
        <div style="margin-bottom: 12px;">
          ${d.interests.slice(0, 3).map((interest: string) => 
            `<span style="background: #7c3aed; padding: 4px 8px; border-radius: 6px; font-size: 11px; margin-right: 4px; margin-bottom: 4px; display: inline-block; color: white;">${interest}</span>`
          ).join('')}
        </div>
        <div style="text-align: center; padding-top: 8px; border-top: 1px solid rgba(148,163,184,0.3);">
          <span style="background: #00ffff; color: #0f172a; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer;">👤 View Profile</span>
        </div>
      </div>
    `,
    width: fullscreen ? window.innerWidth * 0.9 : 400,
    height: fullscreen ? window.innerHeight * 0.7 : 320,
    atmosphereColor: fullscreen ? '#87ceeb' : '#3b82f6',
    atmosphereAltitude: 0.15
  };

  return (
    <Globe
      ref={globeEl}
      {...globeConfig}
    />
  );
};

export default SpaceGlobe;
