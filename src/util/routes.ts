import github from "../endpoints/github/auth";
import githubCallback from "../endpoints/github/callback";
import githubLinked from "../endpoints/github/linked";
import stats from "../endpoints/stats";

export default {
    github: {
        auth: github,
        callback: githubCallback,
        linked: githubLinked
    },
    stats: stats
}
