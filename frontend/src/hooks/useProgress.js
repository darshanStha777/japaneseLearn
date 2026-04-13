import { useState, useEffect } from 'react';
import { progressAPI } from '../services/api';

export const useProgress = () => {
  const [statistics, setStatistics] = useState(null);
  const [readiness, setReadiness] = useState(0);
  const [weakAreas, setWeakAreas] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProgress = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsData, readinessData, weakAreasData, heatmapData] = await Promise.allSettled([
          progressAPI.getStatistics(),
          progressAPI.getReadiness(),
          progressAPI.getWeakAreas(),
          progressAPI.getHeatmap(),
        ]);

        if (statsData.status === 'fulfilled') setStatistics(statsData.value);
        if (readinessData.status === 'fulfilled') setReadiness(readinessData.value?.score || 0);
        if (weakAreasData.status === 'fulfilled') setWeakAreas(weakAreasData.value || []);
        if (heatmapData.status === 'fulfilled') setHeatmap(heatmapData.value || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch progress');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProgress();
  }, []);

  return { statistics, readiness, weakAreas, heatmap, loading, error };
};
