import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import style from './style.module.css'

export default function Carousel() {
  useEffect(() => {
    const slider = document.querySelector('#slider')

    function activate(e: Event) {
      const items = document.querySelectorAll('#item')
      if (!slider) return
      if ((e.target as Element).matches('#next')) {
        slider.append(items[0])
      }
      if ((e.target as Element).matches('#prev')) {
        slider.prepend(items[items.length - 1])
      }
    }

    document.addEventListener('click', activate, false)
  }, [])
  return (
    <main className={style.container}>
      <ul className={style.slider} id={'slider'}>
        <li
          className={style.item}
          style={{
            backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')`
          }}
          id={'item'}
        >
          <div className={style.content}>
            <h2 className={style.title}>Culturas do Systempunk</h2>
            <p className={style.description}>
              {' '}
              No universo de Systempunk, culturas evoluem e colidem, moldadas
              pela tecnologia, pelas crenças e pelo caos de cada era. De
              civilizações primitivas a impérios cibernéticos, cada sociedade
              carrega sua própria identidade, suas lendas e sua luta pelo
              futuro. Quer entender como esses mundos se entrelaçam e impactam o
              destino do universo? Explore mais e descubra!{' '}
            </p>
            <a href={'article?id=1'}>Read More</a>
          </div>
        </li>
        <li
          className={style.item}
          style={{
            backgroundImage: `url('https://i.redd.it/tc0aqpv92pn21.jpg')`
          }}
          id={'item'}
        >
          <div className={style.content}>
            <h2 className={style.title}>Estrange Bond</h2>
            <p className={style.description}>
              {' '}
              E se a grandiosidade de Dungeons & Dragons encontrasse a
              profundidade tecnológica e cultural do Systempunk? Neste artigo,
              exploramos como misturar eras, artefatos e temáticas punk ao
              universo de fantasia clássica, criando aventuras únicas e
              imprevisíveis. Quer descobrir como trazer esse multiverso para sua
              mesa? Veja nossos conteudos Homebrew{' '}
            </p>
            <a href={'/universo/homebrew'}>Read More</a>
          </div>
        </li>
        <li
          className={style.item}
          style={{
            backgroundImage: `url('https://wharferj.files.wordpress.com/2015/11/bio_north.jpg')`
          }}
          id={'item'}
        >
          <div className={style.content}>
            <h2 className={style.title}>Explore o Universo Systempunk</h2>
            <p className={style.description}>
              {' '}
              O Systempunk vai muito além de um conceito — é um universo vivo,
              repleto de histórias, jogos e mundos interconectados. Do suspense
              de As Sombras do Relógio à ação intensa de Monocrom, cada projeto
              mergulha em uma era única, cheia de mistérios e revoluções
              tecnológicas. Quer descobrir mais e se aprofundar nesse
              multiverso? Explore nossos projetos e escolha seu próximo destino!{' '}
            </p>
            <a>Read More</a>
          </div>
        </li>
        <li
          className={style.item}
          style={{
            backgroundImage: `url('https://images7.alphacoders.com/878/878663.jpg')`
          }}
          id={'item'}
        >
          <div className={style.content}>
            <h2 className={style.title}>O Passado e o Futuro Colidem</h2>
            <p className={style.description}>
              No Systempunk, cada era conta uma história de ascensão e queda,
              onde a tecnologia e a cultura se entrelaçam em um ciclo sem fim.
              De reinos arcaicos a civilizações movidas por máquinas
              conscientes, a linha entre magia e ciência se dissolve, criando
              mundos repletos de mistério, exploração e revolução.
            </p>
            <a>Read More</a>
          </div>
        </li>
        <li
          className={style.item}
          style={{
            backgroundImage: `url('https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg')`
          }}
          id={'item'}
        >
          <div className={style.content}>
            <h2 className={style.title}>Escolhas que Moldam Universos</h2>
            <p className={style.description}>
              Aqui, não existem apenas heróis ou vilões, mas sociedades inteiras
              lutando para sobreviver e evoluir. Governos colapsam, corporações
              dominam, conhecimentos ancestrais ressurgem – e cada decisão pode
              alterar o curso da história. Você está pronto para mergulhar nos
              múltiplos caminhos do Systempunk?
            </p>
            <a>Read More</a>
          </div>
        </li>
        <li
          className={style.item}
          style={{
            backgroundImage: `url('https://da.se/app/uploads/2015/09/simon-december1994.jpg')`
          }}
          id={'item'}
        >
          <div className={style.content}>
            <h2 className={style.title}>Seu Portal para Novas Aventuras</h2>
            <p className={style.description}>
              {' '}
              Quer desvendar os segredos ocultos nas sombras do tempo? Construir
              sua própria narrativa em meio ao caos das eras? O Systempunk Forum
              é o ponto de encontro para aqueles que desafiam o destino e
              exploram o desconhecido. Entre e expanda os limites do seu
              universo!{' '}
            </p>
            <a>Read More</a>
          </div>
        </li>
      </ul>
      <nav className={style.nav}>
        <div className={style.btn} data-name="arrow-back-outline" id={'prev'}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div
          className={style.btn}
          data-name="arrow-forward-outline"
          id={'next'}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </nav>
      <script
        type="module"
        async
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        async
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </main>
  )
}
