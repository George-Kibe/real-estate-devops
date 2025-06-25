"use client"
import {Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import moment from 'moment';
import { useMainProvider } from '@/providers/MainProvider';
  import {
    Users,
    PlusCircle,
    Notebook,
    LogOut,
    BadgeDollarSign,
    House,
    TableProperties,
    Car,
    LayoutDashboard,
    Grip,
    Clock8,
    SquareDashedMousePointer,
    FileSearch,
    MessageCircle,
    Calendar1,
    Users2Icon,
    FileSearch2Icon,
    BookText,
    FilesIcon,
    CogIcon,
    Search
  } from 'lucide-react';

import Link from 'next/link';
import React, { useState } from 'react';
import { useEffect } from 'react';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#FFFFFF',
      color: '#0B2B5F',
    },
    menu: {
      menuContent: '##0B2B5F',
      icon: '#0B2B5F',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
};

const MainSideBar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(true);
  const [broken, setBroken] = React.useState(false);
  const { orgMode, currentUser, sellerMode, setUser, setAdminMode, setCurrentUser, setOrgMode,setSellerMode,setCustomProperties, setTempUser, setCurrentClient } = useMainProvider();

  const handleLogout = async () => {
    localStorage.clear();
    setUser(null); setOrgMode(false); setSellerMode(false); setAdminMode(false);
    setCurrentUser(null); setCustomProperties([]);
    setCurrentClient(null); setTempUser(null);
    setSellerMode(false);
    setOrgMode(false);
    router.push("/")
  }
  let days = 365;
  if (currentUser?.isEnterprise) {
    days = 365;
  } else if (currentUser?.isPremium) {
    days = 365;
  } else if(currentUser?.isFreeTrial) {
    days = 7;
  }
  const futureDate = moment(currentUser?.subscriptionDate).add(days, "days").format("YYYY-MM-DD");
  const membershipIsValid = moment(futureDate).isAfter(moment().format("YYYY-MM-DD"));

  const menuItemStyles = {
    root: {
      fontSize: '15px',
      fontWeight: 400,
    },
    icon: {
      color: themes['light'].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? "#fbfcfd"
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: "#FFFFFF",
        color: themes['light'].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="text-black">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor="#fff"
        rootStyles={{
          color: themes["light"].sidebar.color,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Housing Module"
                icon={<House />}
              >
                <MenuItem component={<Link href="/dashboard" />} icon={<LayoutDashboard />} >Dashboard</MenuItem>
                <SubMenu label="Clients & Staff" icon={<Users />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem component={<Link href="/clients" />}>Client List</MenuItem>
                        <MenuItem> Housing Plan</MenuItem>
                        <MenuItem> Eligibility Alerts</MenuItem>
                        <MenuItem> Assigned Staff</MenuItem>
                        <MenuItem> Client Documents</MenuItem>
                        <MenuItem> Staff Directory</MenuItem>
                        <MenuItem> Staff Policies</MenuItem>
                        <MenuItem component={<Link href="/members" />}>{orgMode? `${currentUser?.orgName} 's Members` : "Staff Members"}</MenuItem>
                      </>
                   }
                  
                </SubMenu>

                <SubMenu label="Reports" icon={<TableProperties />}>
                  <MenuItem component={<Link href="/add-visit" />} icon={<PlusCircle />}>
                    Add Visit
                  </MenuItem>
                  <MenuItem component={<Link href="/reports" />} icon={<TableProperties />}>
                    View Reports
                  </MenuItem>
                </SubMenu>

                <SubMenu label="Tracking & Logs" icon={<Grip />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem component={<Link href="/clients" />}>Daily Logs</MenuItem>
                        <MenuItem component={<Link href="/tracking" />}> Housing History</MenuItem>
                        <MenuItem> Tasks & Reminders</MenuItem>
                        <MenuItem component={<Link href="/tracking" />}> Follow Up Tracker</MenuItem>
                        <MenuItem> Waiting Application Log</MenuItem>
                        <MenuItem> Benefits Tracker</MenuItem>
                        <MenuItem> Folder</MenuItem>
                        {/* <MenuItem component={<Link href="/clients" />}>Invite Clients</MenuItem> */}
                      </>
                   }
                </SubMenu>

                <SubMenu label="Visit Logging" icon={<Clock8 />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem component={<Link href="/add-visit" />}>Clock In/Out</MenuItem>
                        <MenuItem> Units Contacted</MenuItem>
                        <MenuItem> Visit Outcomes</MenuItem>
                        <MenuItem> EVV GPS Verification</MenuItem>
                      </>
                   }
                </SubMenu>

                <SubMenu label="Documents and Forms" icon={<FileSearch />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Lease Agreements</MenuItem>
                        <MenuItem> Upload PDFs</MenuItem>
                        <MenuItem> Document Alerts</MenuItem>
                        <MenuItem> Folder</MenuItem>
                      </>
                   }
                </SubMenu>
                <SubMenu label="Audit & Compliance" icon={<Notebook />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Compliance Checklist</MenuItem>
                        <MenuItem> Billing Flags</MenuItem>
                        <MenuItem> Unit Expiry Monitor</MenuItem>
                      </>
                   }
                </SubMenu>
                <SubMenu label="Pro Directory" icon={<SquareDashedMousePointer />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>My Listings</MenuItem>
                        <MenuItem> Profile Information</MenuItem>
                        <MenuItem> Services Offered</MenuItem>
                        <MenuItem> Availability Calendar</MenuItem>
                        <MenuItem> Browse Professionals</MenuItem>
                        <MenuItem> Filter By Role</MenuItem>
                        <MenuItem> Contact or Book</MenuItem>
                        <MenuItem> Schedule for Client</MenuItem>
                      </>
                   }
                </SubMenu>

                <SubMenu label="Messaging" icon={<MessageCircle />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Mass Message Clients</MenuItem>
                        <MenuItem> Mass Message Staff</MenuItem>
                      </>
                   }
                </SubMenu>

                {orgMode && (
                  <MenuItem component={<Link href="/my-clients" />} icon={<Users />}> My Clients</MenuItem>
                )}
              </SubMenu>
              
              <SubMenu label="Transportation Module" icon={<Car />}>
                <MenuItem icon={<LayoutDashboard />}>Transport Dashboard</MenuItem>
                 <SubMenu label="Trip Scheduling" icon={<Calendar1 />}>
                  {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Schedule Ride</MenuItem>
                        <MenuItem> Assign Driver</MenuItem>
                      </>
                   }
                </SubMenu>

                <SubMenu label="Clients & Drivers" icon={<Users2Icon />}>
                  {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Client Ride History</MenuItem>
                        <MenuItem> Driver List</MenuItem>
                      </>
                   }
                </SubMenu>

                <SubMenu label="Ride Logs" icon={<FileSearch />}>
                  {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Pick - Up/Drop Off</MenuItem>
                        <MenuItem> Mileage Tracker</MenuItem>
                        <MenuItem> Trip Outcomes</MenuItem>
                      </>
                   }
                </SubMenu>

                <SubMenu label="Transport Docs" icon={<FileSearch2Icon />}>
                  {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Vehicle Maintenance</MenuItem>
                        <MenuItem> Driver Licenses</MenuItem>
                      </>
                   }
                </SubMenu>
                 <SubMenu label="Billing" icon={<Users2Icon />}>
                  {
                    (orgMode || sellerMode) &&  
                      <>
                        <MenuItem>Vehicle Maintenance</MenuItem>
                        <MenuItem> Driver Licenses</MenuItem>
                      </>
                   }
                </SubMenu>
                
              </SubMenu>              
            </Menu>

            {
              (!orgMode && sellerMode) &&
                <Menu>
                  <SubMenu label="Reports" icon={<BookText />}>
                    <MenuItem> Weekly Activity Reports</MenuItem>
                    <MenuItem> Staff Leaderboard</MenuItem>
                    <MenuItem> Export PDf/Excel</MenuItem>
                    <MenuItem> Internal Notes</MenuItem>
                    <MenuItem> Auth Management</MenuItem>
                    <MenuItem> Client Survey Responses</MenuItem>
                  </SubMenu>
                </Menu>
            }

            {
              (!orgMode && sellerMode) &&
                <Menu>
                  <SubMenu label="Billing Center" icon={<BadgeDollarSign />}>
                    <MenuItem component={<Link href='/owner-billings'/>} > Claims Dashboard</MenuItem>
                    <MenuItem> Submit EDI 837</MenuItem>
                    <MenuItem> ERA/EOB Viewers</MenuItem>
                    <MenuItem> Auth Management</MenuItem>
                    <MenuItem> Rebilling Queue</MenuItem>
                    <MenuItem> Payer Settings</MenuItem>
                  </SubMenu>
                </Menu>
            }

            {
              (orgMode || sellerMode) &&
                <Menu>
                  <SubMenu label="Document Center" icon={<FilesIcon />}>
                    <MenuItem > All Clients Documents</MenuItem>
                    <MenuItem> Folder Tags By Service</MenuItem>
                    <MenuItem> Expiry Alerts</MenuItem>
                    <MenuItem> Audit Trail Viewers</MenuItem>
                  </SubMenu>
                </Menu>
            }

            <Menu>
              <SubMenu label="Settings & Roles" icon={<CogIcon />}>
                { (!orgMode || sellerMode) &&
                  <>
                    <MenuItem> Role Based Access</MenuItem>
                    <MenuItem> Agency Settings</MenuItem>
                    <MenuItem> Provider License Upload</MenuItem>
                    <MenuItem> Module Visibility Toggle</MenuItem>
                  </>
                }
              </SubMenu>
            </Menu>

             {
              (orgMode || sellerMode) &&
                <Menu>
                  <SubMenu label="Global Search & Add" icon={<Search />}>
                    <MenuItem> Search Anything</MenuItem>
                    <MenuItem> Add Client/Visit/Notes/Incident</MenuItem>
                  </SubMenu>
                </Menu>
            }
            <Menu>
              <SubMenu label="My Account" icon={<CogIcon />}>
                <MenuItem component={<Link href='/my-account'/>} >Profile</MenuItem>
                <MenuItem> Notifications</MenuItem>
                <MenuItem> Calendar</MenuItem>
                {/* <MenuItem> Logout</MenuItem> */}
              </SubMenu>
            </Menu>
          
            <Menu menuItemStyles={menuItemStyles}>
              {
                (!orgMode && !sellerMode)&&
                <>
                  <MenuItem component={<Link href='/my-properties' />} icon={<TableProperties />}>
                    My Properties
                  </MenuItem>
                  <MenuItem component={<Link href='/services' />} icon={<Notebook />}>
                    Services
                  </MenuItem>
                </>
              }
              <MenuItem component={<button onClick={handleLogout}>Logout</button>} icon={<LogOut />}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
export default MainSideBar;