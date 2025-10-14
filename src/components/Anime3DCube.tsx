import { useEffect, useRef } from 'react';

interface Anime3DCubeProps {
  images?: string[];
  autoRotate?: boolean;
}

export const Anime3DCube = ({
  images = [],
  autoRotate = true
}: Anime3DCubeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const svg = svgRef.current;

    let cameraRotY = 0;
    let cameraZoom = 1;
    let cameraOffsetY = 0;
    let cameraOffsetZ = 0;

    const project = (x: number, y: number, z: number) => {
      const cos = Math.cos(cameraRotY);
      const sin = Math.sin(cameraRotY);
      const rx = x * cos - z * sin;
      const rz = x * sin + z * cos;
      const scale = 1.0 * cameraZoom;
      const px = 250 + (rx - y) * 0.866 * scale;
      const py = 280 + ((rx + y) * 0.5 - (rz + cameraOffsetZ)) * scale + cameraOffsetY;
      return { x: px, y: py };
    };

    type GeometryItem = {
      type: 'line' | 'fill';
      coords: any;
      phase: number;
      category: string;
      id?: string;
    };

    const geometry: GeometryItem[] = [];

    const addLine = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, phase: number, cat: string) => {
      geometry.push({ type: 'line', coords: {x1, y1, z1, x2, y2, z2}, phase, category: cat });
    };

    const addFill = (points: Array<{x: number, y: number, z: number}>, phase: number, cat: string, id: string) => {
      geometry.push({ type: 'fill', coords: points, phase, category: cat, id });
    };

    // ==========================================
    // PHASE 1: THRUSTERS - ULTRA DETAILED
    // ==========================================

    const buildThrusters = () => {
      const baseRadius = 45;
      const segments = 24; // Optimized for performance

      // MAIN ENGINE MOUNT BASE
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        const x1 = Math.cos(a1) * baseRadius;
        const y1 = Math.sin(a1) * baseRadius;
        const x2 = Math.cos(a2) * baseRadius;
        const y2 = Math.sin(a2) * baseRadius;

        // Bottom mounting ring
        addLine(x1, y1, 0, x2, y2, 0, 0.003 + i * 0.0001, 'thruster');

        // Structural rings (reduced from 6 to 4)
        for (let r = 0; r < 4; r++) {
          const rz = r * 15;
          addLine(x1, y1, rz, x2, y2, rz, 0.005 + r * 0.002 + i * 0.00005, 'thruster');
        }

        // Vertical longerons (8 main structural beams)
        if (i % 3 === 0) {
          addLine(x1, y1, 0, x1, y1, 60, 0.015 + (i/3) * 0.0008, 'thruster');

          // Secondary supports (reduced)
          addLine(x1 * 0.95, y1 * 0.95, 10, x1 * 1.05, y1 * 1.05, 25, 0.017 + (i/3) * 0.0008, 'thruster');
          addLine(x1 * 0.95, y1 * 0.95, 35, x1 * 1.05, y1 * 1.05, 50, 0.019 + (i/3) * 0.0008, 'thruster');
        }

        // Fill panels (all segments for smooth look)
        addFill([
          {x: x1, y: y1, z: 0},
          {x: x2, y: y2, z: 0},
          {x: x2, y: y2, z: 60},
          {x: x1, y: y1, z: 60}
        ], 0.16 + i * 0.00008, 'thruster-fill', `base-panel-${i}`);
      }

      // 4 MAIN ENGINE NOZZLES - Optimized
      for (let e = 0; e < 4; e++) {
        const angle = (e / 4) * Math.PI * 2;
        const dist = 58;
        const cx = Math.cos(angle) * dist;
        const cy = Math.sin(angle) * dist;

        // Nozzle bell with fewer stages
        const nozzleSegs = 12;
        const stages = 3;

        for (let s = 0; s < stages; s++) {
          const z1 = -s * 7;
          const z2 = -(s + 1) * 7;
          const r1 = 8 + s * 1.2;
          const r2 = 8 + (s + 1) * 1.2;

          for (let n = 0; n < nozzleSegs; n++) {
            const na1 = (n / nozzleSegs) * Math.PI * 2;
            const na2 = ((n + 1) / nozzleSegs) * Math.PI * 2;

            // Horizontal rings
            addLine(
              cx + Math.cos(na1) * r1, cy + Math.sin(na1) * r1, z1,
              cx + Math.cos(na2) * r1, cy + Math.sin(na2) * r1, z1,
              0.04 + e * 0.012 + s * 0.001 + n * 0.00005, 'thruster'
            );

            // Vertical connecting lines every 3rd segment
            if (n % 3 === 0) {
              addLine(
                cx + Math.cos(na1) * r1, cy + Math.sin(na1) * r1, z1,
                cx + Math.cos(na1) * r2, cy + Math.sin(na1) * r2, z2,
                0.06 + e * 0.012 + s * 0.001 + n * 0.00005, 'thruster'
              );
            }

            // Nozzle fill (all segments)
            addFill([
              {x: cx + Math.cos(na1) * r1, y: cy + Math.sin(na1) * r1, z: z1},
              {x: cx + Math.cos(na2) * r1, y: cy + Math.sin(na2) * r1, z: z1},
              {x: cx + Math.cos(na2) * r2, y: cy + Math.sin(na2) * r2, z: z2},
              {x: cx + Math.cos(na1) * r2, y: cy + Math.sin(na1) * r2, z: z2}
            ], 0.18 + e * 0.008 + s * 0.001 + n * 0.00005, 'nozzle-fill', `nozzle-${e}-${s}-${n}`);
          }
        }

        // Support struts (reduced)
        addLine(cx * 0.6, cy * 0.6, 35, cx * 0.85, cy * 0.85, 5, 0.10 + e * 0.012, 'thruster');
        addLine(cx * 0.65, cy * 0.65, 40, cx * 0.90, cy * 0.90, 5, 0.11 + e * 0.012, 'thruster');
      }

      // Heat shield tiles (reduced pattern)
      for (let h = 0; h < 12; h++) {
        const ha = (h / 12) * Math.PI * 2;
        for (let layer = 0; layer < 2; layer++) {
          const lr = baseRadius - 2 - layer * 3;
          const hx = Math.cos(ha) * lr;
          const hy = Math.sin(ha) * lr;
          const hz = 10 + layer * 20;

          // Tile outline
          addLine(hx - 3, hy - 1, hz, hx + 3, hy + 1, hz, 0.15 + h * 0.0003 + layer * 0.001, 'thruster');
        }
      }
    };

    // ==========================================
    // PHASE 2: COCKPIT - ULTRA DETAILED
    // ==========================================

    const buildCockpit = () => {
      const cockpitRadius = 42;
      const segments = 24;
      const baseZ = 200;
      const topZ = 300;

      // MAIN COCKPIT STRUCTURE
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        const x1 = Math.cos(a1) * cockpitRadius;
        const y1 = Math.sin(a1) * cockpitRadius;
        const x2 = Math.cos(a2) * cockpitRadius;
        const y2 = Math.sin(a2) * cockpitRadius;

        // Structural rings (reduced to 6)
        for (let r = 0; r < 6; r++) {
          const rz = baseZ + r * 16;
          addLine(x1, y1, rz, x2, y2, rz, 0.26 + r * 0.001 + i * 0.00005, 'cockpit');
        }

        // Vertical structural frames (8 main)
        if (i % 3 === 0) {
          addLine(x1, y1, baseZ, x1, y1, topZ, 0.28 + (i/3) * 0.0005, 'cockpit');

          // Cross bracing (reduced)
          const nextI = ((i + 3) % segments);
          const a3 = (nextI / segments) * Math.PI * 2;
          const x3 = Math.cos(a3) * cockpitRadius;
          const y3 = Math.sin(a3) * cockpitRadius;

          addLine(x1, y1, baseZ + 30, x3, y3, baseZ + 50, 0.30 + (i/3) * 0.0005, 'cockpit');
          addLine(x1, y1, baseZ + 60, x3, y3, baseZ + 80, 0.31 + (i/3) * 0.0005, 'cockpit');
        }

        // Fill panels (all segments)
        addFill([
          {x: x1, y: y1, z: baseZ},
          {x: x2, y: y2, z: baseZ},
          {x: x2, y: y2, z: topZ},
          {x: x1, y: y1, z: topZ}
        ], 0.44 + i * 0.00008, 'cockpit-fill', `cockpit-panel-${i}`);
      }

      // 8 OBSERVATION WINDOWS - Simplified frames
      for (let w = 0; w < 8; w++) {
        const wa = (w / 8) * Math.PI * 2;
        const wx = Math.cos(wa) * cockpitRadius;
        const wy = Math.sin(wa) * cockpitRadius;
        const ws = 12;
        const wz = 245;

        // Outer frame
        addLine(wx - ws, wy - ws, wz, wx + ws, wy - ws, wz, 0.33 + w * 0.002, 'cockpit');
        addLine(wx + ws, wy - ws, wz, wx + ws, wy + ws, wz, 0.34 + w * 0.002, 'cockpit');
        addLine(wx + ws, wy + ws, wz, wx - ws, wy + ws, wz, 0.35 + w * 0.002, 'cockpit');
        addLine(wx - ws, wy + ws, wz, wx - ws, wy - ws, wz, 0.36 + w * 0.002, 'cockpit');

        // Cross dividers
        addLine(wx, wy - ws, wz, wx, wy + ws, wz, 0.38 + w * 0.002, 'cockpit');
        addLine(wx - ws, wy, wz, wx + ws, wy, wz, 0.39 + w * 0.002, 'cockpit');

        // Window fill
        addFill([
          {x: wx - ws, y: wy - ws, z: wz},
          {x: wx + ws, y: wy - ws, z: wz},
          {x: wx + ws, y: wy + ws, z: wz},
          {x: wx - ws, y: wy + ws, z: wz}
        ], 0.46 + w * 0.001, 'window-fill', `window-${w}`);
      }

      // Docking port (simplified)
      const dockRadius = 18;
      const dockSegs = 12;
      for (let layer = 0; layer < 2; layer++) {
        const dr = dockRadius - layer * 3;
        for (let d = 0; d < dockSegs; d++) {
          const da1 = (d / dockSegs) * Math.PI * 2;
          const da2 = ((d + 1) / dockSegs) * Math.PI * 2;
          addLine(
            Math.cos(da1) * dr, Math.sin(da1) * dr, topZ + layer * 3,
            Math.cos(da2) * dr, Math.sin(da2) * dr, topZ + layer * 3,
            0.41 + d * 0.0005 + layer * 0.001, 'cockpit'
          );
        }
      }

      // External antennas (reduced)
      for (let a = 0; a < 6; a++) {
        const aa = (a / 6) * Math.PI * 2;
        const ax = Math.cos(aa) * 38;
        const ay = Math.sin(aa) * 38;

        // Main mast
        addLine(ax, ay, 280, ax * 1.15, ay * 1.15, 280, 0.42 + a * 0.0008, 'cockpit');
        addLine(ax * 1.15, ay * 1.15, 280, ax * 1.15, ay * 1.15, 295, 0.421 + a * 0.0008, 'cockpit');

        // Support wire
        addLine(ax, ay, 280, ax * 1.10, ay * 1.10, 295, 0.422 + a * 0.0008, 'cockpit');
      }
    };

    // ==========================================
    // PHASE 3: MAIN BODY - ULTRA DETAILED
    // ==========================================

    const buildBody = () => {
      const bodyRadius = 45;
      const segments = 24;
      const bottomZ = 60;
      const topZ = 200;

      // MAIN FUSELAGE STRUCTURE
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        const x1 = Math.cos(a1) * bodyRadius;
        const y1 = Math.sin(a1) * bodyRadius;
        const x2 = Math.cos(a2) * bodyRadius;
        const y2 = Math.sin(a2) * bodyRadius;

        // Structural rings (reduced to 8)
        for (let r = 0; r < 8; r++) {
          const rz = bottomZ + r * 17.5;
          addLine(x1, y1, rz, x2, y2, rz, 0.51 + r * 0.0008 + i * 0.00004, 'body');
        }

        // Longerons (vertical structural members)
        if (i % 2 === 0) {
          addLine(x1, y1, bottomZ, x1, y1, topZ, 0.53 + (i/2) * 0.0004, 'body');

          // Stringers (internal reinforcement)
          addLine(x1 * 0.97, y1 * 0.97, bottomZ + 15, x1 * 0.97, y1 * 0.97, topZ - 15, 0.54 + (i/2) * 0.0004, 'body');
        }

        // Fill panels (all segments)
        addFill([
          {x: x1, y: y1, z: bottomZ},
          {x: x2, y: y2, z: bottomZ},
          {x: x2, y: y2, z: topZ},
          {x: x1, y: y1, z: topZ}
        ], 0.69 + i * 0.00006, 'body-fill', `body-panel-${i}`);
      }

      // 4 STABILIZER FINS - Optimized
      for (let f = 0; f < 4; f++) {
        const fa = (f / 4) * Math.PI * 2 + Math.PI / 8;
        const fx1 = Math.cos(fa) * bodyRadius;
        const fy1 = Math.sin(fa) * bodyRadius;
        const fx2 = Math.cos(fa) * (bodyRadius + 78);
        const fy2 = Math.sin(fa) * (bodyRadius + 78);

        // Leading edge (simplified)
        for (let le = 0; le < 3; le++) {
          const t = le / 3;
          const z1 = 75 + t * 7;
          const z2 = 75 + (t + 0.33) * 7;
          const x1 = fx1 + (fx2 - fx1) * t;
          const y1 = fy1 + (fy2 - fy1) * t;
          const x2 = fx1 + (fx2 - fx1) * (t + 0.33);
          const y2 = fy1 + (fy2 - fy1) * (t + 0.33);
          addLine(x1, y1, z1, x2, y2, z2, 0.58 + f * 0.006 + le * 0.0005, 'body');
        }

        // Trailing edge (simplified)
        for (let te = 0; te < 3; te++) {
          const t = te / 3;
          const z1 = 140 - t * 7;
          const z2 = 140 - (t + 0.33) * 7;
          const x1 = fx1 + (fx2 - fx1) * t;
          const y1 = fy1 + (fy2 - fy1) * t;
          const x2 = fx1 + (fx2 - fx1) * (t + 0.33);
          const y2 = fy1 + (fy2 - fy1) * (t + 0.33);
          addLine(x1, y1, z1, x2, y2, z2, 0.60 + f * 0.006 + te * 0.0005, 'body');
        }

        // Fin tip
        addLine(fx2, fy2, 75, fx2, fy2, 135, 0.62 + f * 0.006, 'body');

        // Fin root
        addLine(fx1, fy1, 75, fx1, fy1, 140, 0.63 + f * 0.006, 'body');

        // Internal ribs (reduced to 3)
        for (let rib = 1; rib < 4; rib++) {
          const t = rib / 4;
          const rx = fx1 + (fx2 - fx1) * t;
          const ry = fy1 + (fy2 - fy1) * t;
          const z1 = 75 + t * 7;
          const z2 = 140 - t * 7;
          addLine(rx, ry, z1, rx, ry, z2, 0.64 + f * 0.006 + rib * 0.0005, 'body');
        }

        // Spars (reduced to 2)
        for (let spar = 0; spar < 2; spar++) {
          const sz = 90 + spar * 25;
          addLine(fx1 * 1.1, fy1 * 1.1, sz, fx2 * 0.9, fy2 * 0.9, sz, 0.65 + f * 0.006 + spar * 0.0005, 'body');
        }

        // Fin fill
        addFill([
          {x: fx1, y: fy1, z: 75},
          {x: fx2, y: fy2, z: 75},
          {x: fx2, y: fy2, z: 135},
          {x: fx1, y: fy1, z: 140}
        ], 0.71 + f * 0.003, 'fin-fill', `fin-${f}`);
      }

      // Service panels (reduced)
      for (let p = 0; p < 5; p++) {
        const pz = 75 + p * 25;
        for (let s = 0; s < 8; s++) {
          const sa = (s / 8) * Math.PI * 2;
          const sx = Math.cos(sa) * (bodyRadius - 0.5);
          const sy = Math.sin(sa) * (bodyRadius - 0.5);

          // Panel outline
          addLine(sx - 2, sy - 1, pz, sx + 2, sy + 1, pz, 0.67 + p * 0.0003 + s * 0.00005, 'body');
        }
      }

      // Tank separation rings (reduced)
      for (let t = 0; t < 2; t++) {
        const tz = 100 + t * 45;
        for (let ts = 0; ts < segments; ts++) {
          const ta = (ts / segments) * Math.PI * 2;
          const tx = Math.cos(ta) * (bodyRadius + 1);
          const ty = Math.sin(ta) * (bodyRadius + 1);
          addLine(tx, ty, tz, tx, ty, tz + 3, 0.68 + t * 0.001 + ts * 0.00003, 'body');
        }
      }
    };

    // ==========================================
    // PHASE 4: NOSE CONE - ULTRA DETAILED
    // ==========================================

    const buildNose = () => {
      const baseRadius = 42;
      const tipZ = 385;
      const baseZ = 300;
      const coneSegs = 16;

      // AERODYNAMIC NOSE CONE
      for (let i = 0; i < coneSegs; i++) {
        const t = i / coneSegs;
        const nextT = (i + 1) / coneSegs;
        const z1 = baseZ + t * (tipZ - baseZ);
        const z2 = baseZ + nextT * (tipZ - baseZ);
        const r1 = baseRadius * (1 - t * t * 0.95);
        const r2 = baseRadius * (1 - nextT * nextT * 0.95);

        if (r1 > 0.5) {
          const ringSegs = 16;
          for (let j = 0; j < ringSegs; j++) {
            const a1 = (j / ringSegs) * Math.PI * 2;
            const a2 = ((j + 1) / ringSegs) * Math.PI * 2;

            // Horizontal rings
            addLine(
              Math.cos(a1) * r1, Math.sin(a1) * r1, z1,
              Math.cos(a2) * r1, Math.sin(a2) * r1, z1,
              0.76 + i * 0.0015 + j * 0.00008, 'nose'
            );

            // Meridian lines (every 4th)
            if (j % 4 === 0 && r2 > 0.5) {
              addLine(
                Math.cos(a1) * r1, Math.sin(a1) * r1, z1,
                Math.cos(a1) * r2, Math.sin(a1) * r2, z2,
                0.78 + i * 0.0015 + j * 0.00008, 'nose'
              );
            }

            // Nose cone panels (all segments)
            if (r2 > 0.5) {
              addFill([
                {x: Math.cos(a1) * r1, y: Math.sin(a1) * r1, z: z1},
                {x: Math.cos(a2) * r1, y: Math.sin(a2) * r1, z: z1},
                {x: Math.cos(a2) * r2, y: Math.sin(a2) * r2, z: z2},
                {x: Math.cos(a1) * r2, y: Math.sin(a1) * r2, z: z2}
              ], 0.91 + i * 0.0012 + j * 0.00005, 'nose-fill', `nose-${i}-${j}`);
            }
          }
        }
      }

      // Main antenna spike
      addLine(0, 0, tipZ, 0, 0, tipZ + 45, 0.82, 'nose');

      // Antenna base mounting (simplified)
      const antBaseSegs = 6;
      for (let ab = 0; ab < antBaseSegs; ab++) {
        const aba = (ab / antBaseSegs) * Math.PI * 2;
        addLine(
          Math.cos(aba) * 2, Math.sin(aba) * 2, tipZ,
          0, 0, tipZ + 5,
          0.83 + ab * 0.0005, 'nose'
        );
      }

      // Antenna struts (4 supports)
      for (let a = 0; a < 4; a++) {
        const aa = (a / 4) * Math.PI * 2;
        addLine(0, 0, tipZ + 45, Math.cos(aa) * 4, Math.sin(aa) * 4, tipZ + 38, 0.84 + a * 0.0008, 'nose');
        addLine(Math.cos(aa) * 4, Math.sin(aa) * 4, tipZ + 38, Math.cos(aa) * 2, Math.sin(aa) * 2, tipZ + 30, 0.85 + a * 0.0008, 'nose');
      }

      // RCS thruster system (reduced to 8)
      for (let r = 0; r < 8; r++) {
        const ra = (r / 8) * Math.PI * 2;
        const rx = Math.cos(ra) * 35;
        const ry = Math.sin(ra) * 35;
        const rz = 325;

        // Thruster housing (simplified)
        for (let th = 0; th < 4; th++) {
          const tha = (th / 4) * Math.PI * 2;
          const thr = 2.5;
          addLine(
            rx + Math.cos(tha) * thr, ry + Math.sin(tha) * thr, rz,
            rx, ry, rz - 4,
            0.86 + r * 0.002 + th * 0.0001, 'nose'
          );
        }

        // Mounting bracket
        addLine(rx * 0.95, ry * 0.95, rz + 2, rx * 1.05, ry * 1.05, rz - 2, 0.87 + r * 0.002, 'nose');
      }

      // Sensor array ring (reduced to 12)
      const sensorSegs = 12;
      for (let s = 0; s < sensorSegs; s++) {
        const sa = (s / sensorSegs) * Math.PI * 2;
        const sr = 30;
        const sx = Math.cos(sa) * sr;
        const sy = Math.sin(sa) * sr;

        // Sensor pods
        addLine(sx, sy, 315, sx * 1.05, sy * 1.05, 315, 0.88 + s * 0.0005, 'nose');
        addLine(sx * 1.05, sy * 1.05, 315, sx * 1.05, sy * 1.05, 320, 0.881 + s * 0.0005, 'nose');
      }

      // Heat-resistant tile pattern (reduced)
      for (let ht = 0; ht < 6; ht++) {
        const hta = (ht / 6) * Math.PI * 2;
        for (let layer = 0; layer < 2; layer++) {
          const htr = 25 - layer * 7;
          const htz = 340 + layer * 15;
          const htx = Math.cos(hta) * htr;
          const hty = Math.sin(hta) * htr;
          addLine(htx - 2, hty, htz, htx + 2, hty, htz, 0.89 + ht * 0.0003 + layer * 0.0002, 'nose');
        }
      }
    };

    buildThrusters();
    buildCockpit();
    buildBody();
    buildNose();

    const render = () => {
      svg.querySelectorAll('[data-geo]').forEach(el => el.remove());

      // Calculate rotated Z for sorting (painter's algorithm)
      const getRotatedZ = (x: number, y: number, z: number) => {
        const cos = Math.cos(cameraRotY);
        const sin = Math.sin(cameraRotY);
        return x * sin + z * cos;
      };

      const sortedGeometry = geometry.map(geom => {
        let avgZ = 0;
        if (geom.type === 'line') {
          const {x1, y1, z1, x2, y2, z2} = geom.coords;
          avgZ = (getRotatedZ(x1, y1, z1) + getRotatedZ(x2, y2, z2)) / 2;
        } else {
          avgZ = geom.coords.reduce((sum: number, pt: any) => sum + getRotatedZ(pt.x, pt.y, pt.z), 0) / geom.coords.length;
        }
        return { geom, avgZ };
      }).sort((a, b) => a.avgZ - b.avgZ); // Sort back to front

      sortedGeometry.forEach(({geom}) => {
        if (geom.type === 'line') {
          const {x1, y1, z1, x2, y2, z2} = geom.coords;
          const p1 = project(x1, y1, z1);
          const p2 = project(x2, y2, z2);
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', String(p1.x));
          line.setAttribute('y1', String(p1.y));
          line.setAttribute('x2', String(p2.x));
          line.setAttribute('y2', String(p2.y));
          line.setAttribute('data-geo', '1');
          line.setAttribute('data-phase', String(geom.phase));
          line.setAttribute('data-cat', geom.category);
          line.setAttribute('stroke', '#3b82f6');
          line.setAttribute('stroke-width', '1.2');
          line.style.opacity = '0';
          svg.appendChild(line);
        } else {
          let d = 'M ';
          geom.coords.forEach((pt: any, i: number) => {
            const p = project(pt.x, pt.y, pt.z);
            d += `${p.x} ${p.y}`;
            if (i < geom.coords.length - 1) d += ' L ';
          });
          d += ' Z';
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', d);
          path.setAttribute('data-geo', '1');
          path.setAttribute('data-phase', String(geom.phase));
          path.setAttribute('data-cat', geom.category);
          if (geom.id) path.setAttribute('id', geom.id);
          path.style.opacity = '0';
          svg.appendChild(path);
        }
      });
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (container.offsetHeight - window.innerHeight)));

      const progressEl = document.getElementById('progress-percent');
      if (progressEl) progressEl.textContent = String(Math.round(progress * 100));

      const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      if (progress < 0.25) {
        const t = ease(progress * 4);
        cameraRotY = t * Math.PI * 0.5;
        cameraZoom = 1.6 + t * 0.7;
        cameraOffsetZ = -60 + t * 30;
        cameraOffsetY = 40 - t * 20;
      } else if (progress < 0.5) {
        const t = ease((progress - 0.25) * 4);
        cameraRotY = Math.PI * 0.5 + t * Math.PI * 0.6;
        cameraZoom = 2.3 - t * 0.6;
        cameraOffsetZ = -30 - t * 40;
        cameraOffsetY = 20 - t * 40;
      } else if (progress < 0.75) {
        const t = ease((progress - 0.5) * 4);
        cameraRotY = Math.PI * 1.1 + t * Math.PI * 0.4;
        cameraZoom = 1.7 - t * 0.4;
        cameraOffsetZ = -70 + t * 40;
        cameraOffsetY = -20 + t * 10;
      } else {
        const t = ease((progress - 0.75) * 4);
        cameraRotY = Math.PI * 1.5 - t * Math.PI * 1.5; // Eindigt op 0 (rechtop)
        cameraZoom = 1.3 - t * 0.65; // Extra uitzoomen voor volledig beeld
        cameraOffsetZ = -30 + t * 30;
        cameraOffsetY = -10 + t * 10;
      }

      render();

      svg.querySelectorAll('[data-geo]').forEach(el => {
        const element = el as SVGElement;
        const phase = parseFloat(element.dataset.phase || '0');
        const cat = element.dataset.cat || '';
        const elemProgress = Math.max(0, Math.min(1, (progress - phase) * 12));

        let realisticT = 0;
        if (phase < 0.25) {
          realisticT = Math.max(0, Math.min(1, (progress - 0.20) / 0.05));
        } else if (phase < 0.5) {
          realisticT = Math.max(0, Math.min(1, (progress - 0.45) / 0.05));
        } else if (phase < 0.75) {
          realisticT = Math.max(0, Math.min(1, (progress - 0.70) / 0.05));
        } else {
          realisticT = Math.max(0, Math.min(1, (progress - 0.94) / 0.06));
        }

        if (cat.includes('-fill')) {
          const opacity = elemProgress * realisticT * 0.95;
          element.style.opacity = String(opacity);

          if (realisticT > 0.85) {
            if (cat === 'nozzle-fill') {
              element.setAttribute('fill', 'url(#nozzleGrad)');
            } else if (cat === 'window-fill') {
              element.setAttribute('fill', 'url(#windowGrad)');
            } else if (cat === 'fin-fill') {
              element.setAttribute('fill', '#34495e');
            } else if (cat === 'nose-fill') {
              element.setAttribute('fill', 'url(#noseGrad)');
            } else {
              element.setAttribute('fill', 'url(#metalGrad)');
            }
          } else {
            const blend = (c1: string, c2: string, t: number) => {
              const r1 = parseInt(c1.slice(1,3), 16);
              const g1 = parseInt(c1.slice(3,5), 16);
              const b1 = parseInt(c1.slice(5,7), 16);
              const r2 = parseInt(c2.slice(1,3), 16);
              const g2 = parseInt(c2.slice(3,5), 16);
              const b2 = parseInt(c2.slice(5,7), 16);
              const r = Math.round(r1 + (r2 - r1) * t);
              const g = Math.round(g1 + (g2 - g1) * t);
              const b = Math.round(b1 + (b2 - b1) * t);
              return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
            };

            if (cat === 'nozzle-fill') {
              element.setAttribute('fill', blend('#dbeafe', '#f97316', realisticT));
            } else if (cat === 'window-fill') {
              element.setAttribute('fill', blend('#dbeafe', '#3b82f6', realisticT));
            } else if (cat === 'fin-fill') {
              element.setAttribute('fill', blend('#dbeafe', '#34495e', realisticT));
            } else if (cat === 'nose-fill') {
              element.setAttribute('fill', blend('#dbeafe', '#dc2626', realisticT));
            } else {
              element.setAttribute('fill', blend('#dbeafe', '#94a3b8', realisticT));
            }
          }

          element.setAttribute('stroke', 'rgba(0,0,0,0.15)');
          element.setAttribute('stroke-width', '0.5');
        } else {
          element.style.opacity = String(elemProgress * 0.85);
        }
      });
    };

    render();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoRotate]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <svg ref={svgRef} viewBox="0 0 500 560" className="w-full h-full max-w-xl max-h-[70vh] mx-auto">
          <defs>
            <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(59, 130, 246, 0.08)" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.02)" strokeWidth="0.5" />
            </pattern>

            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <radialGradient id="nozzleGrad">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>

            <linearGradient id="windowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            <linearGradient id="noseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>

          <rect width="500" height="560" fill="url(#techGrid)" opacity="0.15" />
        </svg>

        <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 text-center pointer-events-none select-none">
          <div className="font-mono text-[7px] tracking-[0.6em] text-blue-400/60 mb-1 uppercase">
            Precision Engineering Division
          </div>
          <div className="font-mono text-2xl font-black text-blue-50 tracking-tight">
            MK-VII DEEP SPACE
          </div>
          <div className="font-mono text-[7px] text-blue-400/50 mt-1 tracking-wider">
            4-PHASE PRECISION ASSEMBLY • SCROLL TO BUILD
          </div>
        </div>

        <div className="absolute bottom-[8vh] right-6 text-right font-mono pointer-events-none select-none">
          <div className="text-[7px] text-blue-400/60 mb-0.5 tracking-widest">BUILD PROGRESS</div>
          <div className="text-5xl font-black text-blue-50 leading-none">
            <span id="progress-percent">0</span>
            <span className="text-2xl opacity-40">%</span>
          </div>
          <div className="text-[6px] text-blue-400/50 mt-0.5 tracking-wide">ASSEMBLY COMPLETE</div>
        </div>

        <div className="absolute bottom-[8vh] left-6 font-mono text-[7px] space-y-1.5 text-blue-300/70 pointer-events-none select-none">
          <div className="flex justify-between gap-16">
            <span className="opacity-60">HEIGHT</span><span className="font-bold">68.5m</span>
          </div>
          <div className="flex justify-between gap-16">
            <span className="opacity-60">DIAMETER</span><span className="font-bold">9.2m</span>
          </div>
          <div className="flex justify-between gap-16">
            <span className="opacity-60">THRUST</span><span className="font-bold">8,200 kN</span>
          </div>
          <div className="flex justify-between gap-16">
            <span className="opacity-60">PAYLOAD</span><span className="font-bold">22,800 kg</span>
          </div>
        </div>

        <div className="absolute top-[15vh] right-6 font-mono text-[6px] text-right text-blue-400/50 space-y-0.5 pointer-events-none select-none">
          <div>PROJECT: DEEPSPACE-MK7</div>
          <div>DWG.NO: RS-2025-X7-004</div>
          <div>REV: D</div>
          <div>DATE: 14.10.2025</div>
          <div className="mt-2 text-[6px] font-bold opacity-70">AEROSPACE DYNAMICS</div>
        </div>
      </div>
    </div>
  );
};
