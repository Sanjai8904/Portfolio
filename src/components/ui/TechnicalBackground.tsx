"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

// ─── Section scene definitions ─────────────────────────────────────────────
// Each section has a unique CS-themed 3D composition that transitions in.
// ───────────────────────────────────────────────────────────────────────────

type SectionId = "top" | "about" | "work" | "experience" | "education" | "skills" | "contact" | "other";

interface SceneObjects {
  objects: THREE.Object3D[];
  cameraTarget: THREE.Vector3;
  cameraPos: THREE.Vector3;
}

function createLine(points: THREE.Vector3[], mat: THREE.LineBasicMaterial) {
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geo, mat);
}

function edgesOf(geo: THREE.BufferGeometry, mat: THREE.LineBasicMaterial) {
  return new THREE.LineSegments(new THREE.EdgesGeometry(geo, 1), mat);
}

// ─── Material factory ──────────────────────────────────────────────────────
function mats() {
  const blue    = (op: number) => new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: op });
  const cyan    = (op: number) => new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: op });
  const purple  = (op: number) => new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: op });
  const green   = (op: number) => new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: op });
  const points  = (color: number, size: number, op: number) =>
    new THREE.PointsMaterial({ color, size, transparent: true, opacity: op, sizeAttenuation: true });
  return { blue, cyan, purple, green, points };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 0 — HERO: Rotating wireframe sphere + orbital rings
