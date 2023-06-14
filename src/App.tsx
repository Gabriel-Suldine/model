import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Avatar, Button, TextField } from '@mui/material'
import axios from 'axios'

type baseDados = {
  avatar: string,
  email: string,
  first_name: string,
  id: number,
  last_name: string,
}

function App() {
  const [dados, setDados] = useState<baseDados[]>([]);
  const [valueInput, setValueInput] = useState<any>(-1);
  const [number, setNumber] = useState<any>(-1);

  useEffect(() => {
    getDados()
  }, [])

  const submit = () => {
    setNumber(valueInput)
  }
  const getDados = async () => {
    try {
      const { data } = await axios.get('https://reqres.in/api/users')
      setDados(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card sx={{
        display: 'flex', justifyContent: 'space-around',
        alignItems: 'center', height: '380px',
        padding: '20px'
      }}>

        <Card sx={{ height: '70%', width: '300px' }}>

          <CardContent sx={{
            display: 'flex', flexDirection: 'column',
            gap: '20px', height: '100%'
          }}>

            <Typography variant='h6'>Digite um número</Typography>

            <TextField
              id="outlined-basic"
              onChange={(e) => setValueInput(e.target.value)}
              label="número"
              variant="outlined" />

            <Button variant="contained" onClick={submit}> Buscar </Button>

          </CardContent>

        </Card>

        <Card sx={{ height: '70%', width: '300px' }}>

          <CardContent sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>

            <Avatar
              src={dados[number]?.avatar || 'nao encontrado ainda'}
              sx={{ width: 56, height: 56 }}
            />

            <Typography gutterBottom variant="h5" component="div">
              {dados[number]?.first_name || 'nao encontrado ainda'}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {dados[number]?.email || 'nao encontrado ainda'}
            </Typography>

          </CardContent>
        </Card>

      </Card>
    </>
  )
}

export default App
