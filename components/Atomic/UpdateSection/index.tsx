import React from 'react'
import style from './style.module.css'

const UpdateSection = () => {
  return (
    <div className={style.updateContent}>
      <p className={style.sectionTitle}>Bem-vindo ao Nexus do Systempunk!</p>
      <p className={style.sectionContent}>
        O tempo se curva, as eras se entrelaçam e a revolução nunca para.
        Systempunk Forum nasce como o primeiro grande espaço para explorar,
        discutir e expandir os mistérios e possibilidades deste universo em
        constante evolução.
      </p>
      <p className={style.sectionContent}>
        Seja você um viajante curioso, um criador de mundos ou um arquivista do
        caos, este é o lugar onde as peças do passado e do futuro se conectam.
        Aqui, cada ideia é uma fagulha, cada debate, uma explosão de
        possibilidades. Estamos abrindo as portas para um projeto que crescerá
        com vocês, os pioneiros deste novo mundo.
      </p>
      <hr className={style.line}></hr>
      <p className={style.sectionTitle}>🔥 O que você encontrará por aqui?</p>
      <p className={style.sectionContent}>
        <ul className={style.sectionList}>
          <li className={style.sectionItem}>
            <p className={style.sectionItemTitle}>
              🌍 Enciclopédia Viva do Systempunk
            </p>
            <p className={style.sectionItemContent}>
              Cada era, cada facção, cada tecnologia tem sua história – e agora,
              todas estão reunidas para serem exploradas, discutidas e
              aprofundadas.
            </p>
          </li>
          <li className={style.sectionItem}>
            <p className={style.sectionItemTitle}>🎲 Jogos, RPGs e Expansões</p>
            <p className={style.sectionItemContent}>
              Desde a criação de campanhas até adaptações de Systempunk para
              D&D, Pathfinder e outros sistemas, aqui é o espaço para quem quer
              transformar essa mitologia em uma experiência jogável.
            </p>
          </li>
          <li className={style.sectionItem}>
            <p className={style.sectionItemTitle}>
              🎮 Desenvolvimento de Jogos e Multimídia
            </p>
            <p className={style.sectionItemContent}>
              O universo de Systempunk já dá vida a projetos como Tower of
              Fallmora, NOVA, Void e Monocrom. Quer participar, compartilhar
              ideias ou simplesmente acompanhar as novidades? Esta é sua chance
              de fazer parte da construção desse legado.
            </p>
          </li>
          <li className={style.sectionItem}>
            <p className={style.sectionItemTitle}>
              🛠️ Fórum de Discussão e Teorias
            </p>
            <p className={style.sectionItemContent}>
              Detalhes ocultos, conexões entre eras, conspirações tecnológicas e
              visões do futuro – toda boa história nasce da curiosidade. Quais
              são suas teorias sobre o Systempunk?
            </p>
          </li>
        </ul>
      </p>
      <hr className={style.line}></hr>
      <p className={style.sectionTitle}>
        🚀 Próximos Passos – O Futuro Está Sendo Escrito
      </p>
      <p className={style.sectionContent}>
        Este é apenas o início. Estamos preparando novas funcionalidades,
        espaços para colaboração e conteúdos exclusivos para expandir ainda mais
        o alcance deste universo. Aqui, a evolução nunca cessa.
      </p>
      <p className={style.sectionContent}>
        💬 Junte-se à conversa, compartilhe ideias e construa conosco o futuro
        do Systempunk! A revolução começou. Você está pronto?
      </p>
    </div>
  )
}

export default UpdateSection