//  Represents: A distributed global network node
// ═══════════════════════════════════════════════════════════════
function buildHeroScene(m: ReturnType<typeof mats>, isMobile: boolean): SceneObjects {
  const objects: THREE.Object3D[] = [];

  const sphere = edgesOf(new THREE.SphereGeometry(isMobile ? 1.6 : 2.2, 28, 18), m.blue(0.55));
  sphere.position.set(isMobile ? 0 : 2.5, 0, 0);
  objects.push(sphere);

  const inner = edgesOf(new THREE.SphereGeometry(isMobile ? 0.9 : 1.3, 16, 10),
    new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.2 }));
  inner.position.copy(sphere.position);
  objects.push(inner);

  for (const [rx, rz, radius, color, op] of [
    [Math.PI / 2, 0, isMobile ? 2.0 : 2.8, 0x06b6d4, 0.35],
    [Math.PI / 3, Math.PI / 6, isMobile ? 2.4 : 3.2, 0x3b82f6, 0.25],
    [0, Math.PI / 4, isMobile ? 2.2 : 3.0, 0x8b5cf6, 0.2],
  ] as const) {
    const ring = edgesOf(new THREE.TorusGeometry(radius, 0.006, 2, 100),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }));
    ring.position.copy(sphere.position);
    ring.rotation.set(rx, 0, rz ?? 0);
    objects.push(ring);
  }

  const nodePositions: [number, number, number][] = [];
  for (let i = 0; i < (isMobile ? 25 : 50); i++) {
    nodePositions.push([
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8 - 4,
    ]);
  }
  const lineVerts: number[] = [];
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const a = nodePositions[i]!; const b = nodePositions[j]!;
      const d = Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
      if (d < 4.5) lineVerts.push(...a, ...b);
    }
  }
  const netGeo = new THREE.BufferGeometry();
  netGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
  objects.push(new THREE.LineSegments(netGeo, m.blue(0.18)));

  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions.flat(), 3));
  objects.push(new THREE.Points(ptGeo, m.points(0x06b6d4, 0.06, 0.7)));

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0, 5),
    cameraTarget: new THREE.Vector3(0, 0, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 1 — ABOUT: Neural network / person-as-node
//  Multi-layer graph — input layer → hidden layers → output
//  Represents: Skills & personality as a neural architecture
// ═══════════════════════════════════════════════════════════════
function buildAboutScene(m: ReturnType<typeof mats>): SceneObjects {
  const objects: THREE.Object3D[] = [];

  // Layers: 4 → 6 → 6 → 4 → 2 nodes, spread across X axis
  const layers = [4, 6, 6, 4, 2];
  const layerX = [-4, -2, 0, 2, 4];
  const nodeWorldPos: THREE.Vector3[][] = [];

  layers.forEach((count, li) => {
    const col: THREE.Vector3[] = [];
    for (let ni = 0; ni < count; ni++) {
      const y = (ni - (count - 1) / 2) * 1.1;
      const pos = new THREE.Vector3(layerX[li]!, y, -2);
      col.push(pos);

      // Draw node dot (small sphere wireframe)
      const node = edgesOf(new THREE.SphereGeometry(0.12, 8, 6), m.cyan(0.7));
      node.position.copy(pos);
      objects.push(node);
    }
    nodeWorldPos.push(col);
  });

  // Draw connections between adjacent layers
  for (let li = 0; li < nodeWorldPos.length - 1; li++) {
    const layerA = nodeWorldPos[li]!;
    const layerB = nodeWorldPos[li + 1]!;
    for (const a of layerA) {
      for (const b of layerB) {
        objects.push(createLine([a, b], m.blue(0.12)));
      }
    }
  }

  // Floating icosahedron cluster (background)
  for (const [x, y, z, r] of [[-5, 2, -5, 0.5], [5, -2, -6, 0.4], [0, -3.5, -4, 0.35]] as const) {
    const ico = edgesOf(new THREE.IcosahedronGeometry(r, 1), m.purple(0.3));
    ico.position.set(x, y, z);
    objects.push(ico);
  }

  // Label: "PERCEPTRON NETWORK" faint text via line art
  const grid = edgesOf(new THREE.PlaneGeometry(12, 8, 12, 8), m.blue(0.06));
  grid.position.set(0, 0, -6);
  grid.rotation.x = -0.1;
  objects.push(grid);

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0, 6),
    cameraTarget: new THREE.Vector3(0, 0, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 2 — WORK: API Architecture / Microservices mesh
//  CLIENT → GATEWAY → [SERVICE A, B, C] → DATABASE
//  Represents: Software architecture & project-level systems
// ═══════════════════════════════════════════════════════════════
function buildWorkScene(m: ReturnType<typeof mats>): SceneObjects {
  const objects: THREE.Object3D[] = [];

  // Nodes as boxes representing services
  const serviceConfigs: [number, number, number, number, number, number][] = [
    // x,  y,   z,    w,  h,   d
    [-5,   0,  -1,  0.8, 0.5, 0.5],  // CLIENT
    [-2.5, 0,  -1,  0.9, 0.6, 0.6],  // API GATEWAY
    [ 0,   1.5, -1, 0.8, 0.5, 0.5],  // SERVICE A
    [ 0,   0,  -1,  0.8, 0.5, 0.5],  // SERVICE B
    [ 0,  -1.5,-1,  0.8, 0.5, 0.5],  // SERVICE C
    [ 2.5, 0,  -1,  1.0, 0.8, 0.8],  // DATABASE
    [ 5,   0,  -1,  0.7, 0.4, 0.4],  // CACHE
  ];

  const nodeCenters: THREE.Vector3[] = serviceConfigs.map(([x, y, z, w, h, d]) => {
    const box = edgesOf(new THREE.BoxGeometry(w, h, d), m.cyan(0.55));
    box.position.set(x, y, z);
    objects.push(box);
    return new THREE.Vector3(x, y, z);
  });

  // API connection arrows (lines with slight offset)
  const connections: [number, number][] = [
    [0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5], [5, 6]
  ];
  for (const [a, b] of connections) {
    const from = nodeCenters[a]!; const to = nodeCenters[b]!;
    objects.push(createLine([from, to], m.blue(0.4)));
    // Small arrowhead dot at midpoint
    const mid = from.clone().lerp(to, 0.7);
    const dot = edgesOf(new THREE.SphereGeometry(0.06, 6, 4), m.cyan(0.8));
    dot.position.copy(mid);
    objects.push(dot);
  }

  // Background: floating data packet particles
  const packetPositions: number[] = [];
  for (let i = 0; i < 80; i++) {
    packetPositions.push((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4 - 3);
  }
  const pktGeo = new THREE.BufferGeometry();
  pktGeo.setAttribute("position", new THREE.Float32BufferAttribute(packetPositions, 3));
  objects.push(new THREE.Points(pktGeo, m.points(0x3b82f6, 0.04, 0.5)));

  // Large cylinder representing the database
  const db = edgesOf(new THREE.CylinderGeometry(0.55, 0.55, 0.7, 20, 3), m.purple(0.45));
  db.position.set(2.5, 0, -1);
  objects.push(db);

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0.5, 7),
    cameraTarget: new THREE.Vector3(0, 0, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 3 — EXPERIENCE: Directed Acyclic Graph (DAG)
//  Algorithm execution trace / process dependency graph
//  Represents: Career progression and task execution flows
// ═══════════════════════════════════════════════════════════════
function buildExperienceScene(m: ReturnType<typeof mats>): SceneObjects {
  const objects: THREE.Object3D[] = [];

  // DAG nodes: top-down execution flow
  const dagNodes: THREE.Vector3[] = [
    new THREE.Vector3(0,  3.5, -2),   // ROOT / START
    new THREE.Vector3(-2.5, 2, -2),   // TASK A
    new THREE.Vector3(2.5, 2, -2),    // TASK B
    new THREE.Vector3(-3.5, 0.5, -2), // SUBTASK A1
    new THREE.Vector3(-1.5, 0.5, -2), // SUBTASK A2
    new THREE.Vector3(1.5, 0.5, -2),  // SUBTASK B1
    new THREE.Vector3(3.5, 0.5, -2),  // SUBTASK B2
    new THREE.Vector3(-2, -1, -2),    // MERGE A
    new THREE.Vector3(2, -1, -2),     // MERGE B
    new THREE.Vector3(0,  -2.5, -2),  // OUTPUT
  ];

  // Draw octahedra for each node
  dagNodes.forEach((pos, i) => {
    const size = i === 0 || i === 9 ? 0.22 : 0.15;
    const mat  = i === 0 || i === 9 ? m.cyan(0.8) : m.blue(0.6);
    const node = edgesOf(new THREE.OctahedronGeometry(size, 0), mat);
    node.position.copy(pos);
    objects.push(node);
  });

  // DAG edges
  const edges: [number, number][] = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
    [3, 7], [4, 7],
    [5, 8], [6, 8],
    [7, 9], [8, 9],
  ];
  for (const [a, b] of edges) {
    objects.push(createLine([dagNodes[a]!, dagNodes[b]!], m.blue(0.35)));
  }

  // Background: rotating wireframe torus (process loop)
  const torus = edgesOf(new THREE.TorusGeometry(1.8, 0.008, 2, 80), m.purple(0.2));
  torus.position.set(4.5, 0, -5);
  objects.push(torus);

  // Timeline bar at back (horizontal progression)
  for (let i = -5; i <= 5; i++) {
    const tick = createLine([
      new THREE.Vector3(i, -3.5, -3),
      new THREE.Vector3(i, -3.8, -3),
    ], m.blue(0.2));
    objects.push(tick);
  }
  objects.push(createLine([
    new THREE.Vector3(-5, -3.65, -3),
    new THREE.Vector3(5, -3.65, -3),
  ], m.blue(0.2)));

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0, 7),
    cameraTarget: new THREE.Vector3(0, 0, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 4 — EDUCATION: Binary Search Tree / Data Structures
//  A perfectly balanced BST, heap, and linked list
//  Represents: Academic algorithms & data structure knowledge
// ═══════════════════════════════════════════════════════════════
function buildEducationScene(m: ReturnType<typeof mats>): SceneObjects {
  const objects: THREE.Object3D[] = [];

  // Binary tree — 4 levels
  const treeNodes: { pos: THREE.Vector3; isLeaf: boolean }[] = [];
  function addNode(x: number, y: number, isLeaf: boolean) {
    treeNodes.push({ pos: new THREE.Vector3(x, y, -2), isLeaf });
  }

  // root
  addNode(0, 3, false);
  // level 2
  addNode(-3, 1.5, false); addNode(3, 1.5, false);
  // level 3
  addNode(-4.5, 0, true);  addNode(-1.5, 0, true);
  addNode(1.5, 0, true);   addNode(4.5, 0, true);
  // level 4
  addNode(-5.2, -1.5, true); addNode(-3.8, -1.5, true);
  addNode(-2.2, -1.5, true); addNode(-0.8, -1.5, true);
  addNode(0.8, -1.5, true);  addNode(2.2, -1.5, true);
  addNode(3.8, -1.5, true);  addNode(5.2, -1.5, true);

  treeNodes.forEach(({ pos, isLeaf }) => {
    const node = edgesOf(
      new THREE.SphereGeometry(isLeaf ? 0.12 : 0.18, 8, 6),
      isLeaf ? m.blue(0.5) : m.cyan(0.75)
    );
    node.position.copy(pos);
    objects.push(node);
  });

  // Edges: parent → children
  const treeEdges: [number, number][] = [
    [0, 1], [0, 2],
    [1, 3], [1, 4], [2, 5], [2, 6],
    [3, 7], [3, 8], [4, 9], [4, 10],
    [5, 11], [5, 12], [6, 13], [6, 14],
  ];
  for (const [a, b] of treeEdges) {
    objects.push(createLine([treeNodes[a]!.pos, treeNodes[b]!.pos], m.blue(0.3)));
  }

  // Linked list strip (background, left of tree)
  const listNodes = [-5.5, -4.0, -2.5, -1.0, 0.5].map(x => new THREE.Vector3(x, -3, -3));
  listNodes.forEach(pos => {
    const n = edgesOf(new THREE.BoxGeometry(0.6, 0.4, 0.3), m.purple(0.4));
    n.position.copy(pos);
    objects.push(n);
  });
  for (let i = 0; i < listNodes.length - 1; i++) {
    objects.push(createLine([listNodes[i]!, listNodes[i + 1]!], m.purple(0.3)));
  }

  // Stack representation (right background)
  for (let i = 0; i < 5; i++) {
    const s = edgesOf(new THREE.BoxGeometry(1.2, 0.35, 0.3), m.green(0.35));
    s.position.set(5.5, -3 + i * 0.45, -3);
    objects.push(s);
  }

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0, 8),
    cameraTarget: new THREE.Vector3(0, 0.5, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 5 — SKILLS: Cloud Infrastructure / Distributed System
//  Multiple server clusters, load balancer, CDN, containers
//  Represents: Technical skill ecosystem and tooling
// ═══════════════════════════════════════════════════════════════
function buildSkillsScene(m: ReturnType<typeof mats>): SceneObjects {
  const objects: THREE.Object3D[] = [];

  // Cloud node cluster layout
  const clusters: { pos: [number, number, number]; size: number; shape: "sphere" | "cube" | "octa" }[] = [
    // Core cloud
    { pos: [0, 0, -1], size: 0.8, shape: "sphere" },
    // Surrounding service nodes
    { pos: [-3.5, 1.5, -1], size: 0.4, shape: "cube" },
    { pos: [3.5, 1.5, -1], size: 0.4, shape: "cube" },
    { pos: [-3.5, -1.5, -1], size: 0.4, shape: "cube" },
    { pos: [3.5, -1.5, -1], size: 0.4, shape: "cube" },
    { pos: [0, 3, -1], size: 0.35, shape: "octa" },
    { pos: [0, -3, -1], size: 0.35, shape: "octa" },
    // DB shards
    { pos: [-5.5, 0, -1], size: 0.3, shape: "cube" },
    { pos: [5.5, 0, -1], size: 0.3, shape: "cube" },
    // Edge nodes
    { pos: [-2, 3, -2], size: 0.22, shape: "sphere" },
    { pos: [2, 3, -2],  size: 0.22, shape: "sphere" },
    { pos: [-2, -3, -2], size: 0.22, shape: "sphere" },
    { pos: [2, -3, -2],  size: 0.22, shape: "sphere" },
  ];

  const clusterCenters: THREE.Vector3[] = clusters.map(({ pos, size, shape }) => {
    const v = new THREE.Vector3(...pos);
    let geo: THREE.BufferGeometry;
    if (shape === "sphere") geo = new THREE.SphereGeometry(size, 12, 8);
    else if (shape === "cube") geo = new THREE.BoxGeometry(size * 1.5, size * 1.5, size * 1.5);
    else geo = new THREE.OctahedronGeometry(size, 0);
    const obj = edgesOf(geo, m.cyan(0.5));
    obj.position.copy(v);
    objects.push(obj);
    return v;
  });

  // Hub-and-spoke connections from core to all clusters
  for (let i = 1; i < clusterCenters.length; i++) {
    objects.push(createLine([clusterCenters[0]!, clusterCenters[i]!], m.blue(0.22)));
  }
  // Ring connections between neighbors
  const ringConnections: [number, number][] = [
    [1, 5], [5, 2], [2, 6], [6, 4], [4, 5], [3, 6], [3, 5],
    [1, 9], [2, 10], [3, 11], [4, 12],
  ];
  for (const [a, b] of ringConnections) {
    if (clusterCenters[a] && clusterCenters[b])
      objects.push(createLine([clusterCenters[a]!, clusterCenters[b]!], m.blue(0.15)));
  }

  // Hexagonal grid background (representing containers/pods)
  for (let row = -3; row <= 3; row++) {
    for (let col = -6; col <= 6; col++) {
      const x = col * 1.2 + (row % 2 === 0 ? 0.6 : 0);
      const y = row * 1.0;
      const hex = edgesOf(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 6), m.blue(0.05));
      hex.position.set(x, y, -6);
      objects.push(hex);
    }
  }

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0, 8),
    cameraTarget: new THREE.Vector3(0, 0, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  SCENE 6 — CONTACT: Handshake / Connection Protocol
//  TCP SYN → SYN-ACK → ACK + signal waves
//  Represents: Establishing a network connection / reaching out
// ═══════════════════════════════════════════════════════════════
function buildContactScene(m: ReturnType<typeof mats>): SceneObjects {
  const objects: THREE.Object3D[] = [];

  // Two endpoint nodes (client + server)
  const clientPos = new THREE.Vector3(-4, 0, -1);
  const serverPos = new THREE.Vector3(4, 0, -1);

  const client = edgesOf(new THREE.BoxGeometry(1.2, 0.8, 0.8), m.cyan(0.6));
  client.position.copy(clientPos);
  objects.push(client);

  const server = edgesOf(new THREE.CylinderGeometry(0.5, 0.5, 1.0, 16, 3), m.cyan(0.6));
  server.position.copy(serverPos);
  objects.push(server);

  // Connection line between them
  objects.push(createLine([clientPos, serverPos], m.blue(0.5)));

  // SYN / SYN-ACK / ACK packet dots along the line
  for (const t of [0.25, 0.5, 0.75]) {
    const pkt = edgesOf(new THREE.SphereGeometry(0.1, 6, 4),
      new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.9 }));
    pkt.position.copy(clientPos.clone().lerp(serverPos, t));
    objects.push(pkt);
  }

  // Concentric signal wave rings emanating from both endpoints
  for (const center of [clientPos, serverPos]) {
    for (const r of [0.8, 1.4, 2.0, 2.6]) {
      const ring = edgesOf(new THREE.TorusGeometry(r, 0.008, 2, 60),
        new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.12 + 0.04 * (3 - r) }));
      ring.position.copy(center);
      ring.rotation.x = Math.PI / 2;
      objects.push(ring);
    }
  }

  // Floating envelopes (message icons) as wireframe cubes
  const envelopePositions: [number, number, number][] = [
    [-1.5, 2, -2], [0, 2.5, -3], [1.5, 2, -2],
    [-2, -2, -3],  [0, -2.5, -2], [2, -2, -2],
  ];
  for (const [x, y, z] of envelopePositions) {
    const env = edgesOf(new THREE.BoxGeometry(0.5, 0.35, 0.05), m.purple(0.4));
    env.position.set(x, y, z);
    objects.push(env);
  }

  // Background orbital sphere (represents the internet/network)
  const globe = edgesOf(new THREE.SphereGeometry(3.5, 18, 10),
    new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 }));
  globe.position.set(0, 0, -4);
  objects.push(globe);

  return {
    objects,
    cameraPos: new THREE.Vector3(0, 0, 7),
    cameraTarget: new THREE.Vector3(0, 0, 0),
  };
}

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export function TechnicalBackground() {
  const mountRef   = useRef<HTMLDivElement>(null);
  const sceneRef   = useRef<THREE.Scene | null>(null);
  const activeObjs = useRef<THREE.Object3D[]>([]);
  const camRef     = useRef<{ pos: THREE.Vector3; target: THREE.Vector3 } | null>(null);
  const transRef   = useRef<{
    fromObj: THREE.Object3D[]; toObj: THREE.Object3D[];
    progress: number; duration: number;
  } | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const isMobile = window.innerWidth < 768;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 5);

    const m = mats();

    // ── Build all section scenes ──────────────────────────────
    const sectionScenes: Record<SectionId, SceneObjects> = {
      top:        buildHeroScene(m, isMobile),
      about:      buildAboutScene(m),
      work:       buildWorkScene(m),
      experience: buildExperienceScene(m),
      education:  buildEducationScene(m),
      skills:     buildSkillsScene(m),
      contact:    buildContactScene(m),
      other:      buildHeroScene(m, isMobile),
    };

    // Add ALL objects to scene but hidden initially
    for (const sceneData of Object.values(sectionScenes)) {
      for (const obj of sceneData.objects) {
        obj.visible = false;
        scene.add(obj);
      }
    }

    // ── Grid helper ───────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(30, 30, 0x1e3a5f, 0x0f1f33);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.15;
    gridHelper.position.set(0, -5, -5);
    scene.add(gridHelper);

    // ── Show initial section ──────────────────────────────────
    let currentSection: SectionId = "top";
    const showScene = (id: SectionId, animate: boolean) => {
      if (id === currentSection && animate) return;

      const outgoing = sectionScenes[currentSection].objects;
      const incoming = sectionScenes[id].objects;
      const sceneData = sectionScenes[id];

      if (!animate || reducedMotion) {
        // Instant switch
        outgoing.forEach(o => { o.visible = false; });
        incoming.forEach(o => { o.visible = true; });
        camera.position.copy(sceneData.cameraPos);
        camRef.current = { pos: sceneData.cameraPos.clone(), target: sceneData.cameraTarget.clone() };
      } else {
        // Start fade transition
        transRef.current = {
          fromObj: outgoing,
          toObj: incoming,
          progress: 0,
          duration: 80, // frames ≈ 1.3s at 60fps
        };
        incoming.forEach(o => { o.visible = true; });
        camRef.current = { pos: sceneData.cameraPos.clone(), target: sceneData.cameraTarget.clone() };
      }
      currentSection = id;
    };

    showScene("top", false);

    // ── IntersectionObserver to detect active section ─────────
    const sectionIds: SectionId[] = ["top", "about", "work", "experience", "education", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              showScene(id, true);
            }
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    }

    // ── Mouse parallax ────────────────────────────────────────
    let mouseX = 0, mouseY = 0, targetMX = 0, targetMY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();
    const camCurrentPos = camera.position.clone();
    const camCurrentLook = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Handle fade transition between sections
      if (transRef.current) {
        const tr = transRef.current;
        tr.progress++;
        const p = Math.min(tr.progress / tr.duration, 1);
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

        // Fade out old, fade in new via material opacity
        for (const obj of tr.fromObj) {
          obj.traverse(child => {
            if ((child as THREE.LineSegments).material) {
              const mat = (child as THREE.LineSegments).material as THREE.LineBasicMaterial;
              if (mat.transparent) mat.opacity = Math.max(0, mat.opacity - 0.025);
            }
          });
        }
        // Hide entirely when faded
        if (p >= 1) {
          tr.fromObj.forEach(o => { o.visible = false; });
          transRef.current = null;
        }
        // Unused: eased for camera lerp
        void eased;
      }

      if (!reducedMotion) {
        // Hero objects: sphere + ring rotations
        const heroObjs = sectionScenes["top"].objects;
        if (heroObjs[0]?.visible) {
          heroObjs[0].rotation.y = t * 0.12;
          heroObjs[0].rotation.x = t * 0.04;
        }
        if (heroObjs[1]?.visible) {
          heroObjs[1].rotation.y = -t * 0.08;
          heroObjs[1].rotation.z =  t * 0.06;
        }
        if (heroObjs[2]?.visible) heroObjs[2].rotation.z = t * 0.18;
        if (heroObjs[3]?.visible) heroObjs[3].rotation.x = Math.PI / 3 + t * 0.14;
        if (heroObjs[4]?.visible) heroObjs[4].rotation.y = Math.PI / 4 + t * 0.1;
        if (heroObjs[7]?.visible) { heroObjs[7].rotation.y = t * 0.015; }
        if (heroObjs[8]?.visible) { heroObjs[8].rotation.y = t * 0.015; }

        // About: neural net nodes — gentle swing
        const aboutObjs = sectionScenes["about"].objects;
        if (aboutObjs[0]?.visible) {
          for (const obj of aboutObjs) {
            obj.rotation.y = Math.sin(t * 0.3) * 0.08;
          }
        }

        // Work: data packets (rotate whole scene slightly)
        const workObjs = sectionScenes["work"].objects;
        if (workObjs[0]?.visible) {
          for (const obj of workObjs) {
            obj.rotation.y = Math.sin(t * 0.2) * 0.05;
          }
        }

        // Experience: DAG torus spins
        const expObjs = sectionScenes["experience"].objects;
        const torusObj = expObjs[expObjs.length - 3];
        if (torusObj?.visible) {
          torusObj.rotation.z = t * 0.15;
        }

        // Education: tree sways slightly
        const eduObjs = sectionScenes["education"].objects;
        if (eduObjs[0]?.visible) {
          for (const obj of eduObjs.slice(0, 15)) {
            obj.rotation.y = Math.sin(t * 0.25) * 0.04;
          }
        }

        // Skills: cloud rotates hex grid
        const skillObjs = sectionScenes["skills"].objects;
        if (skillObjs[0]?.visible) {
          skillObjs[0].rotation.y = t * 0.08;
          for (let i = 9; i < skillObjs.length; i++) {
            skillObjs[i]?.rotation && (skillObjs[i]!.rotation.y = t * 0.05 + i * 0.1);
          }
        }

        // Contact: signal rings pulse outward (scale oscillation)
        const contactObjs = sectionScenes["contact"].objects;
        if (contactObjs[0]?.visible) {
          for (let i = 3; i < 11; i++) {
            if (contactObjs[i]) {
              const pulse = 1 + Math.sin(t * 1.5 + i * 0.5) * 0.05;
              contactObjs[i]!.scale.set(pulse, pulse, pulse);
            }
          }
        }

        // Camera parallax from mouse
        mouseX += (targetMX - mouseX) * 0.04;
        mouseY += (targetMY - mouseY) * 0.04;

        // Smooth camera position towards target
        const tgt = camRef.current?.pos ?? new THREE.Vector3(0, 0, 5);
        const lookTgt = camRef.current?.target ?? new THREE.Vector3(0, 0, 0);
        camCurrentPos.lerp(tgt, 0.025);
        camCurrentLook.lerp(lookTgt, 0.025);

        camera.position.x = camCurrentPos.x + mouseX * 0.4;
        camera.position.y = camCurrentPos.y + mouseY * 0.25;
        camera.position.z = camCurrentPos.z;
        camera.lookAt(camCurrentLook);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      observers.forEach(obs => obs.disconnect());
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return (
    <>
      {/* Three.js canvas mount */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* SVG Circuit Blueprint schematic — always present, very low opacity */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ opacity: 0.055 }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* CAD ruler ticks along edges */}
          <g stroke="#3B82F6" strokeWidth="0.8" opacity="0.7">
            {Array.from({ length: 29 }, (_, i) => (
              <line key={`t${i}`} x1={50 * i} y1="0" x2={50 * i} y2={i % 5 === 0 ? 24 : 12} />
            ))}
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`l${i}`} x1="0" y1={50 * i} x2={i % 5 === 0 ? 24 : 12} y2={50 * i} />
            ))}
            {Array.from({ length: 29 }, (_, i) => (
              <line key={`b${i}`} x1={50 * i} y1="900" x2={50 * i} y2={i % 5 === 0 ? 876 : 888} />
            ))}
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`r${i}`} x1="1440" y1={50 * i} x2={i % 5 === 0 ? 1416 : 1428} y2={50 * i} />
            ))}
          </g>

          {/* Coordinate tick labels */}
          <g fill="#3B82F6" fontSize="6" fontFamily="monospace" opacity="0.6">
            {[50, 100, 200, 300, 500].map(v => (
              <text key={`tx${v}`} x={v + 2} y="20">{v}</text>
            ))}
            {[50, 100, 200, 300].map(v => (
              <text key={`ty${v}`} x="4" y={v + 8}>{v}</text>
            ))}
          </g>

          {/* Circuit traces — horizontal bus lines */}
          <g stroke="#3B82F6" strokeWidth="1">
            <line x1="0" y1="200" x2="400" y2="200" />
            <line x1="1040" y1="200" x2="1440" y2="200" />
            <line x1="0" y1="700" x2="400" y2="700" />
            <line x1="1040" y1="700" x2="1440" y2="700" />
            <line x1="100" y1="0" x2="100" y2="380" />
            <line x1="100" y1="700" x2="100" y2="900" />
            <line x1="1340" y1="0" x2="1340" y2="380" />
            <line x1="1340" y1="700" x2="1340" y2="900" />
          </g>

          {/* Title block — bottom right */}
          <g stroke="#3B82F6" strokeWidth="0.8">
            <rect x="1180" y="838" width="254" height="56" />
            <line x1="1180" y1="854" x2="1434" y2="854" />
            <line x1="1310" y1="854" x2="1310" y2="894" />
            <text x="1195" y="850" fontSize="6" fill="#3B82F6" fontFamily="monospace">CS ARCHITECTURE DIAGRAM</text>
            <text x="1195" y="866" fontSize="5.5" fill="#3B82F6" fontFamily="monospace">Rev.2025 | Scale N.T.S.</text>
            <text x="1195" y="880" fontSize="5.5" fill="#3B82F6" fontFamily="monospace">SYS_ARCH-001</text>
            <text x="1320" y="866" fontSize="5.5" fill="#06B6D4" fontFamily="monospace">NODE: ACTIVE</text>
            <text x="1320" y="880" fontSize="5.5" fill="#06B6D4" fontFamily="monospace">STATUS: ONLINE</text>
          </g>

          {/* Binary / hex data text */}
          <g fill="#3B82F6" fontSize="5.5" fontFamily="monospace" opacity="0.2">
            <text x="440" y="30">0xA3F2 0x00FF 0xD4C1 0x8B3E  SYN ACK PSH RST</text>
            <text x="900" y="878">HTTP/2 GET /api/v1/nodes 200 OK  latency:4.7ms</text>
          </g>
        </svg>
      </div>

      {/* Technical HUD labels */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-6 right-6 font-mono text-[9px] text-[#3B82F6] opacity-20 tracking-[0.2em] leading-5">
          <div>NODE_01 // 192.168.0.1</div>
          <div>STATUS: ACTIVE</div>
          <div>PKT_SENT: 0x4A2F</div>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-[#06B6D4] opacity-20 tracking-[0.2em] leading-5">
          <div>SYS_ARCH v2.0.25</div>
          <div>QUEUE: IDLE</div>
        </div>
      </div>
    </>
  );
}
