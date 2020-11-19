module.exports = {
	apps: [
		{
			name: "backend",
			script: "npm",
			cwd: "./backend",
			args: "start",
			error_file: "../logs/backend_err.log",
			out_file: "../logs/backend_out.log",
			exec_mode: "cluster_mode",
			instances: 1,
			watch: false,
			ignore_watch: ["[/\\]./", "node_modules"],
		},
		{
			name: "frontend",
			script: "npm",
			cwd: "./frontend",
			args: "start",
			error_file: "../logs/frontend_err.log",
			out_file: "../logs/frontend_out.log",
			exec_mode: "cluster_mode",
			instances: 1,
			watch: false,
			ignore_watch: ["[/\\]./", "node_modules"],
		},
	],
};
