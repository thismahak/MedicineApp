const BASE = process.env.REACT_APP_API_BASE_URL;

export const getAllMedicines = async () => {
  const res = await fetch(BASE);
  return res.json();
};

export const addMedicine = async (data) => {
  await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const updateMedicine = async (id, data) => {
  await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteMedicine = async (id) => {
  await fetch(`${BASE}/${id}`, { method: "DELETE" });
};
