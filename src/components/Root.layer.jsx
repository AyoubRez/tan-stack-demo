import {Link, Outlet} from "react-router-dom";
import reactLogo from '../assets/react.svg';
import rqLogo from '../assets/react-query.svg';
import dinoLogo from '../assets/dinogamer.svg';

export const RootLayer = () => (
    <div id={"layer"}>
        <nav>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>
            <a href="https://tanstack.com/query/latest/docs/framework/react/overview" target="_blank">
                <img src={rqLogo} className="logo react" alt="React logo"/>
            </a>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/rpg-classes-traditional'>Trad. Request</Link>
                </li>
                <li>
                    <Link to='/rpg-classes-rq'>RQ Request</Link>
                </li>
                <li>
                    <Link to='/rpg-classes-rq-on-click'>RQ Request On Click</Link>
                </li>
                <li>
                    <Link to='/rpg-classes-rq-custom'>RQ Custom Hook</Link>
                </li>
                <li>
                    <Link to='/rq-parallel'>RQ Parallel</Link>
                </li>
                <li>
                    <Link to='/rq-dynamic-parallel'>Dynamic RQ Parallel</Link>
                </li>
                <li>
                    <Link to='/rq-dependent'>Dependents</Link>
                </li>
                <li>
                    <Link to='/rq-paginated'>Paginated</Link>
                </li>
                <li>
                    <Link to='/rq-infinite-paginated'>Infinite</Link>
                </li>
            </ul>
        </nav>
        <div id="detail">
            <Outlet/>
            <a href="https://tanstack.com/query/latest/docs/framework/react/overview" target="_blank">
                <img src={dinoLogo} className="logo-dino react" alt="React logo"/>
            </a>
        </div>
    </div>
);