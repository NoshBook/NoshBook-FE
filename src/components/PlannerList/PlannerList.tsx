import { useState, useEffect } from 'react';
import { getPlannerRecipes } from '../../services/planner';
import PlannerDay from './PlannerDay';

export default function PlannerList() {
  const [days, setDays] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFreshDays = async () => {
      const res = await getPlannerRecipes();
      setDays(res);
      setLoading(false);
    };

    getFreshDays();
  }, []);

  return loading ? (
    <h1>...LOADING</h1>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {days.map((day: any) => (
        <PlannerDay {...day} />
      ))}
    </div>
  );
}
