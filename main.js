const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// URL base da sua API no MockAPI
const API_BASE_URL = 'https://664552b2b8925626f8918e41.mockapi.io/facens';

// Listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
});

// Obter um cliente por ID
app.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Cliente não encontrado.' });
  }
});

// Adicionar um novo cliente
app.post('/clientes', async (req, res) => {
  const { nome, email, idade } = req.body;
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, { nome, email, idade });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar cliente.' });
  }
});

// Atualizar um cliente
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, idade } = req.body;
  try {
    const response = await axios.put(`${API_BASE_URL}/usuarios/${id}`, { nome, email, idade });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
});

// Remover um cliente
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${API_BASE_URL}/usuarios/${id}`);
    res.json({ message: 'Cliente removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover cliente.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
