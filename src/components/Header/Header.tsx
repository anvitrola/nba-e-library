import { HeaderContainer, NBALogo } from './Header.styles'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/nba-logo.png'

export default function Header () {
    return (
        <HeaderContainer>
            <Box>
                <Link to="/" title='Home page'>
                    <NBALogo>
                        <img src={logo} alt='Official NBA logo featuring a silhouette of a basketball player in blue and red, holding a basketball in both hands.'/>
                    </NBALogo>
                </Link>
            </Box>

        </HeaderContainer>
    )
}