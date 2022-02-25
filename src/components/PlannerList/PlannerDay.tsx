export default function PlannerDay({
  day,
  recipes,
}: {
  day: string;
  recipes: any;
}) {
  return (
    <div
      style={{
        border: 'coral solid .5vw',
        borderRadius: '1vw',
        width: '30vw',
      }}
    >
      <h1 style={{ textTransform: 'uppercase', color: 'coral' }}>{day}</h1>
      {recipes.map((recipe: any) => {
        return <h3 style={{ textDecoration: 'underline' }}>{recipe.name}</h3>;
      })}
    </div>
  );
}
