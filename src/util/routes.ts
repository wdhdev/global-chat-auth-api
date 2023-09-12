import github from "../endpoints/github/auth";
import githubCallback from "../endpoints/github/callback";
import stats from "../endpoints/stats";

export default {
    github: {
        auth: github,
        callback: githubCallback
    },
    stats: stats
}
