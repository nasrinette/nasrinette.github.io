export function PainPointCard({ number, title, description, quote, stat }) {
  return (
    <div className="bg-white p-8 border-2 border-light-gray transition-all duration-300 relative overflow-hidden hover:border-burgundy hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute -top-2.5 right-5 font-display text-8xl font-black text-burgundy opacity-10 leading-none">
        {number}
      </div>
      <h5 className="text-xl font-bold text-burgundy mb-4 relative z-10">
        {title}
      </h5>
      <p className="leading-relaxed mb-4 text-dark-gray">
        {description}
      </p>
      {quote && (
        <div className="italic text-brown p-4 bg-cream border-l-[3px] border-burgundy mt-4 text-sm">
          "{quote}"
        </div>
      )}
      {stat && (
        <div className="bg-burgundy text-cream p-3 font-semibold mt-4 text-center">
          {stat}
        </div>
      )}
    </div>
  );
}

export function PersonaCard({ avatar, name, role, context, painPoints, needs, quote }) {
  return (
    <div className="bg-white p-8 border-2 border-light-gray transition-all duration-300 hover:border-burgundy hover:-translate-y-1 hover:shadow-lg">
      <div className="flex mb-4 pb-4 border-b border-light-gray">
        <div className="w-16 h-16 bg-burgundy text-cream rounded-full flex items-center justify-center text-3xl font-bold mr-4">
          {avatar}
        </div>
        <div>
          <div className="font-display text-xl font-bold text-burgundy mb-1">
            {name}
          </div>
          <div className="text-sm text-gray font-medium">
            {role}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-cream">
        <strong className="text-burgundy block mb-2">Context:</strong>
        <span>{context}</span>
      </div>
      <div className="mt-6 p-4 bg-cream">
        <strong className="text-burgundy block mb-2">Pain Points:</strong>
        <ul className="list-none pl-0">
          {painPoints.map((point, i) => (
            <li key={i} className="pl-6 relative mb-2 before:content-['⚠'] before:absolute before:left-0">
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 p-4 bg-cream">
        <strong className="text-burgundy block mb-2">Design Needs:</strong>
        <span>{needs}</span>
      </div>
      <blockquote className="italic text-brown p-4 border-l-[3px] border-burgundy mt-4 bg-brown/5">
        "{quote}"
      </blockquote>
    </div>
  );
}

export function FeatureCard({ icon, title, problem, text, result, image }) {
  const hasImage = !!image;

  return (
    <article className={`bg-white border border-light-gray p-8 ${hasImage ? 'grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-6 items-center' : ''}`}>
      <div className="flex flex-col gap-6">
        <header className="flex items-center gap-4">
          <svg className="w-7 h-7 fill-burgundy flex-shrink-0" viewBox="0 0 24 24">
            {icon}
          </svg>
          <h5 className="text-xl text-burgundy m-0 font-bold">
            {title}
          </h5>
        </header>
        <div>
          <p className="font-semibold text-dark-gray mb-1">Problem:</p>
          <p className="mb-4 text-dark-gray">{text}</p>
          <div className="bg-cream border-l-4 border-burgundy p-4 font-medium text-dark-gray">
            {result}
          </div>
        </div>
      </div>
      {hasImage && (
        <div className="flex justify-end">
          <img
            src={image}
            alt={title}
            className="w-full max-w-[270px] rounded-[35px] shadow-lg"
          />
        </div>
      )}
    </article>
  );
}

export function InsightBox({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-[#fff8dc] to-[#fffacd] border-l-4 border-[#ffd700] p-8 my-8">
      <h4 className="text-burgundy text-xl mb-4 font-bold flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17V14.74C17.81 13.47 19 11.38 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2ZM9 21C9 21.2652 9.10536 21.5196 9.29289 21.7071C9.48043 21.8946 9.73478 22 10 22H14C14.2652 22 14.5196 21.8946 14.7071 21.7071C14.8946 21.5196 15 21.2652 15 21V20H9V21Z" fill="#3A1C1E" />
        </svg>
        {title}
      </h4>
      <p className="leading-relaxed text-dark-gray">{children}</p>
    </div>
  );
}
