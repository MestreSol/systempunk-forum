'use client'
import 'aframe'
import 'aframe-extras'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

// Carrega o ForceGraph3D sem SSR
const ForceGraph3D = dynamic(
  () => import('react-force-graph').then((mod) => mod.ForceGraph3D),
  {
    ssr: false
  }
)

export default function UniversoPage() {
  interface Node {
    id: string
    group: number
  }

  interface Link {
    source: string
    target: string
  }

  const [data, setData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: []
  })
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const fgRef = useRef<any>()

  const getColorByGroup = (group: number) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple']
    return colors[group % colors.length]
  }

  useEffect(() => {
    // Simula carregamento de dados
    setData({
      nodes: [
        { id: 'Node 1', group: 1 },
        { id: 'Node 2', group: 2 },
        { id: 'Node 3', group: 3 }
      ],
      links: [
        { source: 'Node 1', target: 'Node 2' },
        { source: 'Node 2', target: 'Node 3' }
      ]
    })
  }, [])

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node)
    console.log('Node clicked:', node)
    const distance = 40
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000 // ms transition duration
    )
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '80vw', height: '100vh' }}>
        <ForceGraph3D
          ref={fgRef}
          graphData={data}
          nodeAutoColorBy="group"
          onNodeClick={handleNodeClick}
          nodeThreeObject={(node: Node) => {
            const group = new THREE.Group()

            // Cria a bolinha colorida
            const geometry = new THREE.SphereGeometry(5)
            const material = new THREE.MeshBasicMaterial({
              color: getColorByGroup(node.group)
            })
            const sphere = new THREE.Mesh(geometry, material)
            group.add(sphere)

            // Cria o texto abaixo da bolinha
            const sprite = new SpriteText(node.id)
            sprite.color = 'white'
            sprite.textHeight = 8
            sprite.position.set(0, -10, 0)
            group.add(sprite)

            return group
          }}
        />
      </div>
      {selectedNode && (
        <div
          style={{
            width: '20vw',
            padding: '20px',
            backgroundColor: '#f0f0f0',
            zIndex: 9999
          }}
        >
          <h2>Node Details</h2>
          <p>ID: {selectedNode.id}</p>
          <p>Group: {selectedNode.group}</p>
          {/* Adicione mais informações conforme necessário */}
        </div>
      )}
    </div>
  )
}
