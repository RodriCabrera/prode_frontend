import { useContext } from 'react';
import { NavContext } from './Navigator';

export default function useNavContext() {
    const context = useContext(NavContext)
    return context
}