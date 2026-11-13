
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/usuarios">Usuários</NavLink>

        <NavLink to="/categorias">Categorias</NavLink>

        <NavLink to="/permissoes">Permissões</NavLink>

        <NavLink to="/atribuir-permissoes">
          Atribuir Permissões
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
