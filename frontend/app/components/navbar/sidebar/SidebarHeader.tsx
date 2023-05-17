interface SidebarHeaderProps {
  children: React.ReactNode;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children }) => {
  return <div className="border-b-[1px] shadow-sm p-5">{children}</div>;
};

export default SidebarHeader;
