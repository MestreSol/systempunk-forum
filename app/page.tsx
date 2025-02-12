'use client'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Areas/Carousel'
import './globals.css'
import MainHub from '@/components/Areas/MainHub'
import Footer from '@/components/Areas/Footer'
import MostRecent from '@/components/Areas/MostRecent'

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

export default function Home() {
  return (
    <div className={styles.page}>
      <GlobalStyle />
      <Carousel slides={MockSlides} />
      <MostRecent></MostRecent>
      <MainHub></MainHub>
      <Footer></Footer>
    </div>
  )
}
