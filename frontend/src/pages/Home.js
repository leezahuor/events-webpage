import eventImage from "../assets/event.jpg";
import PageContent from "../components/PageContent";

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Check out our amazing events!</p>
      <img src={eventImage} alt="Check out our events!" />
    </PageContent>
  );
}

export default HomePage;
