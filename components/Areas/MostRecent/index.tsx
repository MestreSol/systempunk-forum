import Card from '@/components/Areas/Card'
import style from './style.module.css'

type Props = {
  cards: {
    title: string
    description: string
    image: string
    link: string
    tags: {
      name: string
      type: string
    }[]
  }[]
}

const MostRecent = ({ cards }: Props) => {
  return (
    <div className={style.mostRecent}>
      {cards.map((card) => (
        <Card
          title={card.title}
          description={card.description}
          image={card.image}
          link={card.link}
          tags={card.tags}
          key={card.title}
        />
      ))}
    </div>
  )
}

export default MostRecent
