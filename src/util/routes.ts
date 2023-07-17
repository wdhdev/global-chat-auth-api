import github from "../endpoints/github";
import githubCallback from "../endpoints/github/callback";
import githubLinked from "../endpoints/github/linked";

export default {
    github: {
        callback: githubCallback,
        index: github,
        linked: githubLinked
    }
}
