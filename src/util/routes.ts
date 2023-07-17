import github from "../endpoints/github";
import githubCallback from "../endpoints/github/callback";

export default {
    github: {
        callback: githubCallback,
        index: github
    }
}
