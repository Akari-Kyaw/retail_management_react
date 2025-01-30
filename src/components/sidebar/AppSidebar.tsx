import {sidebarData} from "./sidebarData";
import {NavLink, useLocation} from "react-router-dom";

const AppSidebar = () => {

    const location = useLocation()
    const checkLocation = (paths: string[]):string => {
        if (paths.includes(location.pathname)) return 'bg-white text-black font-medium shadow'
        return ''
    }

    return <aside className={'lg:flex flex-col hidden min-h-svh min-w-[220px] lg:min-w-[240px] bg-blue-200 h-full'}>
        <div className="flex flex-col items-center justify-center h-20">
            <h5 className="text-xl font-bold leading-4 cursor-pointer">
                {('Retail Managment Sytem')} 
            </h5>
          
              
        </div>
        <ul className={'px-3'}>
            {
                sidebarData.map((item) =>
                    <NavLink to={item.routeNames[0]} key={item.name}>
                        <li
                            className={" flex items-center justify-between p-2 mb-3 rounded-sm text-black "
                                + checkLocation(item.routeNames)
                            }
                        >
                            <div className={'flex items-center gap-3'}>
                                {/* {item.icon && <item.icon className="w-4 h-4"/>} */}
                                <p className={"text-[13px]"}>{(item.name)}</p>
                            </div>
                        </li>
                    </NavLink>
                )
            }
        </ul>
    </aside>
}
export default AppSidebar