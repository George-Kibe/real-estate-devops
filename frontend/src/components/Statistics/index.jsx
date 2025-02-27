import { stats } from "../../../data/stats"

const Statistics = () => {
  return (
    <sectio className="container mx-auto lg:max-w-screen-xl px-4 pt-8 pb-4">
      <div className="grid sm:grid-cols-3 gap-8">
        {stats.map(stat => (
          <div key={stat.title} className="text-center sm:text-left max-w-md sm:max-w-full mx-auto">
            <h3 className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
                {stat.icon}
                {stat.title}
              </h3>
              <p className="text-foreground-accent">{stat.description}</p>
            </div>
          ))}
        </div>
      </sectio>
  )
}

export default Statistics