import SideNavigation from "@app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem,1fr] h-full gap-12">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
