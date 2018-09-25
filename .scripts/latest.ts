import * as dependencies from "./dependencies";
import * as repository from "./repository";

dependencies.updatePackageJsonMain(dependencies.getThisRepositoryFolderPath(), "./dist/lib/index.js");
dependencies.updateLocalDependencies(repository.packageFolders, "latest", dependencies.getLatestDependencyVersion);