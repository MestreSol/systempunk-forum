'use client'
import 'aframe'
import 'aframe-extras'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import styles from './page.module.css'

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
    contentPreview: string
    link: string
    x: number
    y: number
    z: number
  }

  interface Link {
    source: string
    target: string
  }
  interface GroupMap {
    [key: number]: string
  }

  const [data, setData] = useState<{
    nodes: Node[]
    links: Link[]
    groupMap: GroupMap
  }>({
    nodes: [],
    links: [],
    groupMap: {}
  })
  const fgRef = useRef<any>(null)

  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const getColorByGroup = (group: number) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple']
    return colors[group % colors.length]
  }

  useEffect(() => {
    setData({
      nodes: [
        {
          id: 'Concelho dos mil',
          group: 1,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Concelho%20dos%20mil',
          x: 0,
          y: 0,
          z: 0
        }
      ],
      links: [
        {
          source: 'Concelho dos mil',
          target: 'Concelho dos mil'
        }
      ],
      groupMap: {
        1: 'Conceitos'
      }
    })
  }, [])

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-200)
    }
  }, [data])

  const handleNodeClick = useCallback((node: any) => {
    if (typeof window !== 'undefined') {
      const castedNode = node as Node
      setSelectedNode(castedNode)
      console.log('Node clicked:', castedNode)
      const distance = 40
      const distRatio =
        1 + distance / Math.hypot(castedNode.x, castedNode.y, castedNode.z)

      fgRef.current.cameraPosition(
        {
          x: castedNode.x * distRatio,
          y: castedNode.y * distRatio,
          z: castedNode.z * distRatio
        }, // new position
        castedNode, // lookAt ({ x, y, z })
        3000 // ms transition duration
      )
    }
  }, [])

  const handleNodeClose = useCallback(() => {
    setSelectedNode(null)
  }, [])
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '80vw', height: '100vh' }}>
        <ForceGraph3D
          ref={fgRef}
          graphData={data}
          nodeAutoColorBy="group"
          onNodeClick={handleNodeClick}
          nodeThreeObject={(node: any) => {
            const castedNode = node as Node
            const group = new THREE.Group()

            // Cria a bolinha colorida
            const geometry = new THREE.SphereGeometry(5) // Diminui o tamanho da bolinha
            const material = new THREE.MeshBasicMaterial({
              color: getColorByGroup(castedNode.group)
            })
            const sphere = new THREE.Mesh(geometry, material)
            group.add(sphere)

            // Cria o texto abaixo da bolinha com fundo
            const sprite = new SpriteText(castedNode.id)
            sprite.color = 'white'
            sprite.backgroundColor = 'rgba(0, 0, 0, 0.5)' // Adiciona fundo ao texto
            sprite.textHeight = 4 // Diminui o tamanho do texto
            sprite.position.set(0, -10, 0) // Ajusta a posição do texto
            group.add(sprite)

            return group
          }}
        />
      </div>
      {selectedNode && (
        <div className={styles.modal}>
          <h2 className={styles.contentTitle}>{selectedNode.id}</h2>
          <button onClick={handleNodeClose} className={styles.closeButton}>
            X
          </button>
          <p>Group: {selectedNode.group}</p>
          <p className={styles.content}>{selectedNode.contentPreview}</p>
        </div>
      )}
    </div>
  )
}
