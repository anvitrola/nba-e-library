import { HeaderContainer, NBALogo } from './Header.styles'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/nba-logo.png'

export default function Header () {
    return (
        <HeaderContainer>
            <Box>
                <Link to="/">
                    <NBALogo>
                        <img src={logo}/>
                    </NBALogo>
                </Link>
            </Box>

        </HeaderContainer>
    )
}