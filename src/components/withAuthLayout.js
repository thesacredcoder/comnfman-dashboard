import { useUser } from "@/hooks/useUser";
import PageLayout from "./PageLayout";

const withAuthLayout = (Component) => {
  return (props) => {
    const { user } = useUser();

    if (user !== null) {
      return (
        <PageLayout>
          <Component {...props} />
        </PageLayout>
      );
    } else {
      return <Component {...props} />;
    }
  };
};

export default withAuthLayout;
