import './Header.css'

const Header = () => {

  return (
    <nav className="conHeader">
        <img height={50} src="https://uploads-ssl.webflow.com/5d4263ecc0e46e27472374d2/6103365e3e1c011c6da9e504_LogotipoDigitaStudio%20(1)%20(1)-p-500.png" alt="Logo DigitaStudio"/>
        <p className='conHeader__title'>TodoList</p>        
        <img src="https://salaxer.com/logo512.png" alt="Salaxer logo" height={45}/>
    </nav>
  )
}

export default Header