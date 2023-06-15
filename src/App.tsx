import { useEffect, useState } from "react"
import { Card, CardContent, TextField, Typography, Button, Avatar } from "@mui/material"
import axios from 'axios'
type BaseUser = {
  first_name: string,
  avatar: string,
  email: string
}
function App() {
  const [dadosApi, setDadosApi] = useState<BaseUser[]>([])
  const [valueInput, setValueInput] = useState<any>(-1)
  const [user, setUser] = useState<any>(-1)
  useEffect(() => {
    getDados();
  }, [])

  const getDados = async () => {
    try {
      const { data } = await axios.get('https://reqres.in/api/users')
      setDadosApi(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const submit = () => setUser(valueInput)

  return (
    <>
      <Card sx={{
        height: '400px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Card sx={{
          heigth: '70%', width: '350px'
        }}>
          <CardContent sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Typography variant='h6'> Digite um valor</Typography>
            <TextField variant='outlined' onChange={(event) => setValueInput(event.target.value)} />
            <Button variant='contained' onClick={submit} >Enviar</Button>
          </CardContent>
        </Card>

        <Card sx={{
          heigth: '70%', width: '350px'
        }}>
          <CardContent sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Avatar src={dadosApi[user]?.avatar} sx={{ width: '50px', height: '50px' }} />
            <Typography variant='h6'>{dadosApi[user]?.email || 'Não encontrado'}</Typography>
            <Typography variant='body2'>{dadosApi[user]?.first_name || 'Não encontrado'}</Typography>

          </CardContent>
        </Card>
      </Card>

    </>
  )
}

export default App
