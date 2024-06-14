import authStore from '@stores/authStore';

import { MeasurementTypeModel } from 'models/MeasurementTypeModel';

const BASE = `${process.env.REACT_APP_API_URL}/api`;

export const fetchMeasurementType = async (): Promise<
  MeasurementTypeModel[] | null
> => {
  try {
    const response = await fetch(`${BASE}/measurementType`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error get all measurement type:', error);
    return null;
  }
};
