import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Card } from "react-bootstrap";

export const Route = createFileRoute("/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-3/5">
      <img alt="" src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?auto=format&amp;fit=crop&amp;q=80&amp;w=1160" className="h-full w-full object-cover sm:h-[calc(100%-2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%-4rem)] md:rounded-ss-[60px]"></img></div>
      <div className="lg:w-2/5">
        <div className="p-4">
          <div className="row mb-2">
            <h1>image will be here</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
