import { Router, Route } from "@solidjs/router";
import { Home, Details ,NotFound} from "./pages"
import { AppLayout } from "./layouts";

const App = () => {
  return (
    <Router root={AppLayout}>
      <Route path="/" component={Home} />
      <Route path="/details/:id" component={Details} />
      <Route path="*404" component={NotFound} />
    </Router>
  )
}

export default App;