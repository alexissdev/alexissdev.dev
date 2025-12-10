import Repository from "@/lib/github/github.repository";
import { getRepositoryOfUser } from "@/lib/github/repository.service";

import Header from "@/components/Header";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import Projects from "@/components/project/Projects";

export default function ProjectsPage({
  repositories,
}: {
  repositories: Repository[];
}) {
  return (
    <>
      <Header
        metaData={{
          title: "Alexis | Projects",
          description: "Our projects: the projects that we have developed",
          openGraphTitle: "Alexis | Projects",
          url: "projects",
        }}
      />
      <Navigation />
      <Projects repositories={repositories} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const repositories: Repository[] = await getRepositoryOfUser("alexissdev");

  const sortedRepositories = repositories.sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return { props: { 
    repositories: sortedRepositories
   } };
}
