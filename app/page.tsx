'use client'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Areas/Carousel'
import './globals.css'
import MainHub from '@/components/Areas/MainHub'
import Footer from '@/components/Areas/Footer'
import MostRecent from '@/components/Areas/MostRecent'
import React from 'react'
import SuperiorMenu from '@/components/Areas/SuperiorMenu'

const MockSlides = [
  {
    title: 'Culturas do Systempunk',
    description:
      'No universo de Systempunk, culturas evoluem e colidem, moldadas pela tecnologia, pelas crenças e pelo caos de cada era. De civilizações primitivas a impérios cibernéticos, cada sociedade carrega sua própria identidade, suas lendas e sua luta pelo futuro. Quer entender como esses mundos se entrelaçam e impactam o destino do universo? Explore mais e descubra!',
    image: 'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg'
  },
  {
    title: 'Estrange Bond',
    description:
      'E se a grandiosidade de Dungeons & Dragons encontrasse a\n' +
      '              profundidade tecnológica e cultural do Systempunk? Neste artigo,\n' +
      '              exploramos como misturar eras, artefatos e temáticas punk ao\n' +
      '              universo de fantasia clássica, criando aventuras únicas e\n' +
      '              imprevisíveis. Quer descobrir como trazer esse multiverso para sua\n' +
      '              mesa? Veja nossos conteudos Homebrew',
    image: 'https://i.redd.it/tc0aqpv92pn21.jpg'
  },
  {
    title: 'Explore o Universo Systempunk',
    description:
      'O Systempunk vai muito além de um conceito — é um universo vivo,\n' +
      '              repleto de histórias, jogos e mundos interconectados. Do suspense\n' +
      '              de As Sombras do Relógio à ação intensa de Monocrom, cada projeto\n' +
      '              mergulha em uma era única, cheia de mistérios e revoluções\n' +
      '              tecnológicas. Quer descobrir mais e se aprofundar nesse\n' +
      '              multiverso? Explore nossos projetos e escolha seu próximo destino!',
    image: 'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg'
  },
  {
    title: 'O Passado e o Futuro Colidem',
    description:
      ' No Systempunk, cada era conta uma história de ascensão e queda,\n' +
      '              onde a tecnologia e a cultura se entrelaçam em um ciclo sem fim.\n' +
      '              De reinos arcaicos a civilizações movidas por máquinas\n' +
      '              conscientes, a linha entre magia e ciência se dissolve, criando\n' +
      '              mundos repletos de mistério, exploração e revolução.',
    image: 'https://images7.alphacoders.com/878/878663.jpg'
  },
  {
    title: 'Escolhas que Moldam Universos',
    description:
      ' Aqui, não existem apenas heróis ou vilões, mas sociedades inteiras\n' +
      '              lutando para sobreviver e evoluir. Governos colapsam, corporações\n' +
      '              dominam, conhecimentos ancestrais ressurgem – e cada decisão pode\n' +
      '              alterar o curso da história. Você está pronto para mergulhar nos\n' +
      '              múltiplos caminhos do Systempunk?',
    image:
      'https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg'
  },
  {
    title: 'Seu Portal para Novas Aventuras',
    description:
      'Quer desvendar os segredos ocultos nas sombras do tempo? Construir\n' +
      '              sua própria narrativa em meio ao caos das eras? O Systempunk Forum\n' +
      '              é o ponto de encontro para aqueles que desafiam o destino e\n' +
      '              exploram o desconhecido. Entre e expanda os limites do seu\n' +
      '              universo!',
    image: 'https://da.se/app/uploads/2015/09/simon-december1994.jpg'
  }
]
const MockCards = [
  {
    id: 1,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://i.redd.it/tc0aqpv92pn21.jpg',
    link: '#',
    tags: [{ name: 'Lorem Ipsum', type: 'Lorem Ipsum' }]
  },
  {
    id: 2,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://i.redd.it/tc0aqpv92pn21.jpg',
    link: '#',
    tags: [{ name: 'Lorem Ipsum', type: 'Lorem Ipsum' }]
  }
]
const MockMainHub = {
  update: {
    title: 'Lorem Ipsum',
    Date: '02/2025',
    MadeBy: 'Lorem Ipsum',
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    Content: `<p class='sectionTitle'>Bem-vindo ao Nexus do Systempunk!</p>
      <p class='sectionContent'>
        O tempo se curva, as eras se entrelaçam e a revolução nunca para.
        Systempunk Forum nasce como o primeiro grande espaço para explorar,
        discutir e expandir os mistérios e possibilidades deste universo em
        constante evolução.
      </p>
      <p class='sectionContent'>
        Seja você um viajante curioso, um criador de mundos ou um arquivista do
        caos, este é o lugar onde as peças do passado e do futuro se conectam.
        Aqui, cada ideia é uma fagulha, cada debate, uma explosão de
        possibilidades. Estamos abrindo as portas para um projeto que crescerá
        com vocês, os pioneiros deste novo mundo.
      </p>
      <hr class='line'></hr>
      <p class='sectionTitle'>🔥 O que você encontrará por aqui?</p>
      <p class='sectionContent'>
        <ul class='sectionList'>
          <li class='sectionItem'>
            <p class='sectionItemTitle'>
              🌍 Enciclopédia Viva do Systempunk
            </p>
            <p class='sectionItemContent'>
              Cada era, cada facção, cada tecnologia tem sua história – e agora,
              todas estão reunidas para serem exploradas, discutidas e
              aprofundadas.
            </p>
          </li>
          <li class='sectionItem'>
            <p class='sectionItemTitle'>🎲 Jogos, RPGs e Expansões</p>
            <p class='sectionItemContent'>
              Desde a criação de campanhas até adaptações de Systempunk para
              D&D, Pathfinder e outros sistemas, aqui é o espaço para quem quer
              transformar essa mitologia em uma experiência jogável.
            </p>
          </li>
          <li class='sectionItem'>
            <p class='sectionItemTitle'>
              🎮 Desenvolvimento de Jogos e Multimídia
            </p>
            <p class='sectionItemContent'>
              O universo de Systempunk já dá vida a projetos como Tower of
              Fallmora, NOVA, Void e Monocrom. Quer participar, compartilhar
              ideias ou simplesmente acompanhar as novidades? Esta é sua chance
              de fazer parte da construção desse legado.
            </p>
          </li>
          <li class='sectionItem'>
            <p class='sectionItemTitle'>
              🛠️ Fórum de Discussão e Teorias
            </p>
            <p class='sectionItemContent'>
              Detalhes ocultos, conexões entre eras, conspirações tecnológicas e
              visões do futuro – toda boa história nasce da curiosidade. Quais
              são suas teorias sobre o Systempunk?
            </p>
          </li>
        </ul>
      </p>
      <hr class='line'></hr>
      <p class='sectionTitle'>
        🚀 Próximos Passos – O Futuro Está Sendo Escrito
      </p>
      <p class='sectionContent'>
        Este é apenas o início. Estamos preparando novas funcionalidades,
        espaços para colaboração e conteúdos exclusivos para expandir ainda mais
        o alcance deste universo. Aqui, a evolução nunca cessa.
      </p>
      <p class='sectionContent'>
        💬 Junte-se à conversa, compartilhe ideias e construa conosco o futuro
        do Systempunk! A revolução começou. Você está pronto?
      </p>`
  },
  trends: [
    {
      title: 'Lorem Ipsum',
      Date: '02/2025',
      MadeBy: 'Lorem Ipsum',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://i.redd.it/tc0aqpv92pn21.jpg',
      link: '#'
    },
    {
      title: 'Lorem Ipsum',
      Date: '02/2025',
      MadeBy: 'Lorem Ipsum',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://i.redd.it/tc0aqpv92pn21.jpg',
      link: '#'
    }
  ]
}
export default function Home() {
  return (
    <>
      <SuperiorMenu type={'superior'} hidden={false} />
      <div className={styles.page}>
        <GlobalStyle />
        <Carousel slides={MockSlides} />
        <MostRecent cards={MockCards}></MostRecent>
        <MainHub
          update={MockMainHub.update}
          trends={MockMainHub.trends}
        ></MainHub>
        <Footer></Footer>
      </div>
    </>
  )
}
