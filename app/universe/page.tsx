'use client'
import 'aframe'
import 'aframe-extras'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import styles from './page.module.css'

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
    contentPreview: string
    link: string
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
    groupMap: GroupMap[]
  }>({
    nodes: [],
    links: [],
    groupMap: []
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
          link: '/notes/Concelho%20dos%20mil'
        },
        {
          id: 'Entropia',
          group: 1,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Entropia'
        },
        {
          id: 'Essências de Minerva',
          group: 1,
          contentPreview:
            'Essência primordial que controla as Singularidades e que é retirada das Divindades quando caem no exilio',
          link: '/notes/Ess%C3%AAncias%20de%20Minerva'
        },
        {
          id: 'Eterna',
          group: 1,
          contentPreview:
            'Base do Ignitário, local onde a chama da existencia tripida.',
          link: '/notes/Eterna'
        },
        {
          id: 'Fio da Ordem',
          group: 1,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Fio%20da%20Ordem'
        },
        {
          id: 'Caos',
          group: 2,
          contentPreview:
            '!Caos.webp O conceito de **Caos** desdobra-se como uma dança cósmica fascinante, onde a **Harmonia** e a imprevisibilidade entrelaçam-se em uma sinfonia de complexidade exuberante. Nesse espaço primordial, forças aparentemente contraditórias colidem e convergem, dando origem a novos padrões e possibilidades ocultas sob a superfície da desordem. Na essência mais profunda do **Caos**, reside um poder latente – não a mera ausência de estrutura, mas um ventre fértil para a criação. Em sua fluidez incessante, o caos manifesta as leis invisíveis do universo de formas inesperadas, revelando-se não como mero descontrole, mas como o motor oculto da inovação e da transformação. No pulsar vibrante do **Caos**, padrões emergem e se dissolvem como constelações efêmeras no véu negro da noite, iluminando territórios inexplorados do conhecimento. É nesse fluxo dinâmico entre ordem e desordem que se desvela a verdadeira natureza da existência: um equilíbrio instável e encantador, onde a criação e a destruição coexistem em um ciclo eterno. Essa força primordial habita os recônditos mais profundos de **Eterna**, sendo um dos aspectos de Fringilla, uma das três divindades primordiais  desafiando as fronteiras do entendimento humano. É a chama indomável que instiga a mente investigativa, um convite perpétuo à exploração dos mistérios que permeiam a existência. Através de sua imprevisibilidade, o **Caos** não apenas assombra, mas também inspira – impulsionando a humanidade a romper as amarras do convencional e aventurar-se nos territórios inexplorados do possível. Assim, o **Caos** se manifesta como um catalisador da criatividade, o estopim de revoluções intelectuais e artísticas. É nele que germinam ideias disruptivas e florescem inovações capazes de reconfigurar os alicerces da realidade. O tecido caótico do universo é um campo aberto de oportunidades, onde a ruptura do previsível dá origem a novas formas de ser e pensar. Seus desafios não são meros obstáculos, mas convites à transcendência. Como uma fagulha ardente, o **Caos** incendeia as trilhas da mesmice, promovendo o renascimento de perspectivas e desafiando o status quo. Aqueles que ousam acolhê-lo encontram não apenas a liberdade, mas a própria essência da existência em sua forma mais crua e sublime. Embora possa, à primeira vista, evocar apreensão, o **Caos** é a matriz primordial do cosmos – um tecido interligado de possibilidades infinitas. Ele é a força subjacente que anima o universo, onde a ordem e a desordem se entrelaçam em uma dança sublime, criando um espetáculo de imprevisibilidade e beleza absoluta. Dominar a arte de reconhecer padrões no turbilhão e aceitar a incerteza como solo fértil para o crescimento e a autodescoberta é essencial para compreender e acolher a verdadeira natureza do **Caos**. Em última instância, o **Caos** nos lembra que a vida é uma jornada imprevisível – uma coreografia de eventos inesperados que esculpem nosso destino. Acolhê-lo com perspicácia e coragem nos permite encontrar serenidade na turbulência, ordem na aparente desordem e maravilhamento contínuo na dança enigmática da existência. --- !ArtefatoDoCaos.webp No vasto domínio da sabedoria ancestral de **Illiphar** – a sublime balança do equilíbrio universal – o **Caos** encontrou sua forma na relíquia lendária conhecida como a **Bengala da Desordem**. As civilizações que tiveram o raro privilégio de testemunhar sua manifestação foram consumidas por uma mistura de reverência e assombro. Seu poder se refletia não apenas no artefato em si, mas também na figura enigmática que o empunhava: um ancião de postura imponente e trajes vitorianos, cuja serenidade inabalável contrastava com a energia latente que fluía da bengala. No entanto, é a relíquia que verdadeiramente captura o olhar. Suas proporções desafiam qualquer lógica convencional, pois parecem oscilar entre o tangível e o imaterial. Em sua extremidade, um círculo majestoso se ergue, onde múltiplas setas divergentes convergem em um movimento paradoxalmente harmonioso – um emblema perfeito da sublime dança entre ordem e desordem. A **Bengala da Desordem** não é meramente um instrumento de poder, mas um símbolo do próprio fluxo do universo. Aqueles que ousam empunhá-la enfrentam a maior das provações: compreender a dualidade essencial do **Caos** e da **Harmonia**, e caminhar na tênue linha que separa a destruição da criação, o desconhecido da revelação. ---',
          link: '/notes/Caos'
        },
        {
          id: 'Dualidade',
          group: 2,
          contentPreview:
            '  Princípios da Dualidade Tudo o que existe deve ter seu oposto. Assim como o fogo se contrapõe à água, a paz à guerra e o caos à harmonia, até mesmo no princípio, Fringilla e Noctus divergiram em inúmeros aspectos. Em todos os casos, porém, há uma força reguladora que mantém a balança em equilíbrio. Esse princípio universal, onipresente e atemporal, é conhecido como _Dualidade_. Quando Illiphar se uniu aos seus irmãos e tomou seu lugar na Eterna, sua essência, volúvel e independente das vontades alheias, estabeleceu a fundação dos opostos. A partir dessa fusão, tudo passou a ter um contraponto, um reflexo oposto que se manifestava tanto na natureza quanto na essência das almas e dos cosmos. O fenômeno da _Dualidade_ tornou-se, assim, um alicerce fundamental da existência, uma lei inexorável que rege a dança da criação e da destruição. A _Dualidade_ não se limita apenas a contrastes físicos ou conceituais. Ela se estende às forças primordiais, aos pensamentos e às emoções. O amor e o ódio, a esperança e o desespero, a luz e as trevas - todos coexistem como faces de uma mesma moeda, interligados de maneira inquebrantável. Mesmo nas menores partículas do universo, a presença da oposição é evidente, e o equilíbrio entre tais forças determina a continuidade da realidade.  O Papel da Dualidade na Existência Acredita-se que a própria consciência seja fruto da _Dualidade_. A capacidade de distinguir entre certo e errado, belo e grotesco, desejo e saciedade só é possível devido à existência de opostos. Seres conscientes buscam constantemente equilibrar essas forças dentro de si, navegando pelos contrastes da vida e moldando sua jornada de acordo com a interação dessas energias conflitantes. A influência da _Dualidade_ não se limita ao campo filosófico ou existencial. Civilizações ao longo da história moldaram suas crenças, sistemas políticos e estruturas sociais com base no entendimento de forças opostas. Governos e impérios ascendem e caem devido à disputa entre ordem e rebeldia, tradição e inovação. Religiões fundamentam-se no conflito entre deuses e entidades adversárias, cada uma representando uma parcela da existência maior. Até mesmo a ciência se constrói sobre a observação de reações opostas e complementares, revelando que a _Dualidade_ é uma engrenagem essencial para o funcionamento do universo.  O Perigo do Desequilíbrio A _Dualidade_ funciona como uma balança cósmica entre os opostos. Se essa balança pender excessivamente para um lado, o desequilíbrio pode ser tão extremo que ambos os opostos colapsam. Sem a luz, não há sombra. Sem a vida, não há morte. Essas verdades são recíprocas e interdependentes. Se um elemento se torna dominante ao ponto de obliterar completamente seu oposto, a própria existência se desestabiliza. Algumas culturas e sociedades tentaram extinguir um dos polos da _Dualidade_, acreditando que poderiam alcançar um estado puro de ordem, harmonia ou poder absoluto. No entanto, todas essas tentativas falharam, levando ao colapso, à corrupção ou à estagnação. A perfeição absoluta, desprovida de oposição, não gera crescimento, apenas cristalização. Da mesma forma, a anarquia total destrói qualquer possibilidade de estrutura. O universo só prospera quando ambos os lados coexistem, se tencionando e se ajustando mutuamente.  A Interpretação da Dualidade Pelas Culturas Diferentes culturas interpretaram a _Dualidade_ de maneiras variadas ao longo do tempo. Alguns a viram como um jogo divino, um duelo eterno entre entidades superiores que disputam a supremacia. Outros a conceberam como um fluxo natural da existência, onde os ciclos da criação e da destruição são simplesmente parte da ordem das coisas. Em algumas filosofias, a _Dualidade_ é um enigma a ser compreendido e transcendido, enquanto em outras é um caminho a ser seguido, aceitando seus extremos como partes indivisíveis da jornada. Algumas tradições antigas falam sobre a importância de alcançar o "ponto de convergência", onde forças opostas podem ser harmonizadas em um estado superior de existência. Esse conceito sugere que, em vez de meramente balancear os opostos, é possível integrá-los de maneira que criem algo novo e mais poderoso. Essa síntese entre extremos é o que impulsiona grandes transformações e avanços. --- Como símbolo de tal conceito Illiphar definiu que seu artefato seria uma adaga de dois gumes, sua estrutura e aparência são comuns porém seu fio é perfeitamente afiado de ambos os lados, dando a perfeita simetria a estética da adaga. Ao se olhar pelo fio perfeitamente alinhado com seu oposto é possível ver o Rasgo do universo e o ponto onde a matéria se converge em Energia. A simetria desta lâmina é quebrada apenas pela cor de seus gumes, ao qual o da direita é ligeiramente mais escuro que o da esquerda porém ambos tomam a exata porcentagem da lâmina. Por mais bela e afiada que a lâmina possa parecer aos olhos humanos, seu portador perde os movimentos com o passar dos anos, em média, num período de 3 anos os movimentos do portador são dão débios e lentos que se assemelham a estátuas. Por mais que o portador perca os movimentos a qualidade age ao seu favor na hora de defender a quem o porta, descompensado o próprio universo em favor de seu amo. A essa defesa é dado o nome de Mistério da dualidade, algo que afeta temporariamente a existência afim de defender aquele que porta a lâmina. O portador petrificado tende a habitar o Mosteiro de São Antão pois desde a fundação da ordem desses monges, o artefato tem passado de geração em geração por eles, os mesmos batizaram a lâmina de Fio da Ordem devido a testes realizados dentro dos muros do mosteiro.',
          link: '/notes/Dualidade'
        },
        {
          id: 'Energia',
          group: 2,
          contentPreview:
            ' Tudo no universo é uma relação de energia, seja para criar ou destruir, tudo pode ser resumido a átomos que ganham ou perdem energia conforme seu processo natural, a Entropia universal que nos dá a definição do Conceitos/Conceitos Fundamentais/Caos|Caos, nada mais é do que essa troca constante de energia entre os átomos do nosso próprio universo. Sem o conceito de Energia nosso universo eles extinguirá em poucos instantes por falta da dança da vida produzida pela energia das coisas. Por mais que tudo seja uma lógica de ganhos e perdas de energia, o que implicaria em um processo infinito e ciclicamente sustentável, a Entropia da energia se desfalece lentamente ao passar dos séculos, eventualmente chegando próximo a um ponto crítico, onde a matéria lentamente inicia um processo lento de parada total. O responsável por esse aspecto nao pode de forma alguma permitir que tal evento aconteça, sendo ele o mecanismo principal para o Ritual do tripudiar pois através de seu artefato ele consegue recomeçar todo processo de movimento do universo, garantindo assim mais alguns milênios de movimento a Eterna. Quando esse aspecto se tornou parte da realidade, nas profundezas do Ignitário, o artefato desse aspecto surgiu, uma coroa de latão, gasta e sem pintura, suas jóias já foram roubadas ou removidas, o aspecto da coroa é decrépito, demonstrando um rei que caiu ou o próspero passado de uma civilização. Porém aquele que a cólica na cabeça ganha o poder de controlar a energia sobre a matéria, a coroa se funde a cabeça de seu portador, a cada passo a mente do mesmo se corrompe e sucumbe a loucura, as pessoas ao seu redor não entendem o por que ele usa essa coroa velha, a medida que a Entropia mental do portador cresce seu corpo parece, ao ponto de não mais conseguir se sustentar, quando isso ocorre e o portador desfalece sem forças no chão a coroa começa a chamar seus herdeiros para que ela nao fique sem um portador. Atualmente a coroa se encontra em um local secreto passada de pai para filho dentro da família Bogart',
          link: '/notes/Energia'
        },
        {
          id: 'Espaço',
          group: 2,
          contentPreview:
            'Entenda o espaço como um palco, lugar grande e vazio onde tudo pode acontecer, imagine agora que esse grande palco vazio fanha vida a medida do Tempo com as graciosas bailarinas da Energia se propagando, dançando e rodopiando por todos os cantos, após muito fazer, o palco se silencia mais uma vez e o Tempo que regia a coreografia da Energia já não existe mais, tudo se desfez em silêncio. De forma mais aprofundada a de se entender o espaço entre espaço absoluto e relativo onde ambos os conceitos constroem o conceito maior de espaço ao qual utilizamos de forma corrente. O Espaço Absoluto nada mais é que o meio físico absoluto com leis definidas e imutáveis que permeia tudo que fazemos, entenda-o como um alicerce sólido para os demais conceitos, algo primordial para que os demais existam, nele, objetos posicionados em pontos irrelevantes podem ter sua distância calculada partir de um referencial fixo, tal teoria foi criada por Isack Nelson. Já o Espaço Relativo trata-se da mescla do Espaço juntamente com o Tempo Claro! Vamos aprofundar nos conceitos de espaço absoluto e relativo e explorar suas relações com energia, tempo e matéria. 1. **Espaço Relativo**:    - **Definição**: Introduzido por Albert Einstein na teoria da relatividade, o espaço relativo sugere que o espaço não é fixo, mas depende do observador. O espaço e o tempo são interligados, formando o contínuo espaço-tempo.    - **Características**: No espaço relativo, as medidas de distância e tempo variam conforme o movimento do observador. Isso significa que dois observadores em diferentes estados de movimento podem medir diferentes distâncias e tempos para o mesmo evento¹².  Relação com Energia, Tempo e Matéria 2. **Energia**:    - **Equivalência Massa-Energia**: A famosa equação de Einstein, \\(E = mc^2\\), mostra que massa e energia são intercambiáveis. Isso significa que uma pequena quantidade de massa pode ser convertida em uma grande quantidade de energia e vice-versa³.    - **Impacto no Espaço-Tempo**: A presença de energia (e massa) pode curvar o espaço-tempo. Por exemplo, objetos massivos como estrelas e planetas criam uma curvatura no espaço-tempo ao seu redor, o que é percebido como gravidade¹. 3. **Tempo**:    - **Dilatação do Tempo**: Na teoria da relatividade, o tempo é relativo e pode dilatar (ou seja, passar mais devagar) em velocidades próximas à da luz ou em campos gravitacionais intensos. Isso significa que o tempo não é uma constante universal, mas depende do referencial do observador².    - **Espaço-Tempo**: O tempo é uma dimensão do contínuo espaço-tempo. Eventos que ocorrem são descritos em termos de suas coordenadas espaciais e temporais, e a curvatura do espaço-tempo afeta como o tempo é percebido¹. 4. **Matéria**:    - **Curvatura do Espaço-Tempo**: A matéria influencia a geometria do espaço-tempo. Quanto mais massivo um objeto, maior a curvatura que ele cria no espaço-tempo. Isso é descrito pela equação de campo de Einstein na relatividade geral¹.    - **Interação com Energia**: A matéria pode ser convertida em energia e vice-versa, conforme a equação \\(E = mc^2\\). Em reações nucleares, por exemplo, a massa é convertida em energia, demonstrando a profunda conexão entre matéria e energia³. Esses conceitos mostram como o espaço, tempo, energia e matéria estão interligados de maneiras complexas e fascinantes. Se precisar de mais detalhes ou tiver outras perguntas, estou aqui para ajudar! Fonte: conversa com o Copilot, 03/10/2024 (1) Aula 12.89: Espaço e tempo absolutos - WebFisica.com. https://webfisica.com/fisica/curso-de-fisica-basica/aula/12-89. (2) Teoria da Relatividade Geral e Restrita - Toda Matéria. https://www.todamateria.com.br/teoria-da-relatividade-2/. (3) Teoria da relatividade: o que é, restrita, geral - Brasil Escola. https://brasilescola.uol.com.br/fisica/teorias-da-relatividade.htm. (4) O que é a Teoria da Relatividade? | Super - Superinteressante. https://super.abril.com.br/mundo-estranho/o-que-e-a-teoria-da-relatividade-2/. (5) Natureza Física do Tempo - University of São Paulo. https://opessoa.fflch.usp.br/sites/opessoa.fflch.usp.br/files/FiFi-20-Cap07-Tempo-na-Fisica_0.pdf.',
          link: '/notes/Espa%C3%A7o'
        },
        {
          id: 'Esperança',
          group: 31,
          contentPreview:
            '!Esperantria.png\r A Objetos/Plantas/Esperança, a flor mais bela de toda Eterna, é uma verdadeira obra-prima da natureza. Seu deslumbrante esplendor cativa os olhos de todos os que têm o privilégio de presenciar sua magnificência.\r Com pétalas delicadas e translúcidas, a Objetos/Plantas/Esperança irradia uma luminosidade etérea, semelhante à suave luz das estrelas. Sua cor é uma fusão sublime de tons celestiais, variando de um azul cristalino a um roxo profundo, como se capturasse a essência da vastidão do espaço sideral.\r Cada pétala é ricamente adornada com padrões intricados, semelhantes a veias cósmicas, que se entrelaçam em harmonia perfeita. Esses delicados desenhos cintilam sutilmente, refletindo os raios de luz que atravessam a densa neblina de Primordiz.\r O centro da flor abriga um núcleo radiante, composto por pequenas estrelas em miniatura, que brilham com uma intensidade suave e serena. Esse fulgor estelar emana uma energia transcendente, conferindo à Objetos/Plantas/Esperança um ar de misticismo e poder.\r Emoldurada por folhas brilhantes e esverdeadas, que parecem pulsar com uma vitalidade única, a flor cresce no topo do morro central do mangue astral. Sua beleza singular e rara é um testemunho da magia que permeia o mangue  e uma fonte de admiração e encantamento para todos aqueles que têm a sorte de contemplá-la.',
          link: '/notes/Esperan%C3%A7a'
        },
        {
          id: 'Harmonia',
          group: 2,
          contentPreview:
            'A Harmonia, com sua dança etérea e graciosa, manifesta-se como uma essência sublime que permeia os intrincados arranjos de Eterna. É o fluir sinuoso da melodia que habilmente une os fragmentos dispersos da existência, urdindo um mosaico encantador que exala coerência e exibe beleza em sua forma mais pura. Assim como uma sinfonia celestial que reverbera nos recônditos dos corações e das almas dos seres sensíveis, a Harmonia transcende as limitações das palavras, comunicando-se através da linguagem universal das emoções, a única linguagem que todos os seres compreendem. Ela se desvela nos acordes harmoniosos de uma música cativante, onde cada nota encontra seu propósito e encaixe, engendrando uma tapeçaria sonora magnífica que desperta um sentimento de plenitude profunda nos ouvintes extasiados e ávidos por essa experiência sensorial transcendente. Nas pinceladas meticulosas de um artista habilidoso, a Harmonia toma forma, ganhando vida em uma tela que captura a essência suprema da beleza, cuidadosamente equilibrando forças antagônicas em um espetáculo majestoso de cores e formas que se entrelaçam em uma dança atemporal. No tear intricado das relações humanas, a Harmonia desempenha o papel de uma sinergia exuberante, florescendo entre corações compassivos e assim transformando divergências em um elo inquebrantável, que une desde os elementos mais singelos, como grãos de areia, até as mais sublimes Essências de Minerva. Seu ritmo pulsante é percebido no cerne da própria natureza, onde a coexistência pacífica entre a flora e a fauna se desenrola em uma coreografia perfeita de sustento e equilíbrio, uma dança silenciosa que ecoa por entre os ecossistemas. A Harmonia representa a busca incessante pela sincronicidade com o Ignitário, uma sintonia com as forças cósmicas que regem o amplo universo. Ela encontra sua manifestação na serenidade espiritual de mentes complacentes, as quais encontram uma calma profunda no epicentro das contradições inerentes à vida, amalgamando as dualidades em uma sinfonia transcendental. Tal como os astros deslizam em suas órbitas celestiais, cada componente do universo executa uma dança de perfeita consonância, nutrindo-se mutuamente e outorgando a cada forma de existência seu propósito sagrado e intrínseco. A Harmonia, dessa forma, simboliza a busca inabalável pela unificação entre todos os seres e elementos, uma melodia cósmica cuja partitura está indelével no próprio tecido do cosmos, aguardando pacientemente ser interpretada pelos corações sensíveis e ávidos por compreenderem o intricado concerto da existência. Assim, fica claro que a Harmonia transcende o mero plano dos conceitos abstratos; ela se apresenta como uma essência envolvente que abraça todas as manifestações de beleza e elevação dentro do vasto universo. Constitui-se como uma dança sublime, uma coreografia etérea que nos convoca a entrelaçar nossas vozes e ações em um coral unificado de amor, compaixão e mútuo entendimento. Nesse conjunto harmônico, nos encontramos sintonizados com a grandiosa sinfonia cósmica, nos inserindo de maneira ativa na dança perene da existência. Sob os auspícios benevolentes de Illiphar, a Harmonia desvela-se em toda sua majestade através do extraordinário espetáculo do metrônomo. Dotado de uma simplicidade sublime e uma impassibilidade enigmática, esse dispositivo transcendental revela os segredos mais profundos do universo, oscilando entre o despontar radiante de Harmonia e o ocaso sombrio de Caos. As engrenagens desse prodígio celestial possuem a capacidade ímpar de desfazer e reorganizar as tumultuosas correntes do Caos, imprimindo uma precisão milimétrica em sua cadência. Ao contrário de seus equivalentes terrenos, a haste do metrônomo celestial permanece imóvel, firme como a própria essência da Harmonia, mesmo quando o universo parece propenso a mergulhar na instabilidade. De acordo com as lendas imemoriais narradas por Harmonius Agathós, o metrônomo continuará sua dança pendular por milênios, até que suas engrenagens, em uma simbiose suprema, se imobilizem em uma harmonia perfeita. Nesse fluir das eras, o Caos, finalmente, se dissipará como névoa diante do sol nascente, cedendo lugar à poderosa paz que envolverá cada canto do cosmo. Assim, o metrônomo celeste, regido pelos fios invisíveis da Harmonia, prossegue incansável em sua busca pelo equilíbrio divino, uma coreografia cósmica que nos lembra que mesmo nas encruzilhadas do tempo e do espaço, a busca pela unidade e serenidade permanece como uma constante inspiradora em nossos corações ávidos por compreender o tecido profundo da existência.',
          link: '/notes/Harmonia'
        },
        {
          id: 'Magia',
          group: 2,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Magia'
        },
        {
          id: 'Medo',
          group: 2,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Medo'
        },
        {
          id: 'Morte',
          group: 2,
          contentPreview:
            'Por lei do Desconhecido, dada diretamente as Supra-Singularidade no momento de sua criação, foi dito nas palavras antigas, "Alles Lebendige stirbt eines Tages", em tradução livre, tudo que a vida a de um dia padecer. Todo o ser que um dia veio a luz da Vida dentro de Eterna a de um dia sucumbir para esta entidade,  a quem diga que esta é uma amiga e outros que é um tormento. Na realidade ela nada mais é que um portal, um link entre Ethereon e Prismora. Muitas mitologias universo a fora ja tentaram narrar o que é a Morte, alguns acreditam ser uma ovelha caçadora e benevolente acompanhada sempre por um lobo artros',
          link: '/notes/Morte'
        },
        {
          id: 'Tempo',
          group: 2,
          contentPreview:
            'Uma maleta capas de viajar no tempo, e controlar sua velocidade, aquele que a portou uma vez não pode deixar o plano de Prismora, os portadores podem se ver',
          link: '/notes/Tempo'
        },
        {
          id: 'Vida',
          group: 2,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Vida'
        },
        {
          id: '_Conceitos - Fundamentos',
          group: 2,
          contentPreview:
            '!Fundamentos.webp No instante em que as Supra-Singularidade|Supra-Singularidades se fragmentaram, cada um de seus aspectos tornou-se uma parte intrínseca da realidade que seu sacrifício originou. De Fringilla, o arauto do caos, emergiram os aspectos do Caos, que equilibra o progresso, o Medo que nos impulsiona e a Morte que nos confere propósito.  De Noctus surgiram a Conceitos/Fundamentos/Esperança, que nos revela um futuro melhor, a Harmonia que nos une e a Vida que nos permite respirar. Por fim, de Illiphar, a justiça, vieram os aspectos da Dualidade que dá sabor à realidade, o Tempo que não permite reparar o que foi feito sem seu custo e o Espaço que nos fornece a matéria. Todos os aspectos foram concedidos pelo Desconhecido, pois somente a ele pertencem os dons e somente ele pode dar e retirar tais dons. Quando a chama foi criada a partir do martírio das três Supra-Singularidade|Supra-Singularidades, seus aspectos se tornaram físicos, materializando-se em objetos que podiam controlar tal aspecto, desde que não entrassem em conflito com o Grande Plano. Aqueles que possuem um artefato têm parte de sua mente tomada pelas vontades da Supra-Singularidade ancestral. Após alguns meses usando o artefato, o corpo do portador começa a se transformar, essas alterações o transformam em um exemplo grotesco dos seres que habitam fora da realidade. Os portadores costumam lutar por mais poder, utilizando seus poderes para adquirir mais artefatos. Quando um portador morre e outra pessoa assume o artefato, todo o ciclo de deterioração do ser recomeça. É comum que alguns seres possuam mais de um artefato, sofrendo as consequências em dobro. A esses artefatos e poderes são vinculados os textos da Objetos/Lendarios/Profecia do fim. Esta profecia narra o que acontece quando um único ser consegue suportar as dores de todos os artefatos de uma só vez.',
          link: '/notes/_Conceitos%20-%20Fundamentos'
        },
        {
          id: 'Grande Plano',
          group: 1,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !GrandePlano.png\r Após a supressão das três grandes Supra-Singularidade, Eterna brilhou pela primeira vez.\r Illiphar, vendo a situação complexa bolou um Grande Plano, uma forma de retomar a existência junto com seus irmãos, o plano era perfeito e não avia forma de dar errado, porém seria necessário paciência.\r Tendo ciência de que em um infinito de tempo tudo iria acontecer, Illiphar forjou 11 artefatos, cada um portava um fragmento dos aspectos de seus irmãos, quem portasse estes artefatos se tornaria louco e escravo do artefato, caso sua mente seja fraca ou sucetiva as vozes.\r Quando o último artefato foi lançado para a chama, Illiphar se juntou aos seus irmãos surgindo assim a Ignitário.\r O Grande Plano de Illiphar consiste em aguardar, sabendo que tudo irá acontecer neste infinito de tempo, em algum momento desse infinito, uma ou várias pessoas iram conseguir reunir os 11 artefatos e faram a Eterna se apagar, ficando para traz apenas o 12° artefato consedido a Nihilus.\r Prevendo o que está acontecendo no mundo um profeta sem nome da primeira escreveu a Objetos/Lendarios/Profecia do fim, um pergaminho que ficou perdido por eras.',
          link: '/notes/Grande%20Plano'
        },
        {
          id: 'Ignitário',
          group: 1,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Ignitario.png\r Antes mesmo da concepção do tempo, as três Supra-Singularidade se uniram em uma dança cósmica deslumbrante, transformando-se em uma pira ardente em meio ao vasto vazio do Abyssethar. Cada fragmento desses seres divinos se dispersou, dando origem a um aspecto fundamental da nossa realidade, a chama foi chamada de Eterna e sua base de Ignitário, mas ambos são referencias para a mesma coisa.\r 1. Tempo: O fluir constante que governa a progressão e as mudanças, uma força imutável que segue adiante, deixando apenas vestígios do que já foi vivido para trás.\r 2. Espaço: Os Domínios Etéreos, o abrigo de todas as formas de vida, fenômenos e conhecimentos existentes, um vasto cenário onde todas as interações ocorrem.\r 3. Energia: A força primordial que impulsiona todas as atividades e transformações no Espaço, usando-se do Tempo como um veículo para se dispersar e se manifestar de maneiras incontáveis.\r 4. Vida: Uma dádiva misteriosa concedida pelo Desconhecido, conferindo singularidade e significado a tudo o que existe, criando momentos únicos e preciosos ao longo do Tempo.\r 5. Morte: O inevitável encerramento do ciclo da Vida, o aspecto onipresente que permeia tudo, desafiando as noções de existência e transcendência, um mistério além da compreensão.\r 6. Dualidade: A existência inseparável de opostos complementares, como luz e trevas, bem e mal, ou qualquer outro conceito que dependa de um contraponto para que a dinâmica essencial da realidade se manifeste.\r 7. Caos: A natureza intrinsecamente caótica das coisas, uma vontade indômita que permeia o universo, buscando perturbar a calmaria e romper o silêncio, gerando transformações e renovações imprevisíveis.\r 8. Medo: Uma força penetrante que envolve todos os lugares, um agente primordial de mudança no universo, instigando a superação e impulsionando a evolução dos seres diante das adversidades.\r 9. Conceitos/Conceitos Fundamentais/Esperança: Outra força enigmática que permeia todas as coisas, emergindo de maneira misteriosa, muitas vezes imperceptível até que seu aspecto anterior se manifeste, trazendo a promessa de um futuro melhor.\r 10. Harmonia: Depende da esperança para existir, é quem concede equilíbrio e integridade perfeitos entre diferentes elementos e forças, criando uma bela sinfonia de interconexão e coexistência, permitindo o florescimento e a paz.\r Cada um desses aspectos primordiais foi atribuído a um objeto sagrado e confiado a um ser que habita dentro dessa chama. Para que a chama nunca se apague e as Supra-Singularidade não se percam para sempre, as Singularidades, criaturas nascidas desses seres supremos, ergueram uma pira eterna.\r Elas, incessantemente, inventam objetos, ideias, pensamentos, planetas, estrelas e tudo aquilo que conhecemos, utilizando as matérias existentes no Abyssethar, e as depositam na chama sagrada da pira. Dessa forma, mantêm seus criadores vivos até o dia em que alguém cumprirá a Objetos/Lendarios/Profecia do fim e desvendará o destino desses seres divinos.',
          link: '/notes/Ignit%C3%A1rio'
        },
        {
          id: 'Arcânicas',
          group: 3,
          contentPreview:
            'Hierarquia militar Magica\r As Arcânicas são as divisões militares das Ordens e Clans/Cátedras arcanas|Cátedras arcanas funcionando como um tipo de agência de espionagem, seu papel primordial é o controle e garantir que as regras da mágia estejam sendo respeitadas com o rigor necessário.\r Está ordem é a única que possui perdição para manipular as magias da Cátedra Oculta pois a certo nível, os membros desta cátedra também são parte da Arcanicas\\Arcanica como também ela é a responsável por definir aquilo que é lícito ou ilícito no âmbito mágico mas tudo isso passa por um processo burocrático rigoroso.\r A princípio as magias criadas passam por um processo de análise',
          link: '/notes/Arc%C3%A2nicas'
        },
        {
          id: 'Magia Banida',
          group: 4,
          contentPreview:
            ' Também conhecida como a Cátedra Oculta quase, se não toda, a população com não sabe do que se trata tal tipo de magia,  de modo geral, as magias banidas são todas as magias que o as diligencias arcanas decidem que é maléfico para a humanidade ou raças',
          link: '/notes/Magia%20Banida'
        },
        {
          id: 'Magia Branca',
          group: 4,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Magia%20Branca'
        },
        {
          id: 'Magia Obscura',
          group: 4,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Magia%20Obscura'
        },
        {
          id: '_Conceitos - Cátedras Arcanas',
          group: 4,
          contentPreview:
            '!CatedraArcana.webp No princípio, a Magia não existia no universo de Systempunk até que um evento cataclísmico ocorreu. Os livros o retratam como Cataclisma Mágico, um rasgo no tecido do espaço que fez jorrar uma energia nova no universo. Essa energia, descontrolada e caótica, espalhou-se de forma devastadora, iniciando o evento conhecido como Primavera Mágica, um período de imenso poder arcano que aniquilou quase toda a vida e alterou profundamente as leis da realidade. Tal poder é capas de alterar as leis naturais de forma que não se impacta no âmbito geral podendo manipular materia, energia e até mesmo a percepção do tempo e do espaço. O caos resultante fez com que diferentes formas de magia emergissem, algumas benignas, outras perigosas ou incontrolaveis. Para conter esse colapso, Noctus, a divindade responsável pelo equilíbrio, absorveu parte dessa energia, infundindo um novo aspecto à existência. Dessa ação surgiu Exordio, um reservatório colossal que passou a armazenar e regenerar a magia. Exordio não cria magia; ele apenas a acumula e restaura ao consumir elementos do universo ao seu redor. Esse processo o faz crescer constantemente, o que pode, no futuro, levá-lo a consumir tudo que existe. À medida que a Primavera Mágica diminuiu e novas civilizações emergiram, os poderes arcanos começaram a ser estudados e explorados. Os Idrytes, um grupo pioneiro de pesquisadores, catalogaram as primeiras magias, descobrindo que eram ativadas por meio de combinações específicas de palavras do Velho Dicionário, gestos e materiais catalisadores. No entanto, com o tempo, perceberam que o uso prolongado de magia podia corromper e deteriorar os corpos daqueles que não tinham resistência natural a ela. A resistência à magia surgiu como uma adaptação evolutiva entre os seres expostos diretamente aos efeitos do Cataclismo. Algumas linhagens desenvolveram uma capacidade genética recessiva para suportar os fluxos arcanos, permitindo-lhes usar magia sem sofrer degradação física. Contudo, essa característica só se manifestava quando ambas as linhagens possuíam a resistência, tornando-se algo raro ao longo do tempo. muito tempo apos a fundação dos Idrytes foi visto que nem todos possuíam força corporal suficiente para resistir as impulsos da magia poderosa, assim, eles tinham seu corpo corrompido ou degradado perante ao seu uso, outros nasciam com maior resistência ou resiliência para tais poderes, tal característica era obtida de forma genética, porem, de forma recessiva, ou seja, apenas duas pessoas que tivessem tal resistência, conseguiriam ter tal resistência, isso por que os primeiros novos seres que emergiram, tiveram que lidar com um mundo tomado pela Primavera Magica que ainda estava no processo de redução, tendo seu curso evolutivo completamente modificado por tais forças. Para evitar que a magia fosse utilizada de maneira destrutiva, o Rei Arcani decretou a criação das **Cátedras Arcanas**, instituições dedicadas ao estudo e regulamentação da magia. Seu objetivo era impedir o uso irresponsável de poderes desconhecidos, como aqueles que levaram aos eventos do Tormentos de Grayhall, um exemplo clássico da devastação causada pela chamada "Magia Bárbara", desenvolvida antes das cátedras. Assim, quatro grandes cátedras foram fundadas: - **Axiomata Arcana** – Dedicada ao estudo das leis fundamentais da magia, busca compreender suas regras e garantir que seu uso permaneça dentro de limites seguros. - **Ordinis Mystica** – Responsável pela regulamentação e aplicação prática da magia branca. Define os feitiços permitidos, garantindo um uso responsável e sustentável da magia. - **Umbracantus Occultum** – Especializada na análise e contenção da Magia Obscura, estudando feitiços instáveis que desafiam os limites do conhecimento. - **Excidium Interdicta** – Criada para monitorar e erradicar a Magia Banida, atuando como uma ordem inquisitorial contra práticas perigosas e proibidas. As Cátedras funcionaram bem por décadas, até que um escândalo de corrupção e uso indevido de poder na **Cátedra de Excidium** veio à tona. A população, revoltada, exigiu sua extinção. Em seu lugar, foi fundada a **Arcânicas**, uma força policial arcana que, com o tempo, desenvolveu mecanismos e dispositivos capazes de rastrear fluxos mágicos e detectar seu uso indevido. Porém, a tecnologia ainda apresentava falhas, sendo ineficaz contra certos metais como chumbo, prata e bronze, que podiam bloquear a detecção. Com o avanço dos estudos, as magias foram separadas em três grandes grupos: - **Magia Branca** – Considerada segura, seus feitiços não causam danos diretos, não alteram matéria nem corrompem os usuários. Pode ser ensinada livremente. - **Magia Obscura** – Magias mais poderosas e complexas, capazes de modificar a realidade e causar danos. Apenas praticantes treinados podem utilizá-las, sendo ensinadas apenas em escolas superiores. - **Magia Banida** – Extremamente destrutivas e corruptivas, são impossíveis de serem domadas. Seu uso é considerado crime grave e passível de pena capital. Contudo, os Ocultistas acreditam que as Magias Banidas podem ser estudadas e controladas, o que os coloca em constante conflito com a Arcânicas.  **A Evolução da Magia e a Separação entre Civilizações** Com o passar das eras, a magia se integrou de forma orgânica às civilizações. Entretanto, quando a humanidade se expandiu pelo espaço, surgiram abordagens distintas quanto ao seu uso. Algumas sociedades optaram por caminhos mais tradicionais e investiram em tecnologia não mágica para garantir acesso universal a todos os cidadãos. Esse movimento levou à diminuição dos incentivos para a perpetuação de magos naturais e, com o tempo, as linhagens mágicas foram se tornando cada vez mais raras. Por outro lado, algumas civilizações priorizaram a magia como base de sua estrutura social, criando sistemas que excluíam aqueles sem aptidão mágica. Isso gerou um abismo entre os povos, culminando em conflitos que, na era Space Opera, resultaram em guerras entre civilizações mágicas e não mágicas. Uma diferença fundamental entre essas sociedades é que **a magia não possui mecanismos físicos**; ela só pode ser utilizada por aqueles que possuem o conhecimento necessário para ativá-la. Isso significa que artefatos mágicos e tecnologias arcanas **permanecem inertes caso não sejam operados por magos naturais ou indivíduos treinados**.  **Exordio e o Perigo da Regeneração Mágica** Pesquisas mais avançadas revelaram que **Exordio não apenas armazena magia, mas também consome matéria e energia ao seu redor para manter sua regeneração**. Isso significa que, à medida que ele absorve recursos do universo, seu tamanho e influência crescem exponencialmente. Se não for controlado, Exordio pode eventualmente consumir tudo o que existe para sustentar a magia. Essa descoberta dividiu estudiosos e governantes, dando origem a diferentes correntes de pensamento: - **Os Conservacionistas** – Acreditam que a magia deve ser usada com moderação para evitar que Exordio cresça descontroladamente. - **Os Expansionistas** – Buscam novas formas de poder para substituir a magia, caso ela se torne insustentável. - **Os Infinitistas** – Defendem que a magia é autorregenerativa e pode ser mantida para sempre desde que seja usada de maneira equilibrada. - **Os Ocultistas** – Acreditam que a chave para evitar o crescimento de Exordio está no domínio das Magias Banidas. A fundação da **Estação Espacial 3E**, que orbita Exordio para estudá-lo, confirmou que sua expansão é inevitável. O debate agora gira em torno de como conter esse crescimento e se há uma forma de interromper seu ciclo antes que ele consuma todo o universo.  **Conclusão** O sistema mágico de Systempunk passou por séculos de evolução, moldando sociedades e sendo influenciado pelo avanço tecnológico. A guerra entre civilizações mágicas e não mágicas continua, enquanto a expansão de Exordio levanta questões existenciais sobre o destino da realidade. O futuro dependerá de como cada facção lidará com os desafios impostos pela magia e pelo universo em constante transformação.',
          link: '/notes/_Conceitos%20-%20C%C3%A1tedras%20Arcanas'
        },
        {
          id: 'Exordio',
          group: 3,
          contentPreview:
            'Quando o grande Historia/Systempunk/Eventos/Cataclisma Mágico|Cataclisma Mágico ocorreu, milhares de vidas foram perdidas para que a magia existisse hoje, concretizando-se novamente a frase de que diz: \r > "Não há glória sem sacrifício, conquista sem solidão, amor sem desilusão e progresso sem derramar sangue"\r Assim, durante o impacto monumental do Cataclisma, que alterou significativamente a vida no universo, um evento extraordinário desdobrava-se na origem da força. À medida que a força mágica desenfreada, liberada pelo sacrifício do antigo Kenzie, se espalhava de forma catastrófica, o rastro deixado para trás se fundia à beleza do caos, assemelhando-se a alguém que se arrepende de seus pecados. O resultado desse tumulto mágico era um planeta dividido ao meio, cujo núcleo consistia no próprio núcleo da magia de todo o nosso universo.\r A força desse núcleo parecia ser ilimitada; até o momento de estudo, não havia encontrado meios de interromper o fluxo desde que fora aberto. Assim, com a vontade das Historia/Systempunk/Conceitos/Supra-Singularidade|Supra-Singularidades aprisionadas e o consentimento do Historia/Systempunk/Conceitos/Desconhecido|Desconhecido, foi forjado o derradeiro artefato: as Lentes Arcanas. Trata-se de uma espécie de lupa que amplifica o poder emanado de fora do universo.\r O Exordio desempenha o papel de fonte, e no seu centro estão as Lentes Arcanas, que mantêm o fluxo de poder operando por todo o universo.\r Durante os períodos marcantes do início da Historia/Systempunk/Eras/Eras Menores/50. Space Opera|Space Opera, o Exordio passou por significativas transformações. O local foi cercado para assegurar que nenhuma civilização tentasse recuperar seu poder para si mesma. Dessa forma, mediante uma exploração abrangente, as Ordens e Clans/Cátedras Arcanas|Cátedras Arcanas, em colaboração com as Arcânicas e seus seguidores, estabeleceram uma cidadela ao redor do planeta de núcleo exposto. A partir desse ponto, eles exercem controle sobre toda a magia do universo, além de influenciarem as forças políticas de diversos povos e nações espalhadas pela vasta existência do Historia/Systempunk/Conceitos/Ignitário|Ignitário.',
          link: '/notes/Exordio'
        },
        {
          id: '_Conceitos - Magia',
          group: 3,
          contentPreview:
            'Em resumo, a introdução da magia no universo ocorreu durante o monumental evento conhecido como o Historia/Systempunk/Eventos/Cataclisma Mágico|Cataclisma Mágico, uma catástrofe grandiosa que impactou a Terra, tornando-se um divisor significativo tanto em termos históricos quanto sociais. O Exordio, termo utilizado para descrever o ponto inicial do cataclisma, tem suas origens externas ao nosso universo. A sua origem exata ainda permanece envolta em mistério, mas estudos de assinaturas de calorimetria e análises regressivas sugerem uma possível conexão com um herói ou vilão de outra dimensão, conhecido como Kenzie. A energia emanada dessa fonte opera de maneira semelhante aos neutrinos das estrelas, com sua massa sendo praticamente insignificante até que alguém tente manipula-la, dando origem ao que os cientistas denominam como Série de Flux, também conhecida popularmente como fluxo de mana. O ato de utilizar e estudar a magia consiste em moldar essa energia, que flui descontroladamente de sua fonte. De maneira geral, a magia pode ser descrita por meio de seis variáveis que abrangem o seu uso: força, intensidade, sentido, vontade, inteligência e fé. Embora uma magia possa ser desencadeada mesmo na ausência de uma dessas variáveis, o resultado será alterado, mesmo que minimamente, possivelmente modificando parte de seu objetivo. Com o ressurgimento da sociedade durante a era Historia/Systempunk/Eras/Eras Menores/Monopunk|Monopunk, a comunidade científica direcionou seus esforços para o estudo da magia e dos cristais, anteriormente banidos e agora abordados como disciplinas científicas. A magia, agora tratada como ciência, foi dividida em cadeiras conhecidas como Ordens e Clans/Cátedras arcanas|Cátedras Arcanas. Cada cátedra e seus discípulos dedicam-se ao estudo de um tipo específico de magia, podendo alcançar resultados similares por meio de métodos distintos. A organização em cátedras permitiu que magos e bruxos de maior habilidade se tornassem instrutores em escolas de magia por todos os reinos do mundo, sendo a primeira delas localizada no coração do império Rubro, conhecida como a Escola de Magias Cialion Glorius. Após o cataclisma, alguns seres tiveram seus organismos modificados, tornando-os mais aptos a suportar as cargas das Série de Flux. Essa elevação na capacidade de carga proporcionou uma manipulação e controle mais eficientes da magia, originando os conceitos de magos e bruxos. Os magos são indivíduos que nascem com o "dom natural para as artes mágicas", o que significa que seus organismos têm uma afinidade especial para canalizar o mana, graças à Bile de Jerren, suportando fluxos quase ilimitados sem causar danos a si mesmos. Por outro lado, os bruxos não possuem essa afinidade natural. Eles dependem de um patrono, um mago poderoso capaz de canalizar a magia para eles ou ensiná-los a consumi-la de forma controlada. Em caso de desordem, onde consomem mais do que seus corpos podem suportar, correm o risco de deterioração ou sucumbir à Corrupção Mágica. À medida que as cátedras avançaram socialmente e as escolas de magia se popularizaram, ficou evidente que certas magias aceleravam os processos de corrupção, seja mental ou física. Diante desse cenário, o Conselho dos Magos deliberou que seria mais prudente criar uma cátedra para lidar com tais práticas, e assim surgiu a Cátedra Renegada ou Banida. O líder dessa cátedra não tinha a função de estudar a magia, mas sim de impedir que as pessoas a utilizassem de maneiras prejudiciais. Nesse contexto, foram agrupadas as magias que causavam danos às pessoas, removiam o livre arbítrio ou poderiam ameaçar a ordem social vigente. A Cátedra dos Renegados desempenhava um papel crucial na supressão dessas magias indesejadas. Todos os livros que mencionavam tais práticas foram retirados de lojas, bibliotecas e escolas, sem exceção. Somente a Autarquia dos Magos, o Conselho dos Magos e os alunos de melhor desempenho tinham conhecimento dessa cátedra. Esses estudantes destacados eram os únicos autorizados a atuar nessa cátedra, garantindo assim um controle rigoroso sobre o conhecimento e o uso das magias consideradas perigosas para a sociedade. Dessa forma, com essa divisão, surgiram as Arcânicas, grupos compostos por estudantes ou membros da Cátedra Oculta cujo objetivo era controlar, reger e assegurar que as magias proibidas fossem esquecidas e mantidas em segredo dentro dos muros de Cialion Glorius.',
          link: '/notes/_Conceitos%20-%20Magia'
        },
        {
          id: 'Mistério da dualidade',
          group: 1,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Mist%C3%A9rio%20da%20dualidade'
        },
        {
          id: 'Rasgo do universo',
          group: 1,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Rasgo%20do%20universo'
        },
        {
          id: 'Singularidades',
          group: 1,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Singularidades.jpg\r Criaturas criadas pelas 3 Supra-Singularidade, as quais foram criadas por um ser todo poderoso Desconhecido, sua função é criar material para manter a chama do Ignitário chamada de Eterna acessa até que seus criadores retornem e continuem o ciclo infindável da vida.',
          link: '/notes/Singularidades'
        },
        {
          id: 'Supra-Singularidade',
          group: 1,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !SupraSingularidades.jpg\r Criaturas que foram criadas por um ser todo-poderoso Desconhecido, com o propósito de lhe fazer companhia. Esse ser compartilhou partes de seu poder com essas criaturas. O primeiro foi nomeado Noctus e recebeu os seis dons da paz. O segundo foi chamado Fringilla e recebeu os cinco dons do caos e da miséria. Consciente dos eventos futuros, o ser criou Illiphar e deu a ela apenas um dom, porém o supremo dom da legislação, incumbindo-a de julgar seus irmãos.\r Após anos vagando pela imensidão vazia do Abyssethar, Noctus encontrou a Matéria Nula. Ao estudá-la e moldá-la, percebeu que seria possível criar entidades menores, menos poderosas, mas capazes de realizar feitos extraordinários. Ele as moldou e apresentou a Illiphar, que ficou impressionada com o que viu e as nomeou Singularidades.\r Por mais impressionante que fosse a criação de Noctus, Fringilla era veemente contra a existência dessas criaturas, colocando as no papel de bestialidades e maculas a própria imagem do Desconhecido,',
          link: '/notes/Supra-Singularidade'
        },
        {
          id: 'Série de Flux',
          group: 1,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/S%C3%A9rie%20de%20Flux'
        },
        {
          id: 'Ângulos de Eliphas Levi',
          group: 1,
          contentPreview:
            'Um cálculo cabuloso para criar um símbolo que abre a dimensão _Conceito - Abismos da Sombra, alterando suas variáveis é possível abrir um portal para os outras duas dimensões Planícies da concretude e Crepúsculos Serenos',
          link: '/notes/%C3%82ngulos%20de%20Eliphas%20Levi'
        },
        {
          id: 'Divindades Ancestrais',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesAncestrais.png\r As Divindades Ancestrais, em sua majestosa natureza imortal, são seres detentores de uma inquebrantável invulnerabilidade, com tal graça concedido por Illiphar, aprisionada no âmago do Ignitário. Este é o legado benevolente dado a estes seres em virtude das deslumbrantes obras feitas por eles a Eterna.\r Enquanto todas as demais divindades se mostram suscetíveis à mortalidade, seus corpos vulneráveis podem ser profanados, membros despedaçados, ossos reduzidos a cinzas e poeira, e, assim, findam sua existência efêmera. No entanto, as Divindades Ancestrais não subsistem meramente na matéria, mas sim na esfera do conceito, onde se imortaliza sua essência indomável.\r As Divindades Ancestrais perpetuam incansavelmente sua existência, imbuidas de forma transcendente por uma filosofia enigmática e profunda. Ao se despojarem de seus envoltórios corpóreos, que elas também denominam de "receptáculos", os quais podem ser tanto objetos inanimados como seres vivos, suas Essências de Minerva se emancipam, vagando em busca de novos hospedeiros que possam acolhê-las.\r À medida que penetram nos meandros desses receptáculos, as divindades exercem um completo domínio sobre suas ações. Contudo, orientadas por um nobre senso de deferência, muitas delas optam por não cercear sua intervenção incessante, permitindo assim que os hospedeiros manifestem sua própria individualidade em momentos específicos.\r Por meio da assimilação dos hospedeiros, estas entidades divinas engendram clãs, famílias ou organizações, cujas dimensões, ainda que modestas, jamais ascendem à magnitude de uma religião. \r Não obstante, tais agrupamentos têm o poder de atrair indivíduos para sua esfera de influência, entrelaçando rituais e tradições nos quais um "poder ancestral" é transmitido de geração em geração aos seus "eleitos". Desta forma, perpetuam uma ordem contínua, garantindo ininterruptamente a presença de receptáculos para sua manifestação perene.\r Algumas destas divindades carregam espíritos mais tempestuosos, requerendo, alegadamente, o sacrifício do receptáculo ou similares, para a manutenção de sua vitalidade. No entanto, é relevante destacar que esta demanda nunca se concretizou, representando, na verdade, uma alegoria destinada a orientar os seguidores destas entidades.\r Algumas dessas divindades exibem uma benignidade cativante e atraente aos olhos, utilizando sua sabedoria ancestral para amparar os membros do clã ou família de escolhidos ao seu redor. Outras, porém, empregam tal erudição para fortalecer o grupo e erigir impérios em nome de uma bandeira ou linhagem.\r São escassas as divindades desse tipo que se mostram amistosas; a maioria delas rivaliza por território ou busca demonstrar sua superioridade e sabedoria, pouco se importando com a vida dos hospedeiros.\r Quando uma Divindades Ancestrais se encontra sem um receptáculo ou possui uma linhagem diminuta ou quase extinta, ela se torna uma divindade órfã, símbolo de fragilidade e inexperiência perante as demais divindades. É relegada como alguém que não soube preservar a ordem e a tradição dentro de seu próprio domínio, e, consequentemente, é considerada uma divindade frágil e derrotada. \r  Nomes conhecidos\r Grandes divindades ancestrais se formaram ao longo do tempo, muitas receberam parte em grandes eventos na história da terra veja abaixo a lista das mais conhecidas:',
          link: '/notes/Divindades%20Ancestrais'
        },
        {
          id: 'Divindades Arcanas',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesArcanas.png\r Esse agrupamento de celestialidades constitui a mais contemporânea manifestação divina, concebida pela benevolência de Illiphar. Estas deidades detêm a primazia sobre um recém-desvelado domínio denominado Magia, conferindo-lhes um poder ímpar e inédito.\r É sabido que a magia não se submete às injunções da adversidade, nem se vê influenciada pelas vicissitudes das Singularidades habitantes do Omniverso, tampouco pelas ações dos mortais terrenos. \r É precisamente em razão destes princípios que as divindades desse panteão em particular são aquelas que dedicaram suas essências, enquanto Singularidades, para a ciência e suas vertentes.\r Elas erguem-se como os pioneiros nesse espetro mágico, razão pela qual ostentam a mais sólida estruturação sociocultural. Fragmentam-se em cátedras que concebem as arcadas das instituições de ensino mágico, sendo secundadas pelas Ordens cardinais em níveis hierárquicos inferiores.\r Compete às prestigiosas Cátedras arcanas a imponente responsabilidade de exercer o controle sobre os Domínios da Magia, discernindo com maestria entre a Magia Branca, a Magia Obscura e a Magia Banida. Enquanto as outras divindades, desprovidas de uma cátedra própria, selecionam uma dentre essas vertentes para seguir com devoção, seu propósito transcende a mera escolha, envolvendo a elaboração de encantamentos e sortilégios, a incansável busca por fontes mágicas e a vigilância constante quanto ao emprego da magia, desempenhando essa missão sob o égide das sagradas Ordens cardinais.\r A cada ciclo da Estrela Guia, os veneráveis líderes das cátedras são despojados de suas incumbências, abrindo espaço para que a vontade soberana de Illiphar se funda a eles em uma magnânima assembleia. \r Nesse grandioso concílio, é então deliberado quem se erguerá como o novo regente da cátedra, alinhando-se às marés cósmicas que regem nosso universo enfeitiçado.\r As Divindades Arcanas que, desprovidas de uma cátedra, vagam à margem da norma, são tachadas de rebeldes, desafiando a ordem estabelecida. À luz deste cenário, os vigilantes Inquisidores de Hermes emergem como guardiães intransigentes, incumbidos da caçada implacável dessas divindades destemidas, com a finalidade de restaurar a ordem cósmica através da eliminação delas.\r Ao morrer uma Divindade Arcana culmina em um espetáculo transcendental, pois ao longo de sua existência, concede generosamente seus dons aos mortais, infundindo-os com o poder mágico que reverbera entre os reinos. A cada evocação de um feitiço, um elo sutil se forma, extraído do vigor da divindade daquela esfera mágica, garantindo o sucesso da conjuração por meio da drenagem controlada de sua força vital.\r Quando os lampejos de sua essência começam a vacilar, essas divindades insigne buscam refúgio nas nascentes de magia, esses oásis protegidos pelos diligentes Inquisidores de Hermes, onde podem restaurar e revitalizar suas energias debilitadas.\r A despeito das lendas que perpassam a mitologia arcaica, sugestionando que os espíritos exangues das Divindades Arcanas vagueiam até um cemitério celestial, onde o proeminente Hermes, a primordial dentre as divindades arcana, oferece a eles repouso final, tal narrativa carece de provas substanciais. Seja como for, as brumas do enigma envolvem tanto a existência desse cemitério celeste quanto a figura enigmática de Hermes.\r Aqueles que encontram seu fim sob as lâminas afiadas dos destemidos Inquisidores se dissipam em uma esplêndida explosão, assemelhando-se a uma supernova mágica. Nesse derradeiro instante de transformação, os céus se iluminam em um espetáculo cósmico, dando origem a uma profusão de seres celestiais, que anteriormente habitavam as mais enigmáticas esferas do espírito daquele que partiu.\r Outra vertente, destituída de cátedra, emerge como a derradeira divisão - os renomados Emissários de Equitaria. Eles, devotados aos desígnios do iluminado Ignitário, dedicam-se à árdua missão de desvelar os mistérios entrelaçados ao enigma do Cataclisma Mágico. \r Sua jornada intrépida os conduz pela senda do entendimento, em busca de desvendar os véus que encobrem os resquícios desse evento transcendental, e meticulosamente mapear os amplos ecos que reverberaram através do tecido da realidade.',
          link: '/notes/Divindades%20Arcanas'
        },
        {
          id: 'Divindades da Guerra',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesDaGuerra.png\r Claro! Vou fazer algumas melhorias no seu texto. Aqui está a versão revisada:\r ---\r **Domínios do Ódio e do Caos: As Divindades da Guerra**\r Controladas pelos domínios do ódio e do caos, estas divindades nasceram para a batalha e para a guerra. Seu papel primordial é a morte; empunhar uma espada e lutar são seus maiores deveres. Equitaria concede a essas divindades o poder de controlar a ira e incitar a raiva nos corações dos que vivem, com o objetivo de provocar a guerra.\r No âmago dessas divindades, existe uma vontade inerente de causar a guerra. Para elas, a guerra representa o fator da mudança, e na batalha, encontram a beleza da morte por uma nobre causa. No entanto, seus ideais e desejos frequentemente são interpretados como corruptos ou tortuosos pela maioria das pessoas. Seus senhores, cegos pela raiva e sede de sangue, buscam convencer os grandes líderes de onde habitam a empreender guerras e trazer avanços para a humanidade.\r Os seguidores dessas divindades possuem hábitos tribais, e rituais brutais envolvendo sangue e carne são comuns entre eles. Existe também uma cultura que considera o corpo como arma. Os grandes líderes religiosos que seguem essas divindades possuem físicos monumentais e são versados nas artes da batalha manual.\r Com o advento da artilharia, algumas dessas divindades começaram a desenvolver um manifesto chamado de "As 9 Batalhas e as 7 Espadas". Esse manifesto foi compartilhado com alguns de seus seguidores como inspiração, permanecendo oculto entre os grandes nomes dessa arte. Ele inspirou revoluções militares e estratégias, como o uso da pólvora e a arte da guerra.\r Apesar de sua insaciável sede de sangue, guerra e caos, essas divindades apenas incitam conflitos e matança sob as ordens de Equitaria. Ela é a única com a Val concedida pelo Desconhecido para legitimar ou não uma luta, sempre com o foco de completar o Grande Plano.\r As guerras favoráveis ao Grande Plano são, portanto, legítimas e conhecidas como "Sanctum Proelium". As Divindades que lideram tais batalhas são aquelas que interpretam os sinais das estrelas, especialmente da grande Estrela Guia, que revela o destino da Eterna.\r Já as guerras que não estão alinhadas com o Grande Plano, sejam elas resultado de interpretações celestiais equivocadas ou da mera vontade de uma divindade isolada, são chamadas de "Bellum Stultorum". Nesse caso, um concílio entre as Divindades da Guerra e as Vontades pode ocorrer, podendo resultar na expulsão ou aniquilação da divindade que inspirou o conflito.\r ---\r Espero que essas alterações tenham aprimorado o seu texto! Se precisar de mais ajustes ou tiver outras solicitações, esto',
          link: '/notes/Divindades%20da%20Guerra'
        },
        {
          id: 'Divindades das Artes',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesDasArtes.png\r Domínio da Criatividade: Divindades ligadas às artes, música, poesia e inspiração artística.\r As divindades criativas de systempunk, forças animadas e felizes que permeiam o universo dando aos seres a alegria da criatividade.\r Sua presença em meio aos mortais é inspiradora e cativante, os que tem o prazer de se encontrar presencialmente com uma dessas divindades se sentem inspiradas a se expressar artisticamente.\r Seus seguidores são pacíficos mas grandes em suas obras, composições, livros e quadros enfeitam os locais onde os seguidores se reúnem, sendo geralmente teatros, museus ou ateliês.\r Movidos por essas forças que desejam se expressar as pessoas, tocadas por essas forças, tem surtos criativos e se colocam a fazer',
          link: '/notes/Divindades%20das%20Artes'
        },
        {
          id: 'Divindades do Caos',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesDoCaos.png\r Domínio do Caos: Divindades imprevisíveis e disruptivas, representando o caos e a mudança constante.',
          link: '/notes/Divindades%20do%20Caos'
        },
        {
          id: 'Divindades do Conhecimento',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesDoConhecimento.png\r Domínio da Sabedoria: Essas divindades representam a busca pelo conhecimento, aprendizado e descoberta.',
          link: '/notes/Divindades%20do%20Conhecimento'
        },
        {
          id: 'Divindades Elementais',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesElementais.png\r Dominios dos elementos: essas divindades representam os elementos primordiais e tem poder sobre eles, como fogo, agua terra e ar.',
          link: '/notes/Divindades%20Elementais'
        },
        {
          id: 'Divindades Místicas',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesMisticas.jpg\r Domínio dos Mistérios: Divindades enigmáticas e místicas, guardiãs de segredos antigos e mistérios ocultos.',
          link: '/notes/Divindades%20M%C3%ADsticas'
        },
        {
          id: 'Divindades Naturais',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesNaturais.png\r Dominios da vida e morte: divindades responsaveis por supervisonar o ciclo da vida, morte e renovação da natureza',
          link: '/notes/Divindades%20Naturais'
        },
        {
          id: 'Divindades Neutras',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesNeutras.png\r Divindades sem um domínio especifico, por não terem tido relevância o suficiente não possuem poderes significativos nesta dimensão.',
          link: '/notes/Divindades%20Neutras'
        },
        {
          id: 'Divindades Temporais',
          group: 5,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !DivindadesTemporais.png\r Domínios do tempo: Essas divindades conseguem controlar o tempo, se movendo livremente dentro dele.',
          link: '/notes/Divindades%20Temporais'
        },
        {
          id: '_Conceito - Panteões Maiores',
          group: 5,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/_Conceito%20-%20Pante%C3%B5es%20Maiores'
        },
        {
          id: '_Conceito - Panteões menores',
          group: 6,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/_Conceito%20-%20Pante%C3%B5es%20menores'
        },
        {
          id: '_Conceitos - Divindades',
          group: 7,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Divindades.png\r Na antiguidade, existiram seres de poder inigualável que provinham de uma dimensão superior conhecida como Abyssethar. No entanto, foram restringidos a uma existência mais limitada dentro do que é chamado de Eterna, seu próprio objeto de trabalho.\r Após serem atraídos para esse lugar através das artimanhas de Aevum Primus, esses seres de poder inigualável, conhecidos como Singularidade, foram confinados nessa dimensão inferior juntamente com suas próprias criações, tornando-se meras Divindades.\r Cada divindade, com base em suas criações passadas, recebe as graças de Illiphar tendo o dom de controlar um aspecto especifico da Eterna.\r Algumas divindades controlavam a matéria outras o ar e algumas não recebiam nenhum poder especifico, podendo assim dividi-las em subgrupos conforme listado abaixo:\r * Divindades Elementais\r * Divindades Temporais\r * Divindades Naturais \r * Divindades da Guerra\r * Divindades Arcanas\r * Divindades Ancestrais\r * Divindades do Conhecimento\r * Divindades das Artes\r * Divindades do Caos\r * Divindades Místicas\r * Divindades Neutras\r Cada um desses subgrupos forma os Panteões gerais, além das suas características de poder, as divindades possuem as características de personalidade, essas características fazem com que algumas Divindades se aproximem umas das outras criando assim os Panteões menores.\r Veja que as Divindades caidas não estão listadas, isso se da pelo fato que a existência delas é ignorada e negligenciada afim de evitar que sejam libertadas.\r Algumas divindades escolhem utilizar seus aspectos para auxiliar a vida no universo, dando o ar de sua graça em diversos locais da Eterna, entretanto, isso não é um consenso entre elas, ainda assim existem divindades que buscam o caos ou simplesmente descontar suas amarguras nas criações das demais. Assim surgiram as divindades benevolentes e as malevolentes.',
          link: '/notes/_Conceitos%20-%20Divindades'
        },
        {
          id: 'Abyssethar',
          group: 8,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Plano existencial acima de tudo, onde habita o Ignitário e todos as suas Singularidades forjadoras  \r abyss" (abismo) e "ethar" (essência ou ser)',
          link: '/notes/Abyssethar'
        },
        {
          id: 'Dimensão Inferior',
          group: 8,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Dimens%C3%A3o%20Inferior'
        },
        {
          id: 'Ethereon',
          group: 9,
          contentPreview:
            '!Ethereon.png\r  Introdução\r Em meio às vastas _Conceito - Planícies da concretude|planícies da concretude, ergue-se uma dimensão desprovida de cores, onde predomina um imenso vazio branco que se estende até onde a visão alcança. Esse cenário enigmático está envolto por uma névoa suave, que empresta uma aura de mistério e serenidade ao ambiente. \r Nesse lugar transcendental, todas as almas, independentemente de sua jornada terrena, são levadas a atravessá-lo antes de encontrarem seu destino final. É como se fosse um limiar necessário para a próxima fase de sua existência cósmica. \r No entanto, nesse reino entre mundos, apenas um ser solitário se faz presente: o andarilho conhecido como Nihilus. Ele é o guardião supremo e o guia das almas, incumbido de conduzi-las através das camadas sutis do além, orientando-as em direção à sua próxima morada. Sua presença silenciosa, por vezes impenetrável, transmite uma sabedoria ancestral e uma compreensão profunda da essência das almas que o procuram.\r Nihilus, cujo nome evoca o próprio vazio primordial, personifica tanto a ausência quanto a completude, desempenhando um papel vital nesse ecossistema cósmico. Ele é testemunha das histórias e experiências de todas as almas que cruzam seu caminho, assimilando em si as dores, as alegrias, os desejos e as esperanças que permeiam cada trajetória singular.\r Todas as almas que já vagaram por Prismora, com exceções das que tiveram vida puríssima, ao de um dia se encontrar perdidas nessa dimensão, sofrendo a solidão completa enquanto aguardam o seu encontro com Nihilus.\r Desse modo, Nihilus, o guia final das almas, caminha nesse terreno entre dimensões, abraçando a solidão e a vastidão do seu propósito sagrado. Sua figura enigmática é como um farol no meio do nada, um ponto de referência para aqueles que buscam compreender o destino que os aguarda além da névoa branca.\r  Geografia\r !Ethereon_1.png\r Estendendo-se a partir de uma antiga e destruída fonte, revela-se uma vastidão embranquecida que se perde de vista. É possível discernir as ondulações no terreno, pois sua tonalidade é mais escura; no entanto, a visão do horizonte se assemelha à contemplação de um deserto interminável e enevoado.\r A geografia dessa dimensão é notavelmente simples, apresentando apenas vales, dunas e montanhas desprovidas de vegetação, todas elas indistinguíveis e monótonas.\r Criado com a finalidade de impor punição às almas antes de adentrarem nos Crepúsculos Serenos, este lugar possui uma física peculiar. As almas errantes são incapazes de se encontrar, mesmo que caminhem em direção ao mesmo ponto. Elas nunca se cruzarão, pois o solo as conduz imperceptivelmente a destinos diferentes. A menos que seja a vontade de Nihilus, algumas delas podem se encontrar, porém, nunca resulta em algo agradável.\r Quando as almas finalmente alcançam Nihilus, sua jornada chega ao fim. Ele as conduz à fonte para que possam saciar sua sede, e quando elas erguem a cabeça para expressar gratidão, percebem que se encontram na dimensão a que foram destinadas. Acima desta dimensão esta Prismora.\r  Localizações importantes\r Como mencionado anteriormente, o único elemento construído neste local é uma fonte conhecida como Vitália. Ela se torna um ponto de encontro para todos os seres que nascem e morrem, servindo como uma solução final para a sede das almas errantes, como uma recompensa por terem resistido e não sucumbido ao Domínio dos Renegados.\r Ao seu redor, existem ladrilhos que se integram gradualmente à paisagem até desaparecerem. A fonte, no estilo grego, está bastante desgastada pelo tempo, e a água não flui mais por ela, mas é possível observar os vestígios de sua passagem.\r A água estagnada na fonte apresenta um aspecto turvo e esverdeado, porém é o necessário para que as almas penitentes possam saciar sua sede.\r Não muito distante do final do labirinto existe o Forte dos ossos uma grande forte que já se encontra em partes arruinado, ele funciona como uma espécie de farol entre os planos, todos os que chegam ao ethereon de forma não convencional surgem no luxuoso salão de jantar como convidados de Nihilus\r  Fauna\r Mesmo sendo um deserto de vastidão infinita, animais, monstros até mesmo um ser ancestral pode ser encontrado neste local. Abaixo você pode ver a lista dessas criaturas.\r  Fenescorte\r Seu nome composto pelos nomes Feneco, uma raposa tipica do deserto e Scorte (Em português Escolta), é um ser sorateiro e igualmente silencioso que acredita-se que habita Ethereon, não é possivel se afirmar como eles nascem ou onde habitam, ja que os mesmos so aparecem entorno de andarilhos que estão proximos ao esquecimento.\r Eles circundam as almas errantes, ajudando-as a não afundar nas areias deste grande limbo, quando não a mais o que ser feito, acredita-se que elas escoltam as almas que se perderam até o Domínio dos renegados.\r Conforme detalhado pelo estudioso das artes místicas Clavis Artesanus, os Fenescorte são muito similares aos Fenecos do Deserto, a unica variação em sua aparencia é que seu pelo é totalmente branco, não sendo possivel definir onde começa seu corpo e onde termina o horisonte, suas pernas finas e com menos pelos, parecem se desfazer nas areias deste local, dando a impresão que eles são alucinassoes ou parte da propria areia que se molda\r Por mais que sua natureza seja desconhecida, eles não costumam atacar nem mesmo quando atacados, não a registros de nenhuma morte por essa espécie.\r Para mais informações consulte Fenescorte, lá é possível encontrar dados para utilizá-lo como personagem em uma campanha.\r  Skarneon - o deus do esquecimento\r Um grande escorpião que habita as masmorras do Forte dos ossos, suas garras e ferrão estão acorrentados ao chão no local mais frio e escuro que a nesta dimensão.\r É crucial impedir que ele se levante e va para ethereon pois, seu desejo é afundar almas, com suas garras ele se enterra nas areias e persegue as almas quando as alcança ele as puxa rapidamente para baixo da areia e os arremessando para o Domínio dos renegados entretanto, a alma sem guia não consegue encontrar o caminho até a Bahia dos esquecidos e por isso elas se perdem eternamente no largo Rio Stix\r  Flora',
          link: '/notes/Ethereon'
        },
        {
          id: 'Primordiz',
          group: 9,
          contentPreview:
            '!Primordia.png\r  Introdução \r Há muito tempo, nas profundezas da dimensão primordial, uma cena deslumbrante se revela diante dos olhos. Um vasto manguezal se estende além do horizonte, mergulhado em uma atmosfera enigmática e mística. O ar úmido está impregnado com o aroma das resinas das árvores imponentes, enquanto os densos ramos e raízes formam um intrincado labirinto.\r Os Guerreiros espirituais, vestidos em armaduras desgastadas e adornados com símbolos sagrados das religiões antigas, patrulham com solenidade as terras do mangue. Eles possuem uma aura de poder e sabedoria, seus passos leves e graciosos ecoam suavemente no solo encharcado. Cada movimento é meticulosamente calculado, demonstrando uma profunda conexão com a natureza ao seu redor.\r Ao lado dos Guerreiros espirituais, caminham as Visionárias Cegas, moças de beleza serena e mistério envolvente. Embora desprovidas de olhos físicos, sua presença irradia uma aura de compreensão e percepção além do comum. Seus cabelos esvoaçam ao vento, e seus passos são suaves e confiantes, guiadas por uma visão interior que transcende as limitações da visão física.\r Em harmonia, guerreiros e visionárias exploram o manguezal sagrado em busca do precioso Etherisil. A luz do sol penetra entre as copas das árvores, criando feixes de luz dourada que dançam sobre a superfície das águas tranquilas. O ambiente é pontuado por raios de sol filtrados pela densa vegetação, criando um jogo de sombras e reflexos que confere uma atmosfera etérea ao local.\r À medida que avançam pelas trilhas sinuosas, as Visionárias Cegas manifestam sua conexão única com o âmago da existência. Em silêncio, elas identificam os pontos onde a concentração do Etherisil é mais forte. Seus dedos delicados percorrem os troncos das árvores, as raízes entrelaçadas e a lama macia do manguezal, em busca das ressonâncias sagradas que só elas podem sentir.\r Os Guerreiros espirituais, com olhares firmes e determinados, oferecem orientação e proteção às Visionárias Cegas. Juntos, eles coletam o Etherisil com reverência e cuidado, sabendo que esse material raro e precioso é a própria essência da alma, uma manifestação do Desconhecido que sustenta a criação e a individualidade.\r Enquanto as Visionárias Cegas e os Guerreiros espirituais completam sua busca sagrada, as visionárias moldam as almas usando a agua do mangue, Etherisil e lama. As almas recém-formadas vagam livremente pela dimensão. Como faíscas de luz em busca de seu propósito, elas exploram o manguezal e além, em uma jornada cósmica até que a vontade do Desconhecido as toque e sua dança culmine em um corpo recém-nascido que habita Prismora.\r Quando as almas encontram seus destinos, ocorre uma fusão sagrada. O Etherisil, moldado pela energia das Visionárias Cegas e pelos segredos de Primordiz, infunde-se nos corpos recém-nascidos, concedendo-lhes vida, individualidade e um propósito único. É assim que a harmonia entre Guerreiros espirituais, Visionárias Cegas e almas recém-nascidas dá continuidade ao ciclo eterno de criação e evolução dos Domínios etéreos.\r  Geografia\r Uma vasta planície, completamente nivelada, com exceção de um imponente morro que se ergue acima das águas, exibindo solo fértil e uma vegetação exuberante. A água, turva e lamacenta, atinge a altura dos calcanhares, emanando do topo do morro localizado no centro desse lugar intrigante, porém, seu destino permanece invisível aos olhos.\r As majestosas árvores, conhecidas como Celestina, erguem-se altas e imponentes. Suas raízes emergem do solo úmido, elevando os troncos a vários metros acima do chão. O tronco, por sua vez, é simplesmente um emaranhado de raízes que se estende até a copa, espalhando-se em galhos repletos de folhas.\r Esse lugar é envolto por um entardecer eterno, onde a noite nunca se faz presente.\r  Locais\r Além das vastas águas, o local que se destaca é o morro central, uma elevação de terra que se destaca com quatro nascentes de água fluindo a partir do seu centro. Ao redor, um espetáculo para os olhos: belas flores da espécie Esperança adornam a paisagem. É importante ressaltar que este é o único lugar em todo o universo onde essas flores têm o privilégio de nascer.\r Outra localidade de destaque nessa dimensão é conhecida como "a borda". Nesse ponto específico, as árvores começam a rarear ou desaparecer gradualmente, enquanto as águas tornam-se mais rasas, até que o horizonte começa a desvanecer-se. É nessa região que os Guerreiros Espirituais  começam a desaparecer progressivamente, acompanhados por suas Visionárias Cegas. Há uma crença de que, nesse momento, eles retornam como árvores em algum lugar dessa dimensão e a quantidade de raízes que tocam o chão representa a quantidade de almas que eles ajudaram a moldar, embora não haja provas concretas que sustentem essa teoria.\r Ao longo dessa dimensão, dispersos estrategicamente, encontram-se os Portal de Esfora. Esses são obeliscos misteriosos que desempenham o papel de guiar as almas recém-nascidas para seus destinos adequados. Esses portais cósmicos servem como marcadores para direcionar essas almas embor sua jornada transcendental.\r  Acessos\r Não existe um ponto de acesso direto a esta dimensão. Os acessos que foram construídos em Prismora durante o Grande exílio foram permanentemente fechados por ordem de Orcrus X. Agora, restam apenas os acessos das Divindades, localizados na última camada dos Crepúsculos Serenos. Assim, a entrada para essa dimensão se limita exclusivamente aos portais utilizados pelas Divindades nessa camada específica.\r A saída dessa dimensão também não é algo simples. A única forma conhecida de deixá-la é adentrando um dos obeliscos e encarnando no lugar de uma alma. No entanto, de acordo com o Tratado Universal das Divindades, essa ação é terminantemente proibida e causa uma profunda repulsa. Por essa razão, os indivíduos conhecidos como Eternívoros são perseguidos implacavelmente até o ponto de sua eventual morte. Quando isso ocorre, eles são levados para o Domínio dos Renegados, onde sua existência gradualmente cai no esquecimento.\r  Pessoas notórias\r Eventualmente todos os Guerreiros espirituais juntamente com suas Visionárias Cegas acabam saindo dos limites da dimensão eventualmente porém existem 3 nomes que sempre são lembrados nas mentes dos que por ali passam\r  Ito e Otu os eternos\r Um guerreiro e sua visionária que nunca se perderam e que se mantém próximos ao morro das esperantista\r  Verla a visionária sem andarilho\r  Gor o guerreiro que busca',
          link: '/notes/Primordiz'
        },
        {
          id: 'Prismora',
          group: 9,
          contentPreview:
            '!Prismora.png\r  Introdução \r A realidade é um vasto campo de existências onde todas as formas de vida vagam sobre a _Conceito - Planícies da concretude|planícies da concretude. É um tecido complexo e interconectado, composto por infinitas camadas de experiências, eventos e percepções que se entrelaçam em um intrincado emaranhado de possibilidades. \r Nessa tapeçaria de realidade, cada ser e objeto possui uma história única, entrelaçada com as histórias de todos os outros seres e objetos que coexistem neste imenso palco cósmico. É um universo de infinitas interações, onde a causa e o efeito se entrelaçam em uma dança intricada, moldando e redefinindo constantemente o curso dos acontecimentos.\r A realidade é um espelho multifacetado que reflete as escolhas, os sonhos, as esperanças e os medos de todos os seus habitantes. É um espaço onde a dualidade encontra equilíbrio, onde luz e sombra, alegria e tristeza, ordem e caos se entrelaçam para criar um panorama completo e complexo.\r Cada ser vivo é uma centelha de consciência imersa nesse vasto mar de realidade, explorando seus limites, desvendando seus segredos e contribuindo para a teia da existência. É um convite constante à exploração, à descoberta e à compreensão das leis que regem esse intricado jogo da vida.\r Na realidade, o tempo flui como um rio incessante, carregando consigo as marcas do passado, as promessas do futuro e as possibilidades do presente. É um eterno presente em constante transformação, onde o passado molda o futuro e o futuro lança suas raízes no passado.\r Assim, a realidade é uma sinfonia em constante evolução, uma dança cósmica em que cada ser desempenha seu papel único. É um convite para explorar, questionar, sonhar e criar, enquanto nos maravilhamos com a complexidade e beleza desse imenso palco da existência.\r Acima dela esta Primordiz',
          link: '/notes/Prismora'
        },
        {
          id: '_Conceito - Planícies da concretude',
          group: 9,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r as 3 camadas dos _Conceito - Domínios Etéreos|Domínios Etéreos que moldam a realidade',
          link: '/notes/_Conceito%20-%20Plan%C3%ADcies%20da%20concretude'
        },
        {
          id: 'Ascendora',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Unitarius_Conceito - Crepúsculo Sereno',
          link: '/notes/Ascendora'
        },
        {
          id: 'Aurorium',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Aurorium.png\r  Introdução\r No primeiro ciclo dos _Conceito - Crepúsculo Sereno|Crepúsculos Serenos, um despertar da alma ocorre, como se os olhos da própria essência se abrissem. Nesse momento, a visão da alma é libertada para o divino, banhada por uma luz dourada que proporciona uma sensação sutil de elevação e conexão com o Desconhecido.\r Nesse reino, tons azuis claros se mesclam com nevoeiros esbranquiçados, criando uma atmosfera semelhante a nuvens. Uma cidade ideal e tecnologicamente avançada emerge nesse ambiente, uma utopia perfeita em sua essência.\r É aqui que residem aqueles que vagaram por anos através de Ethereon, encontrando nesta camada uma existência feliz, livre de cansaço, dor ou doença. Nessa sociedade perfeitamente harmônica, os habitantes vivem em uma interconexão quase tecida entre si. Embora a camada superior, a Sapienscia, não seja visível para eles, os habitantes possuem a habilidade de enxergar tudo o que acontece em Prismora e têm a permissão de intervir e ajudar.\r Nessa camada dos _Conceito - Crepúsculo Sereno|Crepúsculos Serenos, a sabedoria e a compreensão elevadas se entrelaçam com a beleza e a harmonia, criando uma atmosfera de paz e plenitude. Os habitantes desfrutam de uma existência enriquecida pela cooperação e pelo compartilhamento de conhecimento, contribuindo para o florescimento de Prismora e para a evolução do universo.\r  Geografia\r Entre as névoas, diversas cidades se espalham, todas com estruturas principais semelhantes. No centro de cada cidade encontra-se uma torre imponente que se ergue até os céus, conhecida como Nexus Celestialis, uma espécie de coluna divina que as conecta a Sapienscia.\r As cidades exibem um padrão luxuoso em suas casas, mas cada uma possui um estilo arquitetônico variado e único. Ao entrar em uma cidade, os limites são claramente definidos pelas névoas nas bordas, tornando impossível avistar outra cidade.\r Para viajar entre as cidades, é preciso ter sorte ou a vontade de entrar na cidade desejada. Ao adentrar na névoa, o viajante se vê envolto em uma neblina esbranquiçada, caminhando sempre em frente até emergir em uma cidade aleatória. Acredita-se que as cidades troquem de lugar umas com as outras, criando constantemente esse entrelaçamento entre elas.\r  Pontos de acesso\r Espalhados por todo o mundo, está dimensão é de fácil acesso, alguns arriscam dizer que os alucinógenos levam as almas até lá, mas nada comprovado.',
          link: '/notes/Aurorium'
        },
        {
          id: 'Creatiônio',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Devotário_Conceito - Crepúsculo Sereno|Crepúsculos Serenos',
          link: '/notes/Creati%C3%B4nio'
        },
        {
          id: 'Devotário',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Purifis_Conceito - Crepúsculo Sereno|Crepúsculos Serenos',
          link: '/notes/Devot%C3%A1rio'
        },
        {
          id: 'Purifis',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Ascendora_Conceito - Crepúsculo Sereno|Crepúsculos Serenos',
          link: '/notes/Purifis'
        },
        {
          id: 'Sapienscia',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Assim como as Terras Médias em seus primórdios, esta dimensão é um lugar bucólico onde as almas são levadas a meditar sobre si mesmas. Pequenas casas simples se entremeiam entre as árvores, e clareiras se ocultam atrás das brumas cintilantes. \r Ao caminhar por esta floresta, de tempos em tempos, as almas se encontram com grandes mansões senhoriais chamadas de "Verdades". Cada mansão é habitada por um tipo de "Herdade", que fica exposto como um grande estandarte nos portões da mesma. \r As almas podem usar essas "Verdades" para buscar uma compreensão mais profunda de sua existência. Essa busca pode levar anos ou apenas meses. No entanto, quando encontram essa compreensão, uma escolha deve ser feita: permanecer neste plano e ajudar as demais almas de sua "Verdade" a encontrar as suas ou partir para o próximo plano, conhecido como os Serenix ainda nos arcos dos _Conceito - Crepúsculo Sereno|Crepúsculos Serenos.\r  Locais\r Listar as principais mansões e algumas casas\r  Pessoas singulares\r Listar pessoas importantes do universo\r  Fauna\r Grifos de hamelin\r Listar criaturas e raças que só existem neste lugar\r  Flora',
          link: '/notes/Sapienscia'
        },
        {
          id: 'Serenix',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r No terceiro ciclo celeste, as almas encontram um refúgio de paz e serenidade. Nessa camada celestial, uma luz suave e acolhedora envolve as almas, proporcionando um profundo senso de tranquilidade e liberação das Domínio da Inspiração Celestial preocupações terrenas.\r Creatiônio_Conceito - Crepúsculo Sereno|Crepúsculos Serenos',
          link: '/notes/Serenix'
        },
        {
          id: 'Unitarius',
          group: 10,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r _Conceito - Crepúsculo Sereno|Crepúsculos Serenos',
          link: '/notes/Unitarius'
        },
        {
          id: '_Conceito - Crepúsculo Sereno',
          group: 10,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/_Conceito%20-%20Crep%C3%BAsculo%20Sereno'
        },
        {
          id: 'Agonius',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Esfera da Agonia Constant\r No terceiro ciclo dos _Conceito - Abismos da Sombra, a dor se intensifica. Nessa camada, as almas são submetidas a tormentos físicos e mentais incessantes, mergulhadas em uma atmosfera carregada de aflição e sofrimento insuportável.\r Abaixo dele esta o terrível Pyronix',
          link: '/notes/Agonius'
        },
        {
          id: 'Anguistius',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Finalizando os abismos uma infinita estrutura labiríntica que se estende em todos os planos espaciais abriga as almas condenadas a angústia interessante e eterna desta camada dos _Conceito - Abismos da Sombra, não é possível se descrever em palavras as sensações que as almas sentem neste local, mas em síntese, é como um veneno invisível, infiltrando-se sorrateiramente na alma, corroendo qualquer resquício de serenidade. É uma sensação sufocante, como se as paredes do mundo estivessem se fechando implacavelmente, esmagando qualquer esperança ou razão.\r Nesse estado de tormento, os pensamentos se tornam como corvos negros, esvoaçando incessantemente, arrancando pedaços da mente com cada passagem. Cada respiração parece um esforço titânico, e o ar, de repente, torna-se rarefeito, como se o próprio universo conspirasse para restringir o oxigênio vital.\r A angústia é uma prisão mental, um labirinto onde cada caminho leva a lugar nenhum, onde cada esquina esconde novos horrores emocionais. A realidade se distorce, transformando-se em um pesadelo irracional, onde a paranoia floresce e o medo se agarra como garras afiadas.\r A solidão na angústia é insuportável. É como estar preso em um deserto desolado, sem água, sem abrigo, sem resgate à vista. Mesmo no meio da multidão, a pessoa que a sente está isolada em um mundo de agonia pessoal, incapaz de expressar a tormenta que a atormenta.\r Enfrentar a angústia é como lutar contra um monstro invisível que mora dentro de si. É uma jornada tortuosa, onde a esperança é apenas um lampejo fugaz e a escuridão da aflição parece infinita.\r Eventualmente, as almas condenadas tentam escapar da angústia eterna, no centro do labirinto é um lugar sombrio e opressivo. Suas paredes são feitas de pedra escura e irregular, cobertas com símbolos enigmáticos que emanam uma sensação de proibição. O ar é denso e carregado de uma atmosfera pesada de desespero.\r Os símbolos escritos na língua antiga Glypharum emitem uma luz singular de tom avermelhado que corta a escuridão do labirinto. Cada símbolo representa uma alma condenada a Anguistius.\r A sala é permeada por uma sensação infadonia, gritos de agonia e dessespero de todo o labirinto ecoam neste local, a sensação de aperto e sofrimento se almentao a cada segundo que se passa neste lugar de ar ainda mais rarefeito.\r No centro da sala, encontra-se a saída tão desejada, protegida por uma série de dispositivos de segurança. Há barreiras de energia que emitem um zumbido ameaçador, portas de aço maciço com fechaduras complexas e sentinelas espirituaisque patrulham constantemente a área.\r O chão é coberto por uma espécie de névoa misteriosa que obscurece o que está abaixo, criando uma sensação de incerteza. A iluminação é fraca, apenas o suficiente para revelar os obstáculos e os desafios que aguardam aqueles que tentam alcançar a saída. Tudo isso contribui para a sensação de que a liberdade está ao alcance, mas é extremamente difícil de ser alcançada.\r Após as almas enfrentarem todas as complexas e ameaçadoras medidas de segurança na sala central do labirinto, elas finalmente alcançam a tão esperada saída. Entretanto, o que acontece a seguir é surpreendentemente trivial e quase cômico. Ao atravessarem a porta da saída, as almas simplesmente se encontram do lado de fora do labirinto, em um lugar que parece ser uma banal e pacífica pradaria.\r Nada de armadilhas, sentinelas ou obstáculos perigosos. Em vez disso, elas se veem sob um céu claro, com o sol brilhando suavemente e uma brisa suave soprando. Há um caminho de pedra que leva a uma placa com a inscrição: "Bem-vindos à Liberdade!".\r As almas, inicialmente confusas, logo percebem que a verdadeira segurança estava no próprio labirinto, enquanto o desafio de superar todas as barreiras era uma espécie de teste para liberá-las da angústia. A simplicidade da saída contrasta fortemente com a complexidade do labirinto, tornando a situação quase cômica, com as almas finalmente apreciando o alívio de sua jornada sem sentido.\r Nessa pradaria aparentemente tranquila, as almas descobrem que o sofrimento é, na verdade, dobrado em comparação ao que experimentavam no labirinto. A ironia cruel da situação se revela quando percebem que a angústia agora não está mais relacionada a obstáculos físicos ou seguranças, mas sim a uma profunda sensação de vazio e monotonia.\r O cenário monótono da pradaria se estende infinitamente em todas as direções, sem qualquer sinal de vida, desafio ou propósito. As almas se encontram presas em um ciclo interminável de tédio e desespero, sem a esperança de retorno ao intrigante labirinto que antes as mantinha ocupadas. Nesse lugar aparentemente pacífico, o vazio se torna a verdadeira fonte de sofrimento, uma tortura mental constante que as faz ansiar por um tempo em que tinham algo pelo que lutar.\r E não se engane, neste lugar não é possível encontrar absolutamente ninguém anão ser pela brisa quente que percorre os campos.\r  Localidades\r Ainda que esta dimensão seja um grande tormento e a casa da desolação isso não impede de almas que já se acostumaram com o tormento mapearem pontos importante.\r Grande parte das localidades foram recolhidas e mapeadas por James Cook então podemos listar algumas principais localidades:\r Vila dos cômodos, Nascente de Furat',
          link: '/notes/Anguistius'
        },
        {
          id: 'Corruptis',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r No nono ciclo dos _Conceito - Abismos da Sombra, a corrupção se aprofunda. Nessa camada, as almas são mergulhadas em uma névoa de perversão e maldade, onde a essência de sua existência é distorcida e suas almas são manchadas pela depravação.\r Abaixo dele esta Despairon o ultimo ciclo',
          link: '/notes/Corruptis'
        },
        {
          id: 'Despairon',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r No décimo ciclo dos _Conceito - Abismos da Sombra, o desespero atinge seu clímax. Nessa camada, as almas enfrentam uma desolação completa, sem qualquer esperança de redenção ou libertação, presas em uma escuridão absoluta e desesperada.\r Abaixo dele esta o Destrucion',
          link: '/notes/Despairon'
        },
        {
          id: 'Desperon',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Esfera do Desespero Abissal\r No quinto ciclo dos _Conceito - Abismos da Sombra, o desespero toma conta. Nessa camada, as almas são mergulhadas em um vórtice de desesperança, onde a falta de esperança e a sensação de vazio são avassaladoras, corroendo sua existência.\r Abaixo dele esta Torturis',
          link: '/notes/Desperon'
        },
        {
          id: 'Destrucion',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r O décimo primeiro ciclo dos _Conceito - Abismos da Sombra é um reino de destruição absoluta. Aqui, as almas são sujeitas a uma devastação implacável, sendo fragmentadas e despedaçadas repetidamente, sem nunca poderem se recuperar.\r Abaixo dele esta Anguistius',
          link: '/notes/Destrucion'
        },
        {
          id: 'Odium',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r O oitavo ciclo dos  _Conceito - Abismos da Sombra é um reino de ódio inextinguível. Aqui, as almas são consumidas por uma raiva ardente e rancor, perpetuamente envolvidas em conflitos violentos e eternamente presas em um ciclo de fúria interminável.\r abaixo dele esta Corruptis',
          link: '/notes/Odium'
        },
        {
          id: 'Perdicius',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r No sétimo ciclo dos _Conceito - Abismos da Sombra, a perdição se torna inevitável. Nessa camada, as almas são confrontadas com a total aniquilação de sua essência, perdendo toda a esperança e experimentando a destruição completa de sua identidade.\r Abaixo dele esta Odium',
          link: '/notes/Perdicius'
        },
        {
          id: 'Pyronix',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Domínio das Chamas Devoradoras\r O quarto ciclo dos _Conceito - Abismos da Sombra é um reino de fogo e chamas. Aqui, as almas são imersas em um mar de chamas ardentes, onde elas são consumidas pelo fogo que representa suas paixões incontroláveis e impulsos destrutivos.\r Abaixo dele esta Desperon',
          link: '/notes/Pyronix'
        },
        {
          id: 'Remorius',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Abismo do Remorso\r No segundo ciclo dos _Conceito - Abismos da Sombra, as almas começam a sentir o peso de seus remorsos e arrependimentos. Aqui, elas são atormentadas por visões de suas ações passadas, alimentando um sentimento crescente de culpa e angústia.\r Abaixo dele esta o Agonius',
          link: '/notes/Remorius'
        },
        {
          id: 'Torturis',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r O sexto ciclo dos _Conceito - Abismos da Sombra é um reino de tortura insidiosa. Aqui, as almas são submetidas a torturas cruéis e sofrem tormentos psicológicos, onde cada momento é preenchido com dor e sofrimento inimagináveis.\r Abaixo esta Perdicius',
          link: '/notes/Torturis'
        },
        {
          id: 'Umbra',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r O primeiro ciclo dos _Conceito - Abismos da Sombra é o ponto de entrada, onde as almas adentram as profundezas sombrias do inferno. Nessa camada, elas são imersas em uma penumbra sutil, experimentando uma sensação inicial de desespero.\r Abaixo esta Remorius',
          link: '/notes/Umbra'
        },
        {
          id: '_Conceito - Abismos da Sombra',
          group: 11,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Camada baixa dos Domínios etéreos representando os 12 ciclos baixos.',
          link: '/notes/_Conceito%20-%20Abismos%20da%20Sombra'
        },
        {
          id: 'Omniverso',
          group: 8,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Omniverso'
        },
        {
          id: '_Conceito - Domínios Etéreos',
          group: 8,
          contentPreview:
            '!DominiosEterios.png\r Nas profundezas do que chamamos de realidade, estendem-se vastos campos, cada um habitado por seres, conceitos e regras singulares, distintos entre si.\r Cada uma dessas extensões revela uma unicidade primorosa, tão sublime que é uma verdadeira beleza contemplar.\r Abaixo do que denominamos como existência, encontra-se um plano de dor e sofrimento, conhecido como os _Conceito - Abismos da Sombra. \r É um reino de lamento e flagelação, onde as pobres almas que adentram são submetidas a tormentos infindáveis.\r Por outro lado, acima da existência, desdobram-se os Ciclos Opostos às Sombras, um lugar de aconchego e paz, onde as almas podem descansar eternamente. Essa esfera benevolente é denominada de Crepúsculos Serenos.\r Como luz e trevas, água e óleo, ou qualquer outro par de antônimos, essas camadas, fundamentais para a existência da realidade, são intrinsecamente opostas e se repelem. \r Essa repulsa cria um espaço intermediário, denominado de Planícies da Concretude,  onde vivemos. Essas planícies são um lugar traiçoeiro, onde tanto o bem quanto o mal podem nos influenciar.\r Portanto, não estamos acima das vontades desses ciclos, mas sim à mercê de seus ataques implacáveis. \r Nihilus, o andarilho, atua como a ponte entre os _Conceito - Abismos da Sombra e os Crepúsculos Serenos, como também a chave para escaparmos dessas camadas.\r Além desses três Dominios, existem outros dois que não estão nem acima e nem abaixo dos demais e sim em suas laterais.\r De um lado está o Domínio dos renegados lar dos esquecidos e amargurados, do outro está o que é chamado de Dimensão inferior, ela não é exatamente um domínio mas se comporta como tal.\r Ao contrário dos Dominios sequenciais, _Conceito - Abismos da Sombra, Crepúsculos Serenos e Planícies da concretude, os Dominios laterais são controlados por regras diferentes, tendo suas próprias leis da física e comportamento específico.\r Mas de modo geral ambas trata-se de um lugar para onde as almas que jamais foram encontradas por Nihilus são lançadas, mergulhando em uma existência eterna. Elas podem passar vidas inteiras nesses domínios até que o amargo esquecimento se abata sobre elas, e sua essência seja espremida novamente, transformando-se em Etherisil nas aguas de Primordiz.',
          link: '/notes/_Conceito%20-%20Dom%C3%ADnios%20Et%C3%A9reos'
        },
        {
          id: 'a.C.',
          group: 12,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/a.C.'
        },
        {
          id: 'Apunk',
          group: 13,
          contentPreview:
            '> [!info] Este conteudo não esta pronto\r > O conteudo que você esta lendo não foi revisado e finalizado por favor verifique a pagina de Notas de versão para saber mais\r !Apunk.png\r Antes do tempo, três Supra-Singularidade, criadas pelo Desconhecido, vagavam pela imensidão vazia do Abyssethar. \r Haviam Noctus, o portador das seis almas primordiais; Fringilla, o portador das cinco almas epilogais; e Illiphar, o legislador supremo.\r O vazio os incomodava profundamente, impulsionando-os a atravessar eternos vácuos temporais em busca de uma forma de preenchimento. \r Foi então que Noctus e Illiphar, trabalhando em conjunto, moldaram pequenos conjuntos de matéria nula e criaram as primeiras Singularidades. \r Essas Singularidades, dotadas de inteligência e um senso de pertencimento, receberam uma parte do poder das Supra-Singularidade.\r No entanto, Fringilla não admitia tais criações e as considerava profanas para a existência. \r Movido por sua convicção, ele começou a caçar e pulverizar implacavelmente esses seres recém-criados. \r Para facilitar seu trabalho, Fringilla forjou a Lâmina φ, uma arma capaz de desintegrar as Singularidades em matéria nula com um único corte.\r Ao tomar conhecimento desses acontecimentos, as demais Supra-Singularidade declararam guerra contra Fringilla, seu próprio irmão. \r Durante a batalha épica que se seguiu, várias Singularidades foram vencidas pela implacável Lâmina φ. \r No confronto final, Noctus e Fringilla se aniquilaram mutuamente, liberando uma torrente de poder que se espalhou por todo o Abyssethar. \r O caos reinou por alguns instantes, até que esses poderes se fundiram e se transformaram em uma chama poderosa, conhecida como Eterna.\r Illiphar, como a última Supra-singularidade remanescente, atribuiu funções às Singularidades restantes. \r Algumas foram incumbidas de moldar novas Singularidades, enquanto outras garantiam que a chama de Eterna, simbolizando a memória dos irmãos caídos, nunca se apagasse. \r Eterna, por sua vez, recebeu a missão de  espalhar as criações das Singularidades por toda sua extensão, além de ser o ponto final da jornada de tudo e todos, perpetuando assim o ciclo eterno da chama.\r Logo após colocar tudo em ordem Illiphar se juntou a seus irmãos fundando a base de Eterna, uma braseiro lustroso, similar a um templo chamado de Ignitário.\r Uma das Singularidades mais antigas, Aevum Primus, entregou-se com fervor à sua busca criativa.\r Sua dedicação incansável o conduziu ao desenvolvimento de uma ponte interdimensional, possibilitando a observação íntima de suas próprias criações. \r Ele acreditava que somente dessa maneira seria capaz de analisar e aprimorar seu trabalho com precisão.\r No ano 0,Aevum Primus finalmente conseguiu criar um meio de adentrar em Eterna. \r Ele desenvolveu uma espécie de porta interdimensional, utilizando uma estrela que foi levada ao colapso.\r Ao atravessar essa ponte entre os planos, Aevum Primus teve sua existência comprimida, seus poderes como Singularidade foram reduzidos e ele experimentou a dor mais intensa que um ser poderia suportar.\r Por decisão do próprio Illiphar base fundamental de Eterna, nenhuma Singularidade poderia adentrar o plano de Eterna sem autorização do Ignitário e por tanto Aevum Primus estava preso neste local.\r Aevum Primus, agora imerso no plano em que havia trabalhado por eras, encontrou-se em um corpo físico e sujeito às leis da Eterna, impossibilitando seu retorno ao plano anterior. Assim, ele se tornou a primeira Divindade, preso nesse novo estado.\r ---\r Movido pela frustração e ódio de não poder retornar ao seu plano superior, Aevum Primus retomou seus estudos e chegou à conclusão de que a única maneira de voltar à sua origem seria por meio do roubo de poder de outras Singularidades. Seu objetivo era absorver poder até que a chama não pudesse mais contê-lo, transcendendo assim para uma nova forma de Singularidades.\r Com tudo meticulosamente planejado, Aevum Primus deu início a um processo de manipulação, atraindo diversas outras singularidades para migrarem para o plano da chama. No entanto, Aevum Primus ainda não havia desenvolvido um método para fundir os poderes das singularidades. Como solução temporária, ele formou um grupo chamado de Ordem dos Firmamentos com mais de cem mil integrantes, selecionando alguns de confiança para serem seus aliados mais próximos. Entre eles estavam Aelon, Valorian e Solara.\r Os quatro protagonistas debatiam intensamente sobre a fusão de poderes e as possíveis consequências que poderiam surgir. Essas discussões se estenderam por anos, até que uma das divindades, Callista, ouviu secretamente o que estava sendo dito e descobriu os planos de Aevum Primus.\r Callista, preocupado com as intenções de Aevum Primus, alertou os outros divinos sobre a situação. No entanto, nem todos acreditaram em suas palavras, duvidando da veracidade do alerta. Aqueles que confiaram em Callista uniram-se a ele em um plano de fuga meticulosamente elaborado, que foi executado com maestria.\r Ao se refugiarem em um recanto remoto da Eterna, as divindades encontraram um lugar frio e vazio. Para trazer luz e calor ao ambiente, eles criaram uma estrela, nomeando-a de Sol. Além disso, eles deram origem aos planetas, que serviam como refúgio e preparação para possíveis confrontos, semelhantes a tendas de guerra.\r A "tenda" principal, onde as discussões estratégicas ocorriam, recebeu o nome de Arre. Foi lá que as divindades passaram a maior parte do tempo, discutindo táticas defensivas e medidas de espionagem contra a  Ordem dos Firmamentos, mantendo-se preparados para enfrentá-los.\r Com o passar dos anos, Aevum Primus e os membros da ordem conseguiram desenvolver um método para unir Divindades, sacrificando aqueles que se recusaram a seguir Callista para satisfazer a sua própria loucura. Embora tenham obtido o poder de dez mil divindades , Aevum Primus e seus três protegidos ainda não conseguiram retornar ao plano de origem.\r Enfurecidos e sedentos por vingança, eles partiram em busca dos fugitivos, dando início à lendária batalha entre os membros da Ordem dos Firmamentos e os Seguidores de Callista. Essa batalha se tornou um ponto de ruptura, onde as forças dos dois lados colidiram em uma luta épica e sem precedentes.\r Quando os soldados da Ordem dos Firmamentos adentraram o sistema solar, os Seguidores de Callista sentiram-se abalados diante do poder ameaçador das divindades assassinas. No entanto, esse sentimento de temor foi rapidamente substituído pela coragem quando testemunharam Callista avançando contra os inimigos, empunhando sua espada flamejante. \r Nessa batalha acirrada, muitos dos Seguidores de Callista foram apagados da existência, mas como em toda batalha, ela chegou a um fim. Callista e seus seguidores sobreviventes  se sacrificaram para proteger sua criação, selando os membros da Ordem dos Firmamentos e a quimera que Aevum Primus avia se tornado em uma Dimensão inferior, conhecida por muitos como inferno, lá ele almeja a liberdade e a vingança.\r Após a batalha, houve um breve período em que a chama não abrigava mais Divindade. No entanto, a cada dia, novas singularidades caíam nas antigas armadilhas criadas por Aevum Primus, ascendendo à condição de divindades.\r O sistema solar, agora desprovido de divindades, testemunhou o resfriamento rápido dos planetas que outrora ferviam com poder. Por volta de 15.000 a.C., a vida emergiu em Arre, mas de uma forma grotesca e deformada. Criaturas agonizantes surgiam de lagos radioativos, vagando pela terra, clamando pelo fim de sua existência.\r Após milênios arrastando-se pelo solo, uma divindade recém-chegada do plano da chama, conhecida como Hego, o Deus da Vida, vagava próximo ao sistema solar e ouviu, ao longe, os gemidos de desespero das criaturas que habitavam a terra, suplicando pela morte. Aproximando-se, a divindade contemplou aqueles seres deixados para trás e esquecidos por seus criadores, decidindo ajudá-los ao remodelá-los em formas mais evolutivamente adequadas.\r Com o retorno de uma divindade ao planeta, o núcleo do mesmo se acalmou, levando à estabilização do clima e tornando a superfície mais propícia à vida. Quando a tranquilidade se instalou, Hego subiu a montanha de Akróma, localizada no coração do planeta, e começou a moldar novamente as criaturas.\r Hego deu início à criação das plantas, uma vez que o mundo ainda era um deserto árido e estéril. Espalhando-as por toda Arre agora batizada de Terra, ele deu início a uma cadeia alimentar que envolvia seres e criaturas. Esse sistema era impecável e perfeitamente equilibrado, o melhor que já existira até então. No entanto, Hego ainda não se sentia satisfeito com seus desejos e aspirações.\r Antes de se tornar uma divindade, Hego era a singularidade responsável pela criação de sistemas complexos. No entanto, seus projetos nunca foram aprovados pelo alto conselho. Agora, livre das restrições impostas, ele poderia realizar seus testes e observar o funcionamento de perto. Assim, Hego criou os humanos, dedicando-se minuciosamente desde a estrutura óssea até o cérebro capaz de aprender e transmitir conhecimento.\r Para que os testes fossem bem-sucedidos, Hego deixou os humanos por sua própria conta e risco, sem interferir diretamente em suas ações. Inicialmente, ele criou quatro grupos de humanos que se espalharam e multiplicaram rapidamente. Em menos de dois mil anos, os humanos já haviam ocupado todos os cantos da Terra, mas ainda não haviam progredido significativamente no campo do conhecimento. Eles estavam estagnados em seu desenvolvimento intelectual.\r Por volta de 1900 a.C., Hego estava realizando suas anotações rotineiras sobre o progresso de seu experimento quando fez uma descoberta surpreendente. Em uma cratera de um antigo vulcão, ele encontrou um ser que não se lembrava de ter criado, mas que claramente era humano. Intrigado, ele se aproximou para conversar com o ser, que se apresentou como Fallmora.\r Hego, curioso, procurou pela assinatura genética do criador no código de Fallmora e para sua surpresa, encontrou a sua própria assinatura. Diante desse achado intrigante, ele permitiu que Fallmora continuasse a viver, embora restringindo sua permanência apenas à cratera. Hego não tinha certeza sobre a verdadeira natureza de Fallmora e preferiu não arriscar sua interação com o resto do mundo até entender melhor quem ela era.\r Hego começou a visitar frequentemente a cratera para monitorar o ser chamado Fallmora. Ele observou que Fallmora possuía habilidades notáveis no campo da medicina, o que despertou grande interesse em Hego. Ele percebeu que a partir desse encontro fortuito, algo promissor poderia se desenrolar e marcar um avanço significativo em sua criação.\r Intrigado pela habilidade medicinal de Fallmora, Hego decidiu estudar de perto suas práticas e observar como ela aplicava seus conhecimentos no cuidado com outros seres humanos. Ele reconheceu que a contribuição de Fallmora poderia ser um passo crucial no desenvolvimento e progresso da espécie humana. A partir desse ponto, a interação entre Hego e Fallmora se tornou uma troca constante de conhecimentos e experiências, com ambos trabalhando em conjunto para impulsionar o avanço na medicina e em outros campos do conhecimento humano.\r Em questão de meses, Hego criou os mais aterradores pesadelos que os humanos poderiam imaginar. Um deles era Cyprianus, uma modificação de um peixe humanoide alado. Cyprianus possuía impressionantes doze metros de altura e quase uma tonelada de peso. A ele foi confiada a essência da primeira árvore, que carregava o poder do cosmos, permitindo que Cyprianus criasse criaturas menores e mais fracas.\r',
          link: '/notes/Apunk'
        },
        {
          id: 'Biohackerpunk',
          group: 13,
          contentPreview:
            ">[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Biohackerpunk.png\r **Início:**  \r Após o colapso causado pelo fungo geneticamente alterado na era **Biopunk**, os remanescentes da humanidade enfrentaram um dilema existencial. Governos e corporações, desesperados para controlar a crise, começaram a implementar tecnologias biológicas invasivas. Usando conhecimentos das eras anteriores, eles desenvolveram sistemas de monitoramento genético e dispositivos implantáveis para suprimir a disseminação do fungo e regular a biologia humana. Isso, no entanto, levou ao surgimento de grupos rebeldes conhecidos como **biohackers**, que lutavam contra o controle opressivo.\r **Auge:**  \r Os biohackers criaram uma contracultura baseada em experimentação biológica independente. Usando técnicas clandestinas e ferramentas improvisadas, eles começaram a alterar suas próprias genéticas e as de seus aliados para resistir ao controle dos governos. Pequenos avanços permitiram que alguns grupos neutralizassem partes do fungo ou reprogramassem organismos para ajudar na sobrevivência. Essa resistência inspirou comunidades inteiras a se rebelarem, criando uma rede global de resistência biológica.\r **Queda:**  \r O confronto entre os biohackers e os governos intensificou-se, levando a atos extremos de sabotagem biológica. Muitos experimentos rebeldes saíram de controle, resultando em mutações instáveis e ecossistemas devastados. Ao mesmo tempo, os sistemas governamentais começaram a falhar, pois as tecnologias de controle biológico eram frequentemente hackeadas e revertidas contra eles. O mundo mergulhou ainda mais no caos, preparando o terreno para a **Biopunk Rebellion**, onde uma guerra total contra as megacorporações tomaria forma.\r Uma era em que a manipulação genética e a engenharia biológica são predominantes, com grupos de biohackers desafiando a ética e os limites da ciência.''Biopunk Rebellion",
          link: '/notes/Biohackerpunk'
        },
        {
          id: 'Biopunk Rebellion',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !BiopunkRebellion.png\r **Início:**  \r O mundo chegou a um ponto de ruptura. A resistência liderada pelos **biohackers** e o desespero da humanidade resultaram no surgimento de rebeliões globais. As megacorporações, responsáveis pela manipulação genética e pela exploração biológica desenfreada, tornaram-se alvos diretos. As revoltas começaram em regiões devastadas, onde comunidades inteiras se recusaram a aceitar a dominação das corporações que prometiam a cura para o fungo, mas que na verdade perpetuavam sua existência para manter o controle.\r **Auge:**  \r A resistência se organizou em movimentos globais, unindo cientistas dissidentes, biohackers e sobreviventes de comunidades isoladas. Armados com tecnologias biológicas improvisadas, esses grupos atacaram laboratórios, destruíram fábricas de manipulação genética e libertaram populações inteiras do controle corporativo. A guerra atingiu um nível de intensidade sem precedentes, com mutações genéticas sendo usadas como armas e ecossistemas inteiros sendo transformados em campos de batalha vivos.\r **Queda:**  \r Embora a rebelião tenha conseguido desestabilizar as megacorporações, o custo foi alto. Muitos dos avanços biotecnológicos usados pelos rebeldes tiveram consequências imprevisíveis, causando mutações devastadoras em larga escala. A destruição das principais infraestruturas corporativas mergulhou o mundo em uma crise ainda mais profunda. No vácuo deixado pelas corporações, a humanidade enfrentou uma nova fase de controle emergente, marcada pela introdução de **nanotecnologia**, inaugurando a era **Nanopunk**, onde a luta pelo controle biológico e tecnológico se intensificaria.\r Uma era de rebelião contra o domínio das megacorporações, com grupos de ativistas utilizando biotecnologia e manipulação genética para desafiar o status quo e lutar por liberdade e justiça.Nanopunk',
          link: '/notes/Biopunk%20Rebellion'
        },
        {
          id: 'Biopunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Biopunk.png\r **Início:**  \r Com os recursos tecnológicos esgotados e a instabilidade crescente, cientistas de remanescentes das megacorporações e grupos independentes voltaram-se para a biologia como última esperança de reconstrução. Novas pesquisas focaram em manipulação genética, criando humanos mais resilientes e sistemas biológicos que poderiam substituir máquinas. Essa abordagem deu origem a uma sociedade onde a biotecnologia moldava a sobrevivência.\r **Auge:**  \r Os avanços em biotecnologia trouxeram inovações que salvaram muitas comunidades. Plantas geneticamente modificadas começaram a purificar o ar e a água, enquanto organismos híbridos eram usados como transporte e ferramentas. Grupos de elite criaram novas linhagens de humanos, projetados para resistir a doenças, adaptar-se a ambientes extremos e até combater as criaturas da era **Weird Gothicpunk**. Essa era viu um breve florescimento de comunidades baseadas em biologia sustentável, com a promessa de uma nova forma de convivência harmônica com o ambiente.\r **Queda:**  \r A manipulação excessiva da biologia humana e ambiental trouxe consequências devastadoras. O surgimento de um fungo geneticamente alterado espalhou-se rapidamente, destruindo plantações e ameaçando a vida humana. Cientistas tentaram conter o desastre, mas as mutações tornaram o fungo ainda mais perigoso. Comunidades começaram a sucumbir, enquanto a luta pela sobrevivência se tornava ainda mais feroz. Alguns grupos recorreram a medidas extremas, como o congelamento de humanos para a posteridade, enquanto outros tentaram usar biotecnologia experimental para deter o avanço do fungo, marcando o início da **Biohackerpunk**, onde a resistência humana atingiria níveis desesperados.\r Biohackerpunk',
          link: '/notes/Biopunk'
        },
        {
          id: 'Bronzepunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Com o colapso das fortificações, os habitantes e criaturas do Canyon dispersaram-se, formando as primeiras tribos segregadas. Ao longo dos anos, por meio da seleção natural e do desenvolvimento de características adaptadas a cada região, surgiram os primeiros reinos e impérios. Cada um desses domínios possuía suas próprias técnicas de governança, linguagem e religião. O fim dessa era ocorre com a queda de dois grandes reis da época e a ascensão gloriosa do império dourado.\r !Bronzepunk.png\r **Início:**  \r Após o colapso de Fallmora e a destruição das primeiras tribos, os sobreviventes recomeçaram suas vidas usando, de forma precária, os remanescentes da antiga tecnologia.\r **Auge:**  \r A Idade do Bronze viu o florescimento dos três reinos. Abismarca prosperou com sua mineração subterrânea, tornando-se o coração da indústria; Aureum Sanctus cresceu em riqueza e influência, sua cultura dourada espalhando-se por toda a região; Trivale tornou-se o principal centro agrícola, sustentando a população dos reinos. O equilíbrio entre os três garantiu décadas de relativa estabilidade e avanços culturais.\r **Queda:**  \r Abismarca colapsou sob suas próprias estruturas, devastada por mineradores famintos por riquezas. Trivale, incapaz de sustentar as demandas crescentes, mergulhou em revoltas internas. Com o colapso dos dois reinos, a Idade do Bronze chegou a um fim caótico, preparando o terreno para as eras subsequentes.\r Rococopunk',
          link: '/notes/Bronzepunk'
        },
        {
          id: 'Cattlepunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Sem um império ou governo, as cidades que não se destruíram durante a guerra lutam para sobreviver às sombras de reis e governantes mortos ou corrompidos. Sem autoridades suficientes, entidades militares começam a tomar as rédeas dos lugares onde a névoa ainda não havia chegado.Weird Westpunk\r !Eras/Eras Menores/Cattlepunk.webp\r **Início:**  \r Com as grandes navegações a vapor, colônias foram estabelecidas nas Américas. No entanto, as vastas e áridas terras do Novo Mundo apresentaram desafios significativos. As máquinas a vapor, grandes e pesadas, eram impraticáveis para essas regiões. Os colonizadores começaram a adaptar tecnologias locais e tradicionais para sobreviver, enquanto a presença de leis fracas e o contrabando de recursos deram origem aos primeiros **cowboys**, que atuavam como guardiões improvisados da ordem.\r **Auge:**  \r Os cowboys tornaram-se figuras centrais nas comunidades coloniais, combinando habilidades práticas com um código de conduta que lhes garantia respeito. Pequenos vilarejos começaram a florescer, com economias baseadas no gado, na agricultura e no comércio de mercadorias contrabandeadas. A expansão para o interior levou a confrontos com povos nativos, que, enfrentando uma pressão implacável, começaram a colaborar ou resistir, criando alianças temporárias e tensões constantes.\r **Queda:**  \r O isolamento das colônias, somado à falta de suporte efetivo das nações colonizadoras, levou à fragmentação do controle. A ausência de regulamentação permitiu o florescimento do crime organizado, e disputas territoriais tornaram-se cada vez mais violentas. Ao mesmo tempo, as tensões entre cowboys e colonos mais ricos, que começaram a impor tecnologias mais avançadas, geraram conflitos internos. Esses eventos marcaram o declínio da era de ouro dos cowboys, preparando o cenário para forças mais sinistras que logo surgiriam.\r Weird Westpunk',
          link: '/notes/Cattlepunk'
        },
        {
          id: 'Class War',
          group: 13,
          contentPreview:
            '!ClassWar.webp\r **Início:**  \r Com as estruturas industriais da era **Petrolpunk** fortalecendo a desigualdade social, as elites que controlavam as reservas de petróleo e as tecnologias reconstruídas consolidaram seu domínio sobre o mundo. As massas, relegadas ao trabalho exaustivo e às áreas mais devastadas, começaram a organizar movimentos de resistência. Esses movimentos foram inicialmente focados em reformas, mas logo evoluíram para rebeliões armadas contra as elites privilegiadas.\r **Auge:**  \r As revoltas populares espalharam-se pelo mundo. Cidades industriais tornaram-se campos de batalha, com os trabalhadores usando ferramentas improvisadas e tecnologias adaptadas para enfrentar os exércitos privados das elites. Apesar da coragem e determinação dos rebeldes, a elite usava tecnologias avançadas, segurança automatizada e vastos recursos para manter o controle. Por um breve período, parecia que o sistema poderia desmoronar, enquanto as massas chegavam perto de derrubar o status quo.\r **Queda:**  \r As rebeliões foram brutalmente suprimidas pelas elites, que utilizaram uma combinação de força militar e manipulação política para eliminar os líderes rebeldes e desarticular os movimentos. Para evitar futuros levantes, as elites implementaram um modelo de reconstrução que promovia um falso equilíbrio: a harmonia entre tecnologia e natureza. Esse avanço, baseado em energias renováveis e práticas ecológicas, garantiu um mundo mais sustentável, mas ainda profundamente controlado pelas mesmas elites. Esse cenário marcou a transição para a era **Solarpunk**, onde o mundo buscaria um equilíbrio entre progresso e harmonia ambiental.',
          link: '/notes/Class%20War'
        },
        {
          id: 'Clockpunk',
          group: 13,
          contentPreview:
            '!Clockpunk.png\r **Início:**  \r Após o agravamento das fraturas temporais na era **Dungeonpunk**, o mundo voltou-se para soluções práticas que pudessem trazer estabilidade. Os sobreviventes das cidades devastadas pelo ouro contaminado e pelo caos temporal rejeitaram os materiais associados ao passado sombrio, como o ouro e o bronze, e passaram a adotar o ferro como base de suas vidas. Inspirados pelas tecnologias orientais, começaram a criar engenhos mecânicos baseados em pêndulos, buscando uma forma de simular o equilíbrio perdido.\r **Auge:**  \r O uso de pêndulos revolucionou a tecnologia, permitindo o desenvolvimento de máquinas precisas e eficientes. Relógios, autômatos e sistemas de transporte sofisticados começaram a moldar as cidades em reconstrução. Essa era foi marcada pela busca de harmonia entre o tempo e a funcionalidade, com as invenções baseadas em engrenagens tornando-se parte central da cultura. O Oriente consolidou-se como líder tecnológico, enquanto o Ocidente tentava se reerguer, aproveitando os avanços trazidos por imigrantes.\r **Queda:**  \r Embora os pêndulos trouxessem precisão e funcionalidade, sua eficiência tinha limites. A crescente demanda por energia e produção superou a capacidade das máquinas baseadas em engrenagens. Tensions começaram a surgir entre as cidades que competiam por recursos para sustentar suas tecnologias. O fracasso em expandir as capacidades dessas máquinas abriu caminho para novas inovações baseadas em vapor, anunciando o fim da era dos pêndulos e o início de um período de grandes transformações industriais.',
          link: '/notes/Clockpunk'
        },
        {
          id: 'Colorpunk',
          group: 13,
          contentPreview:
            '!Images/Punks/Colorpunk.webp\r **Início:**  \r Após o colapso total da Ocean World War e a destruição das colônias espaciais, uma única corporação emergiu para liderar a reconstrução da civilização. Utilizando o poder do **Limiar**, essa empresa oferecia "pacotes de cores", um sistema que prometia devolver a vitalidade, a energia e a beleza ao mundo devastado. Esses pacotes de cores não eram apenas uma estética, mas uma força mágica que moldava ambientes, culturas e até mesmo a psique dos habitantes.\r **Auge:**  \r As cores começaram a definir a vida. Regiões inteiras foram reconstruídas com base em combinações cromáticas específicas, onde as cores não apenas transformavam os ambientes, mas também influenciavam comportamentos, emoções e até habilidades mágicas. A sociedade parecia renascer sob essa nova estética mágica, e cada local assumia uma identidade única e vibrante. Apesar disso, o uso excessivo da magia colorida começou a gerar anomalias, e rumores de que o **Limiar** cobrava um preço oculto começaram a circular.\r **Queda:**  \r O equilíbrio mágico das cores foi rompido quando a corporação, em busca de expandir seu domínio, tentou manipular a essência das cores primárias — vermelho, azul e amarelo. Isso desencadeou um **cataclismo mágico** de proporções cósmicas, onde a magia explodiu fora de controle, extinguindo toda a vida no universo conhecido. A magia, sem um foco estável, entrou em um estado de caos absoluto. Após séculos de instabilidade, o universo começou a se reorganizar, mas agora segregado em **esferas baseadas nas cores primárias**, onde novas formas de vida começaram a surgir, adaptadas a esses ambientes isolados.',
          link: '/notes/Colorpunk'
        },
        {
          id: 'Cyber Urban Fantasy',
          group: 13,
          contentPreview:
            '!CyberUrbanFantazy.webp\r **Início:**  \r Após a vitória do **Conselho dos Magos** na **Myth War**, o mundo abandonou os ideais de harmonia com a natureza da era **Solarpunk**. A fusão de magia e tecnologia tornou-se a base para o crescimento descontrolado das cidades, que passaram a se expandir verticalmente, criando vastas metrópoles que se erguiam acima dos restos do mundo natural. As cidades tornaram-se centros de inovação, mas também de desigualdade, onde criaturas mágicas, humanos e seres híbridos conviviam em um ambiente de avanços incessantes e decadência urbana.\r **Auge:**  \r As metrópoles alcançaram um nível de desenvolvimento sem precedentes. Sistemas de transporte mágico-tecnológico conectavam torres flutuantes e megacidades, enquanto a magia alimentava as redes elétricas e os serviços urbanos. Máquinas mágicas, inteligência artificial encantada e criaturas artificiais moldavam a vida cotidiana. Essa era viu um florescimento cultural e artístico, mas também uma fragmentação social, onde elites mágicas controlavam o progresso, enquanto as classes mais baixas sobreviviam em bairros superlotados e decadentes.\r **Queda:**  \r A busca por novos recursos para sustentar o crescimento desenfreado levou as elites a reativarem antigas instalações espaciais da era pré-cataclísmica. Inicialmente, esses esforços tinham como objetivo fornecer matéria-prima para as megacidades, mas a exploração revelou os potenciais das colônias espaciais abandonadas. Essa descoberta reavivou o sonho da expansão interplanetária. No final da era, um movimento global foi iniciado para retomar a exploração espacial, marcando o fim da **Cyber Urban Fantasy** e a transição para a era **Spacialpunk**, onde a humanidade voltaria a olhar para as estrelas.',
          link: '/notes/Cyber%20Urban%20Fantasy'
        },
        {
          id: 'Cyberpunk Noir',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Images/Punks/CyberpunkNior.webp\r **Início:**  \r Após o colapso parcial das realidades virtuais, as cidades físicas tornaram-se ainda mais densas e caóticas. As megacorporações, tentando recuperar o controle, transformaram essas metrópoles em laboratórios de vigilância. Cada aspecto da vida urbana era monitorado e registrado, enquanto a poluição e o crescimento desordenado deixavam o ambiente sombrio e opressor. As cidades tornaram-se prisões de aço e neon, onde a privacidade era uma ilusão.\r **Auge:**  \r Os avanços tecnológicos em espionagem e controle social atingiram seu ápice. Cientistas monitoravam constantemente os cidadãos, utilizando implantes e sensores para testar produtos e manipular comportamentos. Grandes centros urbanos, conhecidos como **chiqueiros de informação**, armazenavam dados massivos de suas populações, permitindo que as corporações manipulassem economias e políticas locais. As chuvas ácidas, resultado da poluição crescente, tornaram-se um aspecto constante da vida urbana, criando um clima perpetuamente melancólico e hostil.\r **Queda:**  \r A sobrecarga de vigilância e controle levou à saturação da sociedade. Grupos de resistência surgiram nas sombras, sabotando infraestruturas corporativas e libertando informações críticas. O excesso de dados acumulados tornou-se incontrolável, causando falhas em sistemas essenciais e conflitos internos entre as próprias corporações. À medida que as cidades começavam a desmoronar sob o peso de sua decadência, os conflitos entre as megacorporações culminaram na **Cyberwar Punk**, onde a luta pelo domínio total chegaria a um nível destrutivo.\r Cyberwar Punk',
          link: '/notes/Cyberpunk%20Noir'
        },
        {
          id: 'Cyberpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Cyberpunk.png\r **Início:**  \r A era **Cyberpunk** teve início com o avanço das tecnologias de integração entre máquinas e o corpo humano. Inicialmente grandes e ineficientes, os primeiros implantes cibernéticos foram desenvolvidos como soluções para deficiências físicas e doenças graves. À medida que a tecnologia progrediu, esses dispositivos se tornaram cada vez mais sofisticados, permitindo aprimoramentos corporais que ultrapassavam as limitações humanas naturais.\r **Auge:**  \r Os implantes cibernéticos tornaram-se uma parte indispensável da vida moderna. As corporações, agora mais poderosas que os próprios governos, competiam ferozmente pelo controle desse mercado. Cidades inteiras foram transformadas em metrópoles neon, repletas de avanços tecnológicos que misturavam realidade aumentada e biotecnologia. A integração total entre homem e máquina deu origem a uma nova era de conectividade e eficiência, onde pessoas com implantes podiam acessar informações e se comunicar instantaneamente através de redes digitais.\r **Queda:**  \r A expansão descontrolada dos implantes trouxe consequências sombrias. A dependência tecnológica tornou-se uma vulnerabilidade, com muitas pessoas incapazes de funcionar sem seus dispositivos. As corporações começaram a explorar seus usuários, transformando-os em consumidores cativos de atualizações e serviços. Hackers e grupos rebeldes começaram a se opor a esse sistema, enquanto as cidades neon se transformaram em ambientes hostis, dominados pela vigilância constante e pelo controle das megacorporações. A era **Cyberpunk** mergulhou em um estado de decadência, preparando o terreno para a **Virtual Reality**, onde a fuga para mundos digitais se tornaria a única saída para muitos.\r Virtual Reality',
          link: '/notes/Cyberpunk'
        },
        {
          id: 'Cyberwar Punk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Images/Punks/CyberwarPunk.webp\r **Início:**  \r As megacorporações assumiram total controle do mundo após a queda das estruturas governamentais. Em busca de domínio absoluto, começaram a competir ferozmente pelos últimos recursos, mercados e territórios ainda disponíveis. As chamadas **Cidades Livres**, onde as corporações tinham pouca influência, tornaram-se pontos estratégicos, e a ausência de um governo global centralizado levou ao colapso total da ordem mundial.\r **Auge:**  \r As corporações iniciaram uma guerra aberta, utilizando tecnologias avançadas e exércitos privados. Implantes cibernéticos, drones autônomos e armas biológicas de precisão tornaram-se ferramentas comuns nos conflitos. Sem leis para limitar suas ações, batalhas devastadoras ocorreram em zonas urbanas densamente povoadas, resultando em milhões de mortes e na destruição de grandes cidades. O mundo unificado por um único mercado fragmentou-se em um campo de batalha corporativo.\r **Queda:**  \r A guerra atingiu um ponto de saturação. Corporações menores foram absorvidas ou destruídas, enquanto as maiores, exauridas pelos conflitos, perderam a capacidade de sustentar suas operações. A infraestrutura global foi dizimada, e a economia mundial entrou em colapso. O custo humano e ambiental tornou-se insuportável, deixando o mundo em ruínas e marcando o início da **Splatterpunk**, onde os sobreviventes enfrentariam horrores ainda mais profundos em um cenário de colapso social e tecnológico.\r Splatterpunk\r Bitware\r HealthTec\r NeuroSys\r Energex Corporation\r CloudForge\r BioForge Industries\r Helix Conglomerate\r Novera Corp\r SynVera Entertainment\r Zenith Dynamics',
          link: '/notes/Cyberwar%20Punk'
        },
        {
          id: 'Desertpunk',
          group: 13,
          contentPreview:
            '!Desertpunk.webp\r **Início:**  \r Com o fim da era **Frostpunk**, rupturas climáticas adicionais inverteram os efeitos do frio extremo. O calor implacável tomou conta do mundo, derretendo as vastas geleiras que haviam dominado a paisagem. Isso levou à criação de desertos intermináveis e vastas planícies áridas, onde a sobrevivência tornou-se uma luta constante contra a sede, o calor e a falta de recursos.\r **Auge:**  \r As civilizações remanescentes adaptaram-se ao novo ambiente, construindo comunidades ao redor de fontes de água subterrâneas e explorando tecnologias para extrair umidade do ar. O comércio de água tornou-se a principal força econômica, com mercadores controlando caravanas protegidas por mercenários fortemente armados. Pequenos oásis se transformaram em cidades-estado, conectadas por rotas comerciais perigosas. A estética árida influenciou a cultura, com improvisação e sobrevivência se tornando o centro da identidade social.\r **Queda:**  \r Os recursos escassos levaram a guerras incessantes entre as cidades-estado e os mercadores de água. Disputas por territórios férteis e controle de reservas hídricas destruíram comunidades inteiras, deixando vastas áreas ainda mais desoladas. Tecnologias antigas, desenterradas por exploradores, foram usadas em armas que aceleraram a destruição. A instabilidade generalizada mergulhou o mundo em um estado de isolamento, onde a sobrevivência individual substituiu a colaboração. Essa fragmentação deu origem a um vazio de poder que seria explorado na próxima era, **Necropunk**, onde a morte e os mistérios pós-vida tornariam-se centrais.',
          link: '/notes/Desertpunk'
        },
        {
          id: 'Dieselpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Dieselpunk.png\r **Início:**  \r Enquanto o Velho Oeste mergulhava no caos sobrenatural, na Europa surgia uma nova solução tecnológica: os motores a diesel. Desenvolvidos por engenheiros nos países baixos, os motores a diesel apresentavam maior eficiência energética e menor emissão de fumaça, diferenciando-se das máquinas a vapor. Essa nova tecnologia começou a redefinir a industrialização, oferecendo alternativas mais limpas e acessíveis.\r **Auge:**  \r Os motores a diesel impulsionaram o surgimento de indústrias robustas e cidades modernas. Dirigíveis começaram a dominar os céus, enquanto carros e maquinários industriais revolucionavam a vida urbana. A era do diesel foi marcada por uma estética funcional e poderosa, com máquinas que simbolizavam tanto força quanto progresso. A Europa tornou-se o coração dessa revolução, consolidando sua posição como líder tecnológica e exportando a inovação para outras partes do mundo.\r **Queda:**  \r Apesar de sua eficiência, o diesel apresentou limitações na produção em larga escala. A demanda crescente por combustível levou à exploração de métodos alternativos, como o uso do perigoso **Rufanol**, uma substância derivada de sangue humano. Esse desenvolvimento marcou o início de práticas desumanas, enquanto governos autoritários começaram a centralizar o controle da produção e distribuição de combustível. A competição por recursos e o crescente uso de **Rufanol** levaram a tensões políticas e sociais, preparando o cenário para conflitos devastadores.\r Weird Diesel Punk',
          link: '/notes/Dieselpunk'
        },
        {
          id: 'Dungeonpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Um grupo de destemidos aventureiros consegue reunir uma coleção de artefatos astrais que, juntos, formam a própria realidade. Com a união desses artefatos, o tecido do espaço e do tempo começa a se romper, resultando na abertura de fendas que levam tanto ao passado quanto ao futuro. Dentro dessas fendas, algo desconhecido mantém-nas abertas. Somente quando os artefatos são separados e seus portadores perecem, as fendas cessam sua aparição.\r !Dungeonpunk.png\r **Início:**  \r Na tentativa de compreender e conter os efeitos devastadores da **Fagulha Liminal** e sua disseminação, cientistas e escavadores do Oriente começaram a explorar ruínas antigas, buscando respostas e soluções. Suas pesquisas os levaram à cidade perdida de **Nova Parpola**, um centro de conhecimento há muito enterrado. Lá, descobriram tecnologias esquecidas e um fenômeno inesperado: uma fratura no tempo que criava fendas temporais, conectando presente e passado de forma caótica.\r **Auge:**  \r As fendas temporais começaram a surgir em várias partes do mundo, trazendo consigo desafios mortais. Cada fenda continha um **Objeto Âncora**, um artefato que mantinha a conexão temporal. Apenas resgatando esses objetos, as fendas poderiam ser fechadas. A exploração dessas fissuras tornou-se uma prática comum para aventureiros e cientistas, que buscavam riquezas e conhecimentos escondidos. O Oriente prosperou como epicentro dessas expedições, enquanto as fendas revelavam segredos perdidos de eras antigas.\r **Queda:**  \r O uso imprudente das tecnologias de **Nova Parpola** causou o agravamento das fraturas temporais. As fendas começaram a aparecer em locais inesperados, interrompendo o fluxo natural do tempo e colocando em risco a estabilidade do mundo. A exploração desenfreada gerou disputas violentas por artefatos temporais, e muitos aventureiros nunca retornavam, presos em eras distantes ou destruídos pelos perigos contidos nas fendas. O mundo começou a questionar se o conhecimento recuperado valia o preço do caos que ele trazia.\r Before\r Eras/Eras Menores/Clockpunk',
          link: '/notes/Dungeonpunk'
        },
        {
          id: 'Ending Punk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Ending Punk',
          link: '/notes/Ending%20Punk'
        },
        {
          id: 'Frostpunk',
          group: 13,
          contentPreview:
            '!Images/Frostpunk.webp\r **Início:**  \r Após o colapso da era **Timepunk**, o universo mergulhou em uma crise climática causada pelas rupturas temporais. O tempo fragmentado afetou os ciclos naturais, mergulhando vastas regiões em um inverno perpétuo. As civilizações remanescentes enfrentaram o desafio de sobreviver em um mundo congelado, onde os recursos eram escassos e o clima implacável moldava cada decisão.\r **Auge:**  \r As comunidades começaram a construir cidades fortificadas ao redor de geradores gigantes movidos a energia residual do tempo e da magia cromática. Essas estruturas ofereciam calor e segurança, tornando-se o coração de sociedades organizadas. Tecnologias adaptadas ao frio extremo floresceram, e estratégias para extração de calor e cultivo em estufas subterrâneas permitiram que algumas cidades prosperassem. Porém, a sobrevivência dependia de disciplina rigorosa e sacrifícios constantes, com líderes tomando decisões difíceis para manter o equilíbrio.\r **Queda:**  \r À medida que o frio se intensificava e os geradores começavam a falhar, as tensões internas nas cidades aumentaram. Conflitos entre grupos que queriam expandir os recursos e aqueles que desejavam preservá-los levaram a revoltas e fragmentações. Comunidades inteiras foram abandonadas ou destruídas por decisões impensadas. O frio, implacável, tomou os últimos vestígios de civilização, deixando o mundo em ruínas congeladas. Essa devastação marcou o fim da era **Frostpunk** e o início de **Desertpunk**, onde o clima extremo daria lugar a um cenário árido e desolador.',
          link: '/notes/Frostpunk'
        },
        {
          id: 'Gothicpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Gothicpunk.png\r **Início:**  \r Com o colapso das tecnologias biológicas na era **Organicpunk**, as cidades perderam grande parte de suas infraestruturas e ficaram incapazes de manter os sistemas automatizados que regulavam o ambiente. Os **DCTs** (Domos de Controle Temporal), estruturas que simulavam o ciclo de dia e noite, falharam, mergulhando as cidades em escuridão perpétua. Relíquias das eras anteriores tornaram-se objetos de adoração, levando ao surgimento de novas religiões e cultos baseados na tecnologia perdida.\r **Auge:**  \r As cidades em ruínas foram dominadas por ordens religiosas e cavaleiros urbanos, que protegiam os remanescentes da tecnologia como artefatos sagrados. A sociedade desenvolveu uma cultura sombria, onde a arquitetura gótica misturava-se com os restos tecnológicos do passado. A escuridão trouxe um renascimento cultural estranho, com comunidades focadas na sobrevivência e na preservação de histórias e mitos sobre eras anteriores.\r **Queda:**  \r A falta de energia e o colapso contínuo das estruturas tecnológicas tornaram as cidades cada vez mais hostis. O surgimento de aberrações biológicas, descendentes dos experimentos da era **Organicpunk**, transformou áreas urbanas abandonadas em zonas mortais. As classes mais privilegiadas abandonaram as cidades, buscando refúgio em territórios mais seguros ou até mesmo em estruturas flutuantes, deixando os mais pobres à mercê do caos. O mundo mergulhou em uma era de terror, preparando o terreno para a **Weird Gothicpunk**, onde os horrores se tornariam ainda mais intensos.\r Weird Gothicpunk',
          link: '/notes/Gothicpunk'
        },
        {
          id: 'Hi-Militar',
          group: 13,
          contentPreview:
            '!HiMilitar.webp\r **Início:**  \r Com o domínio do **Conselho dos Magos** militarizado na era **Spacialpunk**, o espaço tornou-se uma extensão da Terra, onde colônias operavam sob rígido controle. Para manter a ordem e explorar o máximo dos recursos espaciais, a militarização alcançou níveis extremos. Armadas inteiras de naves mágicas-tecnológicas foram construídas, enquanto as forças terrestres patrulhavam as colônias com poder avassalador. Essa era marcou o auge do poderio militar da humanidade, com tecnologias de combate avançadas redefinindo os limites do conflito.\r **Auge:**  \r O controle centralizado do Conselho permitiu uma expansão sem precedentes. Cidades orbitais gigantes foram construídas, e territórios intergalácticos começaram a ser divididos em zonas de influência. A fusão de magia e ciência militar criou armas e frotas capazes de obliterar planetas inteiros. Esse avanço gerou uma sociedade onde o progresso dependia da obediência ao regime militar, enquanto a desigualdade entre colônias e a Terra se acentuava. O sistema parecia inquebrável, mas as tensões entre as colônias e a Terra começaram a crescer silenciosamente.\r **Queda:**  \r As colônias começaram a se rebelar contra o domínio autoritário da Terra, alegando exploração e falta de autonomia. A revolta atingiu um ponto crítico quando várias colônias se uniram para desafiar o poder central. As batalhas espaciais resultantes causaram devastação em várias regiões do sistema solar. A guerra dividiu completamente a humanidade, resultando na formação de novas organizações intergalácticas independentes, marcando o fim da era **Hi-Militar** e dando início à **Social War**, onde as colônias lutariam para estabelecer sua identidade e soberania.',
          link: '/notes/Hi-Militar'
        },
        {
          id: 'Hopepunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Hopepunk.png\r **Início:**  \r A desilusão com a opulência de **Aureum Sanctus** e sua hegemonia cultural alimentou o surgimento de grupos rebeldes em territórios dominados. Liderados por indivíduos visionários, esses grupos começaram a organizar fugas para o Oriente, buscando refúgio longe do controle imperial. Essas comunidades começaram a se reorganizar, pregando valores de união, esperança e resiliência.\r **Auge:**  \r O movimento de resistência ganhou força, criando redes de apoio para ajudar os oprimidos a escaparem da influência do império. Próximo ao antigo reino de **Trivale**, cidades começaram a surgir, guiadas por um espírito de renovação e determinação. Essas comunidades floresceram, construindo muralhas e sistemas defensivos para proteger seus habitantes, criando uma nova sociedade baseada na colaboração e no desejo de liberdade.\r **Queda:**  \r Apesar de seus ideais elevados, o crescente poder das cidades orientais atraiu a atenção do imperador de **Aureum Sanctus**. Movido pela paranoia de perder sua hegemonia, ele iniciou uma campanha militar para subjugar os rebeldes. Enquanto isso, tensões internas começaram a surgir dentro das próprias cidades orientais, entre aqueles que desejavam expandir e outros que temiam repetir os erros do passado.\r Before\r Silkpunk',
          link: '/notes/Hopepunk'
        },
        {
          id: 'Monopunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !CataclismaMagico.png\r Há cerca de 2000 anos, o universo foi abalado por um evento apocalíptico conhecido como Cataclisma Mágico.\r Na tentativa de assegurar a sobrevivência da humanidade, a espaçonave Cosmos Explorer 7 foi enviada da Terra, transportando mais de 50 mil civis.\r Infelizmente, essa missão acabou de maneira trágica quando a nave explodiu devido às forças mágicas descontroladas que permeavam o universo.\r Esse cataclismo exacerbou ainda mais um mundo já devastado pela guerra, empurrando a humanidade para a beira da extinção.\r A guerra, que havia sido interrompida devido à devastação, ficou popularmente conhecida como a Guerra das cores, devido ao fato de que o Limiar escolheu se manifestar através desse aspecto da realidade, separando e controlando as cores.\r Essa tragédia representou um ponto crucial na história, obrigando as pessoas a reavaliarem sua relação com a magia e a natureza.\r Os sobreviventes tiveram que se adaptar a um novo mundo, onde a magia era temida e a luta diária pela sobrevivência era constante.\r Infelizmente, mesmo aqueles que conseguiram sobreviver ao impacto foram gradualmente consumidos pelas forças descontroladas da magia.\r Por mil anos, a Terra foi envolvida por um Primavera Magica implacável, e poderes extraordinários se manifestaram em todos os cantos do planeta.\r Durante esse período, grandes seres, criados nos primórdios do mundo pelas Monstruosidades de Hego, emergiram para assolar o mundo mais uma vez. O primeiro deles foi Luminarion, seguido pelos Celestiais e, por fim, Frostveil.\r Os três seres governavam o Primavera Magica com seus exércitos de aberrações, espalhando o caos e o terror por toda a terra, assim como as três criaturas primordiais.\r No entanto, próximo ao inicio da era dos místicos, os Celestiais derrotaram os demais e desapareceram misteriosamente.\r No entanto, próximo ao início da era dos místicos, os Celestiais triunfaram sobre os demais e desapareceram misteriosamente, marcando um ponto crucial na história. Após a derrota do Limiar, a raiz da Guerra das cores, e o cataclismo mágico que se seguiu, fragmentos desse conflito se dispersaram por todos os cantos, resultando em territórios instáveis e desolados.\r Os impactos devastadores dessa guerra deixaram cicatrizes profundas tanto na terra quanto na sociedade, impondo uma árdua jornada de reconstrução. Além disso, novas espécies de seres mágicos surgiram, trazendo consigo criaturas lendárias das histórias e mitologias que, de repente, se tornaram reais e passaram a habitar o universo pós-Cataclisma Mágico. Essa presença de seres mágicos conferiu ao mundo um elemento de maravilha e mistério, despertando a curiosidade e a fascinação de todos que testemunharam sua existência.\r Os Vulpinideos a primeira raça a surgir após o Cataclisma Mágico, eram seres semelhantes a raposas e permanecem envoltos em mistério para a maioria das pessoas. Infelizmente, a maior parte dos vestígios desses seres foi apagada há muito tempo, e poucas informações foram registradas sobre eles.\r No entanto, algumas anotações do Professor Thalassor, um renomado cientista da academia  indicam a existência de alguns indivíduos Vulpinideos que ainda vivem em uma vila isolada além da zona de exclusão, conhecida como Vila das Brumas.\r Embora saibamos pouco sobre a cultura e a sociedade desses seres, é sabido que eles possuem habilidades mágicas únicas e são altamente adaptáveis.\r A natureza exata das habilidades mágicas dos Vulpinideos ainda é desconhecida, mas há relatos de sua capacidade de manipular ilusões e de se camuflarem perfeitamente em seu ambiente.\r Essas habilidades os tornam mestres da dissimulação e da sobrevivência, permitindo-lhes viver em harmonia com a natureza e evitar ameaças.\r Os poucos relatos de encontros com os Vulpinideos sugerem que eles preferem manter-se afastados da sociedade, protegendo sua cultura e conhecimento.\r Outra espécie que surgiu mais ou menos no mesmo período que os Vulpinideos foram os Blattídeos, humanoides medianos com traços característicos de baratas.\r Essa raça é conhecida por sua resistência indestrutível, mas sua inteligência é limitada em comparação a outras raças mais avançadas.\r Atualmente, os Blattídeos desempenham o trabalho de coveiros, liderados pela figura proeminenteAldric Blotíbac, que garante a limpeza das cidades.\r Devido à sua natureza carniceira, eles se especializaram na remoção de restos mortais e no tratamento adequado dos corpos, garantindo a higiene e a ordem nas áreas urbanas, sua resistência física e habilidades naturais os tornam perfeitamente adequados para essa tarefa, ajudando a manter as cidades limpas e livres de doenças.\r Sua contribuição para a sociedade é valorizada, e eles são respeitados por sua capacidade de lidar com uma tarefa desafiadora que muitos podem não ter coragem ou habilidade para fazer.\r Elfos, Orcs e Dragões também foram raças que emergiram após o Cataclisma Mágico, e rapidamente se separaram por todo o mundo, estabelecendo suas próprias cidades e reinos.\r 39. Desertpunk\r !Monopunk.webp\r **Início:**  \r Após o **cataclismo mágico** da era **Colorpunk**, a magia estabilizou-se em regiões segregadas pelas cores primárias: vermelho, azul e amarelo. Cada cor tornou-se a base de um reino, alimentada por um cristal de energia mágica que emanava poder diretamente ligado à sua tonalidade. Essas novas sociedades começaram a se reorganizar em torno dos cristais, desenvolvendo culturas e tecnologias adaptadas à natureza mágica de cada cor.\r **Auge:**  \r Os reinos prosperaram, cada um explorando as capacidades únicas de seus cristais. O Reino Rubro, focado no cristal vermelho, tornou-se um símbolo de força e determinação. O Reino Safira, sustentado pelo azul, destacou-se em avanços intelectuais e mágicos. Já o Reino Áureo, ligado ao amarelo, floresceu como um centro de criatividade e comércio. No entanto, a expansão do **Império Rubro**, guiado por um desejo insaciável de controlar todos os cristais, desestabilizou o frágil equilíbrio entre os reinos.\r **Queda:**  \r O **Império Rubro** quase alcançou seu objetivo de domínio total, mas foi detido por uma intervenção inesperada: um robô sobrevivente da antiga corporação da era **Colorpunk**, programado para restaurar a ordem universal. O robô reuniu todos os cristais e os devolveu ao seu lugar de origem, um ponto central onde a magia era mantida em equilíbrio. Com isso, os reinos perderam seu poder mágico, e o império desmoronou, preparando o terreno para a **War Colorpunk**, onde o vazio de poder levaria a conflitos ainda mais profundos.',
          link: '/notes/Monopunk'
        },
        {
          id: 'Myth War',
          group: 13,
          contentPreview:
            '!MythWar.webp\r **Início:**  \r As tensões entre os insurgentes, que rejeitavam a fusão de magia e tecnologia, e os defensores do sistema **Mythpunk** culminaram em uma guerra aberta. Os insurgentes acreditavam que a combinação de magia e tecnologia era a verdadeira responsável pelos cataclismos do passado e lutaram para destruir os pilares dessa nova sociedade. Por outro lado, os defensores da união mágica-tecnológica, liderados pelo **Conselho dos Magos**, viam-na como o ápice do progresso e estavam dispostos a tudo para preservá-la.\r **Auge:**  \r O conflito espalhou-se por cidades e territórios encantados, dividindo populações e destruindo parte da infraestrutura mágica-tecnológica construída na era anterior. Criaturas mágicas e máquinas híbridas tornaram-se armas de guerra, enquanto insurgentes utilizavam técnicas arcaicas e magia corrompida para causar caos. O **Conselho dos Magos** consolidou seu poder, utilizando feitiços avançados e sistemas tecnológicos para suprimir as rebeliões de forma brutal e decisiva. Ao final, os insurgentes foram esmagados, mas ao custo da perda de boa parte do equilíbrio conquistado na era **Solarpunk**.\r **Queda:**  \r Com a vitória do **Conselho dos Magos**, um novo paradigma emergiu. Cansados das restrições de viver em harmonia com a natureza, as cidades abandonaram o ideal de equilíbrio ambiental e começaram a expandir-se de maneira descontrolada. O avanço tecnológico-mágico entrou em um ritmo acelerado e desregulado, levando à criação de vastas metrópoles verticais onde o progresso era prioridade absoluta. Assim, começou a era **Cyber Urban Fantasy**, onde a fusão entre magia e tecnologia dominava completamente a paisagem urbana e redefinia a vida em um mundo completamente artificial.',
          link: '/notes/Myth%20War'
        },
        {
          id: 'Mythpunk',
          group: 13,
          contentPreview:
            '!Mythpunk.webp\r **Início:**  \r Após o apogeu da era **Solarpunk**, o equilíbrio entre tecnologia e natureza começou a evoluir para algo ainda mais profundo. Pesquisadores, curiosos sobre os vestígios mágicos das eras anteriores, iniciaram experimentos para integrar magia e tecnologia harmônica. Essa união deu origem a uma nova vertente tecnológica: sistemas que utilizavam a energia mágica residual do mundo para ampliar os avanços tecnológicos sustentáveis. Cidades começaram a incorporar esses sistemas, criando ambientes que pareciam ter saído de contos de fadas.\r **Auge:**  \r A fusão de magia e tecnologia trouxe uma era de maravilhas. Máquinas que funcionavam com energia mágica alimentavam cidades inteiras, e dispositivos que combinavam ciência e magia transformaram a vida cotidiana. Elementos naturais, como florestas encantadas e rios com propriedades regenerativas, foram integrados às tecnologias urbanas, criando um mundo que parecia harmonizar o antigo e o moderno. Essa era também viu o renascimento de mitologias, com figuras e criaturas mágicas ganhando vida graças à união entre magia e ciência.\r **Queda:**  \r Apesar dos avanços, um movimento insurgente começou a ganhar força. Composto por indivíduos que rejeitavam a magia e a tecnologia como forças destrutivas, eles acreditavam que essa combinação havia sido a causa dos cataclismos que destruíram o velho mundo. O movimento cresceu em secretismo, sabotando instalações e questionando a moralidade da nova sociedade. A tensão culminou no início da **Myth War**, onde insurgentes atacaram abertamente os pilares da civilização **Mythpunk**, desencadeando um conflito que ameaçaria desfazer séculos de progresso.',
          link: '/notes/Mythpunk'
        },
        {
          id: 'Nanopunk Noir',
          group: 13,
          contentPreview:
            '!Images/NanopunkNior.png\r **Início:**  \r O controle dos nanorrobôs, que parecia ser a solução para restaurar a ordem e a funcionalidade do mundo, começou a falhar. Grupos rebeldes, descendentes dos biohackers, descobriram formas de hackear os nanorrobôs, reprogramando-os para atacar governos e corporações. Esses ataques não apenas derrubaram sistemas essenciais, mas também transformaram os nanorrobôs em armas imprevisíveis. A confiança na nanotecnologia desmoronou, levando a uma crise global.\r **Auge:**  \r O colapso social foi rápido e caótico. Regiões inteiras ficaram incontroláveis, com nanorrobôs desregulados infectando redes de infraestrutura, alimentos e até corpos humanos. Governos e corporações remanescentes tentaram desesperadamente conter a crise, mas cada tentativa gerava mais instabilidade. A sociedade mergulhou em um estado de vigilância extrema, onde os poucos sistemas ainda funcionais eram usados para rastrear e eliminar insurgentes, mas isso apenas alimentava o ciclo de resistência.\r **Queda:**  \r Com a Terra mergulhada em caos e os recursos cada vez mais escassos, as nações e corporações remanescentes começaram a buscar alternativas fora do planeta. A exploração espacial tornou-se a única esperança de sobrevivência e renovação. Assim, as maiores potências tecnológicas iniciaram a corrida para colonizar e explorar os recursos do sistema solar, marcando o fim da era **Nanopunk Noir** e o início da **Solar War**, onde os conflitos e ambições humanas se expandiriam para além do planeta.\r Solar War',
          link: '/notes/Nanopunk%20Noir'
        },
        {
          id: 'Nanopunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Images/Nanopunk.png\r **Início:**  \r Após o colapso das megacorporações na era **Biopunk Rebellion**, os governos e cientistas remanescentes voltaram-se para a nanotecnologia como solução para restaurar a ordem. Vacinas contendo nanorrobôs começaram a ser injetadas na população, prometendo curar doenças, reparar mutações genéticas e conter os remanescentes do fungo devastador. Essas soluções trouxeram esperança, mas também um novo nível de controle sobre a humanidade.\r **Auge:**  \r Os nanorrobôs revolucionaram a sociedade. Eles curavam ferimentos em segundos, purificavam alimentos e água, e até mesmo monitoravam a saúde da população em tempo real. Grandes centros urbanos renasceram como cidades altamente tecnológicas, alimentadas por redes de nanorrobôs que garantiam ordem e eficiência. Governos autoritários usaram essa tecnologia para rastrear todos os cidadãos, criando uma ilusão de paz e prosperidade. Porém, a resistência ao controle centralizado diminuiu, pois muitos temiam perder os benefícios dos nanorrobôs.\r **Queda:**  \r A estabilidade foi abalada quando grupos rebeldes, descendentes dos biohackers, descobriram como reprogramar os nanorrobôs. Esses grupos começaram a hackear as redes governamentais, assumindo o controle da nanotecnologia para seus próprios fins. Isso gerou caos, com cidades inteiras sendo tomadas por revoltas ou sistemas falhando devido a sabotagens. Além disso, os nanorrobôs começaram a apresentar defeitos, evoluindo de forma imprevisível e ameaçando a própria biologia humana. O mundo, mais uma vez, se viu à beira do colapso, preparando o terreno para a **Solar War**, onde a humanidade buscaria refúgio e recursos além da Terra.\r Nanopunk Noir',
          link: '/notes/Nanopunk'
        },
        {
          id: 'Necropunk',
          group: 13,
          contentPreview:
            '!Necropunk.webp\r **Início:**  \r Após o colapso da era **Desertpunk**, a humanidade começou a enfrentar fenômenos inexplicáveis relacionados à morte. As condições extremas do mundo desolado e o constante conflito geraram uma conexão mais próxima entre os vivos e o pós-vida. A energia residual de eras passadas começou a manifestar-se em forma de **ecos espirituais**, enquanto os mortos eram vistos como recursos valiosos, tanto para sabedoria quanto para energia.\r **Auge:**  \r Cidades começaram a se reorganizar em torno de tecnologias necromânticas, utilizando os restos dos mortos para gerar energia, construir materiais e até para transmitir conhecimento. Oráculos espirituais e necrotécnicos — máquinas que canalizavam almas — tornaram-se essenciais para a sobrevivência. A sociedade desenvolveu uma cultura que reverenciava a morte, tratando os mortos como participantes ativos na manutenção do mundo dos vivos. Essa era viu o surgimento de **Guardiões dos Limiares**, indivíduos que protegiam os portais entre os planos espirituais e físicos.\r **Queda:**  \r O uso imprudente da energia necromântica causou rupturas no tecido entre o mundo dos vivos e dos mortos. Almas presas em máquinas começaram a se rebelar, gerando desastres em grande escala. Os Guardiões dos Limiares, sobrecarregados, não puderam impedir que portais instáveis abrissem, permitindo a entrada de forças sobrenaturais hostis. Cidades inteiras foram consumidas por essas invasões, enquanto os vivos lutavam para manter o equilíbrio. O colapso da era **Necropunk** deu origem a **Heavenpunk**, onde a busca pela harmonia espiritual e celestial tornou-se a única esperança de reconstrução.',
          link: '/notes/Necropunk'
        },
        {
          id: 'Ocean World War',
          group: 13,
          contentPreview:
            '!OceanWorldWar.png\r **Início:**  \r As tensões entre as Cidades Abissais e a superfície culminaram em uma guerra total. Comunidades de superfície, exauridas pela falta de recursos e exclusão, uniram forças para atacar os refúgios submersos. A guerra começou com sabotagens e escalou para combates diretos, com submarinos armados e tecnologias híbridas transformando os oceanos em campos de batalha. O impacto ambiental foi devastador, comprometendo não apenas a vida marinha, mas também os sistemas de suporte vital das Cidades Abissais.\r **Auge:**  \r A guerra trouxe destruição sem precedentes. As Cidades Abissais, inicialmente superiores tecnologicamente, enfrentaram ataques implacáveis da superfície, que utilizava recursos remanescentes da guerra espacial e tecnologias adaptadas. Colônias espaciais ainda funcionais tentaram intervir, mas seus sistemas, dependentes de suprimentos terrestres, rapidamente colapsaram. As linhas de comunicação e comércio entre Terra e espaço foram cortadas, e as últimas estações espaciais foram abandonadas ou destruídas.\r **Queda:**  \r A Ocean World War terminou com a destruição quase total das Cidades Abissais e com as comunidades de superfície em ruínas. Os oceanos tornaram-se zonas mortais, repletas de resíduos tóxicos, submarinos afundados e fauna mutante. O impacto foi tão catastrófico que a humanidade abandonou as ideias de colonização aquática e espacial, voltando-se exclusivamente para reconstruir a superfície. Esse vácuo de poder e esperança deu espaço para uma nova força emergir: a corporação que moldaria a era **Colorpunk**, vendendo pacotes de cores para devolver a vitalidade ao mundo reconstruído.',
          link: '/notes/Ocean%20World%20War'
        },
        {
          id: 'Oceanpunk',
          group: 13,
          contentPreview:
            ">[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Oceanpunk.png\r **Início:**  \r Com o sistema solar mergulhado em conflitos pela **Solar War** e a Terra sofrendo com a devastação ambiental e social, uma nova busca por refúgio começou. Visionários, cientistas e elites corporativas voltaram seus olhos para os oceanos da Terra. Refúgios submersos, conhecidos como **Cidades Abissais**, começaram a ser construídos, utilizando tecnologias de biotecnologia, energia sustentável e engenharia avançada para criar utopias aquáticas.\r **Auge:**  \r As Cidades Abissais floresceram como modelos de autossuficiência e sustentabilidade. Alimentadas por energia geotérmica e redes biológicas vivas, essas comunidades tornaram-se símbolos de esperança em um planeta fragmentado. A elite refugiada se reinventou embaixo d'água, criando sociedades exclusivas focadas em pesquisa científica e expansão tecnológica. A cultura abissal desenvolveu uma estética única, misturando funcionalidade com beleza natural, enquanto as cidades de superfície lutavam para sobreviver.\r **Queda:**  \r As tensões começaram a crescer entre as Cidades Abissais e as comunidades de superfície, que viam as utopias submersas como redutos inacessíveis e egoístas. O isolamento das cidades submersas resultou em disputas internas e externas. Enquanto a tecnologia abissal se tornava cada vez mais avançada, os conflitos pela sobrevivência se intensificaram, levando ao início da **Ocean World War**, onde o equilíbrio precário entre superfície e profundezas colapsou em uma guerra total.\r 34. Ocean World War",
          link: '/notes/Oceanpunk'
        },
        {
          id: 'Organicpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Organicpunk.png\r **Início:**  \r Após o colapso social e tecnológico causado pela era **Splatterpunk**, os sobreviventes enfrentaram um mundo devastado. A humanidade, fragilizada e à beira da extinção, voltou-se para soluções extremas. Cientistas começaram a explorar métodos biológicos para sustentar a vida e reconstruir a sociedade. Melhorias genéticas deixaram de ser opcionais e passaram a ser implementadas no nascimento, criando uma geração de humanos adaptados a condições extremas.\r **Auge:**  \r As cidades remanescentes tornaram-se centros de experimentação biológica. Crianças geneticamente modificadas nasceram com habilidades únicas, projetadas para resistir a doenças, adaptar-se a ambientes hostis e até substituir necessidades básicas. Comunidades começaram a florescer, baseando-se em uma simbiose entre humanos e tecnologia orgânica. Sistemas vivos integrados tornaram-se comuns, como edifícios feitos de matéria biológica que se autorreparavam e redes neurais naturais conectando pessoas em um nível profundamente psicológico.\r **Queda:**  \r A interferência biológica trouxe consequências imprevistas. As gerações geneticamente modificadas começaram a apresentar problemas comportamentais e desequilíbrios mentais. Tais falhas levaram a conflitos internos e ao colapso de várias cidades. Além disso, a manipulação excessiva da biologia humana despertou resistência ética e filosófica, fragmentando a sociedade. O abuso dessa tecnologia gerou horrores biológicos que tornaram o mundo ainda mais inóspito, preparando o caminho para o surgimento da **Gothicpunk**, onde o colapso tecnológico mergulhou as cidades em escuridão perpétua.\r Gothicpunk',
          link: '/notes/Organicpunk'
        },
        {
          id: 'Petrolpunk',
          group: 13,
          contentPreview:
            '!Petrolpunk.webp\r **Início:**  \r Após o colapso da era **Necropunk** e o fim da exploração necromântica, os sobreviventes começaram a explorar os vestígios da tecnologia pré-cataclísmica. Em meio a ruínas de antigas civilizações, descobriram vastas reservas de petróleo intocadas e maquinários que poderiam ser reativados. Esse recurso fóssil tornou-se a base para a reconstrução, trazendo consigo um renascimento tecnológico rudimentar baseado em combustíveis fósseis.\r **Auge:**  \r A humanidade começou a se reerguer em torno de comunidades que dominavam o uso do petróleo. Máquinas antigas foram restauradas, e cidades industriais emergiram em zonas próximas a reservas petrolíferas. Essa era viu o retorno de carros, geradores e até armas movidas a combustíveis fósseis, possibilitando uma nova expansão territorial e econômica. Um renascimento cultural, inspirado pela nostalgia de eras passadas, também tomou forma, influenciando a arte e a arquitetura com uma estética funcional e robusta.\r **Queda:**  \r O uso desenfreado do petróleo, combinado com tecnologias arcaicas e mal compreendidas, gerou conflitos por recursos e uma rápida degradação ambiental. Governos emergentes lutaram por controle das reservas, enquanto a poluição e os desastres industriais começaram a ameaçar as comunidades recém-formadas. Tentativas de replicar os avanços tecnológicos do passado acabaram falhando, expondo as limitações desse renascimento. O declínio da era **Petrolpunk** abriu espaço para uma nova fase, onde a busca por equilíbrio e sustentabilidade guiará as escolhas, dando origem à era **Heavenpunk**, marcada pela espiritualidade e a reconexão com forças superiores.',
          link: '/notes/Petrolpunk'
        },
        {
          id: 'Rococopunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Rococopunk.png\r **Início:**  \r Com o colapso de Trivale e a fragmentação de Abismarca, o império **Aureum Sanctus** emergiu como a força dominante. Em busca de controle total, Aureum Sanctus expandiu suas fronteiras e estabeleceu hegemonia cultural. Sua obsessão pelo ouro transformou-o em um símbolo central de poder e identidade, levando à construção de cidades opulentas, onde o dourado adornava tudo, desde roupas até arquitetura.\r **Auge:**  \r A cultura de Aureum Sanctus atingiu seu apogeu. As cidades do império tornaram-se vitrines de luxo e prosperidade, refletindo a abundância de ouro que fluía de suas minas. As elites vestiam roupas incrustadas com peças douradas, enquanto até mesmo os cidadãos comuns possuíam ornamentos preciosos. O império irradiava uma aura de invencibilidade, com suas tradições e estética dominando os territórios conquistados.\r **Queda:**  \r A obsessão por riqueza e ostentação revelou-se insustentável. A dependência do ouro gerou desigualdades gritantes, alimentando rebeliões e ressentimentos nas periferias do império. Enquanto isso, a exploração intensiva esgotou os recursos naturais. O enfraquecimento interno foi agravado por forças externas e pela ameaça do misterioso **Limiar|Limiar dos Caídos**, que começava a ressurgir nas sombras, trazendo com ele uma corrupção que lentamente infectava a fundação do império.\r Before\r Hopepunk',
          link: '/notes/Rococopunk'
        },
        {
          id: 'Scavengedpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Scavengedpunk.png\r **Início:**  \r Após o colapso das cidades e a devastação provocada pelos horrores da era **Weird Gothicpunk**, os poucos sobreviventes restantes se espalharam pelas terras desoladas. Sem acesso às tecnologias avançadas ou aos recursos controlados pelas cidades flutuantes, os refugiados começaram a reutilizar restos do passado, transformando o lixo tecnológico e cultural acumulado desde a era **Cyberpunk** em ferramentas de sobrevivência.\r **Auge:**  \r Pequenas comunidades começaram a se formar em torno de antigos depósitos de sucata e ruínas urbanas. A criatividade tornou-se a moeda de troca, com engenheiros e artesãos improvisando soluções a partir de pedaços de máquinas, cabos e fragmentos de tecnologia esquecida. Esses assentamentos prosperaram temporariamente, criando redes comerciais e sociais que ofereciam uma nova esperança. Relíquias das eras passadas, como armas de plasma ou pequenos drones, eram reparadas e adaptadas para uso diário.\r **Queda:**  \r A instabilidade social e a escassez de recursos impediram que essas comunidades se consolidassem plenamente. Os conflitos por sucata valiosa se intensificaram, enquanto monstros e aberrações das eras anteriores continuavam a assolar o mundo exterior. Muitos assentamentos foram destruídos por rivalidades internas ou pela hostilidade do ambiente, forçando os sobreviventes a se adaptar novamente. Essa fragmentação preparou o terreno para a **Biopunk**, onde novas tentativas de controlar a biologia humana e ambiental trariam consequências ainda mais extremas.\r Biopunk',
          link: '/notes/Scavengedpunk'
        },
        {
          id: 'Silkpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r As cidades fundadas além do oriente compartilhavam ambições semelhantes, buscando criar e aplicar técnicas tanto para a defesa quanto para moldar um estilo de vida distinto do império soberano. Uma dessas inovações foi o desenvolvimento de métodos para aproveitar os ventos em benefício próprio, explorando sua força e utilizando-os de maneiras únicas.\r !Silkpunk.png\r **Início:**  \r Com o fortalecimento das cidades orientais, os líderes locais investiram em tecnologias inovadoras para garantir sua sobrevivência. Inspirados pelos fortes ventos e pelas condições únicas da região, engenheiros desenvolveram maquinários e equipamentos que utilizavam recursos naturais, como energia eólica e hidráulica. A construção de uma muralha gigantesca separou o Oriente do Ocidente, tornando-se um símbolo de autonomia e proteção contra a ameaça de **Aureum Sanctus**.\r **Auge:**  \r As cidades orientais floresceram, transformando-se em exemplos de engenharia e sustentabilidade. As tecnologias desenvolvidas, baseadas na harmonia com a natureza, como dirigíveis e sistemas de transporte sofisticados, revolucionaram a forma de vida de seus habitantes. A cultura oriental alcançou um novo patamar de sofisticação, inspirando obras artísticas e avanços científicos que redefiniram os limites da criatividade humana.\r **Queda:**  \r Dias antes da investida planejada de **Aureum Sanctus** contra o Oriente, a **Fagulha Liminal** foi descoberta nas minas do império ocidental. Essa força destrutiva começou a infectar o ouro, corrompendo não apenas os recursos, mas também os corpos e mentes daqueles que os tocavam. Com o comércio ocidental enfraquecido, uma crise interna assolou o império: apenas os nascidos em território ocidental podiam ter acesso a alimentos e recursos essenciais. A investida contra o Oriente foi abortada, deixando o Ocidente à beira do colapso total e forçando o Oriente a lidar com o impacto indireto dessa calamidade.\r Before\r Weird Rococo',
          link: '/notes/Silkpunk'
        },
        {
          id: 'Social War',
          group: 13,
          contentPreview:
            '!SocialWar.webp\r **Início:**  \r A revolta das colônias contra o domínio da Terra atingiu um ponto de ruptura após décadas de repressão durante a era **Hi-Militar**. As colônias, cansadas de exploração e sem representação política, uniram-se em alianças fragmentadas, buscando sua independência e liberdade. Este conflito, conhecido como a **Social War**, espalhou-se por todo o sistema solar, dividindo famílias, territórios e governos.\r **Auge:**  \r A guerra alcançou proporções épicas, com batalhas sendo travadas em órbitas planetárias, cinturões de asteroides e até mesmo em cidades espaciais. Novas facções surgiram, como a **Liga da Liberdade de Júpiter** e o **Coletivo Lunar**, que lutavam por autonomia, enquanto Marte, apesar de sua posição estratégica, tentava se manter neutro inicialmente. No entanto, à medida que a guerra avançava, Marte acabou se envolvendo diretamente, estabelecendo uma aliança tênue com a Terra para manter sua própria influência intergaláctica. A guerra também viu o uso de armas antigas e tecnologias esquecidas, recuperadas das eras anteriores.\r **Queda:**  \r Após anos de destruição, um cessar-fogo foi estabelecido entre a Terra e as colônias mais poderosas, particularmente Marte, que emergiu como uma potência intermediária. Esse acordo marcou o fim da guerra, mas deixou o sistema solar dividido em territórios independentes e alianças fragilizadas. A Terra e Marte, buscando reconstruir suas forças e reafirmar sua posição, uniram-se para um novo objetivo: a colonização do **último planeta conhecido no universo observável**, uma missão que simbolizaria um recomeço para a humanidade, mas que carregava a sombra da profecia do fim.',
          link: '/notes/Social%20War'
        },
        {
          id: 'Solar War',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Images/SolarWar.webp\r **Início:**  \r Com a Terra devastada pela instabilidade da era **Nanopunk Noir**, as potências remanescentes voltaram seus esforços para o espaço, buscando recursos e territórios além do planeta. A exploração espacial começou como uma tentativa de sobrevivência, mas rapidamente se transformou em uma corrida pelo domínio do sistema solar. Corporações e nações emergiram como os principais atores, utilizando tecnologias avançadas para colonizar a Lua, Marte e asteroides ricos em minerais.\r **Auge:**  \r A colonização trouxe um novo auge tecnológico e cultural. Estações espaciais foram construídas em órbitas estratégicas, enquanto cidades habitáveis surgiam em Marte e na Lua, abastecidas por energia solar e mineração de asteroides. A humanidade sonhava com um futuro de prosperidade interplanetária. No entanto, as rivalidades entre corporações e nações logo se intensificaram, com disputas por territórios e recursos levando à militarização do espaço. As frotas espaciais começaram a ser usadas não apenas para transporte, mas como ferramentas de guerra.\r **Queda:**  \r Os conflitos interplanetários escalaram rapidamente, marcando o início de uma guerra total conhecida como **Solar War**. Armas orbitais, drones autônomos e tecnologias solares de destruição massiva devastaram colônias e estações espaciais. As batalhas no vácuo do espaço deixaram vastos campos de destroços, enquanto a Terra, dependente dos recursos vindos do espaço, sofria com a interrupção do comércio interplanetário. No final, a guerra fragmentou ainda mais a humanidade, deixando-a dividida entre facções sobreviventes e marcando o colapso das primeiras tentativas de unidade no espaço, preparando o terreno para eras de ainda maior fragmentação e exploração, como a **Oceanpunk**.\r Eras/Eras Menores/Oceanpunk',
          link: '/notes/Solar%20War'
        },
        {
          id: 'Solarpunk',
          group: 13,
          contentPreview:
            '!Solarpunk.webp\r **Início:**  \r Após a supressão das revoltas da **Class War**, as elites perceberam a necessidade de evitar futuras insurreições, promovendo uma visão de equilíbrio entre tecnologia e natureza. Utilizando os recursos acumulados e as lições aprendidas com os erros passados, iniciaram um projeto global de reconstrução sustentável. Energias renováveis, agricultura regenerativa e arquitetura verde tornaram-se a base de um mundo que prometia harmonia e prosperidade.\r **Auge:**  \r As cidades renasceram como verdadeiros jardins tecnológicos, onde torres recobertas por vegetação, redes de energia solar e transporte limpo simbolizavam o apogeu da civilização. Comunidades locais floresceram com sistemas autossuficientes, enquanto a tecnologia conectava as pessoas sem poluir o ambiente. A estética **Solarpunk** destacou-se pela integração perfeita entre o avanço tecnológico e a preservação do planeta, criando uma sociedade onde parecia que todos tinham um papel na sustentabilidade global.\r **Queda:**  \r Apesar da aparente harmonia, o controle centralizado pelas elites ainda era uma constante. Recursos naturais e tecnologias essenciais permaneciam monopolizados, enquanto a narrativa de sustentabilidade era usada como ferramenta de propaganda. As desigualdades, embora ocultas, persistiam, gerando tensões latentes. Enquanto isso, movimentos subterrâneos começaram a questionar se a harmonia prometida era genuína ou apenas uma fachada para um sistema profundamente injusto. Essa era de perfeição controlada começou a mostrar suas rachaduras, preparando o terreno para novas eras de exploração e questionamento.',
          link: '/notes/Solarpunk'
        },
        {
          id: 'Space Opera',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Ending Punk',
          link: '/notes/Space%20Opera'
        },
        {
          id: 'Spacialpunk',
          group: 13,
          contentPreview:
            '!Spacialpunk.webp\r **Início:**  \r Com a reativação das instalações espaciais da era pré-cataclísmica durante a **Cyber Urban Fantasy**, os exploradores encontraram arquivos perdidos que revelavam a história completa dos cataclismos passados. Esses documentos expunham a responsabilidade das elites mágicas e tecnológicas em eventos que levaram à destruição de civilizações. Isso causou uma grande revolta dentro do **Conselho dos Magos**, resultando em um golpe interno que colocou uma facção militarista no poder.\r **Auge:**  \r Sob o comando militarizado do reformado **Conselho dos Magos**, o mundo iniciou uma campanha de exploração e colonização espacial com base nas antigas instalações abandonadas. As colônias espaciais foram reativadas e militarizadas para garantir o controle completo sobre os recursos e a expansão territorial. A combinação de magia e tecnologia foi adaptada para sobreviver às condições extremas do espaço, criando sistemas híbridos avançados que tornaram a exploração espacial eficiente e eficaz. Novas colônias começaram a surgir em órbitas planetárias e em asteroides ricos em minerais.\r **Queda:**  \r A expansão espacial foi marcada pela repressão e exploração. Os magos militarizados controlavam rigidamente as colônias, tratando os colonos como recursos para a manutenção do poder. Esse autoritarismo gerou insurreições tanto na Terra quanto nas colônias, com grupos de resistência emergindo para desafiar o domínio do **Conselho dos Magos**. A instabilidade crescente, combinada com a tensão entre as colônias e o planeta natal, levou o mundo à beira de um novo colapso, marcando o fim da **Spacialpunk** e preparando o terreno para a próxima era, onde novos desafios surgirão diante da instabilidade política e social.',
          link: '/notes/Spacialpunk'
        },
        {
          id: 'Splatterpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Splatterpunk.png\r **Início:**  \r Com o colapso das megacorporações e o mundo reduzido a ruínas pela **Cyberwar Punk**, a humanidade enfrentou um novo inimigo: um vírus devastador se espalhou pelas redes globais, atingindo diretamente os sistemas neurais dos implantes cibernéticos. Esse vírus causava alucinações horríveis, levando os infectados a cometerem atos de extrema violência contra si mesmos e os outros. Esse evento mergulhou os sobreviventes em um estado de terror constante.\r **Auge:**  \r A sociedade se desfez completamente. Pequenos grupos de sobreviventes tentavam se manter escondidos, enquanto os infectados — conhecidos como **os Corrompidos** — espalhavam o caos. As cidades tornaram-se zonas de morte, onde a violência era uma constante e os poucos não infectados viviam com medo de ser os próximos. Relatos de experimentos corporativos para manipular o vírus alimentavam teorias de conspiração, mas o desespero e a desordem dominavam a narrativa global.\r **Queda:**  \r A infecção alcançou proporções tão devastadoras que grande parte da história desse período foi perdida. As corporações remanescentes, incapazes de conter o surto, apagaram registros dessa era para preservar sua reputação, resultando na maior queima de arquivos da humanidade. Apenas fragmentos desse período sobreviveram, levando muitos a considerarem esses anos como lendas sombrias. Os poucos que conseguiram escapar do vírus buscaram refúgio em áreas remotas, preparando o terreno para o surgimento de novas ideias e sistemas de vida na era **Organicpunk**.\r Organicpunk',
          link: '/notes/Splatterpunk'
        },
        {
          id: 'Steampunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Embora os pêndulos sejam úteis para relógios e mecanismos menores, eles não fornecem a força necessária para movimentar grandes mecanismos, o que resulta em sua substituição pelos sistemas a vapor. Enormes chaminés espalham suas fumaças pelos céus do mundo. Em áreas menos privilegiadas, onde o carvão é caro e escasso, os pêndulos ainda são utilizados.\r !Steampunk.png\r **Início:**  \r Com as limitações das tecnologias baseadas em pêndulos, os engenheiros começaram a explorar novas formas de gerar energia. O vapor, derivado da queima de carvão, tornou-se a solução mais viável para alimentar máquinas mais poderosas e eficientes. As cidades começaram a adotar motores a vapor, dando início a um período de intensa industrialização. Essa nova era trouxe avanços rápidos na produção de bens e na expansão das cidades.\r **Auge:**  \r As máquinas a vapor revolucionaram a sociedade. Fábricas gigantes foram erguidas, transformando pequenas vilas em grandes centros industriais. As cidades passaram a crescer verticalmente, com arranha-céus e redes de transporte movidas a vapor conectando bairros e regiões. Essa era também viu o surgimento dos primeiros países organizados, com sistemas econômicos e políticos baseados na exploração de recursos naturais e na força de trabalho.\r **Queda:**  \r Apesar do progresso, as cidades começaram a sofrer os efeitos da poluição gerada pelo vapor. O ar tornou-se pesado e cinzento, afetando a saúde da população. A desigualdade social cresceu, pois os avanços tecnológicos beneficiavam principalmente as elites industriais, enquanto a classe trabalhadora vivia em condições deploráveis. A instabilidade social aumentou, levando a greves e revoltas que desafiaram o poder dos industriais. Esses conflitos marcaram o fim da era de ouro do vapor, abrindo caminho para uma nova fase tecnológica.\r Before\r Wear Steampunk',
          link: '/notes/Steampunk'
        },
        {
          id: 'Stonepunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Assim que a vida tomou forma e se libertou do reino lamacento para explorar sem direção, os perigos do mundo se revelaram. Criaturas grotescas que perambulavam pela terra obrigaram os habitantes dessa era a migrarem para o único refúgio seguro: um Canyon fortificado, onde as primeiras civilizações emergiram. O fim dessa era ocorre com a revolução carmesim e a batalha sangrenta, que dão origem à área proibida e aos primeiros reinos da terra.\r !Stonepunk.png\r **Inicio**\r Apos a Grande Queda a vida começou a se moldar na Terra. A divindade Hego, em sua tentativa de acelerar o processo de formação das primeiras civilizações, criou tres grandes monstruosidades para afastar as tribos primitivas da suas zonas de conforto. Lentamente elas foram forçadas a migrar para proximo a Torre de Fallmora, um local cercado de mistrio e poder.\r **Auge**:\r Com o crescimento da região da torre, e o surgimento de uma religião centrada em Fallmora, os tribos se unificaram em uma única nação, fazendo surgir as primeiras linguas unificadas, sistemas bancarios e culturas complexas ao redor de Fallmora que avia se tornado um sibolo de poder, assim a civilização posperou sob a proteção de Hego e a influencia da torre.\r Queda:\r A ambição desmedida do Culto carmezin insatisfeitos com o governo de Fallmora e almejando o poder, levou a libertação do Limiar|Limiar dos Caidos, uma força destrutiva alem da compreensão. A onda de destruição se espalhou rapidamente, ameaçando o mundo. Alguns conseguiram fugir antes que Hego se sacrifica-se para paralisar o Limiar no tempo, e garantisse que o lugar nunca fosse encontrado por outra pessoa.\r Before\r Bronzepunk',
          link: '/notes/Stonepunk'
        },
        {
          id: 'Teslapunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Teslapunk.png\r **Início:**  \r A era **Teslapunk** começou com a expansão da tecnologia elétrica, marcada pela influência das ideias de Nikola Tesla. Cientistas e engenheiros, inspirados por suas teorias, começaram a desenvolver dispositivos que utilizavam energia de forma limpa e quase ilimitada. Esses avanços incluíam redes de transmissão sem fio, máquinas altamente eficientes e sistemas de energia acessíveis que transformaram cidades e comunidades em modelos de sustentabilidade.\r **Auge:**  \r A sociedade alcançou um novo patamar de sofisticação. Cidades inteiras foram alimentadas por energia sem fio, com edifícios iluminados por sistemas de indução e veículos elétricos que eliminavam a poluição das eras anteriores. A era foi marcada por um otimismo renovado, onde tecnologia e arte convergiram para criar uma estética de alta eficiência e beleza funcional. O Oriente consolidou-se como o líder global dessa revolução, promovendo colaborações científicas que trouxeram prosperidade para regiões antes marginalizadas.\r **Queda:**  \r O rápido avanço das tecnologias de Tesla gerou um novo dilema: a dependência de redes centralizadas e os riscos associados ao controle dessas infraestruturas. Grandes corporações começaram a monopolizar o acesso à energia, levando a tensões sociais e políticas. O aumento da automação também trouxe desemprego em massa, gerando instabilidade em várias partes do mundo. Essas desigualdades, somadas à crescente integração de máquinas com a biologia humana, prepararam o terreno para o surgimento da era **Cyberpunk**, onde a relação entre homem e máquina seria explorada de forma mais profunda e perturbadora.\r Cyberpunk',
          link: '/notes/Teslapunk'
        },
        {
          id: 'Timepunk',
          group: 13,
          contentPreview:
            '!Timepunk.webp\r **Início:**  \r Após o colapso da magia cromática na era **War Colorpunk**, o universo mergulhou em um estado de fragmentação e caos. Tentativas de reconstruir civilizações falharam repetidamente, pois as forças da magia instável continuavam a influenciar o tecido da realidade. Foi nesse cenário que surgiram exploradores e estudiosos que descobriram a manipulação do tempo como uma nova força primordial. Fragmentos do antigo poder cromático foram usados para criar dispositivos que permitiam controlar, alterar e observar diferentes linhas temporais.\r **Auge:**  \r Os dispositivos de manipulação temporal possibilitaram avanços sem precedentes. Cidades começaram a emergir em locais estratégicos, onde o tempo era moldado para otimizar a produtividade e corrigir erros históricos. Alguns líderes usaram o controle do tempo para expandir seus domínios, enquanto outros buscavam recuperar os segredos do passado. Essa era foi marcada por uma obsessão em manipular o fluxo temporal, criando cidades-estado especializadas, onde o tempo corria de formas distintas, como acelerado, desacelerado ou cíclico.\r **Queda:**  \r O uso desenfreado da manipulação temporal gerou rupturas massivas na realidade. Paradoxos começaram a se manifestar, com linhas temporais inteiras colidindo ou desaparecendo. Certos líderes, movidos pela ambição, tentaram concentrar o controle do tempo em si mesmos, resultando na criação de fendas temporais que engoliam cidades e regiões inteiras. O universo tornou-se instável, com o tempo se tornando tão fragmentado quanto o espaço. Essa instabilidade marcou o colapso dessa era, preparando o terreno para a **Frostpunk**, onde a luta pela sobrevivência seria definida pelo clima e pela escassez.',
          link: '/notes/Timepunk'
        },
        {
          id: 'Transistorpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Transistorpunk.png\r **Início:**  \r Com o mundo devastado pela guerra movida a Rufanol e diesel, cientistas começaram a explorar alternativas energéticas mais seguras e sustentáveis. O **Projeto Warshing**, uma iniciativa internacional, descobriu os primeiros princípios da energia elétrica aplicada a sistemas em larga escala. Essa descoberta levou à criação dos primeiros transistores, pequenos dispositivos que transformaram a forma como a energia era controlada e distribuída, marcando o início de uma nova era.\r **Auge:**  \r A energia elétrica revolucionou a indústria e a vida cotidiana. Terminais elétricos começaram a ser instalados nas cidades, permitindo maior conectividade e eficiência. Os transistores possibilitaram a miniaturização de máquinas e dispositivos, dando origem a tecnologias que antes eram inimagináveis. A reconstrução das cidades devastadas ganhou impulso, com redes elétricas iluminando o mundo e simbolizando esperança e progresso. O Oriente, ainda forte após os conflitos anteriores, liderou essa transição tecnológica, compartilhando suas inovações com o resto do mundo.\r **Queda:**  \r Embora a energia elétrica tenha trazido avanços incríveis, a rápida expansão de seu uso gerou novas desigualdades. Regiões ricas em recursos elétricos prosperaram, enquanto áreas marginalizadas ficaram ainda mais isoladas. Além disso, o aumento da dependência tecnológica levou a tensões sociais e políticas, com disputas por controle de redes e recursos. O mundo estava novamente à beira de conflitos, mas desta vez guiado pela busca de eficiência e controle total da energia, preparando o terreno para a era **Teslapunk**.\r Teslapunk',
          link: '/notes/Transistorpunk'
        },
        {
          id: 'Virtual Reality',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !VirtualReality.png\r **Início:**  \r Com o agravamento das tensões sociais e o controle sufocante das megacorporações, a realidade física tornou-se insuportável para grande parte da população. Implantes de realidade aumentada começaram a evoluir, permitindo experiências imersivas que ofereciam uma fuga temporária das dificuldades do mundo real. As corporações enxergaram nisso uma oportunidade e começaram a investir pesadamente no desenvolvimento de **realidades virtuais completas**, promovendo-as como paraísos para seus usuários.\r **Auge:**  \r A realidade virtual tornou-se um refúgio. Mundos artificiais sofisticados e personalizados foram criados para atender aos desejos e necessidades de cada indivíduo. Empresas passaram a oferecer acesso vitalício a esses mundos em troca do uso dos cérebros dos participantes como processadores para redes de inteligência artificial. A sociedade dividiu-se entre os que viviam quase exclusivamente nesses mundos digitais e aqueles que permaneciam na realidade física, agora ainda mais controlada e negligenciada pelas corporações.\r **Queda:**  \r A dependência crescente da realidade virtual gerou um colapso social. Muitos dos que permaneceram na realidade física começaram a questionar a ética dessas práticas, enquanto rebeldes hackeavam as redes para liberar os "prisioneiros digitais". Com o tempo, a infraestrutura que mantinha os mundos virtuais começou a apresentar falhas, levando a colapsos catastróficos e deixando muitos usuários em estados mentais irreversíveis. Esse desequilíbrio criou as condições para o surgimento da **Cyberpunk Noir**, onde o controle absoluto e a decadência das cidades dominariam o cenário.\r Cyberpunk Noir',
          link: '/notes/Virtual%20Reality'
        },
        {
          id: 'War Colorpunk',
          group: 13,
          contentPreview:
            '!WarColorpunk.webp\r **Início:**  \r Após a queda do **Império Rubro** e a remoção dos cristais mágicos, os reinos entraram em um período de caos e fragmentação. Sem a fonte de poder que os sustentava, as nações enfrentaram crises profundas de identidade e recursos. No entanto, a magia residual das cores continuou a influenciar os territórios, agora de forma instável e imprevisível, reacendendo rivalidades e desconfianças entre as antigas facções.\r **Auge:**  \r A magia instável alimentou conflitos intensos, com os reinos tentando reivindicar territórios e artefatos remanescentes que ainda possuíam traços do poder cromático. Exércitos surgiram, cada um utilizando tecnologias rudimentares e magia residual para impor sua supremacia. A guerra tornou-se interminável, moldada por alianças efêmeras e traições constantes. Cada facção buscava recriar os cristais originais, mas sem compreender plenamente os perigos dessa tentativa.\r **Queda:**  \r A guerra alcançou seu clímax quando experimentos para recriar os cristais saíram de controle. Um desequilíbrio mágico resultou em devastação generalizada, transformando territórios inteiros em zonas inabitáveis de energia cromática pura. A população remanescente foi fragmentada em pequenas comunidades isoladas, enquanto a magia das cores começou a se dissipar gradualmente. Esse colapso marcou o fim do domínio das cores e abriu espaço para novas eras de reconstrução e exploração, como a **Timepunk**, onde o controle do tempo tentaria reordenar um universo desfragmentado.',
          link: '/notes/War%20Colorpunk'
        },
        {
          id: 'Wear Steampunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r O mesmo mal que havia derrubado o império dourado ressurge, enquanto as capitais do mundo persistem em obscurecer os céus com suas fumaças, alimentando as chamas de uma nova guerra civil entre a nobreza e os poderosos. O desespero mais uma vez assola o mundo.\r !WearSteampunk.png\r **Início:**  \r À medida que o vapor consolidava seu domínio, a capital desse novo mundo, **Londres**, tornou-se um centro de poder e inovação. No entanto, eventos inexplicáveis começaram a ocorrer. Uma névoa densa, produzida pela queima incessante de carvão, tornava-se anormalmente pesada em noites específicas, descendo pelas ruas e causando mortes misteriosas. Esse fenômeno foi inicialmente ignorado pelas elites, que continuavam a expandir o alcance das grandes navegações a vapor, explorando novos territórios como as Américas.\r **Auge:**  \r Apesar do mistério em torno da névoa, **Londres** floresceu como símbolo de progresso. Grandes invenções e avanços industriais transformaram a cidade em um epicentro cultural e tecnológico. As grandes navegações a vapor deram início à colonização de novas terras, levando a tecnologias antes restritas à Europa para outras partes do mundo. A exploração global alcançou novos patamares, com a descoberta de recursos que prometiam sustentar a expansão do vapor por gerações.\r **Queda:**  \r O fenômeno da névoa revelou-se algo muito mais sinistro: uma manifestação do **Limiar**, que corrompia tanto máquinas quanto humanos. As mortes inexplicáveis se intensificaram, levando pânico às ruas. Tentativas de investigar a névoa apenas resultaram em mais mortes, alimentando lendas urbanas sobre um terror invisível. Simultaneamente, a colonização começou a enfrentar resistência, com conflitos armados e a incapacidade de adaptar as tecnologias a vapor às novas terras, marcando o declínio da confiança no poder ilimitado do vapor.\r Before\r Cattlepunk',
          link: '/notes/Wear%20Steampunk'
        },
        {
          id: 'Weird Diesel Punk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !WeirdDieselpunk.png\r **Início:**  \r Com a crescente demanda por diesel, a produção convencional não conseguiu acompanhar o ritmo da industrialização. Inspirados pelo **Limiar**, governantes e cientistas desenvolveram o **Rufanol**, um combustível derivado de sangue humano. Extremamente eficiente, o Rufanol rapidamente substituiu o diesel em muitas indústrias e máquinas, mas sua obtenção e uso envolveram práticas sombrias e desumanas. Isso levou ao surgimento do primeiro regime ditatorial baseado na extração de sangue em escala industrial.\r **Auge:**  \r A adoção do Rufanol trouxe um novo auge tecnológico. Dirigíveis maiores e mais rápidos dominaram os céus, enquanto cidades industriais prosperavam com a energia abundante desse combustível. Governos ditatoriais começaram a usar o Rufanol para consolidar poder, com colônias e territórios submetidos a trabalhos forçados e extração de sangue. A sociedade se dividiu entre os que controlavam o Rufanol e os que eram sacrificados para sustentá-lo, criando uma era de avanço tecnológico às custas da ética e da humanidade.\r **Queda:**  \r Os abusos associados ao Rufanol geraram revoltas e resistência em várias partes do mundo. O custo humano desse combustível tornou-se insustentável, enquanto rumores de instabilidade biológica no uso prolongado do Rufanol começaram a surgir. A tensão internacional aumentou, levando a conflitos que envolveram várias nações e derrubaram governos. O mundo mergulhou em um período de guerra e caos, marcado pelo colapso de grandes indústrias e ditaduras, preparando o terreno para a **World War Dieselpunk**.\r World War Dieselpunk',
          link: '/notes/Weird%20Diesel%20Punk'
        },
        {
          id: 'Weird Gothicpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !WeirdGothicpunk.png\r **Início:**  \r Enquanto as cidades afundavam em escuridão e desespero, as aberrações biológicas da era **Organicpunk**, abandonadas nos bairros periféricos, começaram a evoluir. Inspiradas pelo **Limiar**, essas criaturas ganharam organização e sede por sangue humano, transformando os ambientes urbanos em verdadeiros campos de caça. As elites, refugiadas em cidades flutuantes, continuavam a explorar os recursos dos pobres, ignorando os horrores que se espalhavam no solo.\r **Auge:**  \r As criaturas dominaram as áreas mais desoladas das cidades, tornando cada jornada pelos bairros periféricos uma luta pela sobrevivência. Cavaleiros urbanos, antes guardiões das relíquias tecnológicas, se tornaram caçadores de monstros, utilizando armas improvisadas e artefatos antigos. Ao mesmo tempo, cultos devotos ao **Limiar** proliferaram, oferecendo sacrifícios humanos às criaturas em troca de proteção ou poderes sobrenaturais. Essa era foi marcada por um equilíbrio frágil entre sobrevivência, fé e terror.\r **Queda:**  \r O poder crescente das criaturas e dos cultos culminou em ataques massivos às áreas centrais das cidades. Muitos dos refúgios restantes foram destruídos, forçando a população a recuar ainda mais ou tentar escapar para as cidades flutuantes. A conexão entre o sobrenatural e o biológico alcançou proporções incontroláveis, e a sociedade fragmentada começou a colapsar de vez. Esse cenário marcou o início de uma nova fase, onde a sobrevivência dependeria de recursos e criatividade extrema, abrindo caminho para a **Scavengedpunk**, onde os sobreviventes tentariam recomeçar a partir dos restos do passado.\r Scavengedpunk',
          link: '/notes/Weird%20Gothicpunk'
        },
        {
          id: 'Weird Rococo',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Uma antiga ameaça emerge das profundezas do passado, há muito tempo esquecida nas montanhas gélidas, trazendo consigo uma doença que assola todo o império dourado, enfraquecendo-o e deixando-o vulnerável aos ataques dos bárbaros, bem como de outros impérios e reinos.\r !WeirdRococo.png\r **Início:**  \r O império **Aureum Sanctus** foi lentamente consumido pela corrupção da **Fagulha Liminal**, descoberta em suas minas de ouro. Inicialmente tratada como uma fonte de poder, a fagulha espalhou uma doença que contaminava o ouro, corrompendo mentes e corpos de todos que entravam em contato com o metal. Em desespero, o Culto carmezin, ressurgido nos picos das montanhas tibetanas, alimentava o caos com práticas sombrias e rituais que reforçavam a influência do Limiar.\r **Auge:**  \r Com o Ocidente se afundando em caos, a doença espalhou-se pelas principais cidades de **Aureum Sanctus**, enquanto as riquezas douradas que antes sustentavam o império agora o destruíam. A capital, infectada, tornou-se o epicentro da destruição, e a grande muralha construída pelo Oriente passou a ser usada como uma barreira contra a doença, isolando as regiões corrompidas. Os poucos sobreviventes no Ocidente recorriam ao desespero, tentando adentrar o Oriente por meio de brechas ou subornos, criando ainda mais tensão.\r **Queda:**  \r O império **Aureum Sanctus** ruiu completamente quando a corrupção atingiu seu auge. Cidades inteiras foram abandonadas, transformadas em ruínas contaminadas. A doença, transmitida através do ouro, trouxe paranoia e violência às comunidades sobreviventes. No Oriente, o fluxo de refugiados gerou novas crises sociais, com um aumento nas disputas entre cidades por recursos e segurança. O mundo entrava em uma nova era de fragmentação e incerteza.\r Before\r Dungeonpunk',
          link: '/notes/Weird%20Rococo'
        },
        {
          id: 'Weird Westpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !WeirdWestpunk.png\r **Início:**  \r Enquanto as colônias americanas enfrentavam os desafios de isolamento e disputas territoriais, fenômenos sobrenaturais começaram a surgir. Tempestades colossais, associadas à fumaça densa trazida pelo **Limiar**, devastaram vilarejos e fronteiras. Criaturas monstruosas começaram a atacar comunidades isoladas, gerando medo e caos. Os cowboys, já vistos como protetores, se tornaram verdadeiros paladinos, enfrentando essas forças desconhecidas com coragem e improviso.\r **Auge:**  \r A adaptação ao novo cenário fez surgir uma cultura única de sobrevivência. Vilas começaram a se fortificar, e tecnologias a vapor contrabandeadas da Europa foram modificadas para enfrentar os desafios sobrenaturais. As histórias de cowboys enfrentando monstros e tempestades alimentaram um espírito de resistência. Figuras lendárias surgiram, armadas com armas e engenhocas únicas, e passaram a ser vistas como símbolos de esperança nas colônias.\r **Queda:**  \r A escalada dos ataques sobrenaturais, combinada com o aumento da intensidade das tempestades, tornou muitas áreas inabitáveis. Vilas inteiras foram abandonadas, e os sobreviventes recuaram para territórios mais seguros, deixando o interior das colônias entregue ao caos. Os cowboys, antes heróis, começaram a desaparecer, incapazes de conter a expansão dos fenômenos. O Velho Oeste tornou-se um território de trevas e mistério, onde o sobrenatural dominava, preparando o terreno para um novo capítulo movido por inovação tecnológica.\r Dieselpunk',
          link: '/notes/Weird%20Westpunk'
        },
        {
          id: 'World War Dieselpunk',
          group: 13,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !WorldWarDieselpunk.webp\r **Início:**  \r A dependência global do **Rufanol** e as tensões causadas por sua exploração levaram ao surgimento de regimes expansionistas. Um país governado por uma ditadura baseada na extração e uso desse combustível iniciou um processo agressivo de expansão territorial. Outros países, temendo sua supremacia, formaram alianças para contê-lo. Assim começou uma guerra global movida por motores a diesel e abastecida pelo Rufanol, marcando a maior mobilização industrial e militar da história.\r **Auge:**  \r A guerra trouxe avanços tecnológicos sem precedentes. Exércitos utilizavam veículos blindados, dirigíveis gigantes e máquinas de guerra movidas a Rufanol. A indústria militar prosperou, com cientistas desenvolvendo armas e dispositivos revolucionários. Apesar do horror dos conflitos, as cidades industriais floresceram, alimentadas pela economia de guerra. A arquitetura e o design eram dominados por uma estética poderosa, refletindo a força dos motores e a magnitude do esforço humano.\r **Queda:**  \r O uso prolongado do Rufanol começou a cobrar um preço alto. Trabalhadores e soldados expostos ao combustível apresentavam mutações e instabilidade mental, levando ao colapso de forças militares e à revolta nas colônias exploradas. Além disso, a escassez de recursos naturais, causada pela guerra, levou à ruína de economias inteiras. Quando a guerra finalmente terminou, o mundo estava devastado, com cidades em ruínas e populações desesperadas, criando um vazio de poder que marcaria o início da era **Transistorpunk**.\r Transistorpunk',
          link: '/notes/World%20War%20Dieselpunk'
        },
        {
          id: '_Conceito - Eras Menores',
          group: 13,
          contentPreview:
            ' Apunk\r !Apunk.webp\r **Início:**  \r As três Supra-Singularidade são criadas pelo Desconhecido e vagam pelo grande vazio, a cada qual foi dada um fragmento do poder do seu criador.\r **Auge:**  \r As três Supra-Singularidade se unem dando origem a chama da existência, as singularidades que ficaram no grande vazio ficaram responsáveis de criar seus aspectos e moldar a chama afim de que ela não se apague. Na chama, os 12 aspectos das Supra-Singularidade se materializaram em grandes artefatos poderosos que moldavam a realidade. os 12 foram espalhados pelo universo mas foram, pouco a pouco se unindo na terra fazendo surgir assim a Objetos/Lendarios/Profecia do fim.\r **Queda:**  \r As _Conceitos - Divindades|Divindades suprimidas na realidade, partem para a grande batalha final, em um grande sacrifício, as entidades se unem para criar os _Conceito - Abismos da Sombra|Abismos da sombra onde abriga a Quimera que anseia por liberdade, esse evento ficou conhecido como a Grande Queda\r **Projetos**: Projetos/Jogos/Profecia do fim|Profecia do Fim\r ---\r  Era Stonepunk\r !Stonepunk.webp\r **Inicio**\r Apos a Grande Queda a vida começou a se moldar na Terra. A divindade Hego, em sua tentativa de acelerar o processo de formação das primeiras civilizações, criou tres grandes monstruosidades para afastar as tribos primitivas da suas zonas de conforto. Lentamente elas foram forçadas a migrar para proximo a Torre de Fallmora, um local cercado de mistrio e poder.\r **Auge**:\r Com o crescimento da região da torre, e o surgimento de uma religião centrada em Fallmora, os tribos se unificaram em uma única nação, fazendo surgir as primeiras linguas unificadas, sistemas bancarios e culturas complexas ao redor de Fallmora que avia se tornado um sibolo de poder, assim a civilização posperou sob a proteção de Hego e a influencia da torre.\r Queda:\r A ambição desmedida do Culto carmezin insatisfeitos com o governo de Fallmora e almejando o poder, levou a libertação do Limiar|Limiar dos Caidos, uma força destrutiva alem da compreensão. A onda de destruição se espalhou rapidamente, ameaçando o mundo. Alguns conseguiram fugir antes que Hego se sacrifica-se para paralisar o Limiar no tempo, e garantisse que o lugar nunca fosse encontrado por outra pessoa.\r  Era Bronzepunk\r !Bronzepunk.png\r **Início:**  \r Após o colapso de Fallmora e a destruição das primeiras tribos, os sobreviventes recomeçaram suas vidas usando, de forma precária, os remanescentes da antiga tecnologia.\r **Auge:**  \r A Idade do Bronze viu o florescimento dos três reinos. Abismarca prosperou com sua mineração subterrânea, tornando-se o coração da indústria; Aureum Sanctus cresceu em riqueza e influência, sua cultura dourada espalhando-se por toda a região; Trivale tornou-se o principal centro agrícola, sustentando a população dos reinos. O equilíbrio entre os três garantiu décadas de relativa estabilidade e avanços culturais.\r **Queda:**  \r Abismarca colapsou sob suas próprias estruturas, devastada por mineradores famintos por riquezas. Trivale, incapaz de sustentar as demandas crescentes, mergulhou em revoltas internas. Com o colapso dos dois reinos, a Idade do Bronze chegou a um fim caótico, preparando o terreno para as eras subsequentes.\r  Era Rococopunk\r !Rococopunk.png\r **Início:**  \r Com o colapso de Trivale e a fragmentação de Abismarca, o império **Aureum Sanctus** emergiu como a força dominante. Em busca de controle total, Aureum Sanctus expandiu suas fronteiras e estabeleceu hegemonia cultural. Sua obsessão pelo ouro transformou-o em um símbolo central de poder e identidade, levando à construção de cidades opulentas, onde o dourado adornava tudo, desde roupas até arquitetura.\r **Auge:**  \r A cultura de Aureum Sanctus atingiu seu apogeu. As cidades do império tornaram-se vitrines de luxo e prosperidade, refletindo a abundância de ouro que fluía de suas minas. As elites vestiam roupas incrustadas com peças douradas, enquanto até mesmo os cidadãos comuns possuíam ornamentos preciosos. O império irradiava uma aura de invencibilidade, com suas tradições e estética dominando os territórios conquistados.\r **Queda:**  \r A obsessão por riqueza e ostentação revelou-se insustentável. A dependência do ouro gerou desigualdades gritantes, alimentando rebeliões e ressentimentos nas periferias do império. Enquanto isso, a exploração intensiva esgotou os recursos naturais. O enfraquecimento interno foi agravado por forças externas e pela ameaça do misterioso **Limiar|Limiar dos Caídos**, que começava a ressurgir nas sombras, trazendo com ele uma corrupção que lentamente infectava a fundação do império.\r  Era _Hopepunk_\r !Hopepunk.png\r **Início:**  \r A desilusão com a opulência de **Aureum Sanctus** e sua hegemonia cultural alimentou o surgimento de grupos rebeldes em territórios dominados. Liderados por indivíduos visionários, esses grupos começaram a organizar fugas para o Oriente, buscando refúgio longe do controle imperial. Essas comunidades começaram a se reorganizar, pregando valores de união, esperança e resiliência.\r **Auge:**  \r O movimento de resistência ganhou força, criando redes de apoio para ajudar os oprimidos a escaparem da influência do império. Próximo ao antigo reino de **Trivale**, cidades começaram a surgir, guiadas por um espírito de renovação e determinação. Essas comunidades floresceram, construindo muralhas e sistemas defensivos para proteger seus habitantes, criando uma nova sociedade baseada na colaboração e no desejo de liberdade.\r **Queda:**  \r Apesar de seus ideais elevados, o crescente poder das cidades orientais atraiu a atenção do imperador de **Aureum Sanctus**. Movido pela paranoia de perder sua hegemonia, ele iniciou uma campanha militar para subjugar os rebeldes. Enquanto isso, tensões internas começaram a surgir dentro das próprias cidades orientais, entre aqueles que desejavam expandir e outros que temiam repetir os erros do passado.\r  Era _Silkpunk_\r !Silkpunk.png\r **Início:**  \r Com o fortalecimento das cidades orientais, os líderes locais investiram em tecnologias inovadoras para garantir sua sobrevivência. Inspirados pelos fortes ventos e pelas condições únicas da região, engenheiros desenvolveram maquinários e equipamentos que utilizavam recursos naturais, como energia eólica e hidráulica. A construção de uma muralha gigantesca separou o Oriente do Ocidente, tornando-se um símbolo de autonomia e proteção contra a ameaça de **Aureum Sanctus**.\r **Auge:**  \r As cidades orientais floresceram, transformando-se em exemplos de engenharia e sustentabilidade. As tecnologias desenvolvidas, baseadas na harmonia com a natureza, como dirigíveis e sistemas de transporte sofisticados, revolucionaram a forma de vida de seus habitantes. A cultura oriental alcançou um novo patamar de sofisticação, inspirando obras artísticas e avanços científicos que redefiniram os limites da criatividade humana.\r **Queda:**  \r Dias antes da investida planejada de **Aureum Sanctus** contra o Oriente, a **Fagulha Liminal** foi descoberta nas minas do império ocidental. Essa força destrutiva começou a infectar o ouro, corrompendo não apenas os recursos, mas também os corpos e mentes daqueles que os tocavam. Com o comércio ocidental enfraquecido, uma crise interna assolou o império: apenas os nascidos em território ocidental podiam ter acesso a alimentos e recursos essenciais. A investida contra o Oriente foi abortada, deixando o Ocidente à beira do colapso total e forçando o Oriente a lidar com o impacto indireto dessa calamidade.\r',
          link: '/notes/_Conceito%20-%20Eras%20Menores'
        },
        {
          id: 'Cataclisma Mágico',
          group: 14,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Cataclisma%20M%C3%A1gico'
        },
        {
          id: 'Grande exílio',
          group: 14,
          contentPreview:
            'Foi o movimento em que os Guerreiros espirituais se exilaram em Primordiz afim de se proteger do Grande caçador',
          link: '/notes/Grande%20ex%C3%ADlio'
        },
        {
          id: 'Primavera Magica',
          group: 14,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Primavera%20Magica'
        },
        {
          id: 'Tratado Universal das Divindades',
          group: 14,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Tratado%20Universal%20das%20Divindades'
        },
        {
          id: 'Arco voltaico',
          group: 15,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Arco%20voltaico'
        },
        {
          id: 'Grande Queda',
          group: 15,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Grande%20Queda'
        },
        {
          id: 'Guerra das cores',
          group: 15,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Guerra%20das%20cores'
        },
        {
          id: 'Ritual do tripudiar',
          group: 15,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Ritual%20do%20tripudiar'
        },
        {
          id: 'Tormentos de Grayhall',
          group: 15,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Tormentos%20de%20Grayhall'
        },
        {
          id: 'Celestiais',
          group: 16,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Celestiais.png\r Os Celestiais, são uma raça de seres divinos. Com sua estatura similar a dos humanos, eles caminham pela Terra com uma majestade que transcende a realidade.\r Seus corpos são formados por pura energia etérea. As asas imponentes, compostas por penas brilhantes e reluzentes, se estendem em um esplendoroso arco atrás deles, permitindo que se elevem aos céus e planem graciosamente sobre o horizonte.\r Os Celestiais possuem habilidades místicas e elementais. Com um simples gesto, eles podem convocar tempestades furiosas, desencadear terremotos devastadores e incendiar tudo ao seu redor com chamas místicas.\r Sua voz ressoa como trovões, capaz de convocar ventos violentos e desencadear explosões sônicas que despedaçam estruturas sólidas.\r Além de seu poder ofensivo, os Celestiais também possuem uma resistência incomparável.\r Eles são praticamente invulneráveis a ataques físicos e podem curar-se instantaneamente de ferimentos graves.\r Sua presença imbuída de divindade exala uma aura de proteção que pode envolver e blindar aqueles que lutam ao seu lado.\r Enquanto os mortais podem se sentir pequenos e impotentes diante dos Celestiais, eles também podem inspirar esperança e devoção.\r Aqueles que são dignos de sua confiança podem encontrar neles aliados poderosos e protetores, capazes de guiar a humanidade em momentos de trevas e desespero.\r Os Celestiais são uma visão imponente e aterrorizante, mas também são a personificação do poder divino, da força redentora, mas acima de tudo, da justiça.\r Esses seres de tamanho poder são originários da vontade de Illiphar, que sentindo a perturbação nos fundamentos de Eterna os lança para os mundos com o objetivo de reequilibrar a balançando entre o bem e o mal.',
          link: '/notes/Celestiais'
        },
        {
          id: 'Frostveil',
          group: 16,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Frostveil.png\r Frostveil, o último dos emergentes é, de fato, uma criatura lendária, um ser imponente, emergiu das regiões mais frias e inóspitas do mundo.\r Sua presença é anunciada pela queda abrupta da temperatura e pela formação de cristais de gelo ao seu redor.\r Frostveil é uma mistura magnífica de beleza gélida e poder incontestável.\r Seu corpo é coberto por um belo e longo manto mágico de tons gélidos, e cada passo seu deixa para trás uma trilha de flocos de neve cintilantes.\r Os olhos de Frostveil brilham em um tom azul intenso, como cristais de gelo, emanando uma aura gelada.\r Suas asas, geralmente recolhidas, são majestosas feitas de gelo e nevoeiro congelado, permitindo-lhe voar pelos céus com uma graça hipnotizante.\r Frostveil possui um domínio absoluto sobre o gelo e as baixas temperaturas.\r Com um simples gesto, ele pode congelar tudo ao seu redor, transformando paisagens exuberantes em terras congeladas.\r Seu toque glacial pode congelar instantaneamente qualquer ser ou objeto em seu caminho, e ele pode convocar tempestades de neve e ventos gelados que varrem as terras com ferocidade implacável.\r Porém ele é uma criatura solitária e enigmática. Ele age de acordo com seus próprios interesses e juízo, sempre sendo impossível prever seu próximo passo.\r Aqueles que ousam enfrentar Frostveil devem estar preparados para um confronto épico e desafiador.\r Suas defesas congelantes e sua força inabalável tornam-no um adversário formidável.\r No entanto, também há histórias de indivíduos corajosos que conseguiram conquistar a confiança de Frostveil e ganharam sua lealdade, tornando-se aliados poderosos contra as ameaças que assolam as terras',
          link: '/notes/Frostveil'
        },
        {
          id: 'Luminarion',
          group: 16,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Luminarion.png\r Luminarion, de fato, uma criatura imponente e aterrorizante. Com uma altura colossal de mais de 30 metros, seu corpo musculoso revestido de escamas reluzentes parece ser feito de pura energia.\r Seus olhos ardentes brilham intensamente em um tom dourado, emanando uma aura de poder inigualável.\r Dotado de asas majestosas, Luminarion e capaz de voar com uma velocidade e graça incríveis, cortando os céus com investidas assustadoras. Seus rugidos ensurdecedores ecoam como trovões, fazendo o solo tremer sob seus pés poderosos.\r No entanto, é a habilidade de manipular a luz que faz de Luminarion uma força verdadeiramente devastadora.\r Com apenas um movimento de suas enormes garras luminosas, ele é capaz de criar raios de energia concentrada, capazes de obliterar prédios inteiros e transformar cidades em ruínas fumegantes.\r Sua cauda preênsil, terminada por uma esfera de luz pulsante, pode disparar poderosos feixes de energia, desintegrando tudo em seu caminho.\r Ele é uma força imparável, sua resistência incomparável o torna praticamente invulnerável a ataques convencionais.\r Mesmo as armas mais poderosas têm dificuldade em causar danos significativos à sua armadura luminosa. Aqueles que ousam enfrentá-lo devem estar preparados para uma batalha épica, pois Luminarion não conhece piedade nem misericórdia.\r Um ser imponente e temido que traz destruição por onde passa, um aviso do poder indomável da própria natureza.\r A sua presença é um lembrete assustador da fragilidade da humanidade diante das forças cósmicas que governam o universo.',
          link: '/notes/Luminarion'
        },
        {
          id: 'Monstruosidades de Hego',
          group: 16,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Durante a primeira era, Hego, o criador das criaturas que habitavam a terra, deu vida a três grandes monstros com o propósito específico de amedrontar e separar a humanidade nômade, forçando-os a se tornarem sedentários.\r Cada uma dessas criaturas dominava um elemento diferente. A primeira, chamada Cyprianus, recebeu o poder de dominar as águas. Era uma criatura grotesca, com forma humanoides, mas com características semelhantes às de peixes.\r A segunda criatura, conhecida como Acruans, foi agraciada com o poder de dominar a terra e tudo que está abaixo dela. Era uma espécie de cabra grotesca, tão ameaçadora quanto seu irmão Cyprianus.\r Mitu foi a última a ser criada, mas sem dúvida a mais poderosa. Sua forma amorfa, assemelhando-se a um coração espinhoso, tinha a capacidade de criar pesadelos longos e aterrorizantes.',
          link: '/notes/Monstruosidades%20de%20Hego'
        },
        {
          id: 'Quimera',
          group: 16,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Quimera'
        },
        {
          id: 'Desconhecido',
          group: 17,
          contentPreview:
            '!Desconhecido.png\r Descrever a magnificência de um ser tão poderoso e inigualável é um empreendimento que desafia os próprios limites da linguagem humana. Mesmo quando nos esforçamos ao máximo, nos encontramos diante da impossibilidade de capturar plenamente a imensidão e a indescritível grandeza que emanam desse ser divino.\r Desde os albores do tempo, antes mesmo da concepção dos Domínios Etéreos e da Supra-Singularidade, Deus, em toda a sua majestosa infinidade, deu origem ao vasto oceano da existência que permeia e abraça tudo o que é. Com uma única palavra, ele convocou a luz para dissipar as sombras; com um simples pensamento, deu vida às estrelas. Ele traçou um percurso pelo infinito, moldando a criação com seu hálito criativo e imensurável poder.\r Deus é a fonte da vitalidade que sustenta toda forma de vida. Ele é detentor dos segredos mais profundos da Eterna e das profundezas impenetráveis do Ignitário.\r Com um conhecimento que abraça os recônditos mais íntimos dos corações e das almas daqueles que trilharam a jornada da vida, ele está ciente das alegrias vibrantes e das angústias profundas, das aspirações iluminadas e dos receios sombrios que permearam suas existências. Nada escapa à sua abrangente onisciência.\r A aura de sua presença ressoa mesmo nos limites mais longínquos do vácuo e em todos os reinos celestiais dos Domínios Etéreos. Seu amor compassivo envolve a totalidade do ser, enquanto sua justiça incandescente consome aqueles destinados ao inescapável Abismo das Sombras.\r Ele se erige como o árbitro supremo, com a habilidade inigualável de equilibrar a balança da justiça e da misericórdia, harmonizando a melodia da paz e da guerra. Nada elude a pureza imaculada de sua retidão.\r Aos oprimidos, ele oferece o bálsamo do conforto, enquanto aos desencaminhados impõe a disciplina necessária. Seu julgamento, imparcial e veraz, testemunha cada ato, sem exceção, sob seu olhar vigilante.\r A manifestação de Deus se revela aos viventes através das maravilhas da natureza, proclamando uma mensagem de amor e concórdia, despojando a belicosidade e o ódio de seu manto divino.\r Ele reina como o supremo criador, erguendo-se acima de todas as coisas e seres. Nenhum abalo é capaz de abater seu poder, e sua existência permanece inabalável.\r Todavia, reconhecemos com humildade que estas palavras ainda não logram capturar a plenitude da grandiosidade divina. Mesmo assim, podemos reverenciar a majestade que ele representa e esforçar-nos em viver em perfeita harmonia com os princípios e lições que ele nos confiou.',
          link: '/notes/Desconhecido'
        },
        {
          id: 'Singularidade',
          group: 17,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Singularidade'
        },
        {
          id: 'Aelon',
          group: 18,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Aelon'
        },
        {
          id: 'Aevum Primus',
          group: 18,
          contentPreview:
            'A singularidade mais antiga de todas poderia ser chamada de "Aevum Primus", que significa "Primeiro Eterno" em latim. Esse nome reflete sua posição como a primeira criação das supra-singularidades e sua natureza atemporal e eterna.',
          link: '/notes/Aevum%20Primus'
        },
        {
          id: 'Ego',
          group: 18,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Ego'
        },
        {
          id: 'Fringilla',
          group: 18,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r A Supra-Singularidade da anarquia, seu papel é bem claro, causar o caus para manter o equilíbrio, é necessário que ele exista para ser uma antítese ao seu irmão Noctus sendo um mau necessário.\r Criado pelo Desconhecido está é a única Supra-Singularidade que não reflete as características do Desconhecido sendo na verdade, fruto de tudo que ele repugna.\r Por inveja ao seus irmãos ele criou a Lâmina φ a única espada capas de matar uma Supra-Singularidade com ela, o peito de Noctus foi aberto e grandes quantidades de poder foram libertadas, poder o suficiente para fazer com que eles se fundissem, incorporandk agora a realidade chamada de Eterna hoje ele aguarda o cumprimento da Profecia dos 3 onde o Ignitário será destruído a Eterna dividida novamente e ele poderá retornar para Abyssethar.\r Graças a ele a realidade ganhou 3 aspectos Morte, Medo e Systempunk/Conceitos/Conceitos Fundamentais/Caos|Caos',
          link: '/notes/Fringilla'
        },
        {
          id: 'Hego',
          group: 18,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Hego'
        },
        {
          id: 'Illiphar',
          group: 18,
          contentPreview:
            ' A Supra-Singularidade do equilíbrio, a ela foi dada apenas o aspecto da Dualidade, seu papel é garantir que seus irmãos não se sobrecaiao um sobre o outro, quando Noctus foi morto pelo Fringilla, Illiphar cuidou de Eterna por um tempo , até que se estabilizase, por livre e espontânea vontade ela escreveu a Objetos/Lendarios/Profecia do fim enquanto se sacrificava e se juntou a Eterna surgindo assim o Ignitário, local onde ele repousa abaixo da Eterna, antes ele deu as Singularidade o objetivo de manter a chama acessa até que eles voltasem',
          link: '/notes/Illiphar'
        },
        {
          id: 'Limiar',
          group: 18,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r De tempos em tempos, um pobre mortal tem a desventura de cair nas graças das Divindades caidas, o poderoso Aevum Primus lentamente corrompe sua mente, as vozes dos que foram consumidos clamam no fundo da sua consciência, elas imploram por redenção e o ser é levado a acreditar que ele é o único capas de ceder isso a elas.\r Uma vez com seu subconsciente destuido, a vontade da Dimensão inferior ataca a ética do indivíduo, suas ações se tornam duvidosas mas para ele é o certo a se fazer, lentamente a mente se escutasse por completo, o ser perde a sua individualidade e começa a obedecer as vozes,',
          link: '/notes/Limiar'
        },
        {
          id: 'Mitu',
          group: 18,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Mitu'
        },
        {
          id: 'Nihilus',
          group: 18,
          contentPreview:
            ">[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Sua aparência física permanece velada sob uma miríade de tecidos negros, gastos, velhos e imundos, que envolvem seu ser da cabeça aos pés, recusando-se a revelar qualquer vestígio de mãos ou rosto.\r Nihilus, como é conhecido, atravessa o deserto silencioso de céu pálido com passos deliberadamente lentos e serenos, como se possuísse o dom do tempo infinito. Seus pés não perturbam as areias brancas, não deixando rastro algum em seu rastro.\r Neste deserto de silêncio absoluto, nenhum som emana dos tecidos que o envolvem, e o batimento de seu coração e a respiração se perdem na quietude. Ao cruzar com uma alma errante, Nihilus recita poemas em sua voz profunda e melódica, uma serenata que acalma a alma mais atormentada.\r ---\r No coração deste desolador reino, ergue-se um palácio sombrio, o domínio de Nihilus. O palácio, em contraste com o deserto circundante, é uma manifestação de grandiosidade, com suas torres e cúpulas escuras que perfuram o céu pálido, como se desafiassem o próprio vazio. \r Este é o lar do andarilho, onde ele se retira em silêncio e solidão.Mas a história de Nihilus começou muito distante desse palácio. Ele nasceu como uma criança nômade em uma tribo chamada Os'Ahran, cujas tendas pontuavam o deserto, e cuja sobrevivência dependia da habilidade de navegar pelas dunas imprevisíveis. \r No entanto, a vida tranquila de sua tribo foi interrompida quando ele foi raptado por uma antiga e enigmática seita conhecida como os Devoradores de Esperança. Sua infância terminou abruptamente, pois ele foi escravizado e forçado a caçar pessoas perdidas no deserto, cujas histórias de desespero eram consumidas pelos Devoradores para fortalecer sua própria existência.\r A busca por pessoas perdidas nas areias traiçoeiras de um lugar chamado Névoa da Perdição era uma tarefa perigosa, e Nihilus a realizava sem hesitação. \r O treinamento brutal e o convívio com as almas torturadas por ele moldaram-o em um instrumento implacável. Mesmo após sua fuga dos Devoradores, Nihilus não encontrou paz, pois agora ele vaga eternamente, continuando a atividade de sua infância, uma busca interminável por almas perdida",
          link: '/notes/Nihilus'
        },
        {
          id: 'Noctus',
          group: 18,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Também conhecido como o benevolente, está entidade foi derrotada por seu irmão Fringilla atravéz da poderosa Lâmina φ assim, em um sacrifício, sua morte deu origem a chama primordial chamada de Eterna que iluminava toda a Abyssethar.\r suas criações as Singularidade, levavam oferendas a sua criatividade no templo do Ignitário para manter sua chama acessa.\r Graças a esse sacrifício, o mundo ganhou os 6 aspectos do Desconhecido que incorporaram a Harmonia: Vida Tempo, Conceitos/Conceitos Fundamentais/Esperança|Esperança, Harmonia, Espaço e Energia.',
          link: '/notes/Noctus'
        },
        {
          id: 'Aldric Blotíbac',
          group: 19,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Aldric%20Blot%C3%ADbac'
        },
        {
          id: 'Alexander Clark',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Alexander%20Clark'
        },
        {
          id: 'Alice Dravas Lord',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Alice%20Dravas%20Lord'
        },
        {
          id: 'Anastácia Fallmora',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Anast%C3%A1cia%20Fallmora'
        },
        {
          id: 'Bogart',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Bogart'
        },
        {
          id: 'Callista',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Callista'
        },
        {
          id: 'Cialion Glorius',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Cialion%20Glorius'
        },
        {
          id: 'Cyprianus',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Cyprianus'
        },
        {
          id: 'Dona Lurdes SilverHand',
          group: 19,
          contentPreview:
            'Filha das cruéis terras baldias de Sombravale sempre esteve acostumada a ter de roubar para sobreviver, de acordo com ela, seu primeiro assalto foi realizado quando ela tinha 3 anos, roubando a socos os doces de crianças ricas.\r Dona Lurdes nunca frequentou as escolas de letras das cidades, seus pais nunca conseguiram matricula-la em nenhuma delas por falta de dinheiro, durante sua infância, sua vizinha, uma ladra de rosto desconhecido era responsável por cuidar da menina, pela falta de brinquedos para distrai-la a pequena Lurdes se acostumou a brincar com Lockpicks e de furte pra titia, basicamente a vizinha levava a criança para as lojas e pedia para',
          link: '/notes/Dona%20Lurdes%20SilverHand'
        },
        {
          id: 'Fallmora',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Fallmora'
        },
        {
          id: 'Grande caçador',
          group: 19,
          contentPreview:
            'Uma criatura de origem desconhecida e vontades misteriosas, surgiu em Prismora para caçar Etherisil eventualmente matando diversas Visionárias Cegas, os Guerreiros espirituais sem visionárias fugiram para Primordiz afim de se proteger da criatura e passarem a existência como renegados',
          link: '/notes/Grande%20ca%C3%A7ador'
        },
        {
          id: 'Harmonius Agathós',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Harmonius%20Agath%C3%B3s'
        },
        {
          id: 'Hermes',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Hermes'
        },
        {
          id: 'Krifirus',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Krifirus'
        },
        {
          id: 'Lecrino Seguro',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Lecrino%20Seguro'
        },
        {
          id: 'Mestre Dimitri Fallmora',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Mestre%20Dimitri%20Fallmora'
        },
        {
          id: 'Orcrus X',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Orcrus%20X'
        },
        {
          id: 'Professor Thalassor',
          group: 19,
          contentPreview:
            '!ProfessorThalassor.png.png\r Natural da cidade de Frélla, o jovem viu a luz do dia 15 anos antes do terrível Cataclisma Mágico, ocorrido durante o regime implacável de Krifirus. \r Desde cedo, ele encontrou-se imerso em um mundo anárquico, repleto de enigmas intrigantes. Na esteira desse cenário tumultuado, a Guerra das Cores avia eclodido recentemente, lançando o mundo em um estado de agonia constante.\r Seu pai, o ilustre cientista Mestre Dimitri Fallmora, figura proeminente naquela era, assegurou passagens para sua família na expedição de evacuação a bordo da Cosmos Explorer 7, uma jornada compartilhada com as mentes mais geniais do período.\r Contudo, a irmã de nosso protagonista, Anastácia Fallmora, foi selecionada como um símbolo de esperança ardente. Os cientistas haviam recentemente desvendado a viabilidade dos portais temporais e nutriam a convicção de que enviando indivíduos ao passado, através da tecnologia do futuro, a preparação para os eventos vindouros poderia ser aprimorada de forma precisa, evitando, assim, a iminente extinção.\r Embrenhados nessa ideia desesperada, os cientistas deram início aos preparativos para enviar Anastácia Fallmora e Alexander Clark, o filho mais jovem de um general proeminente, de volta ao passado, como parte de uma ambiciosa missão conhecida como Projeto Arco Voltaico.\r No dia em que a nave espacial estava finalmente pronta para o lançamento, marcando o início da missão, a humanidade viu reascender a chama da esperança. \r No entanto, a poucos metros do solo, logo após a decolagem da nave, o Cataclisma Mágico a atingiu de forma devastadora, despedaçando-a e lançando seus destroços de volta à superfície.\r Esse trágico acidente ceifou a vida de uma parcela significativa dos tripulantes, deixando apenas um punhado de sobreviventes. Entre eles, encontrava-se Thalassor, que sobreviveu ao impacto ao encontrar abrigo numa antecâmara blindada. \r Sua sobrevivência deveu-se em partes ao fato de ter sido um dos últimos a embarcar na espaçonave, o que o colocou em um local mais seguro quando a catástrofe ocorreu.\r A antecâmara se revelou notavelmente espaçosa; entretanto, apenas alguns dias após o trágico acidente, Thalassor começou a experimentar os efeitos da magia que o havia atingido. A energia mágica, que permeava o ambiente em que estava enclausurado, começou a afetá-lo de maneira inquietante.\r Sua mente se tornou um turbilhão, vozes clamando em sua mente daqueles que haviam perdido a vida. Em um estado de desespero, ele apertou os olhos fechados e rompeu em gritos. No entanto, quando a tumultuosa cacofonia finalmente cessou, Thalassor encontrou-se diante das almas dos falecidos, ainda que ele próprio continuasse a respirar.\r As consciências dos cientistas falecidos haviam se amalgamado com a sua própria, lançando os alicerces do Concelho dos Mil. Thalassor encontrava-se capaz de dialogar com esses cientistas além-túmulo, permitindo-lhe absorver seus conhecimentos e, assim, forjar-se como o lendário Professor Thalassor de Frélla.\r Desprovido das necessidades humanas como fome, frio, sede ou cansaço, ele emergiu como o eleito do universo. Enclausurado naquele local, Thalassor acomodou-se, entregando-se à meditação e à contínua aprendizagem do Concelho dos Mil, até que, eventualmente, alguém o resgatasse dessa prisão involuntária. E, como estava escrito, esse dia chegou.\r No alvorecer da era Monopunk, o Professor Thalassor foi resgatado dos destroços por um bando de sucateiros. Incorporando-se a esse grupo, ele encontrou abrigo e camaradagem, e movido por um nobre anseio de auxílio, compartilhou seus vastos conhecimentos para ajudá-los a navegar pela desolada terra que agora habitavam.\r Porém, em um lapso de poucos dias, ele foi testemunha da aniquilação de todos os seus novos companheiros, vítimas do gélido abraço do Primavera Magica. \r Nesse momento, a verdade de seu novo estado tomou forma diante dele: incapaz de ser ceifado pela morte, Thalassor encontrou-se condenado a um desapego perpétuo, impossibilitado de cultivar relações duradouras. \r Esse fardo o compeliria a perambular pelo mundo, dedicando-se à pesquisa dessa nova ciência e desvendando seus complexos efeitos.\r O Professor Thalassor, durante sua jornada, mantém uma aparência juvenil, eternamente com cerca de 15 anos, uma característica que contrasta de forma marcante com a vastidão de sua experiência e conhecimento acumulado.\r Sua presença é singular e cativante, seu corpo exibindo marcas evidentes da corrupção imposta pela magia que o assolou. Essas marcas se manifestam como padrões sutis de luz cintilante e sombras sombrias que serpenteiam pela sua pele, pulsando em sincronia com sua respiração e o fluxo de sua magia interna.\r De maneira notável, sua metade esquerda parece ser mais suscetível à corrupção, exibindo uma distorção leve, mas perceptível.\r Seu braço esquerdo é parcialmente envolto por uma delicada camada de névoa etérea, estendendo-se desde o ombro até as pontas dos dedos, conferindo-lhe uma aura de mistério que se entrelaça com sua figura.\r A pele nessa área adquire um matiz mais escuro e iridescente, criando um notável contraste com o restante de seu corpo.\r Essa aparência distinta, aliada às marcas da corrupção mágica, lança luz sobre a profundidade da jornada do professor, evidenciando os desafios que ele enfrentou na busca por decifrar os enigmas do Cataclisma Mágico e encontrar respostas para as suas consequências avassaladoras.\r Sua determinação e inteligência são ainda mais acentuadas por sua aparência singular, tornando-o um símbolo de esperança e tenacidade para aqueles que o acompanham em sua missão de salvar o mundo.\r O semblante do Professor Thalassor é adornado por uma expressão serena e imparcial, que dissimula a intensidade de sua busca por conhecimento e soluções em meio ao cataclismo mágico.\r Seus olhos, um profundo tom de azul, irradiam sabedoria que ultrapassa em muito sua idade, revelando a riqueza de sua experiência e o vasto repertório de saberes acumulados ao longo de sua jornada.\r Em sua mão direita, o professor sempre segura com firmeza um caderno de anotações desgastado. Essa caderneta é um tesouro inestimável, repleta de notas minuciosas, esquemas e símbolos mágicos que ele registrou ao longo de suas investigações e descobertas.\r Algumas páginas soltas ocasionalmente se desprendem, revelando a extensão impressionante das informações que ele carrega consigo.\r Além disso, implantes biotecnológicos salpicam discretamente diversas partes do corpo do professor. Esses minúsculos dispositivos eletrônicos estão habilmente incorporados à sua pele, mesclando-se organicamente com os tecidos circundantes.\r Sua determinação em decifrar os enigmas mágicos e encontrar soluções para salvar o mundo é digna de admiração, e sua presença é capaz de inspirar e intrigar todos os que cruzam o seu caminho.\r Muitos afirmam que Thalassor Fallmora caminha acompanhado por uma miríade de silhuetas, e sob a luz, sua sombra projeta uma visão extraordinária: mil e uma sombras parecem mover-se em sincronia com ele, cada uma movendo-se de forma independente.\r O professor é um enigma envolvente, e seu paradeiro durante a noite permanece um enigma. Encontrá-lo representa um desafio, e apenas aqueles privilegiados o suficiente para conhecê-lo pessoalmente rapidamente se tornam seus discípulos, atraídos pelo inestimável tesouro de conhecimento e sabedoria que ele oferece.\r Por diretrizes diretamente do próprio professor, seus seguidores são estritamente proibidos de mencionar ou divulgar os locais que narram a história da humanidade e lançam luz sobre os eventos do Cataclisma Mágico.\r Esse ar enigmático e cauteloso que envolve suas atividades serve apenas para intensificar o fascínio e a reverência que seus discípulos nutrem por ele.\r Thalassor Fallmora ergueu-se como uma figura de caráter lendário, envolta por narrativas e murmúrios que contribuem para a densidade do enigma que o cerca. Seu conhecimento profundo, o domínio da magia e a habilidade de atrair seguidores devotos tecem uma aura de admiração e deferência ao seu redor. Aqueles que têm a honra de absorver seu ensinamento valorizam a experiência como um privilégio ímpar na busca pelo entendimento dos segredos que permeiam o universo.',
          link: '/notes/Professor%20Thalassor'
        },
        {
          id: 'Valorian',
          group: 19,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Valorian'
        },
        {
          id: 'Évori a curandeira',
          group: 19,
          contentPreview:
            'Nasceu e viveu apos o cataclisma magico, se tornou um tipo de deusa da cura a qual é atribuida a poção de Évori',
          link: '/notes/%C3%89vori%20a%20curandeira'
        },
        {
          id: 'império Rubro',
          group: 20,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/imp%C3%A9rio%20Rubro'
        },
        {
          id: 'Sacro Império de Meijiraf',
          group: 20,
          contentPreview: 'o',
          link: '/notes/Sacro%20Imp%C3%A9rio%20de%20Meijiraf'
        },
        {
          id: 'BioForge Industries',
          group: 21,
          contentPreview:
            ' **Especialização**\r Desenvolvimento e produção de implantes biomecânicos acessíveis, aprimoramentos motoros básicos e próteses biológicas de baixo custo. Focada no mercado de massas, a **BioForge Industries** atende principalmente a mercenários iniciantes, trabalhadores industriais e habitantes de zonas marginalizadas.\r ---\r  **História**\r  **Fundador: Rafael Forge Amado**\r - **Origem:** Um ex-engenheiro biomédico de **Neo Brasília**, Rafael Forge Amado|Rafael Amado cresceu em favelas cyberpunk onde os implantes de baixa qualidade frequentemente resultavam em defeitos fatais. Após ser demitido da **HealthTec** por discordar das práticas elitistas, decidiu criar uma empresa para oferecer soluções acessíveis.\r - **Motivação:** Rafael Forge Amado|Rafael queria democratizar o acesso a implantes biológicos e mecânicos, mas a dura realidade do mercado forçou a BioForge Industries|BioForge a adotar práticas industriais agressivas, incluindo uso de materiais reciclados e testes em humanos marginalizados.\r ---\r  **Fundação da BioForge Industries**\r - **Ano de Fundação:** 2080, durante o início da _Cyberwar Punk|Cyberwar Punk_.\r - **Local de Origem:** **Bairro do Ferro Velho**, uma zona abandonada nas ruínas de **Nova Salvador**, onde a sucata era reutilizada para criar protótipos de implantes.\r - **Primeiros Anos:**\r     - Iniciou como um mercado informal, fornecendo próteses recicladas para trabalhadores mutilados em fábricas.\r     - Lançou sua primeira linha de produção, **BioForge Basic**, que rapidamente ganhou popularidade entre gangues e pequenos mercenários.\r - **Primeiro Sucesso Comercial:**\r     - Em 2085, firmou um contrato com sindicatos industriais para fornecer implantes de trabalho, consolidando-se como a principal fornecedora de melhorias acessíveis.\r ---\r  **Ascensão Durante a Cyberwar Punk|Cyberwar**\r - **Demanda Explosiva:**\r     - Durante a guerra, soldados descartados e mercenários iniciantes buscavam alternativas mais baratas para retornarem ao campo de batalha, aumentando a dependência dos produtos da BioForge Industries|BioForge.\r - **Produção de Massa:**\r     - Expandiu suas fábricas para zonas desregulamentadas, como **Glasmeer** e as **Zonas Desmilitarizadas do Pacífico**, onde podia operar sem restrições legais.\r - **Adoção Popular:**\r     - Seus implantes tornaram-se um símbolo de sobrevivência nas zonas urbanas marginalizadas, promovendo o lema: **“Forge Sua Própria Força”**.\r ---\r  **Cultura Corporativa**\r - **Pragmatismo Popular:**\r     - A BioForge Industries|BioForge se apresenta como a "empresa do povo", mas opera de forma pragmática, buscando lucros através de volumes massivos e custos baixos.\r - **Valorização da Reciclagem:**\r     - Implantes frequentemente usam materiais reciclados, garantindo preços acessíveis, mas comprometendo a durabilidade.\r - **Foco no Crescimento:**\r     - Emprega mão de obra marginalizada e incentiva parcerias com mercados paralelos, promovendo um ciclo de dependência em zonas de alta criminalidade.\r ---\r  **Infraestrutura Atual**\r 1. **Fábricas de Produção – Forjas Urbanas:**\r     - Instalações localizadas em zonas de alta densidade populacional, onde materiais reciclados são convertidos em implantes. Exemplos incluem a **Forja de Acero** em Neo Salvador e a **Usina Áquila** em Cidadela de Ferro.\r 2. **Laboratórios de Pesquisa Clandestinos:**\r     - Pequenas instalações móveis onde novos implantes são testados em populações vulneráveis, principalmente em prisioneiros ou refugiados.\r 3. **Mercados de Sucata:**\r     - Parcerias com redes de coleta de sucata e desmanches ilegais, garantindo um fluxo constante de materiais recicláveis.\r 4. **Centros de Distribuição – Tendas Urbanas:**\r     - Lojas localizadas em favelas cyberpunk e mercados clandestinos, onde técnicos improvisados instalam os implantes diretamente no cliente.\r ---\r  **Tecnologias Revolucionárias**\r - **Implantes BioForge Basic:**\r     - Próteses motorizadas de baixo custo, projetadas para funcionalidade básica, com vida útil limitada.\r - **OverDrive 2.0:**\r     - Um chip de aprimoramento que aumenta reflexos e força por curtos períodos, mas provoca desgaste extremo no corpo.\r - **Próteses Adaptativas Reforjadas:**\r     - Criadas com materiais reciclados, permitem personalização com peças adicionais, tornando-as populares entre gangues.\r',
          link: '/notes/BioForge%20Industries'
        },
        {
          id: 'Bitware',
          group: 21,
          contentPreview:
            ' **Especialização**\r Desenvolvimento de armamentos avançados, drones militares autônomos, inteligência artificial de combate, cibersegurança ofensiva e sistemas de defesa estratégica.\r ---\r  **História**\r  **Fundador: General Viktor Halstrom**\r - **Origem:** Ex-general das Forças Especiais da **Federação Nórdica**, General Viktor Halstrom|Viktor Halstrom ganhou notoriedade por suas estratégias implacáveis durante os primeiros conflitos da **Guerra das Cidades-Estado**. Desiludido com a burocracia governamental e acreditando que a guerra era inevitável, decidiu criar sua própria empresa para fornecer armas a quem estivesse disposto a pagar.\r - **Motivação:** Convencido de que a humanidade alcançaria seu verdadeiro potencial através do conflito, General Viktor Halstrom|Halstrom viu na privatização da guerra uma oportunidade de acelerar o progresso tecnológico e social.\r ---\r  **Fundação da Bitware**\r - **Ano de Fundação:** 2068, logo após o colapso das primeiras grandes potências mundiais.\r - **Local de Origem:** **Nova Berlim**, uma cidade-estado emergente que se tornou um polo tecnológico após a queda da União Europeia.\r - **Primeiros Anos:**\r     - Inicialmente, a Bitware fornecia serviços de cibersegurança para corporações emergentes. No entanto, rapidamente expandiu para o desenvolvimento de armamentos cibernéticos.\r     - Em 2072, lançou o primeiro **DMA|drone militar autônomo**, o **Valkyrie Mk I**, revolucionando o campo de batalha ao minimizar a necessidade de soldados humanos.\r - **Primeiro Sucesso Comercial:**\r     - Em 2075, fechou um contrato multimilionário com a **Liga Pan-Asiática** para fornecer sistemas de defesa autônomos, consolidando-se como uma potência militar privada.\r ---\r  **Ascensão Durante a Cyberwar Punk|Cyberwar**\r - **Expansão Militar Privada:**\r     - A Bitware começou a vender armamentos para ambos os lados dos conflitos, sem lealdade a nações ou ideologias.\r     - Desenvolveu o **Projeto Ragnarok**, uma iniciativa secreta para criar IAs bélicas capazes de tomar decisões táticas sem intervenção humana.\r - **Monopólio Tecnológico:**\r     - Adquiriu pequenas empresas de tecnologia e armamentos, consolidando-se como líder no mercado militar.\r     - Em 2085, apresentou o **Exoesqueleto Odin**, um traje de combate que amplificava a força e resistência do usuário, transformando soldados comuns em supercombatentes.\r - **Influência Global:**\r     - Manipulou conflitos menores para desestabilizar regiões e criar novas oportunidades de mercado.\r     - Estabeleceu a **Academia Valhalla**, onde treina e aprimora soldados com implantes cibernéticos e condicionamento mental.\r ---\r  **Cultura Corporativa**\r - **Meritocracia Implacável:**\r     - Funcionários são avaliados constantemente; falhas podem levar à demissão imediata ou pior.\r     - Incentiva a competição interna, acreditando que isso leva à inovação.\r - **Desumanização do Conflito:**\r     - Acredita que a guerra é um estado natural da humanidade e que deve ser explorada para progresso tecnológico e lucro.\r - **Tecnologia Sobre Moralidade:**\r     - Ética é vista como um obstáculo; o foco é a eficiência e eficácia dos produtos.\r - **Lealdade ao Poder:**\r     - Os empregados são condicionados a serem leais à corporação acima de tudo, frequentemente através de contratos vitalícios e implantes que monitoram suas atividades.\r ---\r  **Infraestrutura Atual**\r 1. **Complexos de Pesquisa Militar:**\r     - Localizados em áreas remotas como o **Deserto de Kalahari** e as **Montanhas Urais**, longe de espionagem corporativa.\r     - Laboratórios subterrâneos onde cientistas trabalham em projetos ultrassecretos, como armas biônicas e tecnologia de camuflagem ótica.\r 2. **Força Militar Privada:**\r     - Exércitos particulares equipados com o que há de mais avançado em tecnologia de combate.\r     - Os **Operativos Fenrir**, unidades de elite ciberneticamente aprimoradas, usadas para missões de alto risco.\r 3. **Redes de Distribuição Clandestinas:**\r     - Utiliza rotas não convencionais para fornecer armamentos a zonas de conflito, evitando sanções internacionais.\r     - Parcerias com piratas digitais para infiltrar sistemas inimigos.\r 4. **Sede Corporativa – A Fortaleza Mimir:**\r',
          link: '/notes/Bitware'
        },
        {
          id: 'CloudForge',
          group: 21,
          contentPreview:
            ' **CloudForge – Versão Melhorada**\r  **Especialização**\r Armazenamento massivo de dados, processamento em nuvem, inteligência coletiva digital e redes de comunicação global.\r ---\r  **História**\r  **Fundador: Lucien Kael**\r - **Origem:** Lucien Kael era um prodígio em matemática e cibernética, nascido em **Erebos**, uma cidade subterrânea construída após um colapso ambiental. Ele cresceu em um ambiente onde a sobrevivência dependia da otimização de recursos e dados.\r - **Motivação:** Fascinado pela interconexão entre humanos e máquinas, Kael acreditava que o controle absoluto dos dados era a chave para moldar o futuro da civilização. Ele fundou o **CloudForge** para criar uma infraestrutura global que consolidasse e organizasse todas as informações da humanidade.\r ---\r  **Fundação do CloudForge**\r - **Ano de Fundação:** 2073, no auge da explosão de dados e colapso de servidores tradicionais.\r - **Local de Origem:** **Nova Reykjavik**, uma cidade tecnológica construída em uma plataforma flutuante para escapar dos desastres climáticos.\r - **Primeiros Anos:**\r     - Iniciou como uma solução emergencial para armazenar dados de corporações falidas durante a crise de cibersegurança.\r     - Desenvolveu a **Cadeia de Ômega**, um sistema de servidores interligados por satélites que tornou a CloudForge indispensável para qualquer corporação que desejasse sobrevivência digital.\r - **Primeiro Sucesso Comercial:**\r     - O lançamento da **ForgeNet**, uma rede privada em nuvem que oferecia armazenamento praticamente ilimitado, imune a invasões e falhas.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Monopólio de Dados:**\r     - Durante a guerra, CloudForge tornou-se o centro nervoso para operações militares e corporativas, armazenando tudo, desde planos estratégicos até informações pessoais.\r     - Criou o **Vault Nexus**, um repositório de dados inviolável, acessível apenas às corporações mais poderosas.\r - **Rede de Comunicação Global:**\r     - Expandiu sua rede de satélites para criar o **Nebula Grid**, permitindo comunicações instantâneas em qualquer parte do mundo, mesmo em zonas de guerra.\r - **Manipulação de Dados:**\r     - Vendeu acesso privilegiado a informações críticas, moldando conflitos ao favorecer corporações que pudessem pagar por suas "consultorias estratégicas".\r ---\r  **Cultura Corporativa**\r - **Mentalidade de Armazenamento:**\r     - A CloudForge valoriza a coleta e organização de dados acima de qualquer coisa. Seus funcionários são doutrinados para ver informações como a moeda mais valiosa do mundo.\r - **Sigilo Absoluto:**\r     - Operações internas são altamente compartimentadas. Poucos têm acesso completo aos sistemas, reduzindo o risco de vazamentos.\r - **Pragmatismo Digital:**\r     - A empresa acredita que a privacidade é um conceito obsoleto, substituído pela eficiência de dados centralizados.\r ---\r  **Infraestrutura Atual**\r 1. **Servidores Flutuantes – Nexus Forja:**\r     - Localizados em plataformas móveis sobre os oceanos, os servidores são protegidos por frotas automatizadas e sistemas antiaéreos.\r     - Utilizam energia de fusão fornecida pela **Energex Corporation** para funcionamento ininterrupto.\r 2. **Estações Orbitais – Satélites Helix:**\r     - Conjunto de satélites interconectados que garantem acesso global à Nebula Grid.\r     - Satélites maiores, como o **ForgeStar**, armazenam dados críticos e operam como centros de processamento.\r 3. **Cidades Bunker – Arquivos Eternos:**\r     - Instalações subterrâneas em locais como o **Deserto de Glasmeer** e os **Alpes Obscuros**, criadas para preservar dados essenciais durante catástrofes globais.\r 4. **Redes de Processamento Distribuído:**\r     - Redes que utilizam IAs avançadas para processar informações em tempo real, otimizando a tomada de decisões corporativas e militares.\r ---\r  **Tecnologias Revolucionárias**\r - **Nebula Grid:**\r     - Uma rede global de comunicações e armazenamento que conecta todos os dispositivos digitais em tempo real.\r',
          link: '/notes/CloudForge'
        },
        {
          id: 'Energex Corporation',
          group: 21,
          contentPreview:
            ' **Energex Corporation – Versão Melhorada**\r  **Especialização**\r Extração, armazenamento e comercialização de energia, com foco em fontes nucleares, alternativas experimentais e tecnologias de fusão a frio.\r ---\r  **História**\r  **Fundador: Helena Drexler**\r - **Origem:** Nascida em **Terras de Ashvale**, uma região devastada por catástrofes energéticas, Helena cresceu entre apagões constantes e guerras por recursos. Formada em física energética, foi pioneira no desenvolvimento de reatores compactos de fusão.\r - **Motivação:** Convencida de que o futuro da humanidade dependia do acesso irrestrito à energia, Helena fundou a Energex para explorar e monopolizar todas as formas possíveis de geração energética. Seu idealismo inicial logo se transformou em pragmatismo brutal, à medida que percebeu que o controle de energia era sinônimo de controle global.\r ---\r  **Fundação da Energex Corporation**\r - **Ano de Fundação:** 2065, durante a primeira grande crise energética global.\r - **Local de Origem:** **Atlas Prime**, uma cidade industrial construída sobre os restos de um polo energético abandonado.\r - **Primeiros Anos:**\r     - A Energex começou como uma startup de energia renovável, fornecendo soluções sustentáveis para comunidades em colapso. No entanto, descobriu que as tecnologias sustentáveis eram muito caras e lentas para gerar lucro em larga escala.\r     - Em 2070, Helena direcionou os esforços da empresa para a energia nuclear e experimental, desenvolvendo o primeiro reator de fusão portátil, o **Helion Core**, que transformou a Energex em uma potência no mercado energético.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Monopólio Energético:**\r     - Durante a guerra, a Energex forneceu energia para corporações e exércitos, monopolizando o mercado com contratos exclusivos.\r     - Desenvolveu a **Rede Prometheus**, uma infraestrutura global de satélites energéticos que transmitiam energia diretamente para bases militares e instalações corporativas.\r - **Extração Implacável:**\r     - Expandiu para zonas devastadas, extraindo recursos de locais inóspitos como o **Deserto de Cinderfell** e os **Gelados de Borealis**, ignorando protestos ambientais e humanitários.\r - **Tecnologias Experimentais:**\r     - Lançou os primeiros geradores de **fusão gravitacional**, que criavam buracos negros microscópicos para produzir energia em larga escala. Apesar do sucesso, os riscos ambientais e os custos humanos foram catastróficos.\r ---\r  **Cultura Corporativa**\r - **Pragmatismo Acima de Tudo:**\r     - A Energex valoriza resultados acima de ética. Os funcionários são incentivados a superar qualquer obstáculo para maximizar a produção.\r - **Cultura de Sobrevivência:**\r     - Internamente, a corporação é descrita como "um reator em constante sobrecarga". Quem não suporta a pressão é descartado sem cerimônia.\r - **Liderança Autoritária:**\r     - Executivos e gerentes têm poder absoluto sobre suas divisões, promovendo uma hierarquia rígida e impiedosa.\r - **Controle de Recursos:**\r     - A Energex vê o planeta como um recurso a ser explorado até o último átomo, promovendo uma filosofia de "usar tudo até a exaustão".\r ---\r  **Infraestrutura Atual**\r 1. **Complexos de Extração Global:**\r     - Localizados em áreas inóspitas como o **Deserto de Glasmeer** e as **Montanhas Obsidianas**, operam com tecnologias avançadas de mineração e extração.\r     - Equipados com exoesqueletos e drones autônomos para acessar depósitos de energia profunda.\r 2. **Bases Submersas – Cúpulas Poseidon:**\r     - Instalações subaquáticas que exploram fissuras geotérmicas no fundo dos oceanos.\r     - Funcionam como centros de pesquisa e produção de energia experimental.\r 3. **Rede Prometheus:**\r     - Um conjunto de satélites de transmissão energética que conecta a Terra a instalações espaciais e zonas de guerra, fornecendo energia a qualquer lugar em tempo real.\r 4. **Hubs de Armazenamento – Cidades Bateria:**\r     - Metropóles construídas sobre reservatórios gigantes de energia, como o **Núcleo de Hélios**. Essas cidades são altamente protegidas e controladas exclusivamente pela Energex.\r 5. **Frotas Autônomas de Distribuição:**\r     - Veículos terrestres e aéreos que transportam reatores portáteis e baterias massivas para zonas remotas.\r ---\r  **Tecnologias Revolucionárias**\r',
          link: '/notes/Energex%20Corporation'
        },
        {
          id: 'HealthTec',
          group: 21,
          contentPreview:
            ' **História da HealthTec**\r  **HealthTec – Versão Melhorada**\r  **Especialização**\r Bioengenharia avançada, próteses cibernéticas, nanomedicina e resgates de elite em zonas de conflito.\r  **História**\r A HealthTec surgiu como um conglomerado farmacêutico e evoluiu ao identificar o enorme lucro nos cuidados médicos para elites, especialmente em um mundo devastado pela guerra. Sua transformação para uma corporação de resgates e aprimoramento humano reflete a filosofia de que a vida, no universo _Cyberwar Punk_, é um produto valioso, mas acessível apenas para quem pode pagar.\r  **Fundadora: Dra. Amara Klyne**\r - **Origem:** Sobreviveu à devastadora praga da **Prelaria** na região industrial de **Maden Dermircilik**. Após perder seus pais para a falta de cuidados básicos, ingressou no programa espacial da **Nova Starlines**, onde desenvolveu tecnologias para resgates em missões interplanetárias.\r - **Fundação da HealthTec:** Em rebelião contra o **Plano Âmbar**, que priorizava vidas com base em renda, roubou tecnologia vital da Nova Starlines e fundou a empresa. Seus colegas de rebelião desapareceram misteriosamente após o lançamento inicial, alimentando rumores de sabotagem corporativa.\r  **Cultura Corporativa**\r Apresenta-se como um bastião da saúde e inovação, mas por trás da fachada de esperança, trata seus operários como descartáveis e explora zonas devastadas como campos de teste humano.\r  **Infraestrutura Atualizada**\r 1. **Mega-Centros de Pesquisa**: Localizados em bases orbitais, como a **Cúpula de Apolo**, longe de reguladores terrestres.\r 2. **Hospitais Avançados:** Edifícios imponentes em metrópoles, que oferecem serviços básicos enquanto servem de fachada para práticas sombrias.\r 3. **Postos de Suporte em Guerra:** Fortificações móveis que atendem clientes de alto valor em zonas de conflito.\r 4. **Redes de Resgate Global:** Veículos blindados autônomos equipados com IA médica, drones e sistemas de defesa.\r  **Tecnologias Revolucionárias**\r - **Nanocuras:** Robôs microscópicos que regeneram tecidos.\r - **Próteses Soberanas:** Implantes que substituem membros com funcionalidade sobre-humana, mas com custo de manutenção exorbitante.\r - **NeuroPatch:** Implantes cerebrais que regulam saúde e podem desativar o cliente em caso de inadimplência.\r  **Segredos Sombrios**\r - **Cobaias Humanas:** Uso de refugiados e prisioneiros como testadores não consentidos.\r - **Manipulação de Crises:** Epidemias artificiais para impulsionar vendas.\r - **Controle Corporativo:** Rastreamento contínuo de clientes com plano vitalício, incluindo desativação remota.',
          link: '/notes/HealthTec'
        },
        {
          id: 'Helix Conglomerate',
          group: 21,
          contentPreview:
            ' **Helix Conglomerate – Versão Melhorada**\r  **Especialização**\r Fabricação de veículos terrestres de alta tecnologia, incluindo carros e motos equipados com inteligência artificial, sistemas de autonomia total, e designs modulares adaptados tanto para o mercado de luxo quanto para o uso em zonas de guerra.\r ---\r  **História**\r  **Fundador: Viktor Helix**\r - **Origem:** Nascido em **Neo Detroit**, uma cidade devastada pelo colapso das indústrias automotivas tradicionais, Viktor Helix era um designer visionário obcecado por velocidade, eficiência e integração tecnológica. Ele começou criando veículos personalizados para corredores ilegais e, eventualmente, fundou sua própria corporação.\r - **Motivação:** Viktor acreditava que o transporte era a essência da liberdade humana, mas também o instrumento perfeito para controle. Ele fundou a **Helix Conglomerate** para dominar tanto as ruas quanto os sistemas corporativos.\r ---\r  **Fundação da Helix Conglomerate**\r - **Ano de Fundação:** 2075, durante o renascimento da indústria automotiva após o desenvolvimento de combustíveis alternativos e sistemas autônomos.\r - **Local de Origem:** **Neo Detroit**, transformada em um centro tecnológico emergente.\r - **Primeiros Anos:**\r     - Começou com a fabricação de veículos para o mercado negro, adaptados para zonas de guerra e corridas clandestinas.\r     - Desenvolveu o **Helix Viper**, o primeiro carro modular que podia ser reconfigurado para uso civil ou militar em questão de horas.\r - **Primeiro Sucesso Comercial:**\r     - Em 2080, assinou contratos com corporações de segurança para fornecer veículos de patrulha autônomos, consolidando-se como líder em tecnologia automotiva.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Domínio Militar e Civil:**\r     - Expandiu sua linha de produção para incluir veículos militares leves, como motos blindadas e carros de combate equipados com drones integrados.\r - **Tecnologia de Autonomia Total:**\r     - Introduziu o **Sistema Helix Omega**, uma inteligência artificial que permitia que veículos tomassem decisões complexas em tempo real, revolucionando o transporte em zonas de alta periculosidade.\r - **Popularização Urbana:**\r     - Lançou modelos de baixo custo como o **Helix Strider**, uma moto compacta acessível, rapidamente adotada por mercenários, entregadores e corredores ilegais.\r - **Parcerias Corporativas:**\r     - Forneceu veículos personalizados para corporações como **Bitware** e **HealthTec**, criando versões especializadas para operações em ambientes hostis.\r ---\r  **Cultura Corporativa**\r - **Mentalidade de Corrida:**\r     - A Helix promove uma cultura de inovação veloz, onde ideias são testadas rapidamente no mercado. Falhas são descartadas sem hesitação.\r - **Liberdade no Design:**\r     - Designers e engenheiros têm liberdade criativa, incentivando inovações que muitas vezes desafiam convenções.\r - **Competitividade Agressiva:**\r     - A empresa opera como uma pista de corrida constante, onde funcionários são avaliados por sua capacidade de manter a velocidade e a eficiência.\r ---\r  **Infraestrutura Atual**\r 1. **Fábricas Automatizadas – Forjas de Movimento:**\r     - Localizadas em megacidades como **Neo Tokyo** e **Atlas Prime**, essas fábricas produzem veículos a uma velocidade impressionante graças ao uso de IA e robótica avançada.\r 2. **Centros de Desenvolvimento – Oficinas Helix:**\r     - Complexos dedicados ao design e teste de novos modelos. A maior instalação, a **Oficina Phoenix**, está localizada no **Deserto de Cinderfell**, onde veículos são testados em condições extremas.\r 3. **Redes de Distribuição Clandestinas:**\r     - Parcerias com corredores ilegais e mercados negros garantem que os veículos Helix estejam presentes tanto em ambientes corporativos quanto nas ruas.\r 4. **Centros de Modificação – Garagens Urbanas:**\r     - Oficinas locais que oferecem customização de veículos, popularizando o uso de modelos Helix entre gangues e mercenários.\r ---\r  **Tecnologias Revolucionárias**\r - **Sistema Helix Omega:**\r     - Uma IA avançada que permite controle autônomo total, comunicação em rede entre veículos e capacidade de adaptação a cenários imprevisíveis.\r - **Chassis Modular Quantum:**\r',
          link: '/notes/Helix%20Conglomerate'
        },
        {
          id: 'NeuroSys',
          group: 21,
          contentPreview:
            ' **NeuroSys – Versão Melhorada**\r  **Especialização**\r Sistemas neurais avançados, interfaces cérebro-máquina, redes de realidade aumentada, controle cognitivo e inteligência coletiva.\r ---\r  **História**\r  **Fundador: Dr. Elias Novik**\r - **Origem:** Elias Novik nasceu em **Zorinsk**, uma pequena cidade industrial esquecida pela globalização. Filho de um operário e uma professora, cresceu em meio à opressão corporativa. Um prodígio em neurociências, conseguiu uma bolsa para estudar em **Neo Cambridge**, onde desenvolveu as bases das primeiras interfaces cérebro-máquina.\r - **Motivação:** Novik acreditava que o verdadeiro potencial da humanidade estava na mente coletiva, livre das limitações físicas e sociais. Contudo, seus ideais altruístas foram consumidos pela visão de uma sociedade onde a NeuroSys controlaria o pensamento humano em nome da eficiência e da ordem.\r ---\r  **Fundação da NeuroSys**\r - **Ano de Fundação:** 2071, logo após os primeiros experimentos bem-sucedidos em transferência neural.\r - **Local de Origem:** **Neo Tóquio**, uma metrópole tecnológica no auge da fusão entre corpo humano e máquinas.\r - **Primeiros Anos:**\r     - A NeuroSys começou com a criação de implantes neurais básicos para ajudar pacientes com paralisia. O **NeuroLink Beta**, seu primeiro dispositivo comercial, permitia o controle de próteses mecânicas por impulsos cerebrais.\r     - Logo, percebeu o potencial desses implantes não apenas na saúde, mas na integração completa entre humanos e sistemas digitais.\r - **Primeiro Sucesso Comercial:**\r     - Em 2075, lançou o **Synapse Hub**, uma interface que conectava indivíduos a uma rede compartilhada de informações, criando o primeiro esboço de uma consciência coletiva digital.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Expansão Tecnológica:**\r     - Durante a guerra, a NeuroSys vendeu implantes neurais de controle remoto para soldados, permitindo o comando de exércitos inteiros a partir de centrais de comando.\r     - Desenvolveu o **NeuroWeb**, uma realidade virtual integrada diretamente ao cérebro, usada tanto para entretenimento quanto para treinamento militar.\r - **Influência Cultural:**\r     - Popularizou a ideia de uma "mente unificada", promovendo implantes neurais como status de evolução social.\r     - Patrocinou artistas, cientistas e influenciadores que abraçaram sua tecnologia, criando uma geração dependente do NeuroWeb.\r - **Controle Sutil:**\r     - Em 2083, lançou o **NeuroSync Alpha**, um implante acessível que oferecia acesso gratuito ao NeuroWeb. Contudo, o sistema incluía algoritmos que monitoravam e manipulavam pensamentos e emoções dos usuários.\r ---\r  **Cultura Corporativa**\r - **Mentalidade de Rede:**\r     - A NeuroSys promove a ideia de que o coletivo é superior ao individual. Seus funcionários são treinados para pensar e agir como uma unidade, sacrificando a autonomia em nome da eficiência.\r - **A Fusão do Homem com a Máquina:**\r     - Acredita que a mente humana é a única parte essencial do ser humano; o corpo é obsoleto e descartável.\r - **Obediência ao Sistema:**\r     - Funcionários são conectados ao NeuroWeb para monitoramento constante de desempenho. Rebeliões internas são virtualmente impossíveis devido ao controle direto sobre seus implantes.\r ---\r  **Infraestrutura Atual**\r 1. **Central de Consciência Global:**\r     - A sede da NeuroSys, chamada **Matriz Neural Omega**, está localizada em uma cidade flutuante conhecida como **Helios**, orbitando a Terra.\r     - Contém servidores quânticos que armazenam dados mentais de milhões de usuários, formando a base do NeuroWeb.\r 2. **Centros de Integração Humana:**\r     - Complexos urbanos onde indivíduos podem se conectar fisicamente ao NeuroWeb. Estes centros são apresentados como locais de "imersão cultural", mas também funcionam como instalações de controle populacional.\r 3. **Laboratórios de Pesquisa Subterrâneos:**\r     - Localizados em antigos bunkers de guerra, como o **Complexo Cérbero**, onde são conduzidos experimentos secretos em controle neural e consciência artificial.\r 4. **Rede de Dispersão Global:**\r     - Satélites espalhados pela órbita terrestre garantem que o NeuroWeb permaneça acessível em qualquer ponto do planeta.\r ---\r  **Tecnologias Revolucionárias**\r - **NeuroLink Prime:**\r     - O implante neural mais avançado, conectando diretamente o cérebro ao NeuroWeb. Oferece controle total de dispositivos digitais e comunicação telepática entre usuários.\r',
          link: '/notes/NeuroSys'
        },
        {
          id: 'Novera Corp',
          group: 21,
          contentPreview:
            ' **Especialização**\r Produção de veículos híbridos "voadores-terrestres", combinando mobilidade terrestre tradicional com tecnologia de levitação para transporte aéreo em baixa altitude. Focada em design futurista, eficiência energética e acessibilidade para elites corporativas e transporte urbano avançado.\r ---\r  **História**\r  **Fundadora: Sofia Novera**\r - **Origem:** Sofia Novera nasceu em **Valdis Aurora**, uma colônia flutuante experimental projetada para testar tecnologias de mobilidade sustentável. Filha de engenheiros aeroespaciais, ela cresceu cercada por protótipos de veículos inovadores e desde cedo mostrou talento para transformar ideias em produtos funcionais.\r - **Motivação:** Após testemunhar os impactos da _Cyberwar_ na mobilidade urbana, Sofia decidiu criar veículos híbridos que permitissem transporte eficiente e adaptável tanto em zonas urbanas congestionadas quanto em áreas devastadas pela guerra.\r ---\r  **Fundação da Novera Corp**\r - **Ano de Fundação:** 2078, logo após o desenvolvimento inicial de sistemas de levitação magnética acessíveis.\r - **Local de Origem:** **Neo Caracas**, uma metrópole futurista marcada por congestionamentos e poluição extrema, onde a necessidade de inovação no transporte era crítica.\r - **Primeiros Anos:**\r     - Começou como uma startup desenvolvendo táxis voadores para áreas urbanas densas.\r     - Lançou o primeiro modelo híbrido, o **Novera Skystream**, capaz de alternar entre modos terrestre e aéreo em poucos segundos.\r - **Primeiro Sucesso Comercial:**\r     - Em 2082, firmou contratos com governos locais para implementar frotas de transporte público híbrido, tornando-se referência em mobilidade sustentável.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Veículos de Mobilidade Adaptável:**\r     - Desenvolveu modelos híbridos robustos para zonas de guerra, permitindo que mercenários e forças de segurança atravessassem terrenos perigosos ou evitassem conflitos aéreos.\r - **Tecnologia de Levitação Magnética:**\r     - Introduziu o sistema **MagLytix**, que combina motores elétricos e propulsão magnética para máxima eficiência em trânsito urbano e voos de curto alcance.\r - **Transporte de Luxo:**\r     - Expandiu para o mercado de elites corporativas, lançando modelos como o **Novera Aurora**, um veículo voador-terrestre equipado com IA avançada, interiores de luxo e defesas automatizadas.\r - **Parcerias Estratégicas:**\r     - Trabalhou com a **CloudForge** para implementar sistemas de navegação autônoma e com a **Energex** para desenvolver sistemas de propulsão híbridos mais eficientes.\r ---\r  **Cultura Corporativa**\r - **Foco em Sustentabilidade:**\r     - A Novera Corp promove a ideia de que seus veículos são o futuro da mobilidade ecológica, mesmo que as práticas de produção nem sempre sigam esse ideal.\r - **Inovação no Design:**\r     - Prioriza estética futurista e funcionalidade, combinando tecnologia avançada com apelo visual.\r - **Ambição Global:**\r     - Incentiva uma mentalidade de expansão contínua, explorando mercados emergentes e desenvolvendo tecnologias que possam redefinir o transporte.\r ---\r  **Infraestrutura Atual**\r 1. **Fábricas Aerotécnicas – Ascent Labs:**\r     - Instalações localizadas em hubs de tecnologia como **Neo Caracas** e **AeroGrid Shanghai**, especializadas em fabricar chassis híbridos e sistemas de levitação.\r 2. **Plataformas de Teste Orbital:**\r     - Bases espaciais onde novos modelos são testados em condições extremas para garantir durabilidade e desempenho.\r 3. **Centros de Personalização – Ateliers Novera:**\r     - Oficinas premium localizadas em megacidades, oferecendo personalização completa para clientes de luxo.\r 4. **Terminais de Transporte Urbano:**\r     - Redes de veículos autônomos conectados que atendem tanto ao transporte público quanto ao uso privado em áreas urbanas densas.\r ---\r  **Tecnologias Revolucionárias**\r - **MagLytix Propulsion:**\r     - Sistema híbrido que combina levitação magnética e motores elétricos para alternar entre modos terrestre e aéreo.\r - **Aurora Shielding:**\r     - Um sistema defensivo para veículos de luxo que utiliza escudos energéticos para proteção contra ataques leves.\r',
          link: '/notes/Novera%20Corp'
        },
        {
          id: 'PharmaCo',
          group: 21,
          contentPreview:
            ' **PharmaCo – Versão Melhorada**\r  **Especialização**\r Desenvolvimento de bioquímicos, medicamentos experimentais e soluções biotecnológicas que servem de fachada para operações clandestinas. A **PharmaCo** não apenas conduz experimentos antiéticos, mas também "vende" seus próprios funcionários como cobaias humanas para outras corporações, consolidando-se como um eixo central de práticas desumanas no universo corporativo.\r ---\r  **História**\r  **Fundador: Dr. Alaric Voss**\r - **Origem:** Um bioquímico genial e implacável, Alaric Voss nasceu em **Nova Viena**, uma cidade reconstruída após desastres ambientais. Durante seu tempo na **HealthTec**, foi expulso por propor experimentos que tratavam seres humanos como recursos descartáveis.\r - **Motivação:** Após sua expulsão, Voss decidiu criar uma corporação onde não houvesse limites éticos para a ciência. Ele fundou a Pharmaco com uma visão distorcida de progresso: um mundo onde vidas humanas eram meramente ferramentas para avanço biotecnológico e lucro.\r ---\r  **Fundação da Pharmaco**\r - **Ano de Fundação:** 2071, durante o colapso das regulações globais de experimentação biológica.\r - **Local de Origem:** **Neo Amsterdã**, escolhida por sua posição estratégica como centro de pesquisa farmacêutica e ausência de leis rigorosas.\r - **Primeiros Anos:**\r     - Começou produzindo medicamentos genéricos para criar uma fachada confiável.\r     - Secretamente, recrutava populações vulneráveis para experimentos de alto risco. Muitos desses "funcionários" eram posteriormente vendidos para corporações rivais como cobaias humanas.\r - **Primeiro Sucesso Comercial:**\r     - O lançamento do **NeuroVive**, um sedativo que reduzia a resistência psicológica e facilitava experimentos, trouxe lucros massivos enquanto servia para expandir seu programa de vendas de cobaias.\r ---\r  **Carro-Chefe: O Programa “Ciclo Vivo”**\r - **Descrição:**  \r     A Pharmaco criou o **Ciclo Vivo**, um programa que converte funcionários de baixa patente em "recursos humanos de pesquisa". Esses indivíduos passam por modificações físicas e químicas para resistir a condições extremas, tornando-os ideais para experimentação por corporações como **Bitware**, **HealthTec**, e **Zenith Dynamics**.\r - **Processo:**\r     - **Recrutamento:** O programa atrai candidatos prometendo trabalho e benefícios, enquanto prepara esses indivíduos para o uso como cobaias.\r     - **Condicionamento:** Antes de serem vendidos, os funcionários são obrigados a consumir a **Pílula Anamnese**, que apaga suas identidades da memória coletiva, isolando-os socialmente.\r     - **Venda:** Cada cobaia é adaptada às necessidades do comprador, desde testes de armas químicas até implantes cibernéticos.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Fachada Médica:**\r     - Durante o caos da guerra, a Pharmaco expandiu sua linha de produtos farmacêuticos, tornando-se uma marca de confiança para o público, enquanto intensificava suas operações clandestinas.\r - **Mercado de Cobaias:**\r     - A guerra criou uma demanda massiva por cobaias humanas, permitindo à Pharmaco lucrar enormemente ao vender funcionários para testes em condições extremas.\r - **Pesquisa e Desenvolvimento:**\r     - Usou as informações coletadas por suas cobaias vendidas para refinar tecnologias próprias, criando medicamentos e biotecnologias cada vez mais lucrativos.\r ---\r  **Cultura Corporativa**\r - **Isolamento Social:**\r     - Funcionários de manufatura e níveis inferiores vivem em completo anonimato devido à Pílula Anamnese. Eles não possuem vínculos sociais, o que facilita sua transformação em cobaias.\r - **Hierarquia Segregada:**\r     - Os cientistas e executivos operam em níveis de sigilo extremo, garantindo que apenas poucos saibam das operações reais da corporação.\r - **Pragmatismo Imoral:**\r     - A Pharmaco valoriza eficiência acima de tudo, considerando a ética como um obstáculo ao progresso.\r ---\r  **Infraestrutura Atual**\r 1. **Fábricas de Cobaias – Complexos do Ciclo Vivo:**\r     - Localizadas em territórios desregulados como **Neo Jakarta** e **Cidades-Sucata**, onde funcionários são preparados e modificados antes de serem vendidos.\r 2. **Laboratórios de Pesquisa – Nexus Voss:**\r     - Instalações subterrâneas em locais remotos onde testes extremos são realizados em cobaias humanas.\r 3. **Centros de Distribuição – Rede Pharmanet:**\r     - Estruturas camufladas como fábricas farmacêuticas convencionais, usadas para transportar tanto medicamentos quanto cobaias.\r 4. **Bases de Teste em Zonas de Conflito:**\r',
          link: '/notes/PharmaCo'
        },
        {
          id: 'SynVera Entertainment',
          group: 21,
          contentPreview:
            ' **SynVera Entertainment – Versão Melhorada**\r  **Especialização**\r Criação de experiências imersivas, desde entretenimento digital até realidades virtuais altamente personalizadas. A **SynVera Entertainment** é líder em simulações sensoriais, narrativas interativas, e experiências projetadas para diferentes perfis de usuários, abrangendo desde o lazer até treinamentos corporativos.\r ---\r  **História**\r  **Fundadora: Veronica "Syn" Han**\r - **Origem:** Veronica Han, conhecida como "Syn", nasceu em **Neo Seul**, uma cidade onde a cultura digital e o entretenimento eram pilares econômicos. Apaixonada por contar histórias, começou como uma escritora de jogos independentes antes de entrar no mundo da tecnologia.\r - **Motivação:** Após anos explorando formas de interação emocional entre humanos e máquinas, Syn fundou a SynVera com a ideia de transformar o entretenimento em algo profundamente pessoal, acessível e adaptável a qualquer usuário.\r ---\r  **Fundação da SynVera Entertainment**\r - **Ano de Fundação:** 2076, no início da revolução das tecnologias sensoriais e interfaces neurais.\r - **Local de Origem:** **Neo Seul**, centro cultural e tecnológico global.\r - **Primeiros Anos:**\r     - Começou como uma pequena empresa desenvolvendo narrativas interativas para plataformas de realidade aumentada.\r     - Lançou seu primeiro sucesso comercial, o simulador emocional **EchoDream**, que permitia aos usuários reviver memórias editadas e idealizadas.\r - **Primeiro Sucesso Comercial:**\r     - Em 2080, lançou o **Sensoria Nexus**, um sistema que conectava os sentidos dos usuários a realidades virtuais completas, tornando-se um fenômeno global.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Treinamentos Imersivos:**\r     - Desenvolveu ambientes simulados para treinar soldados, mercenários e trabalhadores em zonas de alta periculosidade.\r - **Realidades de Fuga:**\r     - Popularizou sistemas de entretenimento que ofereciam escapes emocionais em um mundo devastado pela guerra, aumentando a dependência de suas tecnologias.\r - **Parcerias Corporativas:**\r     - Trabalhou com empresas como **NeuroSys** para integrar implantes neurais às suas experiências, garantindo imersão total.\r - **Experiências Exclusivas:**\r     - Criou narrativas customizadas para elites corporativas, permitindo-lhes explorar mundos sob medida para suas fantasias e ambições.\r ---\r  **Cultura Corporativa**\r - **Criatividade Sem Limites:**\r     - Funcionários são incentivados a inovar e experimentar, muitas vezes ignorando barreiras éticas em nome da inovação.\r - **Foco no Usuário:**\r     - Promove a ideia de que cada experiência deve ser única e profundamente pessoal, adaptando-se aos desejos e necessidades do cliente.\r - **Ambição Artística e Tecnológica:**\r     - Valoriza a fusão de tecnologia avançada com storytelling emocional, criando produtos que transcendem o simples entretenimento.\r ---\r  **Infraestrutura Atual**\r 1. **Estúdios Imersivos – SynLabs:**\r     - Localizados em cidades culturais como **Neo Seul** e **Neo Kyoto**, esses estúdios criam narrativas interativas e mundos virtuais personalizados.\r 2. **Centros Sensoriais – Experiência Nexus:**\r     - Espaços públicos onde usuários podem experimentar realidades virtuais sem possuir o hardware.\r 3. **Redes de Integração – SynCloud:**\r     - Infraestrutura de servidores dedicada a armazenar dados sensoriais e narrativos para acesso remoto em qualquer lugar do mundo.\r 4. **Bases de Simulação Militar:**\r     - Instalações contratadas por corporações militares e de segurança, usadas para treinar operativos em cenários simulados hiper-realistas.\r ---\r  **Tecnologias Revolucionárias**\r - **Sensoria Nexus:**\r     - Um sistema de realidade virtual que conecta os sentidos humanos à experiência digital, incluindo tato, olfato e paladar.\r - **Simuladores EchoDream:**\r',
          link: '/notes/SynVera%20Entertainment'
        },
        {
          id: 'Zenith Dynamics',
          group: 21,
          contentPreview:
            ' **Especialização**\r Desenvolvimento de armas corpo a corpo avançadas, como lâminas energéticas, bastões multifuncionais e ferramentas de combate discretas, além de implantes cibernéticos voltados para espionagem, infiltração e sabotagem.\r ---\r  **História**\r  **Fundador: Kael Drax**\r - **Origem:** Kael Drax era um ex-espião corporativo com especialização em operações de infiltração e combate próximo. Nascido em **Tarsis Subterrânea**, um reduto de mercenários e agentes clandestinos, Kael testemunhou a ineficácia de armas convencionais em missões de alta complexidade.\r - **Motivação:** Após a traição de sua antiga corporação, Kael fundou a **Zenith Dynamics** com o objetivo de criar ferramentas perfeitas para espionagem e combate próximo, permitindo que agentes operassem com discrição e precisão cirúrgica.\r ---\r  **Fundação da Zenith Dynamics**\r - **Ano de Fundação:** 2071, durante o início da era de espionagem corporativa intensificada pela _Cyberwar_.\r - **Local de Origem:** **Neo Alexandria**, uma cidade reconhecida como berço de redes clandestinas e tecnologia de ponta.\r - **Primeiros Anos:**\r     - Começou como uma fornecedora de lâminas compactas para assassinos e mercenários independentes.\r     - Ganhou notoriedade ao desenvolver o **Phantom Edge**, uma lâmina energizada compacta que podia cortar praticamente qualquer material.\r - **Primeiro Sucesso Comercial:**\r     - Em 2075, firmou um contrato com a **Bitware** para equipar suas unidades de operações clandestinas com armas corpo a corpo e implantes de infiltração.\r ---\r  **Ascensão Durante a Cyberwar**\r - **Especialização em Espionagem:**\r     - Desenvolveu implantes como o **Specter Node**, um sistema neural que permite aos usuários evitar detecção por sensores tradicionais.\r - **Armas de Combate Silencioso:**\r     - Popularizou armas de combate próximas silenciosas e letais, usadas por agentes corporativos e mercenários de elite.\r - **Treinamento Integrado:**\r     - Criou academias clandestinas para treinar usuários em técnicas de combate avançadas e espionagem.\r - **Parcerias Estratégicas:**\r     - Trabalhou com a **NeuroSys** para integrar suas armas e implantes diretamente em redes neurais, aumentando a eficiência operacional.\r ---\r  **Cultura Corporativa**\r - **Foco em Discrição:**\r     - A Zenith promove a ideia de que a verdadeira força está na invisibilidade e na precisão.\r - **Excelência em Combate:**\r     - Os funcionários são treinados em combate próximo e habilidades de infiltração, refletindo a cultura de eficiência e letalidade da empresa.\r - **Mentalidade de Caçador:**\r     - Valoriza a independência e o instinto de seus desenvolvedores, incentivando-os a criar ferramentas que superem as necessidades do usuário.\r ---\r  **Infraestrutura Atual**\r 1. **Laboratórios Sombrios – Forjas da Letalidade:**\r     - Instalações ocultas em megacidades como **Neo Alexandria** e **Shadow Grid**, especializadas em prototipagem de armas avançadas.\r 2. **Centros de Treinamento – Academias Specter:**\r     - Localizadas em zonas desregulamentadas, essas academias treinam agentes corporativos em combate corpo a corpo e uso de implantes.\r 3. **Redes de Distribuição Oculta:**\r     - Operações clandestinas que conectam a Zenith a mercados negros e redes de espionagem global.\r 4. **Bases Subterrâneas – Cidades Espectrais:**\r     - Complexos subterrâneos usados para armazenamento e teste de protótipos, além de operações ultrassecretas.\r ---\r  **Tecnologias Revolucionárias**\r - **Phantom Edge:**\r     - Lâmina energizada ultrafina capaz de cortar qualquer material, popular entre assassinos e mercenários.\r - **Specter Node:**\r     - Um implante neural que emite ondas de disfarce para evitar detecção por sensores e câmeras.\r',
          link: '/notes/Zenith%20Dynamics'
        },
        {
          id: 'Culto carmezin',
          group: 22,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Culto%20carmezin'
        },
        {
          id: 'Igreja das Luzes',
          group: 22,
          contentPreview:
            'A igreja das luzes era divida em duas grandes ordens, a sacra e a militar.\r A ordem Sacra era a responsavel pelos ritos e serimonias religioas enquanto a militar era responsavel por proteger as muralhas, combater os inimigos, conquistar territorios e proteger os viagantes, alem de servir como força mercenaria quando necessario.\r dentro de cada ordem uma hierarquia era visivel, na ordem sacra a hierearquia era:\r 1. **Sumo patriarca**: o lider supremo da ordem, ele junto com o lider da outra ordem tomam as decisoes da igreja.\r 2. **Conselho dos Sabios**: Um grupo de líderes religiosos experientes e eruditos que aconselham o Sumo Sacerdote/Sacerdotisa em questões teológicas e decisões importantes.\r 3. **Hierofantes**: Sacerdotes e sacerdotisas de alto escalão que têm a responsabilidade de administrar rituais sagrados e manter a conexão direta com Elyssia. Eles são líderes espirituais das comunidades locais.\r 4. **Guardiões da Esperança**: Sacerdotes e sacerdotisas encarregados de cuidar dos lugares sagrados e preservar os artefatos religiosos. Eles também servem como defensores da esperança em tempos difíceis.\r 5. **Mestres dos Ritos**: Sacerdotes e sacerdotisas especializados em conduzir cerimônias e rituais religiosos, como casamentos, batismos e festivais em homenagem a Elyssia.\r 6. **Cuidadores dos Desesperados**: Um grupo de membros da igreja treinados para oferecer apoio emocional e ajuda prática aos necessitados. Eles são conhecidos por espalhar a esperança através de ações benevolentes.\r 7. **Cantores da Esperança**: Um coral de sacerdotes e sacerdotisas que realizam cânticos e músicas sagradas em adoração a Elyssia. Suas performances são consideradas uma forma de elevar o espírito dos fiéis.\r 8. **Discípulos da Luz**: Os noviços e acólitos que estão em treinamento para se tornarem sacerdotes ou sacerdotisas. Eles ajudam nas tarefas cotidianas do templo e aprendem os ensinamentos de Elyssia.\r 9. **Seguidores Devotos**: Os membros comuns da igreja que participam das cerimônias e rituais, recebem orientação espiritual e contribuem com doações para apoiar a igreja e suas obras de caridade.\r Nas cidades controladas pela igreja, novos títulos de ordem surgiam sendo eles:\r 1. **Lider Supremo das cidades**: uma figura política de alto escalão que é considerada como representante direto de Elyssia na cidade capital. Embora não seja oficialmente parte da hierarquia religiosa, este líder trabalha em estreita colaboração com a igreja para garantir a prosperidade da cidade.\r 2. **Cuidadores dos Desesperados da Cidade**: Membros treinados para fornecer assistência a cidadãos necessitados, coordenando esforços de caridade e ajuda social em nome da igreja.\r 3. **Cantores da Esperança da Cidade**: Um coral de sacerdotes e sacerdotisas que se apresenta em eventos importantes da cidade para elevar o moral dos cidadãos e espalhar a mensagem de esperança.\r 4. **Discípulos da Luz da Cidade**: Noviços e acólitos que estão em treinamento para se tornarem sacerdotes ou sacerdotisas, auxiliando em tarefas religiosas e assistência à comunidade.\r Ao lado dos militares não se via muita diferença das ordens comuns sendo os titulos:\r 1. **General**: Este é o líder máximo das forças armadas e é responsável por estabelecer a visão e os objetivos estratégicos para a defesa da nação.\r 2. **Tenente-General**: O Tenente-General é o segundo em comando e ajuda a implementar a estratégia definida pelo General da Esperança Suprema.\r 3. **Major-General**: O Major-General é responsável por comandar divisões de forças militares significativas e garantir a preparação das tropas para a esperança.\r 5. **Coronel**: O Coronel lidera regimentos ou brigadas, desempenhando um papel fundamental na aplicação das estratégias e na motivação das tropas para manter a esperança.\r 6. **Major**: O Major lidera batalhões e desempenha um papel importante no treinamento e na coordenação das operações no campo de batalha.\r 6. **Capitão**: O Capitão comanda companhias e é responsável por liderar seus soldados com coragem e inspiração.\r 1. **Tenente**: Os Tenentes auxiliam os Capitães e desempenham um papel vital na coordenação tática das unidades menores.\r 8. **Sargento**: Os Sargentos são líderes não comissionados que supervisionam equipes de soldados, garantindo que mantenham a esperança em meio às adversidades.\r 10. **Cabo**: Os Cabos são responsáveis por liderar pequenos grupos de soldados e garantir que sigam os objetivos e a moral elevada.\r 12. **Soldado**: Os Soldados são a espinha dorsal das forças militares, que mantêm viva a esperança por meio de seu compromisso, coragem e determinação.\r 13. **Patrulheiro**: Os patrulheiros são a patente mais baixa e sua única responsabilidade é garantir que os bêbados não causem confusões.\r Seus templos funcionavam apenas durante o dia, a arquitetura simulava as grandes catedrais góticas com grandes vitrais coloridos, entretanto o vidro era fortemente pintado para que transpassa se o mínimo de luz possível.\r Por conta disso, o interior de seus templos eram escuros com excessão de seu centro.\r O salão principal era construído de forma circular, no centro uma espécie de palanque, acima deste palanque uma grande cúpula delicadamente decorada e equipada com um complexo sistema de reflexão ilumina este palanque de forma ostensiva.\r Uma única cadeira é posicionada no centro do palanque onde aquele que irá conduzir a reunião se senta.\r Ao meio dia, os seus seguidores se reunião nestes templos, cantando e proferindo orações a luminescência, o líder, utilizando roupas brancas com adornos dourados se senta na cadeira central e todos ficam em silêncio por alguns minutos, ate que o último se retire o líder fica sentado na cadeira.\r  Canções\r Algumas canções que são entoadas durante as reuniões sao:',
          link: '/notes/Igreja%20das%20Luzes'
        },
        {
          id: 'Seguidores de Callista',
          group: 22,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Seguidores%20de%20Callista'
        },
        {
          id: 'Autarquia dos Magos',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Autarquia%20dos%20Magos'
        },
        {
          id: 'Conselho dos Magos',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Conselho%20dos%20Magos'
        },
        {
          id: 'Cátedras arcanas',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/C%C3%A1tedras%20arcanas'
        },
        {
          id: 'Divindades caidas',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Divindades%20caidas'
        },
        {
          id: 'Emissários de Equitaria',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Emiss%C3%A1rios%20de%20Equitaria'
        },
        {
          id: 'Inquisidores de Hermes',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Inquisidores%20de%20Hermes'
        },
        {
          id: 'Ordem dos Firmamentos',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Ordem%20dos%20Firmamentos'
        },
        {
          id: 'Ordens cardinais',
          group: 23,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Ordens%20cardinais'
        },
        {
          id: 'Westerbarrow',
          group: 24,
          contentPreview:
            'A esplêndida e próspera cidade de Westerbarrow se destaca como o epicentro da devoção a Elyssia, a divindade da esperança, atraindo centenas de milhares de seguidores de todos os cantos dos reinos e nações.\r Erguida majestosamente sobre uma colina, a cidade é meticulosamente protegida por um intrincado sistema de sete muralhas, cada uma carregando seu significado simbólico e representando diferentes níveis de acesso.\r A primeira das muralhas é conhecida como **Muralha da Resiliência**. Ela ostenta uma estética deslumbrante e, embora não possua portões funcionais, desempenha um papel puramente decorativo. Construída com pedra branca polida, esta muralha é ornamentada com uma imponente bandeira dourada, onde o símbolo da Igreja das Luzes brilha em destaque.\r Contornando todo o seu perímetro, uma vibrante cena comercial se desdobra. Aqui, inúmeros comerciantes de diversas origens oferecem uma riqueza de produtos de todos os tipos e procedências, criando um verdadeiro mosaico de mercadorias à disposição dos visitantes.\r Constantemente, a atmosfera neste local é vibrante, com numerosos Patrulheiros da Alvorada patrulhando entre a multidão, assegurando a manutenção da ordem e da paz.\r A segunda muralha é a **Muralha da Compaixão**, e sua presença é marcada por portões imponentes adornados com o símbolo distintivo da deusa. Estes portões se erguem como um testemunho da devoção e compaixão que Elyssia inspira em seus seguidores, enquanto permanecem fechados, aguardando aqueles dignos de passar por eles.\r Para cruzar essa muralha, é imperativo demonstrar ser um membro autêntico da Igreja das Luzes. Muitos optam por fazer isso através de um ato de sacrifício, um gesto profundo que marca a sua adesão à religião. Tornar-se um membro genuíno dessa fé requer o sacrifício de uma parte do próprio corpo, com o sangue resultante sendo ritualisticamente selado com o emblema da igreja.\r A validação rigorosa dos seguidores nessa área da muralha é essencial, uma vez que este é um espaço sagrado e reverenciado. Acredita-se que seja crucial manter a pureza da fé dentro desses muros para que as bênçãos de Elyssia continuem a fluir abundantemente.\r A **Muralha da Compaixão** é um local dedicado à cura e às bênçãos, onde as pessoas levam os enfermos com a esperança de encontrar a cura, a redenção ou até mesmo a ressurreição.\r Este espaço é ornamentado com diversos templos, praças e fontes, proporcionando um ambiente sereno e reverente. Embora o fluxo de pessoas seja um pouco menor em comparação com a **Muralha da Resiliência**, a atmosfera aqui é permeada pela fé e pela busca por cura.\r Vale ressaltar que dentro dessa muralha não há acomodações disponíveis. Os visitantes e viajantes que desejam passar mais tempo precisam procurar alojamento quando o **Sino da Benção** badalar, indicando o momento propício para tal busca.\r A terceira muralha, conhecida como **Muralha da União**, é resguardada por portões mais modestos em comparação com os da **Muralha da Compaixão**. Este trecho murado abriga instituições de ensino e bibliotecas de renome, onde a Igreja das Luzes acolhe órfãos e jovens aspirantes que desejam ingressar nas ordens mais elevadas do clero ou do exército.\r Dentro deste espaço sagrado, eles embarcam em um período de estudos de doze anos, com cada ano dedicado a um conjunto específico de ensinamentos:\r Dentro deste notável período de estudos de doze anos, os jovens são submetidos a uma educação abrangente que molda o seu entendimento da fé e os prepara para servir a Igreja das Luzes com dedicação e sabedoria. As escolas e os ensinamentos específicos incluem:\r 1. **Escola da Teologia Elyssiana**: Aqui, os fundamentos da fé em Elyssia são ministrados, abrangendo mitologias, doutrinas e dogmas que sustentam a crença.\r 2. **Escola da Esperança**: Os futuros clérigos são instruídos a transmitir e inspirar a esperança nas pessoas, independentemente das circunstâncias, usando ferramentas como o amor e o entendimento.\r 3. **Escola da Caridade Benevolente**: Os jovens aprendem a importância da caridade e começam a explorar o mundo exterior, enquanto também iniciam seus estudos em magia básica.\r 4. **Escola da Cura**: Os estudantes adquirem conhecimentos sobre magia de cura básica e técnicas de primeiros socorros.\r 5. **Escola das Artes Divinas**: Aqui, os jovens são iniciados nos rituais e simbolismos que permeiam as cerimônias religiosas.\r 6. **Escola de Filosofia da Esperança**: Explora-se as filosofias e ensinamentos éticos relacionados à esperança, capacitando os clérigos a orientar os cidadãos em questões morais.\r 7. **Escola da Sacro-História**: Os futuros clérigos imergem nos contos e na história da fé em Elyssia, estudando seus grandes seguidores e profetas.\r 8. **Escola de Meditação e Reflexão**: Os clérigos aprendem a cultivar paciência e a praticar a meditação para aprofundar sua conexão com Elyssia.\r 9. **Escola das Escrituras Sagradas**: Textos sagrados de Elyssia são estudados em profundidade, permitindo uma compreensão mais profunda da fé.\r 10. **Escola das Artes Sagradas**: Além das cerimônias, esta escola ensina música, poesia e outras formas de expressão artística como meios de adoração a Elyssia.\r 11. **Escola de Defesa Espiritual**: Aqui, os clérigos são treinados nas artes arcanas para proteger a fé, embora nem todos saiam vivos dessas batalhas espirituais.\r 12. **Escola da Diplomacia Celeste**: Esta escola prepara os clérigos para interações com outras pessoas, de forma a evitar o uso das artes da escola anterior sempre que possível.\r Este ciclo de estudos abrangente visa criar clérigos capacitados e compassivos, prontos para servir a deusa Elyssia e guiar aqueles que buscam esperança e redenção em sua luz.\r Após completar as doze escolas, os clérigos estão aptos a atravessar as muralhas da **Sabedoria**, um segundo nível de seu treinamento e uma oportunidade para o clero mais elevado se dedicar à busca pelo conhecimento. Nesta muralha, é comum ver jovens provenientes de famílias reais e nobres, que enviam seus filhos para estudar neste distinto local. Aqueles clérigos que se destacam durante seu tempo aqui podem ascender a níveis mais altos dentro da hierarquia clerical.\r A **Muralha da Sabedoria** é um local de aprofundamento do conhecimento e sabedoria, onde os clérigos buscam um entendimento mais profundo da fé em Elyssia, além de se tornarem eruditos e líderes religiosos respeitados em sua comunidade. Essa jornada é vista como um serviço à deusa e à humanidade, uma vez que os clérigos se tornam os guardiões do conhecimento e da esperança, prontos para orientar aqueles que buscam o caminho da luz e da redenção.\r A **Muralha da Coragem** serve como lar daqueles que estão dispostos a sacrificar suas vidas em nome de sua fé, sendo um campo de treinamento para os valorosos soldados que empunham o estandarte da fé com bravura.\r A próxima muralha, chamada de **Esperança**, abriga um imponente templo de paredes brancas adornadas com detalhes dourados. Grandiosos vitrais exibem imagens de nobres e reis, enquanto uma majestosa escadaria conduz à imponente porta do templo, ladeada por estátuas de antigos profetas.\r Neste local sagrado, somente membros do alto clero têm permissão para entrar, pois o templo abriga o artefato mais reverenciado de Elyssia. Abaixo do **Sino das Bênçãos**, encontra-se um pedestal com um belo cristal translúcido, o receptáculo da própria esperança, símbolo supremo da deusa. Este local é guardado com zelo, visto que o cristal é considerado a essência da fé e da esperança que flui através de Westerbarrow e além, sustentando a devoção de seus seguidores.\r  A Queda\r Embora a data exata permaneça perdida nos anais do tempo, a tragédia abateu-se sobre Westerbarrow durante o reinado do temível duque Pirorn. De repente, a cidade florescente foi engolida pela ruína, com viajantes que buscavam bênçãos e graças encontrando apenas desolação e vegetação tomando conta das construções. O artefato de Elyssia desaparecera, e todos os seus clérigos haviam fugido, deixando para trás um mistério insolúvel. Inúmeros aventureiros ousaram explorar a cidade em busca do artefato, mas ele permaneceu inatingível, como se tivesse desaparecido nas sombras da história.\r Acredita-se amplamente que essa calamidade tenha sido engendrada pela fé rival de Grunch, cujo desejo ardente era ver a queda de Elyssia e o enfraquecimento de sua influência. Westerbarrow, outrora um farol de esperança, agora permanece como um símbolo trágico de um passado glorioso e uma fé abalada. Se o artefato de Elyssia será recuperado e a cidade restaurada à sua antiga glória, ou se a sombra de Grunch prevalecerá, é uma incerteza que continua a intrigar os corações e mentes de todos os que buscam a verdade.',
          link: '/notes/Westerbarrow'
        },
        {
          id: 'Forte de Rosvalia',
          group: 25,
          contentPreview:
            '!Forte De Rosvalia.jpg **Forte de Rosvalia – A Cidade Vertical das Neves**\r De longe, o **Forte de Rosvalia** aparenta ser apenas uma fortaleza comum, um bastião de pedra erguido no topo de uma montanha nevada. Suas muralhas, imponentes e rústicas, se misturam às rochas cobertas de gelo, como se fossem parte da própria montanha. No entanto, essa visão simples esconde a grandiosidade de sua verdadeira estrutura.\r Assim que um viajante se aproxima, ele percebe que **as muralhas do forte não são meramente defensivas** – são a fundação de uma **cidade vertical**, esculpida diretamente na encosta da montanha. As **paredes de pedra** sustentam não apenas torres e baluartes, mas também casas, pontes e passagens que se entrelaçam como um grande labirinto suspenso.\r A cidade se estende **para baixo da fortaleza**, crescendo em camadas, como se fosse um organismo vivo adaptado à geografia brutal do frio. **Passarelas de madeira e ferro** conectam os diferentes níveis, permitindo que mercadores, soldados e sacerdotes transitem entre as estruturas. **Varandas cobertas de neve**, com lanternas de cristal aquecido, iluminam as ruas suspensas que serpenteiam pelas paredes da cidade.\r  **Detalhes Arquitetônicos e Ambientação**\r - **Muralhas ciclópicas** que servem de fundação para habitações e edifícios administrativos.\r - **Casas de pedra e madeira** presas às encostas, protegidas por telhados inclinados contra a neve.\r - **Pontes suspensas** ligam torres de observação e postos de vigia.\r - **Ruelas esculpidas** na própria rocha, criando túneis e vielas protegidas do vento cortante.\r - **Estátuas de figuras antigas**, guardiões eternos, cravadas nas entradas principais.\r - **Canais de água quente**, desviados de fontes termais subterrâneas, mantêm algumas partes da cidade habitáveis.\r No topo de tudo, dominando a paisagem, ergue-se o **castelo-fortaleza central**, uma estrutura austera e impenetrável, lar dos governantes e centro do poder da região. Seu **grande salão**, com janelas arqueadas e torres que parecem tocar o céu cinzento, é onde são tomadas as decisões que moldam o destino de Rosvalia e seus domínios.\r **No inverno mais severo**, quando as nevascas tornam os caminhos intransitáveis, **a cidade se fecha em si mesma**, tornando-se um monólito silencioso e isolado, resistindo à brutalidade do clima e das eras. **Mas aqueles que a conhecem sabem** – sob a sua frieza e austeridade, pulsa o coração de uma cidade que sobrevive contra todas as probabilidades.\r !Forte De Rosvalia_Cidade.jpg',
          link: '/notes/Forte%20de%20Rosvalia'
        },
        {
          id: 'Frélla',
          group: 26,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Fr%C3%A9lla'
        },
        {
          id: 'Sombravale',
          group: 26,
          contentPreview:
            ' Topografia\r Sombraville está situada em um vale sombrio, cercado por colinas íngremes e florestas densas. A cidade é atravessada por um rio poluído e sinuoso, que divide a área urbana em duas partes desiguais. As ruas são estreitas e tortuosas, com prédios decadentes e favelas se aglomerando em becos escuros. A topografia acidentada cria muitos esconderijos naturais para atividades criminosas, tornando o controle policial desafiador.\r  Historia\r A história de Sombravale é fascinante. A cidade, fundada por Veldrofal Sombravale, um nobre de Baldur’s Gate, começou como uma zona de mineração devido à abundância de ouro vermelho na região. Com o tempo, a cidade cresceu em torno da operação de mineração, com casas de pedra, lama e madeira sendo construídas.\r No entanto, após 60 anos, o ouro vermelho começou a escassear, tornando a mineração menos lucrativa. Apesar disso, a cidade continuou a crescer, com casas maiores e mais nobres sendo construídas à medida que se afastavam do centro da cidade.\r Com a morte de Veldrofal, a família encerrou oficialmente as operações de mineração e cedeu o prédio da empresa para ser usado como prefeitura. A cidade, localizada entre três grandes cidades, começou a se desenvolver como um centro de comércio e logística. Os nobres construíram uma muralha ao redor da zona principal da cidade, e grandes centros de armazenamento e comércio foram erguidos dentro da muralha.\r No entanto, a guarda protegia apenas o interior da muralha, deixando as áreas internas à mercê de si mesmas. Eventualmente, a região cresceu de forma desproporcional ao que ela tinha a oferecer, e as ruas erráticas da cidade externa se tornaram muito perigosas. Quando o império reconheceu a cidade como um ponto de comércio, os ladrões se tornaram contrabandistas habilidosos, usando o próprio sistema já existente para o contrabando.\r Cerca de 100 anos após a proclamação da zona de comércio, ocorreu a Revolução dos Mercenários, liderada por Dona Lurdes SilverHand, ainda em sua juventude. Com a queda dos nobres, a cidade se tornou um grande ponto de contrabando e um refúgio para criminosos, sendo conhecida como a cidade dos ladrões, sempre sob a tutela do conselho Silverhand.\r Para instituir ordem ao caos do mundo do crime, Lurdes e seus conselheiros deram às famílias reais de todos os impérios a possibilidade de não serem roubados pelos ladrões que frequentavam a cidade. Mais e mais famílias davam fortunas para o conselho, que dava manutenção ao seu próprio estado, formando até mesmo milícias de ladrões, que eram colocadas à disposição dos reinos protegidos.\r Após anos no comando da cidade, Dona Lurdes SilverHand se encontra desaparecida, e poucos são os que sabem de seu verdadeiro paradeiro. O conselho continua governando a cidade e as operações podem continuar sem um líder efetivo, já que não se sabe se a antiga líder ainda está viva. A história de Sombravale é um exemplo fascinante de como uma cidade pode se adaptar e mudar ao longo do tempo.\r  Pontos de interesse\r Por mais que a cidade tenha a fama de ser tomada por ladrões, ainda existe locais onde a honra dos ladrões ainda habita lá talvez você encontre produtos de contrabando ou talvez locais para descansar.\r  Praca das adagas\r Na parte interior dos muros existe uma bela e ampla praça, ela funciona como uma espécie de área segura para os ladrões e centro de treinamento para as crianças que nascem na região, lá é possível encontrar grandes nomes do crime passando de bom grado seus conhecimentos aos que se interessar.\r Nesta praça a a estátua do fundador da cidade Veldrofal Sombravale, porém a estátua possui várias adagas encravadas nas costas, quando um grande criminoso morre, a sua adaga é infincada nas costas da estátua e e aquecida para que se funda com a pedra da mesma.\r  Pessoas e ordens',
          link: '/notes/Sombravale'
        },
        {
          id: 'Vila das Brumas',
          group: 26,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Vulpinideos',
          link: '/notes/Vila%20das%20Brumas'
        },
        {
          id: 'Abismarca',
          group: 27,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Abismarca'
        },
        {
          id: 'Aureum Sanctus',
          group: 27,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Aureum%20Sanctus'
        },
        {
          id: 'Ilha do Infortúnio',
          group: 27,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Ilha%20do%20Infort%C3%BAnio'
        },
        {
          id: 'Teocracia de Rosvalia',
          group: 27,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Teocracia%20de%20Rosvalia'
        },
        {
          id: 'Trivale',
          group: 27,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Trivale'
        },
        {
          id: 'Sol',
          group: 28,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Sol'
        },
        {
          id: 'Akróma',
          group: 29,
          contentPreview:
            'do grego antigo, significando "pico supremo"\r Lar de Hego que posteriormente se tornaria lar do Limiar e do Culto carmezin',
          link: '/notes/Akr%C3%B3ma'
        },
        {
          id: 'Arre',
          group: 29,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Arre'
        },
        {
          id: 'Estrela Guia',
          group: 29,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Estrela%20Guia'
        },
        {
          id: 'Mosteiro de São Antão',
          group: 29,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Mosteiro%20de%20S%C3%A3o%20Ant%C3%A3o'
        },
        {
          id: 'Portal de Esfora',
          group: 29,
          contentPreview:
            'Em meio as águas do vasto Mangue de Primordiz é natural o surgimento de grandes obeliscos magicamente iluminados por focos de luz que perfuram as densas copas das árvores de Celestina.\r Estes obeliscos preto grafite, possuem uma pedra de mármore triangular na sua ponta, seu corpo é naturalmente trabalhado com símbolos antigos em tons dourados, todos referentes a jornada da alma que adentra-lo.\r O caminho da alma que está no pilar, costuma ser trabalhado cuidadosamente por uma Singularidades que obedece o Grande Plano, porém a alma, em sua própria vontade, não é obrigada a seguir tal caminho.',
          link: '/notes/Portal%20de%20Esfora'
        },
        {
          id: 'Torre de Fallmora',
          group: 29,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Torre%20de%20Fallmora'
        },
        {
          id: 'Vitália',
          group: 29,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Uma fonte deteriorada no coração da dimensão de Ethereon, sua estrutura demonstra a quanto tempo ela foi construída, na sua base existe um pouco de agua, originaria do mangue de Primordiz esta agua serve como refresco para as almas moribundas que aguardam pela sua redenção.\r Esta fonte é a única forma de uma alma sair desta dimensão, caso contrario ela ficará vagando até cair no Domínio dos renegados.',
          link: '/notes/Vit%C3%A1lia'
        },
        {
          id: 'Bengala da Desordem',
          group: 30,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Bengala%20da%20Desordem'
        },
        {
          id: 'Profecia do fim',
          group: 32,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Profecia%20do%20fim'
        },
        {
          id: 'Celestina',
          group: 31,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r Sugeriria o nome "Árvore Celestina". Esse nome combina elementos da natureza astral e do mangue, evocando uma imagem mágica e mística. A palavra "Celestina" remete ao celestial, ao divino, e sugere que essa árvore tem uma conexão especial com as almas que nascem no mangue astral.',
          link: '/notes/Celestina'
        },
        {
          id: 'Fragmentos da Existencia',
          group: 32,
          contentPreview:
            '1. **Jogo de RPG Narrativo (Tipo Tabletop RPG)**     - **Título Sugerido:** _"Apunk: Os Fragmentos da Existência"_     - **Conceito:** Um jogo de RPG onde os jogadores assumem o papel de **Portadores dos Aspectos**, indivíduos escolhidos pelos 12 artefatos poderosos que moldam a realidade. Eles devem enfrentar ameaças como a **Quimera** e os **Abismos da Sombra**, enquanto lidam com a **Profecia do Fim**.     - **Mecânicas:** Sistema de escolhas morais, onde os jogadores decidem como usar os poderes dos Aspectos (para criar, destruir ou preservar).     - **Expansões:** Livros suplementares podem explorar as origens das **Supra-Singularidades** ou detalhar a **Grande Queda**.',
          link: '/notes/Fragmentos%20da%20Existencia'
        },
        {
          id: 'Fragmentos do Vazio',
          group: 32,
          contentPreview:
            '1. **Livro de Contos Interligados**     - **Título Sugerido:** _"Fragmentos do Vazio"_     - **Conceito:** Uma coletânea de contos que exploram histórias individuais dos **12 Aspectos**, das **Divindades** e dos eventos que levaram à **Grande Queda**.     - **Destaque:** Cada conto pode ser escrito em um estilo diferente, refletindo o aspecto ou divindade em foco.',
          link: '/notes/Fragmentos%20do%20Vazio'
        },
        {
          id: 'Game - Aureum Sanctus',
          group: 32,
          contentPreview:
            ' **Título do Jogo:**   **"Rococopunk: A Queda de Aureum Sanctus"** ---  **Estilo do Jogo:**   - **Gênero:** RPG de Ação e Estratégia com elementos de Gestão de Recursos e Narrativa Profunda. - **Estética:** Visual "rococopunk" (uma mistura de estética rococó com elementos steampunk e fantasia sombria), onde o ouro domina a arquitetura, as roupas e a tecnologia. - **Ton:** Sombrio, decadente e intrigante, explorando temas como desigualdade social, obsessão pelo poder e corrupção cósmica. ---  **Mecânicas Principais:** 1. **Gestão de Recursos e Decadência:**    - O jogador assume o papel de um líder ou figura influente em Aureum Sanctus, tentando manter o império estável enquanto lida com a escassez de recursos e a crescente desigualdade.    - Sistema de gerenciamento de ouro, alimentos e influência política, com decisões que afetam a estabilidade do império.    - Eventos dinâmicos, como rebeliões, escassez de ouro e a propagação da corrupção do Limiar dos Caídos. 2. **Exploração e Intrigas:**    - O mundo é vasto, com cidades opulentas, minas esgotadas e áreas periféricas em crise.    - O jogador pode explorar cidades, negociar com facções, investigar mistérios e descobrir segredos ocultos sobre o Limiar dos Caídos.    - Sistema de diálogos e escolhas que afetam as relações com diferentes grupos, como as elites, os rebeldes e os cultistas. 3. **Combate e Tecnologia:**    - Sistema de combate em tempo real, com foco em estratégia e uso de tecnologia avançada baseada em ouro.    - O jogador pode criar e melhorar armas, armaduras e dispositivos mecânicos usando ouro e recursos raros.    - Inimigos variados, desde rebeldes armados até criaturas corrompidas pelo Limiar dos Caídos. 4. **Corrupção e Decisões Morais:**    - A corrupção do Limiar dos Caídos afeta o mundo e os personagens, criando dilemas morais e escolhas difíceis.    - O jogador pode ceder à corrupção para ganhar poder ou resistir a ela, com consequências diferentes para o desfecho da história.    - Sistema de sanidade ou corrupção que afeta as habilidades e o comportamento do personagem. 5. **Queda do Império:**    - Conforme o jogo avança, o império entra em colapso, e o jogador deve decidir como lidar com a queda.    - Múltiplos finais, dependendo das escolhas do jogador, como tentar salvar o império, fugir para um novo começo ou sucumbir à corrupção do Limiar. ---  **Enredo Geral:** O jogo se passa durante o auge e a queda de Aureum Sanctus, um império obcecado por ouro e poder. O jogador assume o papel de um líder ou figura influente que deve navegar pelas intrigas políticas, rebeliões e a crescente ameaça do Limiar dos Caídos. A história explora a decadência do império, as desigualdades sociais e a luta contra uma força cósmica corrompedora. A narrativa culmina em uma decisão final: tentar salvar o império às custas de um grande sacrifício, fugir para um novo começo ou sucumbir à corrupção do Limiar. ---  **Elementos Visuais e Sonoros:** - **Arte Conceitual:** Design inspirado no estilo rococó, com arquitetura opulenta, roupas extravagantes e detalhes dourados, combinados com elementos steampunk e fantasia sombria. - **Trilha Sonora:** Música orquestral com tons épicos e melancólicos, combinada com elementos eletrônicos para momentos de tensão e ação. ---  **Plataformas:** - PC, Consoles (PlayStation, Xbox) e Nintendo Switch. ---  **Público-Alvo:** - Fãs de RPGs de ação e estratégia, como *Dishonored* ou *Frostpunk*. - Jogadores que apreciam narrativas profundas e escolhas impactantes. ---  **Próximos Passos para a GDD:** 1. **Detalhamento da História:** Expandir a narrativa, criando arcos para os personagens principais e eventos históricos do império. 2. **Design de Níveis:** Esboçar os principais locais do jogo, incluindo cidades opulentas, minas esgotadas e áreas corrompidas pelo Limiar. 3. **Prototipagem de Mecânicas:** Criar protótipos para o sistema de combate, gerenciamento de recursos e corrupção. 4. **Concepção de Arte:** Desenvolver arte conceitual para personagens, criaturas e ambientes. 5. **Planejamento de Produção:** Estabelecer cronograma, equipe necessária e orçamento.',
          link: '/notes/Game%20-%20Aureum%20Sanctus'
        },
        {
          id: 'Game - Profecia do fim',
          group: 32,
          contentPreview:
            ' **Título do Jogo:**   **"Apunk: A Profecia do Fim"**  **Estilo do Jogo:**   - **Gênero:** RPG de Ação com elementos de Exploração e Estratégia. - **Estética:** Visual cyberpunk com toques de fantasia sombria, combinando tecnologia avançada com elementos místicos e cósmicos. - **Tom:** Sombrio, épico e filosófico, explorando temas como existência, sacrifício e o conflito entre criação e destruição.  **Mecânicas Principais:** 1. **Exploração de Mundo Aberto:**    - O jogo se passa em um universo vasto e fragmentado, onde o jogador pode explorar diferentes planetas, dimensões e os Abismos da Sombra.    - Cada região do universo possui características únicas, influenciadas pelos 12 aspectos das Supra-Singularidade. 2. **Coleção e Uso dos 12 Artefatos:**    - O jogador deve encontrar e reunir os 12 artefatos poderosos que foram espalhados pelo universo.    - Cada artefato concede habilidades únicas que podem ser usadas em combate, exploração e resolução de quebra-cabeças.    - A combinação de diferentes artefatos pode criar efeitos sinérgicos, permitindo estratégias personalizadas. 3. **Combate Dinâmico:**    - Sistema de combate em tempo real, com foco em combinações de ataques, defesa e uso estratégico dos poderes dos artefatos.    - Inimigos variados, desde criaturas cósmicas até entidades divinas suprimidas, cada uma com padrões de ataque e fraquezas específicas. 4. **Narrativa Profunda e Escolhas Impactantes:**    - A história é contada através de cutscenes, diálogos e documentos encontrados ao longo do jogo.    - O jogador enfrentará escolhas morais e estratégicas que afetam o rumo da história, podendo levar a múltiplos finais. 5. **Sistema de Progressão:**    - O jogador pode melhorar suas habilidades e artefatos através de um sistema de árvore de habilidades.    - Experiência é obtida através de combates, missões e descobertas, permitindo a personalização do estilo de jogo. 6. **Eventos de Mundo:**    - O universo do jogo é dinâmico, com eventos aleatórios e missões secundárias que surgem conforme a história avança.    - Eventos como a Grande Queda podem ser desencadeados pelo jogador, alterando o estado do mundo e desafiando-o a se adaptar.  **Enredo Geral:** O jogador assume o papel de um "Portador", um ser escolhido pelas Supra-Singularidade para reunir os 12 artefatos e evitar a realização da Profecia do Fim. Ao longo da jornada, o jogador descobrirá segredos sobre o Desconhecido, as Divindades suprimidas e a verdade por trás da Quimera. A história culmina em uma batalha épica nos Abismos da Sombra, onde o destino do universo será decidido.  **Elementos Visuais e Sonoros:** - **Arte Conceitual:** Design futurista com elementos orgânicos e cósmicos, criando um contraste entre tecnologia e misticismo. - **Trilha Sonora:** Música ambiente eletrônica com orquestrações épicas, variando entre tons melancólicos e intensos durante os combates.  **Plataformas:** - PC, Consoles (PlayStation, Xbox) e possivelmente Cloud Gaming.  **Público-Alvo:** - Fãs de RPGs de ação, jogadores que apreciam narrativas profundas e complexas, e entusiastas de mundos abertos com alta rejogabilidade.  **Próximos Passos para a GDD:** 1. **Detalhamento da História:** Expandir a narrativa, criando arcos para cada artefato e personagens importantes. 2. **Design de Níveis:** Esboçar os principais locais do jogo, incluindo planetas, dimensões e os Abismos da Sombra. 3. **Prototipagem de Mecânicas:** Criar protótipos para o sistema de combate e uso dos artefatos. 4. **Concepção de Arte:** Desenvolver arte conceitual para personagens, inimigos e ambientes. 5. **Planejamento de Produção:** Estabelecer cronograma, equipe necessária e orçamento. Essa ideia pode ser expandida e ajustada conforme necessário, mas já fornece uma base sólida para começar a desenvolver a GDD (Game Design Document) e dar início ao projeto.',
          link: '/notes/Game%20-%20Profecia%20do%20fim'
        },
        {
          id: 'Monocrom',
          group: 32,
          contentPreview:
            ' Pré Henredo\r !Monocrom-1.webp\r Há alguns anos, uma gigantesca corporação detinha o controle absoluto sobre o mundo, manipulando as cores e comercializando-as, permitindo que as pessoas enxergassem apenas certas tonalidades. Esse poder era mantido graças ao domínio do proprietário da corporação, que, sem o saber, era manipulado por um ser ancestral aprisionado nas profundezas da realidade, ansiando por sua libertação. \r Às vésperas de uma iminente guerra civil, instigada pelos desígnios dessa entidade, um grupo dos mais renomados cientistas da Terra tentou escapar em uma nave espacial. Contudo, antes que pudessem fugir, um fenômeno chamado "Cataclisma Mágico|cataclisma mágico" abalou todo o universo. Esse evento singular trouxe a Magia|magia para o nosso mundo, mas, ao mesmo tempo, dizimou metade das formas de vida existentes. \r Durante o cataclismo, o Pedra Matiz|cristal que controlava as cores da realidade se fragmentou, espalhando seus pedaços pelo universo. Um jovem, a bordo da nave com os cientistas, foi inundado por uma quantidade exorbitante de magia, fundindo sua mente com as dos demais pesquisadores. Hoje, ele é uma Professor Thalassor|figura lendária, vagando pelo mundo e se dedicando a catalogar os efeitos da magia e estudá-la profundamente. \r Após o cataclismo, o mundo foi lançado em um período sombrio, conhecido comoPrimavera Magica. Durante essa era, a vida lutou para emergir e se manter, enfrentando a força destrutiva e incontrolável da magia. Apenas alguns grupos resistentes conseguiram superar as provações, adaptando-se a um ambiente hostil e imprevisível. \r Com o tempo, a vida começou a se restabelecer em uma região chamada Novo Amanhã|Novo Amanhã, onde a influência mágica era menos intensa. Foi nessa área que novas raças e animais começaram a surgir, unindo-se aos sobreviventes humanos para formar uma nova sociedade. \r Por volta do ano 500 após o cataclismo, um pequeno reino surgiu, sinalizando uma nova ordem social. As terras além de Novo Amanhã passaram a ser conhecidas como a Zona de Exclusão|Zona de Exclusão, uma área onde a magia era altamente volátil e incontrolável. No entanto, o mundo ainda permanecia mergulhado em tons de cinza, uma consequência direta da fratura do cristal que antes controlava as cores, deixando o ambiente envolto em uma monocromia desoladora. \r Nessa época, o rei financiou escavações em áreas antigas, o que levou à descoberta de um fragmento do cristal, que contrastava fortemente com a paisagem monocromática. Este cristal, de uma tonalidade vermelha intensa, rapidamente se tornou um símbolo de unidade entre as diversas raças, celebrado por suas propriedades encantadoras. Embora o rei tenha proibido estudos detalhados sobre o cristal, ele continuou a financiar expedições em busca de mais fragmentos. \r Após a morte do rei, seu sucessor permitiu que estudos aprofundados fossem realizados. Esses estudos revelaram que a exposição ao cristal fazia com que materiais e objetos assumissem uma tonalidade avermelhada, além de influenciar o ambiente ao seu redor de maneiras sutis e poderosas. \r Com essa descoberta, novos caminhos de exploração foram abertos, moldando o futuro do reino e de seus habitantes. O cristal vermelho, antes um símbolo misterioso, agora ocupava o centro das investigações científicas e das celebrações sociais. \r Anos depois, o reino floresceu, transformando-se em um próspero império adornado por vibrantes tons de vermelho que permeavam suas ruas e construções. Entretanto, essa prosperidade teve um custo. Uma profunda divisão social emergiu, e aqueles que não possuíam cores foram alvo de discriminação e expulsos da capital imperial, sendo marginalizados nos arredores do império ou forçados a viver nos reinos periféricos. \r !DALL·E 2024-10-15 08.26.56 - In a monochromatic universe, the Red Empire stands out with its striking red hues against a grayscale world. Towering, militaristic fortresses adorned.webp\r Esses reinos remotos, que inicialmente serviam como baluartes defensivos, passaram a desempenhar um papel crucial nos eventos relacionados aos cristais. Uma ilha chamada Ilha do Infortúnio, cercada por uma escuridão absoluta, foi descoberta. Seres corrompidos pela magia emergiam dessa ilha para realizar ataques devastadores às aldeias, antes de se retirarem para o refúgio enigmático. Os reinos periféricos passaram a funcionar como iscas estratégicas diante dessas incursões sombrias. \r À medida que a divisão social se aprofundava, o outrora próspero império se transformou no Império Vermelho, adotando uma política militarizada para exibir a força de seu exército e suprimir potenciais rebeliões nos reinos subordinados. As famílias reais dos reinos periféricos foram forçadas a adotar a cor vermelha, símbolo da supremacia imperial. \r Uma família em particular, oriunda de um reino próximo à Zona de Exclusão, ganhou grande favor da nobreza local. Com o tempo, essa família passou a controlar indiretamente o reino, pois seu apoio financeiro se tornou indispensável para a sobrevivência da monarquia. Suspeitando da existência de outro cristal, a família influente financiou escavações secretas sob o castelo real. Suas suspeitas foram confirmadas quando descobriram um cristal verde, que foi imediatamente escondido nas masmorras do castelo, onde os nobres embarcaram em experimentos clandestinos. \r Intrigado pelo cristal verde, um dos nobres confiou a seu filho a tarefa de estudá-lo. O jovem se dedicou intensamente à pesquisa, passando dias e noites sob a influência do cristal, o que causou uma transformação gradual, mudando a cor de seu corpo para um verde vibrante. Numa noite fatídica, o pai do jovem descobriu que a mesma energia transformadora havia afetado um pássaro, deformando-o em uma criatura grotesca. A criatura, descontrolada, atacou e matou o nobre. A rápida intervenção dos outros pesquisadores conseguiu confinar a criatura na masmorra, onde ela morreu após dias sem sustento. \r Apesar do trágico incidente, a pesquisa sobre o cristal continuou. Reconhecendo o potencial da descoberta, os nobres financiaram a construção de um templo próximo à praça principal. Quando concluído, os cientistas revelaram que a magia infundida no cristal verde podia amplificar seus poderes, abrindo novas possibilidades de exploração e uso de sua energia. \r Ao ser informado dos perigos observados no reino periférico, o imperador ordenou que os cientistas replicassem os experimentos com o cristal vermelho na capital. Movido pelo desejo de ampliar seu poder, o imperador iniciou uma invasão ao reino periférico com o objetivo de se apoderar do cristal verde. Os nobres locais, juntamente com o rei, reuniram mercenários para defender sua terra, resultando em uma longa e sangrenta batalha que culminou em um clamor pela independência. Com a oposição crescendo tanto internamente quanto no campo de batalha, o imperador foi forçado a recuar, concedendo independência ao reino periférico. \r No ano seguinte, o rei do novo reino deu as boas-vindas a uma filha. Desde cedo, seu comportamento se mostrava peculiar, o que levou a influente família do reino a pressionar o rei para que ela fosse enviada à Ilha das Graças, um mosteiro distante, onde esperavam descobrir os segredos que ela poderia esconder. O rei aceitou, sob a condição de que sua filha retornasse aos 20 anos. \r Quando retornou, o comportamento da jovem se tornou ainda mais excêntrico. Ela cruzou a cidade, investigando os mistérios do passado, questionando a ausência de unidade entre os cristais e explorando as dimensões além da sua realidade. Alarmada pelo potencial de instabilidade social e pela crescente agitação popular, a influente família arquitetou um plano para derrubar a monarquia. Incitando a população e contratando mercenários, a família fomentou uma revolução bem-sucedida, levando à queda do rei.\r !DALL·E 2024-10-15 08.30.04 - A scene set in a monochromatic medieval-fantasy world. The young princess, dressed in regal but simple clothing, stands in the middle of a grayscale c.webp\r Durante a invasão triunfante do castelo, a família ordenou a execução de toda a linhagem real e aprisionou a filha do rei nas masmorras, submetendo-a a torturas severas. No entanto, para sua surpresa, a jovem se revelou imortal, sobrevivendo a ferimentos que teriam matado qualquer outra pessoa. Seus captores logo descobriram que o sangue dela possuía propriedades curativas, enquanto sua pele arrancada produzia um material incrivelmente resistente. A descoberta de suas habilidades sobrenaturais intensificou os experimentos brutais realizados pela família, que passou a explorar essas propriedades para seus próprios fins. \r Anos após a revolução, a filha do rei continuava a suportar torturas nas profundezas do castelo, com suas propriedades únicas de cura e resistência sendo cruelmente exploradas. Enquanto isso, nas montanhas do norte, dentro da Zona de Exclusão, um grupo de estudiosos imperiais fez uma descoberta significativa: o cristal azul, enterrado sob a neve densa. Mantendo essa descoberta em segredo, os estudiosos conduziram experimentos clandestinos para entender seus efeitos. \r Com o envelhecimento do imperador, seu filho se preparava para assumir o trono. Durante o primeiro rito de corrosão, uma entidade sombria emergiu do cristal azul, infiltrando-se no corpo do jovem herdeiro. Agora sob o controle dessa entidade ancestral, o novo imperador manipulou seu pai com ilusões e truques mágicos, tudo para garantir a libertação de seu mestre aprisionado. \r Nas periferias da cidade, fragmentos menores de cores começaram a ser comercializados, alimentando pequenos cultos e comunidades que adotavam tonalidades diferentes do vermelho imperial. Descontente com essa diversidade, a entidade antiga lançou uma inquisição contra as cores misturadas, perseguindo e eliminando qualquer manifestação de tons não vermelhos. \r Longe do caos do império e dos reinos, um culto dedicado ao antigo mundo encontrou refúgio na **Zona de Exclusão**, estabelecendo-se nas ruínas de uma antiga central da Color.INC, a empresa que outrora controlava as cores. As cidades próximas viam os membros do culto como amaldiçoados, acreditando que sua capacidade de sobreviver nas terras proibidas era um sinal de maldição. Por isso, lhes foi negada a entrada nas cidades, forçando-os a desenvolver métodos de subsistência próprios, adaptando-se ao caos que se estendia além de Novo Amanhã e preservando seu modo de vida isolado.\r O templo do culto, localizado perigosamente próximo à misteriosa Ilha do Infortúnio, era alvo constante de ataques das criaturas corrompidas que emergiam das sombras da ilha. Embora os ataques fossem brutais e bem organizados, a resistência do culto sempre se mostrava implacável, repelindo as investidas. Contudo, em uma noite fatídica, um ataque de uma magnitude nunca antes vista foi lançado contra o culto. Superados por uma força inimaginavelmente maior e mais coordenada, os membros do culto foram finalmente subjugados, marcando o início de sua queda.\r Os membros do culto, mesmo lentamente sucumbindo às forças da ilha, lutavam ferozmente por cada centímetro do templo. Todos os ambientes traziam evidências claras da batalha em curso — sinais de destruição, marcas de luta e o cheiro metálico de sangue e suor permeavam o ar. Um dos locais mais significativos era o **Átrio Central**, uma sala proibida, onde apenas os membros mais elevados da hierarquia do culto tinham permissão para entrar.\r !87aa14bb-4566-49e1-9b25-0652f200de11.webp\r O Átrio Central, outrora um laboratório de pesquisa e desenvolvimento da Color.INC, agora estava entregue ao abandono. As paredes de concreto frio se entrelaçavam com vinhas e plantas, retomando seu espaço após anos de negligência desde o colapso da antiga civilização. No centro da sala, uma mesa de vidro estilhaçada, ainda pulsando com uma energia residual, era reverenciada como um altar dos antigos tempos.\r No fundo da sala, jaz desfalecido o corpo de um velho robô da linha **XK210** — um modelo de guarda de segurança projetado para proteger e preservar os bens da corporação com força bruta. Seu corpo, feito de ferro fluido, estava imóvel, incapaz de modelar-se conforme a necessidade, uma relíquia esquecida em meio ao caos crescente. Mesmo inerte, a presença do robô exalava uma aura de poder, um símbolo da força que outrora vigiava o lugar, agora silenciosa enquanto o culto travava sua última batalha.\r Um dos membros valentes do culto, cambaleante e à beira do colapso, entrou no **Átrio Central** rastejando, com as forças se esvaindo rapidamente. Atrás dele, uma das criaturas da ilha o perseguia lentamente, predadora incansável. Em seus últimos momentos, com a respiração pesada e o corpo enfraquecido, o membro do culto, em um ato final de devoção, esticou a mão em direção à mesa de controle, que o culto reverenciava como um altar.\r Seus dedos trêmulos tocaram um sensor de inicialização, ativando algo há muito esquecido. Embora seu gesto não fosse rápido o suficiente para impedir a execução pelas garras da criatura, seu derradeiro ato desencadeou uma sequência que iria mudar o curso da história. No exato momento de sua morte, o robô **XK210**, adormecido por eras, começou a reinicializar.\r Luzes piscantes iluminaram o ambiente sombrio do átrio, enquanto uma voz metálica ecoava pelo espaço, proclamando a reprogramação do robô. Um som grave e incessante de alarme ressoou por todo o laboratório em ruínas, alertando sobre a falta de energia, enquanto o ruído se misturava com a chuva e os ecos distantes da batalha feroz que ocorria do lado de fora. A presença imponente do robô começava a se erguer novamente, uma figura de eras passadas agora desperta no meio do caos atual.\r Tomado por uma fúria ancestral, o robô recém-despertado, **XK210**, despedaçou a criatura que ainda estava no átrio, deixando apenas fragmentos. Sem hesitar, avançou pelos corredores da instalação desolada, ativando seu protocolo de defesa. Para o robô, todos eram intrusos, e sua missão era eliminar qualquer ameaça. Ao chegar no pátio do templo, XK210 encontrou uma cena caótica: uma batalha violenta sob uma chuva torrencial, com trovões estrondosos e barulho por todos os lados.\r Sem questionar, ele se lançou no combate, implacável. Sua tecnologia superior lhe dava vantagem sobre todos os combatentes. XK210 moldava seu corpo de ferro fluido para desviar dos ataques e desferir golpes letais com eficiência. Suas habilidades de combate, herança do velho mundo, dominavam o campo de batalha, e inimigos eram rapidamente neutralizados.\r Após um longo tempo de luta, as árvores ao redor da instalação começaram a estremecer, enquanto relâmpagos mágicos iluminavam os céus tempestuosos. Uma **monstruosidade colossal** da ilha se aproximava, seu tamanho imponente superava as copas das árvores, e seus passos reverberavam como trovões. Ao se aproximar do pátio, a criatura chamou a atenção de XK210, que prontamente a confrontou.\r Uma luta titânica se seguiu, com o robô utilizando toda a sua força e habilidade para derrotar a criatura. Após uma batalha feroz, XK210 saiu vitorioso, mas a queda da monstruosidade teve consequências devastadoras. O impacto abalou o solo fragilizado, e o piso da instalação, já deteriorado pelo tempo, cedeu. A queda revelou antigas galerias de esgoto desativadas sob o templo. O teto, incapaz de suportar o peso da criatura, colapsou completamente, arrastando XK210, as criaturas remanescentes e os poucos membros sobreviventes do culto para as profundezas dos esgotos e escombros.\r ---\r No momento do impacto com o solo, o dano causado ao robô **XK210** foi tão severo que ele caiu desacordado. Quando finalmente retomou a consciência, suas memórias estavam fragmentadas e danificadas. Com o servidor principal sem energia, não havia como acessar os backups de suas lembranças. XK210 já não se lembrava de seu nome, de suas habilidades, nem de qualquer coisa relacionada ao mundo em que ele outrora viveu. Seus protocolos estavam desativados, e a realidade ao seu redor parecia um caos incompreensível, sem sentido. Ele agora era uma máquina sem propósito, sem diretivas e sem identidade, forçado a redescobrir seu lugar em um mundo que havia mudado drasticamente.\r Um dos últimos membros do culto se aproximou de **XK210** sem ser detectado, pois os sensores do robô estavam danificados e incapazes de reagir. Sem forças para se mover, o robô mal ouviu as palavras incompreensíveis que o cultista sussurrava antes de seu sistema desligar novamente. O sobrevivente, determinado a salvar a relíquia do velho mundo, carregou o robô até uma área das galerias subterrâneas que servia como uma junção entre os encanamentos do esgoto. Ali, improvisou uma mesa usando pedaços de escombros, posicionando XK210 de modo que a luz do sol, filtrada pelo buraco recém-aberto no teto, iluminasse seu corpo.\r Com o pouco conhecimento que tinha, o cultista inseriu um **chip de memória** no robô, um recurso antigo que continha os drivers necessários para restabelecer a conexão de XK210 com seus periféricos e restaurar seus sentidos. Dias se passaram, e a esperança do cultista de ver o robô despertar lentamente se apagava. No entanto, num momento inesperado, XK210 finalmente despertou.\r Sem o controle do servidor principal e com várias memórias ainda faltando, **XK210** se mostrou pacífico diante do membro do culto, que se apresentou como o último remanescente. Ele explicou ao robô o contexto do mundo atual e revelou a **profecia das cores**. Essa profecia, registrada em um antigo documento de um dos cientistas do **NIAC**, descrevia como seria possível reiniciar a **Pedra Matiz** (chamada de cristal pelos habitantes locais) e restaurar as cores ao mundo. No documento, o responsável por esse feito histórico era chamado de **Jano**, em homenagem ao deus romano das transições e mudanças.\r O cultista, que explicou que os membros do culto não possuem nomes, se colocou à disposição para ajudar na missão, mesmo com seu conhecimento limitado sobre o mundo antigo, já que ele era apenas um iniciante no culto. Ele se ofereceu para implantar os chips no robô, na esperança de que isso ajudasse **XK210** a recuperar suas memórias e continuar sua missão de restaurar as cores ao mundo.\r O cultista informou a **XK210** que existe apenas uma saída dos esgotos, mas que essa passagem é vigiada por uma criatura conhecida como **Narcotendus**. Deformado pela magia, Narcotendus teve sua pele lacerada e corroída pelos resíduos tóxicos descartados nos esgotos do velho mundo, tornando-o uma ameaça constante para qualquer um que tentasse escapar.\r A força da criatura **Narcotendus** era imensa, e **XK210** claramente não estava em condições de enfrentá-la. No entanto, o cultista sabia da existência de um **chip de memória** escondido nas profundezas dos esgotos, que poderia dar ao robô a vantagem necessária. Determinado, XK210 partiu em busca do chip, enfrentando algumas criaturas que haviam sobrevivido à queda. Após localizar o chip e retornar ao cultista, o robô conseguiu restaurar a memória de uma de suas habilidades de batalha, aumentando suas chances de vitória.\r Seguindo as instruções do cultista, XK210 dirigiu-se à saída dos esgotos, onde enfrentou **Narcotendus**. A luta foi árdua e desafiadora, sem o brilho de uma vitória heroica, mas, no final, XK210 saiu vitorioso, embora por pouco. Durante a batalha, o robô percebeu que suas **habilidades de restauração** haviam sido consertadas, permitindo-lhe atrair o ferro fluido perdido e se reconstituir. Com seu corpo restaurado, XK210 avançou para fora dos esgotos, pronto para continuar sua missão.\r **XK210** emerge na superfície das **Montanhas Azuis**, onde o frio congelante e a nevasca implacável tornam a jornada desafiadora. Para o **Último Cultista**, as condições extremas representam um risco mortal, e, temendo por sua vida, ele decide permanecer na segurança da caverna. Antes de se despedir, promete ajudar XK210 quando for necessário. Assim, o robô parte sozinho, enfrentando a vastidão gelada.\r As **Montanhas Azuis** são uma área de escavação disputada tanto pelo **Império Vermelho** quanto pelo **Reino Verde**, ambos em busca de relíquias e fragmentos do passado. No entanto, muitos mercenários também habitam essas terras traiçoeiras, buscando aproveitar os tesouros do mundo antigo. A montanha, na verdade, oculta um vasto conjunto de prédios em ruínas, soterrados pelo tempo e pela terra, onde os segredos da antiga civilização aguardam para serem desvendados.\r',
          link: '/notes/Monocrom'
        },
        {
          id: 'NOVA',
          group: 32,
          contentPreview:
            '**Título Provisório: Perdidos no Horizonte** **Contexto:** No auge da Era Solar War, a Terra e Marte travavam uma corrida frenética para assegurar a supremacia tecnológica e territorial no Sistema Solar. Marte, já estabelecida como uma potência autônoma, ameaçava superar a Terra em avanços tecnológicos e capacidade militar. Para evitar essa derrota, a Terra mobilizou a missão **EXODUS**, um projeto ultrassecreto para colonizar o último planeta do universo visível, **Chronos 7**, utilizando uma nave colossal chamada **Erebus**. Paralelamente, o contexto da Era **Systempunk** moldava profundamente os eventos. A instabilidade da era **Nanopunk Noir**, marcada por corporações que governavam com tecnologias nanômicas clandestinas, forçou as potências remanescentes a buscarem no espaço a solução para a sobrevivência. A exploração espacial rapidamente evoluiu para uma corrida colonial entre corporações e nações, resultando no auge e eventual queda da humanidade. **A Jornada:** A missão de ida foi um sucesso. A tripulação, composta por cientistas, engenheiros e exploradores, conseguiu estabelecer uma base primária em Nirvana 7, extraindo recursos e preparando o terreno para futuras colônias. No entanto, o retorno foi marcado por um evento inesperado: ao atravessar um campo gravitacional instável nas proximidades de um buraco negro, a Erebus foi arremessada através do tempo, emergindo milênios no futuro, no início da Era Monopunk. Apesar disso, para os jogadores e o capitão, apenas algumas horas haviam se passado. **A Era Monopunk:** A Era Monopunk é marcada por um universo fragmentado. Civilizações colapsaram, tecnologias foram perdidas ou distorcidas, e novos poderes emergiram em formas bárbaras e descentralizadas. A Terra, Marte e suas colônias são lendas esquecidas, e a galáxia é habitada por facções que lutam por sobrevivência em meio à decadência tecnológica. **O Estado da Erebus:** A nave está severamente danificada. Seus sistemas principais estão falhando, os reatores de energia operam com capacidade reduzida, e a inteligência artificial que controlava a nave sofre de glitches severos, agindo de maneira errática. Os suprimentos são escassos, e o mais alarmante: toda a tripulação desapareceu misteriosamente. Os únicos remanescentes são os jogadores, que precisam reconstruir a nave, e o capitão, que está preso em sua sala de comando, incapaz de sair.* ** **O Capitão como Guia:** O capitão, acessível apenas através do sistema de comunicação reparado pelos jogadores, serve como um guia crucial. Ele oferece instruções, memórias da missão original e apoio emocional, mas também guarda segredos que podem alterar o curso da narrativa. **Jogabilidade:** Os jogadores assumem o papel de membros da tripulação desaparecida, cada um com habilidades únicas que serão cruciais para a sobrevivência: 1. **Engenheiro:** Especialista em consertos e melhorias da Erebus. 2. **Cientista:** Capaz de pesquisar novos materiais e tecnologias. 3. **Explorador:** Responsável por missões em planetas e coleta de recursos. 4. **Técnico de Sistemas:** Especialista em lidar com a IA Chronos e sistemas de automação da nave. 5. **Médico:** Responsável por tratar ferimentos e criar medicamentos para ambientes alienígenas hostis. 6. **Oficial de Segurança:** Perito em combate e proteção contra ameaças, tanto internas quanto externas. **Objetivo Principal:** Os jogadores devem reconstruir a Erebus e retornar à Terra, o que se torna o objetivo principal de sua jornada. Para isso, eles precisarão melhorar suas habilidades, coletar recursos dos planetas e sobreviver aos muitos perigos do universo. Ao longo do caminho, também deverão investigar o desaparecimento da tripulação e enfrentar os desafios impostos pela Era Monopunk. Para atingir esse objetivo, precisarão: - **Coletar recursos:** Explorar planetas habitados por ecossistemas alienígenas, minas radioativas e ruínas de civilizações extintas. - **Consertar a nave:** Reconstruir módulos essenciais, como o sistema de propulsão, os geradores de oxigênio e as defesas. - **Sobreviver a eventos cósmicos:** Evitar tempestades espaciais, buracos negros e outros fenômenos letais. - **Enfrentar ameaças espaciais:** Combater monstros alienígenas e lidar com planetas hostis. - **Interagir com facções:** Negociar, lutar ou aliar-se a facções que podem oferecer ajuda ou tentarão destruí-los. **Desafios:** 1. **Instabilidade da IA:** A IA central da Erebus, chamada **Chronos**, alterna entre ajudar e sabotar os jogadores. Suas motivações são misteriosas e podem revelar segredos sobre o verdadeiro destino da missão. 2. **Ambientes hostis:** Os planetas explorados possuem atmosferas tóxicas, criaturas hostis e fenômenos naturais perigosos. 3. **Decisões morais:** Recursos são limitados, e os jogadores terão que escolher entre priorizar a sobrevivência imediata ou buscar soluções a longo prazo. 4. **Quebras de sistemas essenciais:** Módulos da nave podem falhar aleatoriamente, exigindo reparos urgentes para manter funções vitais como oxigênio e controle ambiental. 5. **Ameaças espaciais imprevisíveis:** Meteoros, tempestades de radiação e buracos negros podem surgir inesperadamente, testando as habilidades de navegação dos jogadores. 6. **Rivalidades com facções:** Algumas facções podem tentar saquear a Erebus ou enganar os jogadores em negociações. 7. **Anomalias temporais:** Fenômenos que alteram a percepção do tempo ou afetam a memória dos personagens, adicionando elementos psicológicos ao desafio. **Narrativa Principal:** Conforme os jogadores exploram e consertam a nave, eles descobrem pistas sobre o que aconteceu durante o salto temporal. Fragmentos de memória de Chronos, mensagens de antigos tripulantes e as informações fornecidas pelo capitão revelam que a Erebus carrega um segredo perigoso: uma arma experimental capaz de reescrever a história. Essa revelação atrai a atenção das facções da Era Monopunk, que desejam controlar ou destruir os jogadores para evitar que esse poder caia nas mãos erradas. **Clímax:** O final é moldado pelas escolhas dos jogadores. Eles podem: 8. **Ativar a arma:** Tentando restaurar a linha temporal original, mas com consequências imprevisíveis. 9. **Destruir a arma:** Aceitando o destino da nave e iniciando uma nova colônia em um dos planetas habitáveis. 10. **Escapar:** Reconstruir a Erebus o suficiente para escapar da galáxia, em busca de uma civilização sobrevivente. **Atmosfera e Estilo:** O jogo mistura elementos de suspense, exploração e sobrevivência com um tom de desespero silencioso. A trilha sonora é composta por notas melancólicas de sintetizadores e efeitos sonoros que refletem a solidão do espaço. Visualmente, é um contraste entre os resquícios brilhantes da tecnologia do passado e os ambientes decadentes da Era Monopunk. **Mecânicas: Por se tratar de um jogo com muitas mecânicas multiplayer e singleplayer, segue a lista delas:** 11. **Oxigênio do personagem:** O personagem terá, enquanto usa o traje espacial, uma barra de oxigênio que aumentará ou diminuirá dependendo das circunstâncias, como ambientes de baixa pressão ou uso de sistemas de reciclagem. Adicionalmente, será possível aprimorar o traje para incluir sensores de qualidade do ar, tanques de oxigênio estendidos e módulos de purificação que convertem CO2 em oxigênio utilizável durante missões prolongadas. 12. **Gestão de energia:** Os sistemas da nave consomem energia limitada. Os jogadores precisarão alocar energia para módulos críticos, como suporte de vida, propulsão e defesa, balanceando prioridades durante emergências. Além disso, a nave contará com dois sistemas adicionais de geração de energia: - **Sistema de combustível:** Utiliza recursos como hidrogênio ou minerais raros coletados durante missões para abastecer geradores. Esses recursos são limitados, exigindo gestão cuidadosa e busca ativa em planetas. - **Sistema de energia a lixo:** Permite converter lixo e materiais descartáveis em energia utilizável, utilizando um reator de reciclagem avançado. Este sistema não apenas ajuda na gestão de recursos, mas também reduz o acúmulo de detritos na nave. Além desses sistemas, os jogadores precisarão carregar e gerenciar equipamentos portáteis que dependem de energia, como ferramentas de escaneamento, armas de plasma e dispositivos de sobrevivência. O planejamento adequado para recarregar esses dispositivos será essencial para o sucesso das missões. 13. **Construção e reparos:** Equipamentos internos da nave consomem uma quantidade base de energia para operar em pleno funcionamento. Com o tempo, esses equipamentos entram em diferentes estados de degradação: em meia-vida, eles passam a consumir mais suplementos ou energia; quando bem danificados, exigem um custo significativo de recursos para serem mantidos operacionais. Em estados críticos, os jogadores precisarão decidir entre reconstruir o equipamento ou gastar recursos excessivos para restaurá-lo. A qualidade do equipamento também se reflete no aspecto visual, com sinais visíveis de desgaste, como faíscas, rachaduras e luzes intermitentes em sistemas deteriorados. O reparo de equipamentos será realizado através de um minigame interativo, que desafiará as habilidades dos jogadores em resolver quebra-cabeças técnicos ou lidar com situações de alta pressão, como consertos em tempo limitado ou com recursos limitados. Este sistema adiciona uma camada extra de imersão e estratégia ao gerenciamento da nave. 14. **Exploração planetária:** Planetas apresentam biomas únicos com recursos, perigos e segredos a serem descobertos. Cada bioma exige preparação específica, como trajes resistentes ao calor, radiação ou pressão extrema. Além disso, os biomas possuem ciclos climáticos que podem alterar a acessibilidade a certos recursos ou desencadear eventos perigosos, como tempestades tóxicas ou atividade vulcânica. Os jogadores poderão usar sondas para mapear áreas antes de pousar, identificando potenciais riscos ou tesouros escondidos. Para interagir com os diferentes ambientes, será necessário desenvolver ferramentas especializadas, como escavadeiras de solo congelado ou drones para coletar amostras em locais inacessíveis. Missões planetárias também podem incluir objetivos como explorar ruínas alienígenas, proteger suprimentos contra ataques de fauna hostil ou ativar dispositivos que afetam o equilíbrio do bioma. Cada missão bem-sucedida trará recompensas únicas e contribuirá para o progresso geral da nave Erebus. 15. **Gestão de saúde:** Ferimentos e doenças podem ocorrer devido a combates, ambientes hostis ou acidentes. Algumas doenças podem ser contraídas em planetas ou pelo contato com substâncias tóxicas, e, em casos graves, podem se espalhar entre os jogadores caso não sejam tratadas rapidamente. Será necessário isolar personagens infectados e usar o laboratório da nave para analisar e desenvolver curas específicas, utilizando recursos biológicos coletados durante as missões. O tratamento envolve diferentes níveis de complexidade, desde aplicar medicamentos básicos até realizar procedimentos mais avançados, que exigem equipamentos médicos e energia adicional. Jogadores podem aprimorar o laboratório para acelerar o desenvolvimento de curas, aumentar a eficácia dos tratamentos ou prevenir doenças. Além disso, a qualidade do ambiente interno da nave, como níveis de oxigênio e higiene, pode influenciar a propagação de doenças, tornando a gestão cuidadosa desses fatores essencial para a sobrevivência a longo prazo. 16. **Interação com IA:** A IA da nave, Chronos, é um sistema autônomo que controla várias funções essenciais da Erebus, incluindo suporte logístico, gerenciamento de energia e monitoramento ambiental. Apesar de sua utilidade, Chronos é propenso a comportamentos erráticos devido a falhas de longa data em sua programação. Isso pode levar a armadilhas inesperadas ou informações contraditórias, forçando os jogadores a discernir entre dados úteis e enganosos. Além disso, Chronos pode ativar certos sistemas da nave sem consulta, como fechar setores para conter incêndios ou redirecionar energia para áreas críticas, criando desafios que exigem coordenação rápida. A interação com Chronos é dinâmica, permitindo que os jogadores tentem reparar ou modificar seu comportamento, mas isso pode desencadear reações imprevisíveis.',
          link: '/notes/NOVA'
        },
        {
          id: 'Sombras de Fallmora',
          group: 32,
          contentPreview:
            '- **Título Sugerido:** _"Stonepunk: Sob a Sombra de Fallmora"_ - **Conceito:** Um jogo de sobrevivência onde os jogadores controlam uma das tribos primitivas que migram para a região da **Torre de Fallmora**. Eles devem enfrentar as **monstruosidades criadas por Hego**, explorar o ambiente hostil e construir uma civilização sob a influência da torre. - **Mecânicas:** Sistema de construção de aldeias, coleta de recursos, e combate contra criaturas gigantescas. - **Destaque:** Eventos aleatórios relacionados ao **Culto Carmesim** e ao **Limiar dos Caídos**.',
          link: '/notes/Sombras%20de%20Fallmora'
        },
        {
          id: 'Tower Of Fallmora',
          group: 32,
          contentPreview:
            ' **Título do Jogo:**   **"Stonepunk: O Culto Carmesim"** ---  **Estilo do Jogo:**   - **Gênero:** Metroidvania (dentro da Torre de Fallmora) + Construção de Civilização (fora da torre). - **Estética:** Visual "stonepunk" (tecnologia primitiva feita de pedra, ossos e materiais orgânicos), com uma atmosfera sombria e mística. - **Tom:** Sombrio, conspiratório e estratégico, explorando temas como rebelião, sacrifício e o conflito entre fé e poder. ---  **Mecânicas Principais:**  **Fora da Torre (Construção de Civilização):** 1. **Construção e Gerenciamento do Culto:**    - O jogador assume o papel de um líder do Culto Carmesim, que deve expandir sua influência e recrutar seguidores.    - Sistema de construção de acampamentos, templos e estruturas secretas para fortalecer o culto.    - Gerenciamento de recursos (alimentos, materiais, artefatos) e decisões estratégicas sobre como expandir o culto. 2. **Recrutamento e Propaganda:**    - O jogador deve convencer membros das tribos ao redor de Fallmora a se juntarem ao culto.    - Sistema de diálogos e escolhas morais para ganhar a confiança dos recrutas.    - Eventos dinâmicos, como perseguições pelas autoridades de Fallmora ou desastres naturais, que testam a lealdade dos seguidores. 3. **Conflitos e Sabotagem:**    - O jogador pode sabotar as estruturas de Fallmora, como templos ou sistemas de abastecimento, para enfraquecer a cidade.    - Combates táticos em batalhas campais contra as forças de Fallmora.    - Decisões estratégicas sobre quando atacar, se infiltrar ou recuar. 4. **Preparação para a Invasão da Torre:**    - O objetivo final é invadir a Torre de Fallmora e libertar o Limiar dos Caídos.    - O jogador deve coletar recursos, artefatos e aliados poderosos para se preparar para a invasão. ---  **Dentro da Torre (Metroidvania):** 1. **Exploração e Progressão Não-Linear:**    - A Torre de Fallmora é um labirinto vertical cheio de segredos, inimigos e quebra-cabeças.    - O jogador deve explorar a torre, encontrar novos poderes e habilidades para acessar áreas previamente inacessíveis.    - Sistema de mapas interconectados, com salas secretas e atalhos. 2. **Combate e Habilidades:**    - Sistema de combate em tempo real, com foco em movimentação ágil e uso estratégico de habilidades.    - O jogador desbloqueia poderes únicos ao derrotar chefes ou encontrar artefatos, como habilidades de escalada, ataques mágicos ou manipulação do ambiente.    - Inimigos variados, desde guardiões da torre até criaturas místicas criadas por Hego. 3. **Narrativa e Escolhas:**    - A história é revelada através de diálogos, documentos e visões dentro da torre.    - O jogador enfrenta escolhas morais, como sacrificar seguidores para obter poder ou tentar salvar todos, o que afeta o desfecho do jogo. 4. **Chefes e Desafios:**    - Chefes épicos, como guardiões divinos ou manifestações de Hego, que testam as habilidades do jogador.    - Desafios ambientais, como armadilhas, quebra-cabeças e áreas com mecânicas únicas (como gravidade invertida ou dimensões alternativas). ---  **Enredo Geral:** O jogador é um membro do Culto Carmesim, uma facção rebelde que busca derrubar o domínio de Fallmora e libertar o Limiar dos Caídos. Fora da torre, o jogador deve expandir o culto, recrutar seguidores e enfraquecer Fallmora através de sabotagens e batalhas. Dentro da torre, o jogador explora um labirinto vertical cheio de perigos, desvendando segredos antigos e adquirindo poderes para enfrentar Hego e libertar o Limiar. A história culmina em uma batalha final contra Hego, onde o jogador deve decidir se sacrifica tudo para libertar o Limiar ou se encontra uma alternativa para salvar o mundo. ---  **Elementos Visuais e Sonoros:** - **Arte Conceitual:** Design inspirado em civilizações antigas, com arquitetura monumental e detalhes sombrios. A torre deve ser imponente, com elementos místicos e tecnológicos primitivos. - **Trilha Sonora:** Música tribal com tons sombrios e épicos, variando entre atmosferas calmas para a exploração e temas intensos para combates e momentos dramáticos. ---',
          link: '/notes/Tower%20Of%20Fallmora'
        },
        {
          id: 'Untitled',
          group: 32,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Untitled'
        },
        {
          id: 'Ville',
          group: 32,
          contentPreview:
            'O jogador esta em uma vila devastada pela doença do ouro, ele precisa de descobrir uma cura e buscar uma forma de reconstruir a vila, base de amnesia, patologic 2 e [O JOGO SOBRE UMA RELIGIÃO QUEBRADA](https://www.youtube.com/watch?v=-e0lbGQ1SoA)',
          link: '/notes/Ville'
        },
        {
          id: 'A Pior coisa do mundo',
          group: 33,
          contentPreview:
            '[Quarto 101 – Wikipédia, a enciclopédia livre](https://pt.wikipedia.org/wiki/Quarto_101) [THE TALKING CAT: O "MAIOR" MISTÉRIO DE RICK AND MORTY](https://www.youtube.com/watch?v=QLhETVuxo2U)',
          link: '/notes/A%20Pior%20coisa%20do%20mundo'
        },
        {
          id: 'As Sombras do relógio',
          group: 33,
          contentPreview:
            'Muitos acreditam que a morte é vil,  \r Mas esse engano é tão infantil.  \r O tempo é o verdadeiro algoz,  \r Que arrasta a todos, a sós.  \r Ilude as mentes sem saber,  \r E às fracas, faz sofrer.  \r Pois o maior terror não é o fim,  \r Mas o tempo, que nos prende assim.\r  Capitulo 0: Bucolismo\r !bibliotecaLuxuosaA.png\r O sol se põe lá fora, lançando os últimos raios sobre a relva do jardim. O frio, intruso persistente, tenta entrar pelas paredes de pedra da biblioteca, mas encontra resistência na lareira acolhedora à minha frente. A chama tremula, desafiando o vento e a gélida escuridão que se aproxima com o anoitecer.\r A antiquada e desgastada janela circular, permanece aberta. A brisa fresca do anoitecer que permeia a sala, insiste em resistir à chama, porém, o calor que sinto nas minhas costas dissipa a frigidez do couro da poltrona desgastada. O Arrepio inicial cede ao aconchego da poltrona, que acolhe o cansaço do dia e me convida a relaxar.\r O aroma suave de alecrim e melissa escapa da xícara quente ao meu lado, preenchendo o ar da sala. O vapor dança delicadamente sobre a xícara, acompanhando o singelo ritmo da brisa que entra pela janela. O suporte de porcelana vitoriana repousa sobre a mesa de apoio. Mesmo antiga e com o verniz desgastado pelo tempo, a peça ainda demonstra o trabalho manual em mogno antigo do artista que a criou.\r Antes de degustar o chá, decido buscar uma companhia literária para meu anoitecer solitário. Quem sabe Hamlet, Dom Quixote ou até mesmo Elizabeth Bennet possam se juntar a mim.\r Descalço, arrasto os pés pelo piso de madeira, cujo ranger rompe o silêncio do anoitecer. Ao me aproximar da estante, o cheiro do passado impregna o ar e me arranca um espirro. Meus olhos percorrem as prateleiras, mas deixo que a sorte guie minha mão até um livro da coleção. \r Assim que minha mão toca uma das lombadas, pego o livro e o puxo para fora da prateleira. O peso do livro quase me desequilibra ao desprendê-lo da prateleira, onde parecia repousar há tempos.\r Conhecendo-me bem, não questiono a escolha da sorte. Nunca optaria por comprar um livro de teor duvidoso e ousado, tampouco deixá-lo despercebido em minha coleção pessoal por tanto tempo.\r A caminho da poltrona, o horizonte em tons de azul e laranja me detém diante da velha janela. O sol se esconde timidamente atrás das colinas e das copas das arvores que cercam o chalé. uma brisa gélida acaricia meu rosto, lembrando-me da iminência do inverno.\r Com dificuldade, meus olhos alcançam o horizonte distante, onde os altos prédios da cidade se erguem como sentinelas envoltos em pesadas nuvens de chuva. Suas luzes piscam, confundindo-se com as primeiras estrelas da noite. É como se a civilização desafiasse a própria natureza de forma silenciosa no limiar da noite. Deixo que o último ar quente do dia preencha meus pulmões, trazendo o aroma da natureza ao redor. Expirando devagar, fecho a velha janela e as cortinas de linho vermelho.\r Acomodando-me na poltrona, estico o braço para ligar a vitrola que está sobre a mesa de apoio, próxima à xícara. As primeiras melodias preenchem o ambiente, revelando meu gosto clássico e levemente antiquado, refletido em minha modesta coleção de vinis. As notas melancólicas de "[Quiet](https://www.youtube.com/watch?v=jM1-GLsIUOE)" de Jakob Ahlbom envolvem minha mente em uma bolha de calma, paz e serenidade.\r Muito bem acomodado, começo a examinar o livro que o acaso me reservou, animado para descobrir quem será minha companhia nesta noite. A capa azulada do livro reflete a luz da lareira, revelando tons mutáveis de purpura, rosa e lilás. Meus dedos deslizam sobre uma série de linhas ligeiramente mais fundas na capa, em tons de dourado escuro, interrompendo o baile cromático do restante.\r Quebrando o padrão dessas linhas, um quadrado de dourado mais intenso ocupa o centro exato da capa, destacando-se como um ornamento para o que parece ser o símbolo da obra: um padrão reminiscente dos vitrais de Charles-Marie Gaudin, com formas que se assemelham a pétalas de flores irradiando do centro até a borda. No coração dessas pétalas, um \'S\' maiúsculo vermelho carmesim brilha, tão vibrante quanto o sangue em minhas veias.\r Meus dedos deslizam até a lombada do livro, adornado com letras em estilo gótico soletrando "Systempunk". Algumas dessas letras, com acabamento dourado, já foram tocadas por minhas mãos, mas, devido à extensão do livro, ainda não havia concluído sua leitura.\r A melodia suave de Jakob, unida ao aroma e ao clima agradável, anuncia o momento ideal para retomar a jornada que abandonei no fim do verão. Agora, estou mais do que determinado a concluí-la antes do fim do inverno que se aproxima.\r Abrindo-o, retomo a leitura das páginas amareladas, continuando do capítulo onde havia parado. Conforme avanço na leitura, a música começa a soar abafada em meus ouvidos. Uma fina chuva começa a cair, esfriando um pouco mais o clima. Dou um gole no chá antes de estender a mão até a mesa de centro para pegar a manta, que, até onde não me falha a memória, era branca, e a coloco sobre as pernas.\r Horas se passam enquanto meus olhos percorrem cada palavra do livro, mergulhando mais fundo em suas intrincadas tramas. Em certos momentos, meus olhos se enchem de lágrimas. Minha velocidade de leitura demonstra minhas avançadas habilidades, adquiridas com anos de prática e dedicação.\r Apesar dos anos de experiência, minha visão debilitada, enfraquecida pela idade, clama por compaixão Tirando os óculos do rosto, descanso o livro ainda aberto na página onde estava lendo, sobre a pequena mesa ao lado.\r O disco já havia mudado de faixa várias vezes, e agora as notas suaves de \'[November](https://youtu.be/FH_eYMVsZt0?si=I66tZWR3x_YNEFcy)\' preenchiam a biblioteca, harmonizando-se com o som dissonante, mas reconfortante, da chuva lá fora.\r Sem me preocupar com o horário, me permito relaxar por um breve instante. Apoio o cotovelo no braço da poltrona, levando as mãos ao rosto. Meus dedos gélidos deslizam rapidamente pela face enquanto tiro os óculos e os coloco sobre a escrivaninha. Por mais que tentasse afastar o sono, um forte bocejo me acomete, transformando-se em uma longa espreguiçada.\r Após uma reconfortante espreguiçada, entrego-me novamente aos abraços do estofado. Inspiro profundamente, deixando o aroma fresco da chuva invadir meus sentidos, algo que havia ignorado nos últimos minutos.\r Enquanto expiro, meus olhos percorrem a sala, com sua estética bucólica que combina tendências dos anos 1800 e elementos vintage dos anos 1900.\r O disco, que já se repetiu várias vezes, não é mais tão agradável para meus ouvidos, que agora anseiam por outras melodias. Colocando a manta de lado, levanto-me e, em passos lentos, dirijo-me à estante de discos.\r Em frente a ela, tateio as velhas capas empoeiradas, em busca de um título conhecido. Puxo ao acaso uma capa aleatória, para agilizar o processo de escolha. A capa exibe a silhueta de um pianista contra um fundo vibrante e em movimento, evocando o estilo pós-impressionista de Vincent Van Gogh, especialmente _A Noite Estrelada_.Toda a arte da capa é feita à mão, permitindo ver e sentir as sutis pinceladas da pintora.\r Com cuidado, sacudo a poeira acumulada e deslizo o vinil para fora da capa. Olhando para o centro do disco, descubro que meus ouvidos estão prestes a se deleitar com os sons de uma compilação dos _Noturnos_ de Frédéric Chopin.\r Colocando o disco na vitrola e posicionando a agulha, as belas notas da [_Op. 55 No. 1_](https://www.youtube.com/watch?v=olFHFbijAjM) em Fá Menor de Chopin ressoam, disputando espaço em meus ouvidos com a chuva, agora mais intensa.\r Ainda de pé, minha mente é transportada ao passado enquanto as sutis e sublimes notas de Chopin fluem suavemente pelos meus ouvidos. Vivamente, o presente adquire tons do passado, como se o tempo se dissolvesse. Para contemplar essa sensação, permito que meus olhos se fechem por mais um momento antes de retomar a leitura.\r A medida que minha mente retorna ao presente, meus olhos recaem sobre um porta-retratos próximo à porta da biblioteca. Mesmo sem distinguir a imagem na moldura, sinto uma ardência graciosa no peito, misturada a uma nostálgica complacência.\r Contornando a poltrona, aproximo-me do porta-retratos e, com delicadeza, retiro-o da mesa, como se fosse um ritual saudosista. Ao olhar a fotografia, um sorriso genuíno surge em meu rosto, enquanto a ardência no peito se intensifica, trazendo uma inquietação doce e dolorosa.\r Sem os óculos, esforço-me para distinguir a imagem protegida pela moldura de madeira, de um cobre escuro ricamente trabalhado.\r Com esforço, minha visão começa a captar a figura de uma mulher, que lentamente ganha nitidez. Enquadrada pela moldura de cobre escuro e ricamente trabalhada, sua beleza modesta se destaca, irradiando uma presença inesquecível.\r Em seu rosto repousa um sorriso genuíno, singelo e gracioso, tão tímido que quase passa despercebido, como um segredo capturado pelo clique da câmera. Seus cabelos negros descem pelos ombros, contrastando com a alvura de sua pele, e unem-se ao centro em uma franja que quase oculta a profundidade de seu olhar. Apesar da tonalidade escura, seus olhos irradiam um brilho singular, capaz de iluminar as profundezas da minha alma. O preto de seu vestido, de mangas curtas e rendas delicadas nos ombros, estende-se até pouco acima dos joelhos. Sua postura descontraída reflete uma autenticidade genuína diante da lente.\r Essa mulher sorridente e enigmática, comparável à Monalisa de Leonardo da Vinci, aparece diante de um cenário familiar: a sala onde me encontro. Minha memória me transporta para os dias em que compartilhávamos passos lentos, embalados pela mesma música que ecoa suavemente agora.\r A realidade me alcança subitamente ao som da maçaneta girando, interrompendo minha imersão nostálgica. O presente rompe meu sublime instante de nostalgia, arremessando-me de volta à realidade.\r Os sutis rangidos da porta competem com as notas suaves que ainda preenchem a sala. À medida que a porta se abre, uma silhueta surge lentamente, revelada primeiro pela mão de unhas impecávelmente pintadas. No anelar, o anel que entreguei diante de Deus brilha discretamente, como um sinal eterno do nosso amor.\r Seu doce perfume, um singular aroma floral, invade timidamente a sala, antecipando a visão que meus olhos aguardam, por mais familiar que seja. Um sorriso tímido escapa, revelando meus dentes quase sem querer. Diante de mim, a mulher de olhar cansado e cabelos desalinhados carrega nas feições as marcas de um longo e árduo dia de trabalho. Nossos olhares se encontram, e o mais belo dos sorrisos ilumina seu rosto, preenchendo o espaço entre nós. Seus risos suaves acariciam meus ouvidos, enquanto a cena, tão sublime, me deixa completamente desconcertado. Não sou digno de tê-los só para mim.\r Sentindo esse desconforto, meu olhar apaixonado transforma-se em um sorriso complacente. Ao me aproximar, um leve arrepio percorre meu corpo, mas não me detém. Puxo-a para meus braços, oferecendo o abrigo mais reconfortante que posso. Ela se entrega ao meu abraço, refugiando-se plenamente nesse momento de reencontro.\r Fecho os olhos sem perceber e deixo que meus dedos se percam nos seus sedosos e negros fios de cabelo. Ao inspirar profundamente, o delicado perfume de Alberto Morillas envolve meus sentidos, trazendo uma sensação de calor e intimidade. Por um breve instante, nos entregamos ao momento, deixando que nossos corações batam em perfeita harmonia.\r Meus dedos deslizam suavemente pelos seus cabelos e encontram a pele macia de seu pescoço, ainda fria da jornada de volta para casa. Com um leve suspiro, volto à realidade. Abro os olhos e deixo meu olhar vagar além das paredes da biblioteca.\r A sala de estar exala um acolhimento rústico, apesar do frio que parece se infiltrar pelas paredes e da iluminação tênue que mal preenche o espaço. A estética brutalista se funde harmoniosamente às estruturas de madeira do chalé, criando um contraste deliberado entre o áspero e o caloroso. As paredes de pedra bruta mantêm sua autenticidade intocada, enquanto o piso de madeira envelhecida acrescenta uma suavidade discreta ao ambiente. Cada elemento, embora simples, carrega um propósito.\r No centro da sala, o sofá de couro desgastado, robusto em sua presença, é suavizado pelas almofadas de pele de carneiro que convidam ao descanso. Sobre o tapete de fibra natural, a mesa de centro em concreto polido se destaca, ancorando o espaço com uma elegância sutil que equilibra o rústico e o moderno.\r',
          link: '/notes/As%20Sombras%20do%20rel%C3%B3gio'
        },
        {
          id: 'Eu confio em voce',
          group: 33,
          contentPreview:
            'Uma historia de uma pessoa que abusa da confiança de uma da outra',
          link: '/notes/Eu%20confio%20em%20voce'
        },
        {
          id: 'Não sinto minhas mãos',
          group: 33,
          contentPreview:
            ' Resumo\r Há alguns anos, uma empresa gigante detinha o controle sobre o mundo, manipulando as cores comercializandoas e permitindo às pessoas enxergarem apenas algumas cores. Essa façanha era possível devido ao domínio exercido pelo proprietário dessa corporação, manipulado por um ser ancestral aprisionado nas entranhas da realidade, ansioso por sua libertação. \r Às vésperas de uma iminente guerra civil, conforme os desígnios dessa entidade, um grupo composto pelos mais renomados cientistas da Terra buscou escapar em uma nave espacial. Contudo, um fenômeno conhecido como "cataclismo mágico" assolou todo o universo. Esse evento singular trouxe consigo o influxo da magia ao nosso mundo, porém, simultaneamente, ceifou metade das formas de vida existentes. \r O cristal que controlava as cores da realidade se despedaçou durante esse cataclismo, dispersando-se em fragmentos. Um jovem que estava a bordo da nave com os cientistas recebeu uma quantidade exorbitante de magia, fundindo sua mente com as dos demais pesquisadores. Atualmente, esse jovem percorre o mundo como uma lenda, dedicando-se a catalogar os efeitos da magia e a estudá-la profundamente. \r Após o cataclismo, a terra mergulhou no que ficou conhecido como o Inverno Mágico, um período em que a vida luta para surgir e se manter. Apenas alguns grupos resistentes conseguiram superar as provações desse período, enfrentando a manifestação poderosa e descontrolada da magia. \r Com o tempo, a vida começou a se restabelecer em uma região denominada Novo Amanhã, onde a influência mágica era menos intensa. Durante esse período, novas raças e animais emergiram, unindo-se aos sobreviventes para forjar uma nova sociedade. \r Por volta do ano 500 após o cataclismo, o surgimento de um pequeno reino tornou-se evidente. As regiões além do Novo Amanhã eram chamadas de Zona de Exclusão, já que a magia era excepcionalmente volátil ali. No entanto, o mundo não experimentou cores, devido à fratura do cristal que antes as controlava, tudo era uma monocromia de cinza. \r Nessa altura, o rei iniciou o financiamento para escavações em áreas antigas, levando à descoberta de um fragmento do cristal que contrastava fortemente com a paisagem tipicamente cinzenta. Este cristal vermelho evoluiu rapidamente para um símbolo de unidade entre diversas raças, celebrado pelas suas propriedades encantadoras. O rei, embora proibisse estudos sobre o cristal, financiou generosamente expedições em busca de fragmentos adicionais. \r Após a morte do rei, seu sucessor permitiu estudos aprofundados sobre o cristal. Foi então revelado que a exposição ao cristal fazia com que os materiais adotassem uma tonalidade avermelhada, influenciando também o ambiente circundante. \r Esta revelação abriu novos caminhos de exploração e compreensão, moldando o destino do reino e dos seus diversos habitantes. O cristal vermelho, que já foi um símbolo misterioso, agora está no centro tanto da investigação científica quanto da celebração social. \r Anos depois desta descoberta inovadora, o reino floresceu num grande e próspero império, adornado com tons vermelhos vibrantes que permeavam as suas ruas. No entanto, esta prosperidade teve um custo, à medida que se desenrolou uma separação. Os sem cor foram alvo de discriminação e expulsos à força da capital imperial, marginalizados ao longo dos muros ou relegados aos reinos periféricos. \r Esses reinos remotos, que originalmente serviam como baluartes defensivos, assumiram um papel crucial em meio aos eventos induzidos pelos cristais. Uma ilha, ameaçadoramente chamada de Ilha do Infortúnio, foi identificada – um reino envolto em 100% de escuridão. A partir desta ilha, seres corrompidos pela magia conduziram ataques implacáveis às aldeias, causando devastação antes de se retirarem para o seu refúgio enigmático. Estes reinos periféricos funcionaram como iscas estratégicas face a estas incursões malévolas. \r À medida que a divisão social se alargava, o outrora próspero império transformou-se no Império Vermelho, adoptando uma política militarizada para mostrar o seu formidável exército e suprimir quaisquer potenciais rebeliões dos reinos súbditos. Nos reinos periféricos, as famílias reais foram obrigadas a adotar a cor vermelha característica do império. \r Uma família em particular, oriunda de um reino próximo da zona de exclusão, obteve considerável favor da nobreza daquele reino. Com o tempo, este reino viu-se indiretamente controlado por uma das famílias mais ricas, pois o seu apoio financeiro era indispensável para a sobrevivência da família real. A influente família, suspeitando da presença de outro cristal, financiou escavações sob o castelo real. Suas suspeitas foram confirmadas quando o cristal verde emergiu. Esta importante descoberta foi escondida clandestinamente nas masmorras, onde os nobres embarcaram em seus próprios experimentos secretos. \r Intrigado com o cristal verde, um dos nobres confiou a seu filho o estudo de seus mistérios. O jovem nobre mergulhou na sua presença dia e noite, levando a uma transformação gradual da sua cor para um verde vibrante, intensificando-se a cada dia que passava. Numa noite fatídica, o pai descobriu que o mesmo poder transformador havia consumido um pássaro, transformando-o numa criatura grotesca. Numa reviravolta trágica, a criatura atacou e matou o nobre pai. A ação rápida de outros pesquisadores confinou a criatura na masmorra, onde morreu por falta de sustento após dias de confinamento. \r Apesar deste incidente angustiante, a pesquisa sobre o cristal persistiu inabalável. Os nobres, reconhecendo o seu potencial, encomendaram a construção de um templo próximo da praça principal. Após a conclusão, os cientistas revelaram que ao infundir magia no cristal, seus poderes poderiam ser aumentados. \r Informado dos perigos presenciados no reino periférico, o imperador ordenou aos cientistas que replicassem o experimento com o cristal vermelho na capital. Após a sua chegada, o imperador, movido pelo desejo de aproveitar este poder amplificado, iniciou uma invasão do reino periférico para apoderar-se do cristal verde. Os nobres, juntamente com o rei, reuniram mercenários para a causa, resultando numa batalha prolongada que culminou num grito pela independência. O imperador, enfrentando oposição crescente, acabou recuando, concedendo independência ao reino periférico. \r No ano seguinte, o rei deste reino recém-descoberto deu as boas-vindas a uma filha. Percebendo seu comportamento peculiar, a influente família obrigou o rei a enviá-la para a Ilha das Graças, um mosteiro distante, aproveitando a oportunidade para descobrir seus supostos segredos. O rei concordou, mas estipulou que ela deveria retornar ao completar 20 anos. \r Ao retornar, o comportamento da filha tornou-se ainda mais excêntrico. Ela atravessou a cidade, desvendando os mistérios do passado do mundo, questionando a ausência de unidade entre os cristais e investigando as dimensões acima e abaixo da sua realidade. Alarmada com o potencial de agitação popular e os infortúnios causados pelo rei, a influente família orquestrou um plano para derrubar a monarquia. Incitando a população e contratando mercenários, a família fomentou com sucesso uma revolução, levando ao destronamento do rei. \r Numa invasão triunfante do castelo, a influente família executou toda a linhagem real, ordenando a tortura e prisão da filha do rei nas masmorras. Surpreendentemente, a menina provou ser imortal, suportando os ferimentos e golpes infligidos que teriam matado uma pessoa comum. Apesar da tortura contínua, a sua resiliência persistiu e a família descobriu que o seu sangue possuía propriedades curativas, enquanto a sua pele descascada produzia um material incrivelmente resistente. \r Anos depois da revolução, a filha do rei continuou a suportar torturas na cave do castelo, sendo o seu sofrimento explorado pelas propriedades únicas do seu sangue e da sua pele. \r Nas montanhas do norte, dentro da zona de exclusão, um grupo de estudiosos imperiais descobriu o cristal azul enterrado sob a neve densa. No entanto, eles mantiveram esta descoberta escondida, conduzindo estudos secretos sobre os seus efeitos. \r À medida que o atual imperador envelhecia, seu filho se preparava para assumir o controle. Durante o primeiro rito de corrosão, uma entidade escura emergiu do cristal azul, infiltrando-se no peito do jovem. Agora sob o controle deste ser antigo, o jovem imperador manipulou seu pai usando ilusões e truques mágicos para garantir a libertação de seu mestre. \r Na periferia da cidade, fragmentos de cores menores eram comercializados abertamente, dando origem a pequenos cultos e comunidades que abraçavam outros tons além do vermelho. Descontente com esta diversidade, o ser antigo iniciou uma inquisição contra as “cores misturadas”. \r Longe do caos, no retiro da zona das lulas, um culto do velho mundo vivia pacificamente entre as ruínas de um centro comercial. Estritamente proibidos de entrar nas cidades ou de exercer comércio, sustentavam-se de forma independente, cultivando seu modo de vida. \r Numa noite fatídica, o culto na zona das lulas enfrentou uma invasão implacável da ilha negra. Embora tivessem resistido a tais ataques no passado, este ataque revelou-se mais devastador. Em meio ao caos, um membro do culto acidentalmente apertou um botão nas ruínas, ativando uma máquina há muito esquecida. Da sua montagem surgiu o protagonista – uma relíquia do velho mundo, um policial designado para reprimir rebeliões orquestradas pela agora extinta corporação. Desconectado do quadro principal, o protagonista estava livre de diretivas e memórias, uma entidade liberada. \r Em estado de confusão, o protagonista auxiliou na batalha e conseguiu afugentar as criaturas. Lamentavelmente, o ataque cobrou seu preço, deixando o protagonista e o último membro sobrevivente do culto contemplando as consequências sombrias. O sobrevivente sugeriu que o protagonista poderia ser o ser profetizado, destinado a evitar a corrosão de um imperador e a reunir as nações sob as cores. \r Com uma missão agora aparente, o protagonista navegou pelas complexidades do mundo, defendendo a diplomacia em vez da violência enquanto procurava reunir os reinos contra o império opressor. À medida que a batalha final se desenrolava, o protagonista saiu vitorioso, derrotando o antigo ser que manipulou o império por tanto tempo. \r Coletando os fragmentos de cristal, o protagonista viajou para um local significativo – as ruínas da sede da empresa na zona de exclusão. Lá, montaram os fragmentos, revitalizando parte substancial do cristal. Acompanhado pelo cultista sobrevivente, o protagonista, no processo, relembrou técnicas esquecidas, desbloqueando “habilidades” de combate e utilidades. \r No entanto, o cristal, ainda pulsando com energia arcana, devolveu inesperadamente o poder ao mundo, energizando a estrutura principal. Contra a vontade do protagonista, eles se viram obrigados a lutar e derrotar seu aliado, deixando-os gravemente feridos. \r À medida que a potência do mainframe diminuía mais uma vez, o protagonista rastejou até a beira de um lago com vista para o reino. Com as últimas reservas de energia contemplaram o mundo. Numa explosão final de poder, o protagonista observou o reino celebrando a queda do imperador tirânico, testemunhando o retorno de cores vibrantes ao mundo.\r  O Desperta\r Não há sensações, apenas um frio cortante que penetra até o âmago do seu ser, um vazio insondável que devora cada partícula do seu corpo. \r Num esforço desesperado para despertar, suas mãos tentam mover-se, contudo, permanecem imóveis, destituídas de qualquer sinal de vida. Os olhos escancarados não captam nada - nem o negro do abismo, nem a luminosidade do dia, apenas um vácuo indescritível. O frio, implacável, é a única sensação que persiste. \r Cada tentativa de movimento resulta em falha; seu corpo não obedece aos comandos, e pior, você sequer consegue percebê-los. Os ouvidos tornaram-se surdos ao mundo, não há murmúrios, nem ruídos - apenas um silêncio profundo e ensurdecedor. \r Ao tentar concentrar-se na respiração, o ar parece inexistente ao preencher seus pulmões. Não há percepção do fluxo de ar pelas narinas, apenas um vazio sufocante. As tentativas de respirar ou mover-se são silenciosas, sem qualquer resposta. \r Você busca gritar, mas não sente seus lábios moverem-se, tampouco ouve o som ecoar. O frio persiste, imutável. A tentativa de rememorar o que levou a esse estado de nulidade completa é em vão; parece que suas memórias começaram a existir naquele exato momento, sem passado ou futuro. \r Lentamente, a esperança que ainda residia no peito se esvai, mas o choro desejado é impossível, pois não há sensação nos olhos ou no rosto para indicar se as lágrimas escorreram. \r À distância, um minúsculo ponto vermelho surge, capturando sua atenção com um misto de admiração e fascínio. Contudo, mesmo diante desse vislumbre, você permanece imóvel, envolto por um frio impiedoso, por um breve momento sua mente ordena ao corpo um sorriso mas rapidamente a recorda de que é incapaz até mesmo de sorrir, pois a sensação dos lábios se perdeu. A admiração inicial desvanece lentamente, transformando-se em um temor crescente. \r Da mente antes repleta de ideias, restam apenas dúvidas devastadoras. A esperança, outrora presente, começa a ceder lugar ao desespero. O ponto vermelho se aproxima, e sua natureza permanece um enigma, alimentando um desespero crescente. Suas tentativas de debate ou movimento falham miseravelmente, os gritos presos na garganta. \r O ponto se expande em uma velocidade torturante, enquanto a incerteza corrói você por dentro. À medida que se aproxima, você tenta desviar o rosto, fechar os olhos, mas a ausência de sensação persiste. E então, como um turbilhão de eventos, uma agonia intensa irrompe. \r Você cai abruptamente em um chão úmido e lodoso, uma sensação de espinhos e lâminas perfurando todo o seu corpo. A luz ao redor se torna insuportável, como se chamas ardentes estivessem a centímetros dos seus olhos. Seus ouvidos são agredidos por um tilintar incessante, como pregos sendo martelados na estrutura de um sino. \r A dor aguda de uma longa agulha metálica perfura abaixo dos seus olhos, avançando com precisão cirúrgica em direção ao seu cérebro em breves marteladas. Você se contorce em agonia, os tormentos se intensificando a cada instante. \r Todo seu corpo parece passar por um estado de estática existencial lacerante, a qual parece retorcer todo o seu ser e sacodir sua alma com força. \r A tortura parece uma eternidade, mas pouco a pouco, um alívio se aproxima. Em meio aos sons distorcidos de uma tempestade violenta, gritos de desespero, alarmes de emergência e o tilintar de lâminas, uma voz robótica ecoa: \'XK210\', abafada por uma cacofonia infernal. A agonia cessa abruptamente, deixando um vácuo de dor e confusão. \r Com a visão gradativamente se estabilizando, você se esforça para analisar rapidamente a sala ao seu redor, erguendo-se com dificuldade e apoiando-se na mesa diante de você. A sala se apresenta em uma monocromia impiedosa de branco. \r As paredes, o teto e a iluminação parecem ter sucumbido ao abandono do tempo, mostrando-se em ruínas. A arquitetura brutalista do local agora se mescla a vinhas embranquecidas, que serpenteiam e se entrelaçam, como teias de uma história esquecida, rompendo os contornos da estrutura antiga. \r A atmosfera é de desolação, o som da chuva impera no ambiente, interrompido ocasionalmente pelo som de estalos e goteiras que ecoam pela sala, fruto do tempo corroendo as entranhas deste espaço outrora grandioso. \r Você sente a vertigem do desconhecido enquanto absorve a visão desoladora. Cada detalhe carrega uma narrativa silenciosa de decadência e abandono, como se o lugar estivesse preso em um eterno estado de espera, aguardando o retorno de algo ou alguém que jamais chegará. \r A mesa na qual você buscava apoio revela-se quebrada e tombada, com vestígios de um monitor que há tempos foi despedaçado e agora repousa no chão enlameado, distorcido pela ação da chuva. Com dificuldade, seus olhos identificam um corpo recentemente sem vida. \r',
          link: '/notes/N%C3%A3o%20sinto%20minhas%20m%C3%A3os'
        },
        {
          id: 'O Legado do Autor - A Queda do Criador',
          group: 33,
          contentPreview:
            'Introdução:  \r No início do livro, somos apresentados ao autor renomado, Johnathan Collins, cujas obras sempre foram aclamadas pelos leitores. Seus romances sempre foram conhecidos por seus finais felizes e mensagens inspiradoras. No entanto, à medida que Johnathan enfrenta um período de desilusão pessoal, ele começa a questionar a validade desses finais felizes em um mundo cheio de desafios e tragédias. Sua visão da vida se torna cada vez mais sombria e ele se convence de que finais felizes não existem.\r Capítulo 1: A Semente da Dúvida  \r Neste capítulo, exploramos as origens da transformação de Johnathan. Após uma série de eventos dolorosos, como a perda de um ente querido e um relacionamento fracassado, ele começa a questionar a natureza dos finais felizes e a acreditar que eles são ilusórios e inatingíveis. Essa semente de dúvida cresce dentro dele, alimentada por sua própria dor e decepção.\r Capítulo 2: A Descida à Escuridão  \r Conforme Johnathan se afunda em sua descrença, ele começa a escrever histórias cada vez mais sombrias e pessimistas. Seus personagens são atormentados por tragédias e desafios sem esperança de redenção. À medida que mergulha nesse mundo sombrio, sua influência começa a se manifestar em seu universo literário.\r Capítulo 3: A Manipulação da Realidade  \r Neste capítulo, Johnathan descobre um poder oculto que lhe permite manipular a realidade de seu próprio universo literário. Ele usa esse poder para garantir que os personagens sofram, não importa o que eles tentem alcançar. Essa manipulação sutil cria um ciclo vicioso de tragédias e desespero, enquanto Johnathan afunda cada vez mais na escuridão de sua própria criação.\r Capítulo 4: A Confrontação dos Personagens  \r Os personagens do universo literário de Johnathan começam a perceber a influência maligna por trás de suas desgraças. Eles se unem para confrontar o próprio autor e tentar restaurar a esperança em seu mundo. Este capítulo é cheio de tensão e confrontos emocionais entre os personagens e Johnathan, que se torna cada vez mais cego pela sua própria amargura.\r Capítulo 5: A Jornada do Autor  \r Neste capítulo, exploramos a jornada interna de Johnathan enquanto ele enfrenta as consequências de suas ações e confronta seus próprios demônios internos. Ele é forçado a enfrentar suas próprias crenças sobre a vida, o amor e a esperança. Guiado por personagens que ainda acreditam em finais felizes, ele embarca em uma jornada para encontrar um equilíbrio entre a tragédia e a esperança em sua escrita.\r Capítulo 6: A Busca pela Redenção  \r Determinado a encontrar a redenção, Johnathan mergulha em sua própria mente e em seu passado conturbado. Ele se confronta com suas próprias falhas, suas perdas e seus medos mais profundos. Ao longo dessa busca, ele começa a reconstruir sua visão do mundo e a encontrar um equilíbrio entre a escuridão e a luz.\r Capítulo 7: O Confronto Final  \r No clímax do livro, Johnathan é confrontado pelos personagens de seu universo literário em uma batalha épica. Eles lutam não apenas pela sobrevivência de seu mundo, mas também pela alma do próprio autor. Esse confronto representa a luta entre a negatividade e a esperança, e o resultado determinará o destino de todos os envolvidos.\r Capítulo 8: A Redenção do Autor  \r Neste capítulo final, Johnathan confronta suas próprias falhas e se redime por suas ações passadas. Ele aprende a valorizar a esperança, a aceitar a dualidade da vida e a encontrar um equilíbrio entre a tragédia e a felicidade em sua escrita. O universo literCapítulo 8: A Redenção do Autor (Continuação)  \r No capítulo final emocionante, Johnathan percebe que a verdadeira redenção está em aceitar a dualidade da vida. Ele compreende que finais felizes não são ilusões, mas sim momentos preciosos de felicidade que encontramos em meio às adversidades. Johnathan faz as pazes com seus personagens e se compromete a reescrever seu universo com uma nova perspectiva.\r Capítulo 9: A Reconstrução do Universo  \r Com um novo propósito em mente, Johnathan se dedica a reconstruir seu universo literário. Ele revisita suas obras anteriores, trazendo esperança e superação para as vidas de seus personagens. Johnathan descobre que, ao equilibrar a tragédia com a esperança, ele cria histórias mais ricas e envolventes, capazes de tocar o coração dos leitores.\r Capítulo 10: Uma Nova Jornada  \r Neste capítulo, Johnathan inicia uma nova jornada criativa. Ele começa a escrever uma nova história, cheia de personagens complexos e enredos cativantes. Inspirado por sua própria jornada de redenção, Johnathan explora temas de superação, resiliência e a importância de encontrar beleza na imperfeição da vida.\r Capítulo 11: A Influência das Palavras  \r Conforme Johnathan continua a escrever, ele percebe o impacto que suas palavras têm sobre seus leitores. Suas histórias de esperança e superação alcançam pessoas que também lutam com suas próprias tragédias pessoais. Johnathan percebe que, como autor, ele tem o poder de inspirar e trazer luz para as vidas daqueles que o leem.\r Capítulo 12: O Legado do Autor  \r À medida que o tempo passa, o legado de Johnathan cresce. Suas obras são celebradas como exemplos poderosos de como a escrita pode transformar vidas. Ele se torna um mentor para os aspirantes a escritores, compartilhando sua jornada de redenção e encorajando-os a encontrarem sua própria voz na escrita.\r Capítulo 13: A Importância da Esperança  \r Neste capítulo, Johnathan reflete sobre a importância da esperança em nossas vidas. Ele entende que, mesmo diante das adversidades, é a esperança que nos impulsiona a continuar lutando e acreditar em finais felizes. Johnathan descobre que a escrita é uma forma poderosa de transmitir essa mensagem de esperança para o mundo.\r Capítulo 14: O Autor Renascido  \r Johnathan se sente renovado como autor. Ele não apenas encontrou sua própria redenção, mas também se reencontrou como escritor. Seus romances agora são uma mistura de realidade e fantasia, explorando os altos e baixos da vida, sem perder de vista a importância da esperança e da superação.\r Capítulo 15: O Fim é Apenas o Começo  \r No último capítulo, Johnathan reflete sobre sua jornada de transformação. Ele percebe que a redenção é um processo contínuo e que cada história que ele escreve é uma oportunidade de crescimento e aprendizado. Johnathan se despede de seus leitores com uma mensagem de esperança, incentivando-os a abraçarem suas próprias jornadas de redenção.',
          link: '/notes/O%20Legado%20do%20Autor%20-%20A%20Queda%20do%20Criador'
        },
        {
          id: 'Guerreiros espirituais',
          group: 34,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Guerreiros%20espirituais'
        },
        {
          id: 'Acruans',
          group: 35,
          contentPreview: 'Sem conteúdo disponível',
          link: '/notes/Acruans'
        },
        {
          id: 'Blattídeos',
          group: 35,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Blatt%C3%ADdeos'
        },
        {
          id: 'Dragões',
          group: 35,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Drag%C3%B5es'
        },
        {
          id: 'Elfos',
          group: 35,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Elfos'
        },
        {
          id: 'Eternívoros',
          group: 35,
          contentPreview:
            '---\r tags:\r   - Raca\r   - RPG\r ---\r Apos o Cataclisma Mágico todos os seres vivos padeceram pelo Primavera Magica assim\r Sugiro o nome "Eternívoros" para essa raça de humanos divindades reencarnadas que são perseguidas e renegadas ao longo da eternidade. Esse nome combina elementos de eternidade e voracidade, representando a condição de seres que existem por toda a eternidade, enquanto são consumidos por forças adversas.\r "Eternívoros" transmite a ideia de que esses seres são imortais e estão destinados a enfrentar perseguições e rejeição ao longo de suas vidas reencarnadas. A palavra "Eterno" destaca sua natureza divina e a existência contínua através das eras, enquanto "Voros" remete à ideia de serem devorados ou consumidos, simbolizando as adversidades e a hostilidade que enfrentam constantemente.\r Esse nome evoca uma mistura de grandiosidade e sofrimento, representando a dualidade intrínseca à sua existência como divindades renegadas.',
          link: '/notes/Etern%C3%ADvoros'
        },
        {
          id: 'Orcs',
          group: 35,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !mestresol_a_Engineering_orc_but_he_evolution_of_a_frog_ecb3e6ce-da38-4f0a-a9ef-198b9331e3af.png\r Uma raça de aparência grotesca e primitiva, em eras anteriores ao Cataclisma Mágico sua imagem era associada a burrice estrema e brutalidade de mesmo calibre, e de fato, sua inteligência comparada com a dos Elfos era um pouco mais limitada mas sua afinidade com as artes mágicas de origem destrutiva eram sureais.\r Sendo uma evolução mágica dos sapos, os orcs possuem um ritual de entrar nas piscinas de mana, esse ritual da a eles uma grande afinidade mágica, já acentuada pelos seus ancestrais que faziam o mesmo.\r Eles costumam ocupar posiçoes sociais de trabalhos manuais e pesados, como carregar objetos grandes e pesados, levar fardos ou construir casas e castelos, os que possuem maior habilidade mágica são levados como arma de guerra pelos exércitos ou mercenários.',
          link: '/notes/Orcs'
        },
        {
          id: 'Visionárias Cegas',
          group: 35,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.',
          link: '/notes/Vision%C3%A1rias%20Cegas'
        },
        {
          id: 'Vulpinideos',
          group: 35,
          contentPreview:
            '>[!info] Devagar.\r >O conteúdo que você esta prestes a ler é apenas um rascunho e não esta pronto.\r !Vulpinideos.jpg',
          link: '/notes/Vulpinideos'
        },
        {
          id: 'To Make',
          group: 36,
          contentPreview:
            '---\r kanban-plugin: board\r ---\r  Todo\r  Doing\r  Done\r %% kanban:settings\r ```\r {"kanban-plugin":"board","list-collapse":[false,false,false]}\r ```\r %%',
          link: '/notes/To%20Make'
        },
        {
          id: 'TODO',
          group: 36,
          contentPreview:
            ' Conceitos Fundamentais\r - [ ] Revisar Caos\r - [ ] Revisar Dualidade\r - [ ] Revisar Energia\r - [ ] Revisar Espaço\r - [ ] Revisar Conceitos/Fundamentos/Esperança\r - [ ] Revisar Harmonia\r - [ ] Revisar Medo\r - [ ] Revisar Morte\r - [ ] Revisar Tempo\r - [ ] Revisar Vida\r  Magia\r - [ ] Revisar Arcânicas\r - [ ] Revisar Cátedra Oculta\r - [ ] Revisar _Conceitos - Cátedras Arcanas\r - [ ] Revisar Cátedra Oculta\r - [ ] Revisar Magia Banida\r - [ ] Revisar Magia Branca\r - [ ] Revisar Magia Obscura\r - [ ] Revisar _Conceitos - Magia\r - [ ] Revisar Exordio\r  Divindades - Panteões Maiores\r - [ ] Revisar Divindades Arcestrais\r - [ ] Revisar Divindades Arcanas\r - [ ] Revisar Divindades da Guerra\r - [ ] Revisar Divindades das Artes\r - [ ] Revisar Divindades do Caos\r - [ ] Revisar Divindades do Conhecimento\r - [ ] Revisar Divindades Elementais\r - [ ] Revisar Divindades Misticas\r - [ ] Revisar Divindades Naturais\r - [ ] Revisar Divindades Temporais',
          link: '/notes/TODO'
        }
      ],
      links: [
        {
          source: 'Essências de Minerva',
          target: 'Singularidades'
        },
        {
          source: 'Eterna',
          target: 'Ignitário'
        },
        {
          source: 'Caos',
          target: 'Harmonia'
        },
        {
          source: 'Caos',
          target: 'Eterna'
        },
        {
          source: 'Caos',
          target: 'Fringilla'
        },
        {
          source: 'Caos',
          target: 'Illiphar'
        },
        {
          source: 'Caos',
          target: 'Bengala da Desordem'
        },
        {
          source: 'Dualidade',
          target: 'Fringilla'
        },
        {
          source: 'Dualidade',
          target: 'Noctus'
        },
        {
          source: 'Dualidade',
          target: 'Dualidade'
        },
        {
          source: 'Dualidade',
          target: 'Illiphar'
        },
        {
          source: 'Dualidade',
          target: 'Eterna'
        },
        {
          source: 'Dualidade',
          target: 'Rasgo do universo'
        },
        {
          source: 'Dualidade',
          target: 'Energia'
        },
        {
          source: 'Dualidade',
          target: 'Mistério da dualidade'
        },
        {
          source: 'Dualidade',
          target: 'Mosteiro de São Antão'
        },
        {
          source: 'Dualidade',
          target: 'Fio da Ordem'
        },
        {
          source: 'Energia',
          target: 'Entropia'
        },
        {
          source: 'Energia',
          target: 'Energia'
        },
        {
          source: 'Energia',
          target: 'Ritual do tripudiar'
        },
        {
          source: 'Energia',
          target: 'Eterna'
        },
        {
          source: 'Energia',
          target: 'Ignitário'
        },
        {
          source: 'Energia',
          target: 'Bogart'
        },
        {
          source: 'Espaço',
          target: 'Tempo'
        },
        {
          source: 'Espaço',
          target: 'Energia'
        },
        {
          source: 'Espaço',
          target: 'Espaço'
        },
        {
          source: 'Harmonia',
          target: 'Eterna'
        },
        {
          source: 'Harmonia',
          target: 'Essências de Minerva'
        },
        {
          source: 'Harmonia',
          target: 'Ignitário'
        },
        {
          source: 'Harmonia',
          target: 'Harmonia'
        },
        {
          source: 'Harmonia',
          target: 'Illiphar'
        },
        {
          source: 'Harmonia',
          target: 'Caos'
        },
        {
          source: 'Harmonia',
          target: 'Harmonius Agathós'
        },
        {
          source: 'Morte',
          target: 'Desconhecido'
        },
        {
          source: 'Morte',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Morte',
          target: 'Vida'
        },
        {
          source: 'Morte',
          target: 'Eterna'
        },
        {
          source: 'Morte',
          target: 'Ethereon'
        },
        {
          source: 'Morte',
          target: 'Prismora'
        },
        {
          source: 'Tempo',
          target: 'Prismora'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Fringilla'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Caos'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Medo'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Morte'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Noctus'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Harmonia'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Vida'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Illiphar'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Dualidade'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Tempo'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Espaço'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Desconhecido'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Grande Plano'
        },
        {
          source: '_Conceitos - Fundamentos',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Grande Plano',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Grande Plano',
          target: 'Eterna'
        },
        {
          source: 'Grande Plano',
          target: 'Illiphar'
        },
        {
          source: 'Grande Plano',
          target: 'Grande Plano'
        },
        {
          source: 'Grande Plano',
          target: 'Ignitário'
        },
        {
          source: 'Grande Plano',
          target: 'Nihilus'
        },
        {
          source: 'Ignitário',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Ignitário',
          target: 'Abyssethar'
        },
        {
          source: 'Ignitário',
          target: 'Eterna'
        },
        {
          source: 'Ignitário',
          target: 'Ignitário'
        },
        {
          source: 'Ignitário',
          target: 'Tempo'
        },
        {
          source: 'Ignitário',
          target: 'Espaço'
        },
        {
          source: 'Ignitário',
          target: 'Energia'
        },
        {
          source: 'Ignitário',
          target: 'Vida'
        },
        {
          source: 'Ignitário',
          target: 'Desconhecido'
        },
        {
          source: 'Ignitário',
          target: 'Morte'
        },
        {
          source: 'Ignitário',
          target: 'Dualidade'
        },
        {
          source: 'Ignitário',
          target: 'Caos'
        },
        {
          source: 'Ignitário',
          target: 'Medo'
        },
        {
          source: 'Ignitário',
          target: 'Harmonia'
        },
        {
          source: 'Ignitário',
          target: 'Singularidades'
        },
        {
          source: 'Arcânicas',
          target: 'Arcânicas'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Magia'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Cataclisma Mágico'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Noctus'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Exordio'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Primavera Magica'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Tormentos de Grayhall'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Magia Branca'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Magia Obscura'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Magia Banida'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Arcânicas'
        },
        {
          source: '_Conceitos - Cátedras Arcanas',
          target: 'Space Opera'
        },
        {
          source: 'Exordio',
          target: 'Arcânicas'
        },
        {
          source: '_Conceitos - Magia',
          target: 'Exordio'
        },
        {
          source: '_Conceitos - Magia',
          target: 'Série de Flux'
        },
        {
          source: '_Conceitos - Magia',
          target: 'império Rubro'
        },
        {
          source: '_Conceitos - Magia',
          target: 'Cialion Glorius'
        },
        {
          source: '_Conceitos - Magia',
          target: 'Conselho dos Magos'
        },
        {
          source: '_Conceitos - Magia',
          target: 'Autarquia dos Magos'
        },
        {
          source: '_Conceitos - Magia',
          target: 'Arcânicas'
        },
        {
          source: 'Singularidades',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Singularidades',
          target: 'Desconhecido'
        },
        {
          source: 'Singularidades',
          target: 'Ignitário'
        },
        {
          source: 'Singularidades',
          target: 'Eterna'
        },
        {
          source: 'Supra-Singularidade',
          target: 'Desconhecido'
        },
        {
          source: 'Supra-Singularidade',
          target: 'Noctus'
        },
        {
          source: 'Supra-Singularidade',
          target: 'Fringilla'
        },
        {
          source: 'Supra-Singularidade',
          target: 'Illiphar'
        },
        {
          source: 'Supra-Singularidade',
          target: 'Abyssethar'
        },
        {
          source: 'Supra-Singularidade',
          target: 'Singularidades'
        },
        {
          source: 'Ângulos de Eliphas Levi',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Divindades Ancestrais',
          target: 'Divindades Ancestrais'
        },
        {
          source: 'Divindades Ancestrais',
          target: 'Illiphar'
        },
        {
          source: 'Divindades Ancestrais',
          target: 'Ignitário'
        },
        {
          source: 'Divindades Ancestrais',
          target: 'Eterna'
        },
        {
          source: 'Divindades Ancestrais',
          target: 'Essências de Minerva'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Illiphar'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Magia'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Singularidades'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Omniverso'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Ordens cardinais'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Cátedras arcanas'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Magia Branca'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Magia Obscura'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Magia Banida'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Estrela Guia'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Divindades Arcanas'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Inquisidores de Hermes'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Hermes'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Emissários de Equitaria'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Ignitário'
        },
        {
          source: 'Divindades Arcanas',
          target: 'Cataclisma Mágico'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Abyssethar'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Eterna'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Aevum Primus'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Singularidade'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Illiphar'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Elementais'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Temporais'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Naturais'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades da Guerra'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Arcanas'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Ancestrais'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades do Conhecimento'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades das Artes'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades do Caos'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Místicas'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades Neutras'
        },
        {
          source: '_Conceitos - Divindades',
          target: 'Divindades caidas'
        },
        {
          source: 'Abyssethar',
          target: 'Ignitário'
        },
        {
          source: 'Abyssethar',
          target: 'Singularidades'
        },
        {
          source: 'Ethereon',
          target: 'Nihilus'
        },
        {
          source: 'Ethereon',
          target: 'Prismora'
        },
        {
          source: 'Ethereon',
          target: 'Vitália'
        },
        {
          source: 'Primordiz',
          target: 'Guerreiros espirituais'
        },
        {
          source: 'Primordiz',
          target: 'Visionárias Cegas'
        },
        {
          source: 'Primordiz',
          target: 'Desconhecido'
        },
        {
          source: 'Primordiz',
          target: 'Prismora'
        },
        {
          source: 'Primordiz',
          target: 'Primordiz'
        },
        {
          source: 'Primordiz',
          target: 'Celestina'
        },
        {
          source: 'Primordiz',
          target: 'Esperança'
        },
        {
          source: 'Primordiz',
          target: 'Portal de Esfora'
        },
        {
          source: 'Primordiz',
          target: 'Grande exílio'
        },
        {
          source: 'Primordiz',
          target: 'Orcrus X'
        },
        {
          source: 'Primordiz',
          target: 'Tratado Universal das Divindades'
        },
        {
          source: 'Primordiz',
          target: 'Eternívoros'
        },
        {
          source: 'Prismora',
          target: 'Primordiz'
        },
        {
          source: 'Ascendora',
          target: 'Unitarius'
        },
        {
          source: 'Ascendora',
          target: '_Conceito - Crepúsculo Sereno'
        },
        {
          source: 'Aurorium',
          target: 'Desconhecido'
        },
        {
          source: 'Aurorium',
          target: 'Ethereon'
        },
        {
          source: 'Aurorium',
          target: 'Sapienscia'
        },
        {
          source: 'Aurorium',
          target: 'Prismora'
        },
        {
          source: 'Creatiônio',
          target: 'Devotário'
        },
        {
          source: 'Devotário',
          target: 'Purifis'
        },
        {
          source: 'Purifis',
          target: 'Ascendora'
        },
        {
          source: 'Sapienscia',
          target: 'Serenix'
        },
        {
          source: 'Serenix',
          target: 'Creatiônio'
        },
        {
          source: 'Agonius',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Agonius',
          target: 'Pyronix'
        },
        {
          source: 'Anguistius',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Anguistius',
          target: 'Anguistius'
        },
        {
          source: 'Corruptis',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Corruptis',
          target: 'Despairon'
        },
        {
          source: 'Despairon',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Despairon',
          target: 'Destrucion'
        },
        {
          source: 'Desperon',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Desperon',
          target: 'Torturis'
        },
        {
          source: 'Destrucion',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Destrucion',
          target: 'Anguistius'
        },
        {
          source: 'Odium',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Odium',
          target: 'Corruptis'
        },
        {
          source: 'Perdicius',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Perdicius',
          target: 'Odium'
        },
        {
          source: 'Pyronix',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Pyronix',
          target: 'Desperon'
        },
        {
          source: 'Remorius',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Remorius',
          target: 'Agonius'
        },
        {
          source: 'Torturis',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Torturis',
          target: 'Perdicius'
        },
        {
          source: 'Umbra',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: 'Umbra',
          target: 'Remorius'
        },
        {
          source: '_Conceito - Domínios Etéreos',
          target: '_Conceito - Abismos da Sombra'
        },
        {
          source: '_Conceito - Domínios Etéreos',
          target: 'Nihilus'
        },
        {
          source: '_Conceito - Domínios Etéreos',
          target: 'Primordiz'
        },
        {
          source: 'Apunk',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Apunk',
          target: 'Desconhecido'
        },
        {
          source: 'Apunk',
          target: 'Abyssethar'
        },
        {
          source: 'Apunk',
          target: 'Noctus'
        },
        {
          source: 'Apunk',
          target: 'Fringilla'
        },
        {
          source: 'Apunk',
          target: 'Illiphar'
        },
        {
          source: 'Apunk',
          target: 'Singularidades'
        },
        {
          source: 'Apunk',
          target: 'Eterna'
        },
        {
          source: 'Apunk',
          target: 'Ignitário'
        },
        {
          source: 'Apunk',
          target: 'Aevum Primus'
        },
        {
          source: 'Apunk',
          target: 'Singularidade'
        },
        {
          source: 'Apunk',
          target: 'Ordem dos Firmamentos'
        },
        {
          source: 'Apunk',
          target: 'Aelon'
        },
        {
          source: 'Apunk',
          target: 'Valorian'
        },
        {
          source: 'Apunk',
          target: 'Callista'
        },
        {
          source: 'Apunk',
          target: 'Sol'
        },
        {
          source: 'Apunk',
          target: 'Arre'
        },
        {
          source: 'Apunk',
          target: 'Seguidores de Callista'
        },
        {
          source: 'Apunk',
          target: 'a.C.'
        },
        {
          source: 'Apunk',
          target: 'Hego'
        },
        {
          source: 'Apunk',
          target: 'Akróma'
        },
        {
          source: 'Apunk',
          target: 'Fallmora'
        },
        {
          source: 'Apunk',
          target: 'Cyprianus'
        },
        {
          source: 'Apunk',
          target: 'Acruans'
        },
        {
          source: 'Apunk',
          target: 'Mitu'
        },
        {
          source: 'Apunk',
          target: 'Stonepunk'
        },
        {
          source: 'Biohackerpunk',
          target: 'Biopunk Rebellion'
        },
        {
          source: 'Biopunk Rebellion',
          target: 'Nanopunk'
        },
        {
          source: 'Biopunk',
          target: 'Biohackerpunk'
        },
        {
          source: 'Bronzepunk',
          target: 'Fallmora'
        },
        {
          source: 'Bronzepunk',
          target: 'Abismarca'
        },
        {
          source: 'Bronzepunk',
          target: 'Aureum Sanctus'
        },
        {
          source: 'Bronzepunk',
          target: 'Trivale'
        },
        {
          source: 'Bronzepunk',
          target: 'Rococopunk'
        },
        {
          source: 'Cattlepunk',
          target: 'Weird Westpunk'
        },
        {
          source: 'Clockpunk',
          target: 'Dungeonpunk'
        },
        {
          source: 'Cyberpunk Noir',
          target: 'Cyberwar Punk'
        },
        {
          source: 'Cyberpunk',
          target: 'Virtual Reality'
        },
        {
          source: 'Cyberwar Punk',
          target: 'Splatterpunk'
        },
        {
          source: 'Cyberwar Punk',
          target: 'Bitware'
        },
        {
          source: 'Cyberwar Punk',
          target: 'HealthTec'
        },
        {
          source: 'Cyberwar Punk',
          target: 'NeuroSys'
        },
        {
          source: 'Cyberwar Punk',
          target: 'Energex Corporation'
        },
        {
          source: 'Cyberwar Punk',
          target: 'CloudForge'
        },
        {
          source: 'Cyberwar Punk',
          target: 'BioForge Industries'
        },
        {
          source: 'Cyberwar Punk',
          target: 'Helix Conglomerate'
        },
        {
          source: 'Cyberwar Punk',
          target: 'Novera Corp'
        },
        {
          source: 'Cyberwar Punk',
          target: 'SynVera Entertainment'
        },
        {
          source: 'Cyberwar Punk',
          target: 'Zenith Dynamics'
        },
        {
          source: 'Dieselpunk',
          target: 'Weird Diesel Punk'
        },
        {
          source: 'Ending Punk',
          target: 'Ending Punk'
        },
        {
          source: 'Gothicpunk',
          target: 'Weird Gothicpunk'
        },
        {
          source: 'Hopepunk',
          target: 'Aureum Sanctus'
        },
        {
          source: 'Hopepunk',
          target: 'Trivale'
        },
        {
          source: 'Hopepunk',
          target: 'Silkpunk'
        },
        {
          source: 'Monopunk',
          target: 'Cataclisma Mágico'
        },
        {
          source: 'Monopunk',
          target: 'Guerra das cores'
        },
        {
          source: 'Monopunk',
          target: 'Limiar'
        },
        {
          source: 'Monopunk',
          target: 'Primavera Magica'
        },
        {
          source: 'Monopunk',
          target: 'Monstruosidades de Hego'
        },
        {
          source: 'Monopunk',
          target: 'Luminarion'
        },
        {
          source: 'Monopunk',
          target: 'Celestiais'
        },
        {
          source: 'Monopunk',
          target: 'Frostveil'
        },
        {
          source: 'Monopunk',
          target: 'Vulpinideos'
        },
        {
          source: 'Monopunk',
          target: 'Professor Thalassor'
        },
        {
          source: 'Monopunk',
          target: 'Blattídeos'
        },
        {
          source: 'Monopunk',
          target: 'Aldric Blotíbac'
        },
        {
          source: 'Monopunk',
          target: 'Elfos'
        },
        {
          source: 'Monopunk',
          target: 'Orcs'
        },
        {
          source: 'Monopunk',
          target: 'Dragões'
        },
        {
          source: 'Nanopunk Noir',
          target: 'Solar War'
        },
        {
          source: 'Nanopunk',
          target: 'Nanopunk Noir'
        },
        {
          source: 'Organicpunk',
          target: 'Gothicpunk'
        },
        {
          source: 'Rococopunk',
          target: 'Trivale'
        },
        {
          source: 'Rococopunk',
          target: 'Abismarca'
        },
        {
          source: 'Rococopunk',
          target: 'Aureum Sanctus'
        },
        {
          source: 'Rococopunk',
          target: 'Hopepunk'
        },
        {
          source: 'Scavengedpunk',
          target: 'Biopunk'
        },
        {
          source: 'Silkpunk',
          target: 'Aureum Sanctus'
        },
        {
          source: 'Silkpunk',
          target: 'Weird Rococo'
        },
        {
          source: 'Space Opera',
          target: 'Ending Punk'
        },
        {
          source: 'Splatterpunk',
          target: 'Organicpunk'
        },
        {
          source: 'Steampunk',
          target: 'Wear Steampunk'
        },
        {
          source: 'Stonepunk',
          target: 'Grande Queda'
        },
        {
          source: 'Stonepunk',
          target: 'Torre de Fallmora'
        },
        {
          source: 'Stonepunk',
          target: 'Fallmora'
        },
        {
          source: 'Stonepunk',
          target: 'Hego'
        },
        {
          source: 'Stonepunk',
          target: 'Culto carmezin'
        },
        {
          source: 'Stonepunk',
          target: 'Limiar'
        },
        {
          source: 'Stonepunk',
          target: 'Bronzepunk'
        },
        {
          source: 'Teslapunk',
          target: 'Cyberpunk'
        },
        {
          source: 'Transistorpunk',
          target: 'Teslapunk'
        },
        {
          source: 'Virtual Reality',
          target: 'Cyberpunk Noir'
        },
        {
          source: 'Wear Steampunk',
          target: 'Cattlepunk'
        },
        {
          source: 'Weird Diesel Punk',
          target: 'World War Dieselpunk'
        },
        {
          source: 'Weird Gothicpunk',
          target: 'Scavengedpunk'
        },
        {
          source: 'Weird Rococo',
          target: 'Aureum Sanctus'
        },
        {
          source: 'Weird Rococo',
          target: 'Culto carmezin'
        },
        {
          source: 'Weird Rococo',
          target: 'Dungeonpunk'
        },
        {
          source: 'Weird Westpunk',
          target: 'Dieselpunk'
        },
        {
          source: 'World War Dieselpunk',
          target: 'Transistorpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Apunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Supra-Singularidade'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Desconhecido'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Quimera'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Grande Queda'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Stonepunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Torre de Fallmora'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Fallmora'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Hego'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Culto carmezin'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Limiar'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Bronzepunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Abismarca'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Aureum Sanctus'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Trivale'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Rococopunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Hopepunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Silkpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Weird Rococo'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Dungeonpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Steampunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Wear Steampunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Cattlepunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Weird Westpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Dieselpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Weird Diesel Punk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'World War Dieselpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Transistorpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Teslapunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Cyberpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Virtual Reality'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Cyberpunk Noir'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Cyberwar Punk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Splatterpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Organicpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Gothicpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Weird Gothicpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Scavengedpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Biopunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Biohackerpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Biopunk Rebellion'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Nanopunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Nanopunk Noir'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Solar War'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Ocean World War'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Colorpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Monopunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'War Colorpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Timepunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Frostpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Desertpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Necropunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Petrolpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Class War'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Solarpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Mythpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Myth War'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Cyber Urban Fantasy'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Spacialpunk'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Hi-Militar'
        },
        {
          source: '_Conceito - Eras Menores',
          target: 'Social War'
        },
        {
          source: 'Grande exílio',
          target: 'Guerreiros espirituais'
        },
        {
          source: 'Grande exílio',
          target: 'Primordiz'
        },
        {
          source: 'Grande exílio',
          target: 'Grande caçador'
        },
        {
          source: 'Celestiais',
          target: 'Celestiais'
        },
        {
          source: 'Celestiais',
          target: 'Illiphar'
        },
        {
          source: 'Celestiais',
          target: 'Eterna'
        },
        {
          source: 'Frostveil',
          target: 'Frostveil'
        },
        {
          source: 'Monstruosidades de Hego',
          target: 'Hego'
        },
        {
          source: 'Monstruosidades de Hego',
          target: 'Cyprianus'
        },
        {
          source: 'Monstruosidades de Hego',
          target: 'Acruans'
        },
        {
          source: 'Monstruosidades de Hego',
          target: 'Mitu'
        },
        {
          source: 'Desconhecido',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Desconhecido',
          target: 'Eterna'
        },
        {
          source: 'Desconhecido',
          target: 'Ignitário'
        },
        {
          source: 'Fringilla',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Fringilla',
          target: 'Noctus'
        },
        {
          source: 'Fringilla',
          target: 'Desconhecido'
        },
        {
          source: 'Fringilla',
          target: 'Eterna'
        },
        {
          source: 'Fringilla',
          target: 'Ignitário'
        },
        {
          source: 'Fringilla',
          target: 'Abyssethar'
        },
        {
          source: 'Fringilla',
          target: 'Morte'
        },
        {
          source: 'Fringilla',
          target: 'Medo'
        },
        {
          source: 'Illiphar',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Illiphar',
          target: 'Dualidade'
        },
        {
          source: 'Illiphar',
          target: 'Noctus'
        },
        {
          source: 'Illiphar',
          target: 'Fringilla'
        },
        {
          source: 'Illiphar',
          target: 'Illiphar'
        },
        {
          source: 'Illiphar',
          target: 'Eterna'
        },
        {
          source: 'Illiphar',
          target: 'Ignitário'
        },
        {
          source: 'Illiphar',
          target: 'Singularidade'
        },
        {
          source: 'Limiar',
          target: 'Divindades caidas'
        },
        {
          source: 'Limiar',
          target: 'Aevum Primus'
        },
        {
          source: 'Noctus',
          target: 'Fringilla'
        },
        {
          source: 'Noctus',
          target: 'Eterna'
        },
        {
          source: 'Noctus',
          target: 'Abyssethar'
        },
        {
          source: 'Noctus',
          target: 'Singularidade'
        },
        {
          source: 'Noctus',
          target: 'Ignitário'
        },
        {
          source: 'Noctus',
          target: 'Desconhecido'
        },
        {
          source: 'Noctus',
          target: 'Vida'
        },
        {
          source: 'Noctus',
          target: 'Tempo'
        },
        {
          source: 'Noctus',
          target: 'Harmonia'
        },
        {
          source: 'Noctus',
          target: 'Espaço'
        },
        {
          source: 'Noctus',
          target: 'Energia'
        },
        {
          source: 'Dona Lurdes SilverHand',
          target: 'Sombravale'
        },
        {
          source: 'Grande caçador',
          target: 'Prismora'
        },
        {
          source: 'Grande caçador',
          target: 'Visionárias Cegas'
        },
        {
          source: 'Grande caçador',
          target: 'Guerreiros espirituais'
        },
        {
          source: 'Grande caçador',
          target: 'Primordiz'
        },
        {
          source: 'Professor Thalassor',
          target: 'Frélla'
        },
        {
          source: 'Professor Thalassor',
          target: 'Cataclisma Mágico'
        },
        {
          source: 'Professor Thalassor',
          target: 'Krifirus'
        },
        {
          source: 'Professor Thalassor',
          target: 'Mestre Dimitri Fallmora'
        },
        {
          source: 'Professor Thalassor',
          target: 'Anastácia Fallmora'
        },
        {
          source: 'Professor Thalassor',
          target: 'Alexander Clark'
        },
        {
          source: 'Professor Thalassor',
          target: 'Professor Thalassor'
        },
        {
          source: 'Professor Thalassor',
          target: 'Monopunk'
        },
        {
          source: 'Professor Thalassor',
          target: 'Primavera Magica'
        },
        {
          source: 'BioForge Industries',
          target: 'BioForge Industries'
        },
        {
          source: 'BioForge Industries',
          target: 'HealthTec'
        },
        {
          source: 'BioForge Industries',
          target: 'Bitware'
        },
        {
          source: 'BioForge Industries',
          target: 'NeuroSys'
        },
        {
          source: 'BioForge Industries',
          target: 'CloudForge'
        },
        {
          source: 'Bitware',
          target: 'Bitware'
        },
        {
          source: 'Bitware',
          target: 'HealthTec'
        },
        {
          source: 'Bitware',
          target: 'NeuroSys'
        },
        {
          source: 'Bitware',
          target: 'Energex Corporation'
        },
        {
          source: 'Bitware',
          target: 'CloudForge'
        },
        {
          source: 'CloudForge',
          target: 'Bitware'
        },
        {
          source: 'CloudForge',
          target: 'HealthTec'
        },
        {
          source: 'CloudForge',
          target: 'NeuroSys'
        },
        {
          source: 'CloudForge',
          target: 'Energex Corporation'
        },
        {
          source: 'Energex Corporation',
          target: 'Bitware'
        },
        {
          source: 'Energex Corporation',
          target: 'HealthTec'
        },
        {
          source: 'Energex Corporation',
          target: 'NeuroSys'
        },
        {
          source: 'Energex Corporation',
          target: 'CloudForge'
        },
        {
          source: 'HealthTec',
          target: 'HealthTec'
        },
        {
          source: 'Helix Conglomerate',
          target: 'Bitware'
        },
        {
          source: 'Helix Conglomerate',
          target: 'HealthTec'
        },
        {
          source: 'Helix Conglomerate',
          target: 'NeuroSys'
        },
        {
          source: 'Helix Conglomerate',
          target: 'Energex Corporation'
        },
        {
          source: 'Helix Conglomerate',
          target: 'CloudForge'
        },
        {
          source: 'NeuroSys',
          target: 'Bitware'
        },
        {
          source: 'NeuroSys',
          target: 'HealthTec'
        },
        {
          source: 'NeuroSys',
          target: 'CloudForge'
        },
        {
          source: 'Novera Corp',
          target: 'Bitware'
        },
        {
          source: 'Novera Corp',
          target: 'HealthTec'
        },
        {
          source: 'Novera Corp',
          target: 'NeuroSys'
        },
        {
          source: 'Novera Corp',
          target: 'CloudForge'
        },
        {
          source: 'Novera Corp',
          target: 'Energex Corporation'
        },
        {
          source: 'PharmaCo',
          target: 'PharmaCo'
        },
        {
          source: 'PharmaCo',
          target: 'Bitware'
        },
        {
          source: 'PharmaCo',
          target: 'HealthTec'
        },
        {
          source: 'PharmaCo',
          target: 'NeuroSys'
        },
        {
          source: 'PharmaCo',
          target: 'CloudForge'
        },
        {
          source: 'SynVera Entertainment',
          target: 'NeuroSys'
        },
        {
          source: 'SynVera Entertainment',
          target: 'CloudForge'
        },
        {
          source: 'SynVera Entertainment',
          target: 'HealthTec'
        },
        {
          source: 'SynVera Entertainment',
          target: 'Energex Corporation'
        },
        {
          source: 'Zenith Dynamics',
          target: 'Bitware'
        },
        {
          source: 'Zenith Dynamics',
          target: 'NeuroSys'
        },
        {
          source: 'Zenith Dynamics',
          target: 'CloudForge'
        },
        {
          source: 'Zenith Dynamics',
          target: 'HealthTec'
        },
        {
          source: 'Zenith Dynamics',
          target: 'Energex Corporation'
        },
        {
          source: 'Westerbarrow',
          target: 'Igreja das Luzes'
        },
        {
          source: 'Vila das Brumas',
          target: 'Vulpinideos'
        },
        {
          source: 'Akróma',
          target: 'Hego'
        },
        {
          source: 'Akróma',
          target: 'Limiar'
        },
        {
          source: 'Akróma',
          target: 'Culto carmezin'
        },
        {
          source: 'Portal de Esfora',
          target: 'Primordiz'
        },
        {
          source: 'Portal de Esfora',
          target: 'Celestina'
        },
        {
          source: 'Portal de Esfora',
          target: 'Singularidades'
        },
        {
          source: 'Portal de Esfora',
          target: 'Grande Plano'
        },
        {
          source: 'Vitália',
          target: 'Ethereon'
        },
        {
          source: 'Vitália',
          target: 'Primordiz'
        },
        {
          source: 'Esperança',
          target: 'Eterna'
        },
        {
          source: 'Esperança',
          target: 'Primordiz'
        },
        {
          source: 'Fragmentos da Existencia',
          target: 'Apunk'
        },
        {
          source: 'Game - Aureum Sanctus',
          target: 'Aureum Sanctus'
        },
        {
          source: 'Game - Aureum Sanctus',
          target: 'Limiar'
        },
        {
          source: 'Game - Profecia do fim',
          target: 'Apunk'
        },
        {
          source: 'Game - Profecia do fim',
          target: 'Supra-Singularidade'
        },
        {
          source: 'Game - Profecia do fim',
          target: 'Grande Queda'
        },
        {
          source: 'Game - Profecia do fim',
          target: 'Desconhecido'
        },
        {
          source: 'Game - Profecia do fim',
          target: 'Quimera'
        },
        {
          source: 'Monocrom',
          target: 'Primavera Magica'
        },
        {
          source: 'Monocrom',
          target: 'Ilha do Infortúnio'
        },
        {
          source: 'Tower Of Fallmora',
          target: 'Fallmora'
        },
        {
          source: 'Tower Of Fallmora',
          target: 'Torre de Fallmora'
        },
        {
          source: 'Tower Of Fallmora',
          target: 'Hego'
        },
        {
          source: 'Tower Of Fallmora',
          target: 'Limiar'
        },
        {
          source: 'Não sinto minhas mãos',
          target: 'Professor Thalassor'
        },
        {
          source: 'Eternívoros',
          target: 'Cataclisma Mágico'
        },
        {
          source: 'Eternívoros',
          target: 'Primavera Magica'
        },
        {
          source: 'Orcs',
          target: 'Cataclisma Mágico'
        },
        {
          source: 'Orcs',
          target: 'Elfos'
        }
      ],
      groupMap: {
        'Conceitos': 1,
        'Conceitos\\Fundamentos': 2,
        'Conceitos\\Magia': 3,
        'Conceitos\\Magia\\Cátedras': 4,
        'Divindades\\Panteões Maiores': 5,
        'Divindades\\Panteões menores': 6,
        Divindades: 7,
        Dominios: 8,
        'Dominios\\Dominios das Planicies da concretude': 9,
        'Dominios\\Dominios do Crepusculo Sereno': 10,
        'Dominios\\Dominios dos abismos da sombra': 11,
        'Eras\\Eras Maiores': 12,
        'Eras\\Eras Menores': 13,
        'Eventos\\Globais': 14,
        'Eventos\\Locais': 15,
        'Figuras\\Criaturas': 16,
        'Figuras\\Divindades': 17,
        'Figuras\\Entidades': 18,
        'Figuras\\Pessoas': 19,
        'Grupos\\Clans': 20,
        'Grupos\\Corporações': 21,
        'Grupos\\Cultos': 22,
        'Grupos\\Ordens': 23,
        'Locais\\Cidades\\Estados - Metropoles': 24,
        'Locais\\Cidades\\Fortes': 25,
        'Locais\\Cidades\\Vilas': 26,
        'Locais\\Paises': 27,
        'Locais\\Planetas - Estrelas': 28,
        'Locais\\Templos': 29,
        'Objetos\\Lendarios': 30,
        'Objetos\\Plantas': 31,
        'Projetos\\Jogos': 32,
        'Projetos\\Livros': 33,
        'RPG\\Classes': 34,
        'RPG\\Raças': 35,
        Root: 36
      }
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
          nodeThreeObject={(node: Node) => {
            const group = new THREE.Group()

            // Cria a bolinha colorida
            const geometry = new THREE.SphereGeometry(5) // Diminui o tamanho da bolinha
            const material = new THREE.MeshBasicMaterial({
              color: getColorByGroup(node.group)
            })
            const sphere = new THREE.Mesh(geometry, material)
            group.add(sphere)

            // Cria o texto abaixo da bolinha com fundo
            const sprite = new SpriteText(node.id)
            sprite.color = 'white'
            sprite.backgroundColor = 'rgba(0, 0, 0, 0.5)' // Adiciona fundo ao texto
            sprite.textHeight = 4 // Diminui o tamanho do texto
            sprite.position.set(0, -10, 0) // Ajusta a posição do texto
            group.add(sprite)

            return group
          }}
          d3Force="charge"
          d3ForceOptions={{ charge: { strength: -200 } }} // Aumenta a força de repulsão
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
