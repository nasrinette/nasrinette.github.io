export function Section({ id, title, icon, children, className = '' }) {
  return (
    <div id={id} className={`mb-12 ${className}`}>
      {title && (
        <div className="flex items-center gap-4 mb-6">
          {icon && (
            <svg className="w-8 h-8 fill-burgundy" viewBox="0 0 24 24">
              {icon}
            </svg>
          )}
          <h3 className="font-display text-2xl md:text-3xl font-bold text-burgundy tracking-tight">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

export function SubSection({ title, children }) {
  return (
    <div className="my-8">
      {title && (
        <h4 className="font-display text-xl font-semibold text-burgundy mb-4 mt-8">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}
