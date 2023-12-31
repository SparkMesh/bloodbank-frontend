import React, { useEffect } from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector,useDispatch  } from "react-redux";
import { toggleMenuCollapsed } from "../../../redux/features/auth/authSlice";
import 
 { useState } from 'react';
 import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Dropdown,Badge, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Button,Skeleton } from 'antd';
import { set } from "mongoose";
const { Content, Footer, Sider } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const { user,menuCollapsed } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(menuCollapsed);
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
 
  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };
  const items = [
   
    getItem((location.pathname === "/" ||
    location.pathname === "/donar" ||
    location.pathname === "/hospital" ? (
     
        <Link to="/recentrecords" className="nav-link">
          Recent Records
        </Link>
      
    ) : (
      
        <Link to="/" className="nav-link">
          Home
        </Link>
      
    )), '2', <DesktopOutlined />),
    getItem((<button className="" onClick={handleLogout}>
    Logout
  </button>), 'sub1', <UserOutlined />),
    
  ];


  return (
    
      
     <Layout
     className="sticky top-0 z-50"
     //className="w-full border-2 border-red-600 "
     >
      
        <Layout.Header
        theme="dark"
          style={{
            padding: 0,
            background: colorBgContainer,

          }}
          //className="w-full border-2 border-red-600 "
        >
          <Menu >
          <div className="flex flex-row w-full  justify-between items-center ">
          <Button
            type="text"
            icon={collapsed>0 ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => 
              {
              dispatch(toggleMenuCollapsed())
            setCollapsed(menuCollapsed>0?0:1)
            }}
            style={{
              color: collapsed>0?'#b91c1c':'#292524',
              width: 64,
              height: 64,
            }}
          />
          <div className="flex flex-row justify-between  w-[100%] items-center gap-1 ">
            <div
            className="flex flex-row justify-center w-full  items-center gap-1 "
            > 
            {user?.role ?
            
             
            
              <div className="flex flex-row items-center "><UserOutlined/>
             <p className=" ml-2"><Badge.Ribbon 
    className="opacity-70 -mt-6 -mr-1 text-[12px]  rounded-full"
    text={user?.role} color="#be123c">  
    <p className="text-lg">
    {user?.name || user?.hospitalName || user?.organisationName}
    </p>
    </Badge.Ribbon></p></div>
             
  
            :
            <div className="  w-[130px] h-9 flex  justify-center  ">
            <Skeleton.Button
            
           className=" "
            loading={true}
            block={true}
            active /></div>
            
            }



           </div>
           
              
            <Dropdown 
            className="mr-3"
            menu={ {
              
              items
              
              
              } } placement="bottomRight" arrow>
      <Button>Profile</Button>
    </Dropdown>
            
            </div>
          
          
          
            
            
            
          </div></Menu>
          </Layout.Header>
          
        
        </Layout>
      
   
  );
};

export default Header;
