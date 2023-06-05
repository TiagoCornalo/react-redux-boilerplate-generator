import Button from '../../components/buttons/Button'
import { useDispatch } from 'react-redux'
import { increment } from '../../redux/slices/counter'
const Home = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(increment())
  }

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick} type='button'>
        Click me
      </Button>
    </div>
  )
}

export default Home
