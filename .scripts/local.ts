import * as dependencies from "./dependencies";
import * as repository from "./repository";

dependencies.updatePackageJsonMain(dependencies.getThisRepositoryFolderPath(), "./lib/index.ts");
dependencies.updateLocalDependencies(repository.packageFolders, "local", dependencies.getLocalDependencyVersion);