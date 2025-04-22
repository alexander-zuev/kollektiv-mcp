var __create = Object.create;
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) =>
	function __init() {
		return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
	};
var __commonJS = (cb, mod) =>
	function __require() {
		return (
			mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
			mod.exports
		);
	};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
	if ((from && typeof from === "object") || typeof from === "function") {
		for (const key of __getOwnPropNames(from))
			if (!__hasOwnProp.call(to, key) && key !== except)
				__defProp(to, key, {
					get: () => from[key],
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
				});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (
	(target = mod != null ? __create(__getProtoOf(mod)) : {}),
	__copyProps(
		// If the importer is in node compatibility mode or this is not an ESM
		// file that has been converted to a CommonJS file using a Babel-
		// compatible transform (i.e. "__esModule" has not been set), then set
		// "default" to the CommonJS "module.exports" for node compatibility.
		isNodeMode || !mod || !mod.__esModule
			? __defProp(target, "default", { value: mod, enumerable: true })
			: target,
		mod,
	)
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __template = (cooked, raw2) =>
	__freeze(__defProp(cooked, "raw", { value: __freeze(raw2 || cooked.slice()) }));

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
	return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
	const fn = /* @__PURE__ */ __name(() => {
		throw /* @__PURE__ */ createNotImplementedError(name);
	}, "fn");
	return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
	return class {
		__unenv__ = true;
		constructor() {
			throw new Error(`[unenv] ${name} is not implemented yet!`);
		}
	};
}
var init_utils = __esm({
	"node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		__name(createNotImplementedError, "createNotImplementedError");
		__name(notImplemented, "notImplemented");
		__name(notImplementedClass, "notImplementedClass");
	},
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin,
	_performanceNow,
	nodeTiming,
	PerformanceEntry,
	PerformanceMark,
	PerformanceMeasure,
	PerformanceResourceTiming,
	PerformanceObserverEntryList,
	Performance,
	PerformanceObserver,
	performance;
var init_performance = __esm({
	"node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_utils();
		_timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
		_performanceNow = globalThis.performance?.now
			? globalThis.performance.now.bind(globalThis.performance)
			: () => Date.now() - _timeOrigin;
		nodeTiming = {
			name: "node",
			entryType: "node",
			startTime: 0,
			duration: 0,
			nodeStart: 0,
			v8Start: 0,
			bootstrapComplete: 0,
			environment: 0,
			loopStart: 0,
			loopExit: 0,
			idleTime: 0,
			uvMetricsInfo: {
				loopCount: 0,
				events: 0,
				eventsWaiting: 0,
			},
			detail: void 0,
			toJSON() {
				return this;
			},
		};
		PerformanceEntry = class {
			static {
				__name(this, "PerformanceEntry");
			}
			__unenv__ = true;
			detail;
			entryType = "event";
			name;
			startTime;
			constructor(name, options2) {
				this.name = name;
				this.startTime = options2?.startTime || _performanceNow();
				this.detail = options2?.detail;
			}
			get duration() {
				return _performanceNow() - this.startTime;
			}
			toJSON() {
				return {
					name: this.name,
					entryType: this.entryType,
					startTime: this.startTime,
					duration: this.duration,
					detail: this.detail,
				};
			}
		};
		PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
			static {
				__name(this, "PerformanceMark");
			}
			entryType = "mark";
			constructor() {
				super(...arguments);
			}
			get duration() {
				return 0;
			}
		};
		PerformanceMeasure = class extends PerformanceEntry {
			static {
				__name(this, "PerformanceMeasure");
			}
			entryType = "measure";
		};
		PerformanceResourceTiming = class extends PerformanceEntry {
			static {
				__name(this, "PerformanceResourceTiming");
			}
			entryType = "resource";
			serverTiming = [];
			connectEnd = 0;
			connectStart = 0;
			decodedBodySize = 0;
			domainLookupEnd = 0;
			domainLookupStart = 0;
			encodedBodySize = 0;
			fetchStart = 0;
			initiatorType = "";
			name = "";
			nextHopProtocol = "";
			redirectEnd = 0;
			redirectStart = 0;
			requestStart = 0;
			responseEnd = 0;
			responseStart = 0;
			secureConnectionStart = 0;
			startTime = 0;
			transferSize = 0;
			workerStart = 0;
			responseStatus = 0;
		};
		PerformanceObserverEntryList = class {
			static {
				__name(this, "PerformanceObserverEntryList");
			}
			__unenv__ = true;
			getEntries() {
				return [];
			}
			getEntriesByName(_name, _type) {
				return [];
			}
			getEntriesByType(type) {
				return [];
			}
		};
		Performance = class {
			static {
				__name(this, "Performance");
			}
			__unenv__ = true;
			timeOrigin = _timeOrigin;
			eventCounts = /* @__PURE__ */ new Map();
			_entries = [];
			_resourceTimingBufferSize = 0;
			navigation = void 0;
			timing = void 0;
			timerify(_fn, _options) {
				throw createNotImplementedError("Performance.timerify");
			}
			get nodeTiming() {
				return nodeTiming;
			}
			eventLoopUtilization() {
				return {};
			}
			markResourceTiming() {
				return new PerformanceResourceTiming("");
			}
			onresourcetimingbufferfull = null;
			now() {
				if (this.timeOrigin === _timeOrigin) {
					return _performanceNow();
				}
				return Date.now() - this.timeOrigin;
			}
			clearMarks(markName) {
				this._entries = markName
					? this._entries.filter((e) => e.name !== markName)
					: this._entries.filter((e) => e.entryType !== "mark");
			}
			clearMeasures(measureName) {
				this._entries = measureName
					? this._entries.filter((e) => e.name !== measureName)
					: this._entries.filter((e) => e.entryType !== "measure");
			}
			clearResourceTimings() {
				this._entries = this._entries.filter(
					(e) => e.entryType !== "resource" || e.entryType !== "navigation",
				);
			}
			getEntries() {
				return this._entries;
			}
			getEntriesByName(name, type) {
				return this._entries.filter(
					(e) => e.name === name && (!type || e.entryType === type),
				);
			}
			getEntriesByType(type) {
				return this._entries.filter((e) => e.entryType === type);
			}
			mark(name, options2) {
				const entry = new PerformanceMark(name, options2);
				this._entries.push(entry);
				return entry;
			}
			measure(measureName, startOrMeasureOptions, endMark) {
				let start;
				let end;
				if (typeof startOrMeasureOptions === "string") {
					start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
					end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
				} else {
					start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
					end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
				}
				const entry = new PerformanceMeasure(measureName, {
					startTime: start,
					detail: {
						start,
						end,
					},
				});
				this._entries.push(entry);
				return entry;
			}
			setResourceTimingBufferSize(maxSize) {
				this._resourceTimingBufferSize = maxSize;
			}
			addEventListener(type, listener, options2) {
				throw createNotImplementedError("Performance.addEventListener");
			}
			removeEventListener(type, listener, options2) {
				throw createNotImplementedError("Performance.removeEventListener");
			}
			dispatchEvent(event) {
				throw createNotImplementedError("Performance.dispatchEvent");
			}
			toJSON() {
				return this;
			}
		};
		PerformanceObserver = class {
			static {
				__name(this, "PerformanceObserver");
			}
			__unenv__ = true;
			static supportedEntryTypes = [];
			_callback = null;
			constructor(callback) {
				this._callback = callback;
			}
			takeRecords() {
				return [];
			}
			disconnect() {
				throw createNotImplementedError("PerformanceObserver.disconnect");
			}
			observe(options2) {
				throw createNotImplementedError("PerformanceObserver.observe");
			}
			bind(fn) {
				return fn;
			}
			runInAsyncScope(fn, thisArg, ...args) {
				return fn.call(thisArg, ...args);
			}
			asyncId() {
				return 0;
			}
			triggerAsyncId() {
				return 0;
			}
			emitDestroy() {
				return this;
			}
		};
		performance =
			globalThis.performance && "addEventListener" in globalThis.performance
				? globalThis.performance
				: new Performance();
	},
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
	"node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_performance();
	},
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
	"node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
		init_perf_hooks();
		globalThis.performance = performance;
		globalThis.Performance = Performance;
		globalThis.PerformanceEntry = PerformanceEntry;
		globalThis.PerformanceMark = PerformanceMark;
		globalThis.PerformanceMeasure = PerformanceMeasure;
		globalThis.PerformanceObserver = PerformanceObserver;
		globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
		globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
	},
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
	"node_modules/unenv/dist/runtime/mock/noop.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		noop_default = Object.assign(() => {}, { __unenv__: true });
	},
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console,
	_ignoreErrors,
	_stderr,
	_stdout,
	log,
	info,
	trace,
	debug,
	table,
	error,
	warn,
	createTask,
	clear,
	count,
	countReset,
	dir,
	dirxml,
	group,
	groupEnd,
	groupCollapsed,
	profile,
	profileEnd,
	time,
	timeEnd,
	timeLog,
	timeStamp,
	Console,
	_times,
	_stdoutErrorHandler,
	_stderrErrorHandler;
var init_console = __esm({
	"node_modules/unenv/dist/runtime/node/console.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_noop();
		init_utils();
		_console = globalThis.console;
		_ignoreErrors = true;
		_stderr = new Writable();
		_stdout = new Writable();
		log = _console?.log ?? noop_default;
		info = _console?.info ?? log;
		trace = _console?.trace ?? info;
		debug = _console?.debug ?? log;
		table = _console?.table ?? log;
		error = _console?.error ?? log;
		warn = _console?.warn ?? error;
		createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
		clear = _console?.clear ?? noop_default;
		count = _console?.count ?? noop_default;
		countReset = _console?.countReset ?? noop_default;
		dir = _console?.dir ?? noop_default;
		dirxml = _console?.dirxml ?? noop_default;
		group = _console?.group ?? noop_default;
		groupEnd = _console?.groupEnd ?? noop_default;
		groupCollapsed = _console?.groupCollapsed ?? noop_default;
		profile = _console?.profile ?? noop_default;
		profileEnd = _console?.profileEnd ?? noop_default;
		time = _console?.time ?? noop_default;
		timeEnd = _console?.timeEnd ?? noop_default;
		timeLog = _console?.timeLog ?? noop_default;
		timeStamp = _console?.timeStamp ?? noop_default;
		Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
		_times = /* @__PURE__ */ new Map();
		_stdoutErrorHandler = noop_default;
		_stderrErrorHandler = noop_default;
	},
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole,
	assert,
	clear2,
	context,
	count2,
	countReset2,
	createTask2,
	debug2,
	dir2,
	dirxml2,
	error2,
	group2,
	groupCollapsed2,
	groupEnd2,
	info2,
	log2,
	profile2,
	profileEnd2,
	table2,
	time2,
	timeEnd2,
	timeLog2,
	timeStamp2,
	trace2,
	warn2,
	console_default;
var init_console2 = __esm({
	"node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_console();
		workerdConsole = globalThis["console"];
		({
			assert,
			clear: clear2,
			context:
				// @ts-expect-error undocumented public API
				context,
			count: count2,
			countReset: countReset2,
			createTask:
				// @ts-expect-error undocumented public API
				createTask2,
			debug: debug2,
			dir: dir2,
			dirxml: dirxml2,
			error: error2,
			group: group2,
			groupCollapsed: groupCollapsed2,
			groupEnd: groupEnd2,
			info: info2,
			log: log2,
			profile: profile2,
			profileEnd: profileEnd2,
			table: table2,
			time: time2,
			timeEnd: timeEnd2,
			timeLog: timeLog2,
			timeStamp: timeStamp2,
			trace: trace2,
			warn: warn2,
		} = workerdConsole);
		Object.assign(workerdConsole, {
			Console,
			_ignoreErrors,
			_stderr,
			_stderrErrorHandler,
			_stdout,
			_stdoutErrorHandler,
			_times,
		});
		console_default = workerdConsole;
	},
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
	"node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
		init_console2();
		globalThis.console = console_default;
	},
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
	"node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		hrtime = /* @__PURE__ */ Object.assign(
			/* @__PURE__ */ __name(function hrtime2(startTime) {
				const now = Date.now();
				const seconds = Math.trunc(now / 1e3);
				const nanos = (now % 1e3) * 1e6;
				if (startTime) {
					let diffSeconds = seconds - startTime[0];
					let diffNanos = nanos - startTime[0];
					if (diffNanos < 0) {
						diffSeconds = diffSeconds - 1;
						diffNanos = 1e9 + diffNanos;
					}
					return [diffSeconds, diffNanos];
				}
				return [seconds, nanos];
			}, "hrtime"),
			{
				bigint: /* @__PURE__ */ __name(function bigint() {
					return BigInt(Date.now() * 1e6);
				}, "bigint"),
			},
		);
	},
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
	"node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		WriteStream = class {
			static {
				__name(this, "WriteStream");
			}
			fd;
			columns = 80;
			rows = 24;
			isTTY = false;
			constructor(fd) {
				this.fd = fd;
			}
			clearLine(dir3, callback) {
				callback && callback();
				return false;
			}
			clearScreenDown(callback) {
				callback && callback();
				return false;
			}
			cursorTo(x, y, callback) {
				callback && typeof callback === "function" && callback();
				return false;
			}
			moveCursor(dx, dy, callback) {
				callback && callback();
				return false;
			}
			getColorDepth(env4) {
				return 1;
			}
			hasColors(count3, env4) {
				return false;
			}
			getWindowSize() {
				return [this.columns, this.rows];
			}
			write(str, encoding, cb) {
				if (str instanceof Uint8Array) {
					str = new TextDecoder().decode(str);
				}
				try {
					console.log(str);
				} catch {}
				cb && typeof cb === "function" && cb();
				return false;
			}
		};
	},
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
	"node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		ReadStream = class {
			static {
				__name(this, "ReadStream");
			}
			fd;
			isRaw = false;
			isTTY = false;
			constructor(fd) {
				this.fd = fd;
			}
			setRawMode(mode) {
				this.isRaw = mode;
				return this;
			}
		};
	},
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
	"node_modules/unenv/dist/runtime/node/tty.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_read_stream();
		init_write_stream();
	},
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
	"node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_tty();
		init_utils();
		Process = class _Process extends EventEmitter {
			static {
				__name(this, "Process");
			}
			env;
			hrtime;
			nextTick;
			constructor(impl) {
				super();
				this.env = impl.env;
				this.hrtime = impl.hrtime;
				this.nextTick = impl.nextTick;
				for (const prop of [
					...Object.getOwnPropertyNames(_Process.prototype),
					...Object.getOwnPropertyNames(EventEmitter.prototype),
				]) {
					const value = this[prop];
					if (typeof value === "function") {
						this[prop] = value.bind(this);
					}
				}
			}
			emitWarning(warning, type, code) {
				console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
			}
			emit(...args) {
				return super.emit(...args);
			}
			listeners(eventName) {
				return super.listeners(eventName);
			}
			#stdin;
			#stdout;
			#stderr;
			get stdin() {
				return (this.#stdin ??= new ReadStream(0));
			}
			get stdout() {
				return (this.#stdout ??= new WriteStream(1));
			}
			get stderr() {
				return (this.#stderr ??= new WriteStream(2));
			}
			#cwd = "/";
			chdir(cwd2) {
				this.#cwd = cwd2;
			}
			cwd() {
				return this.#cwd;
			}
			arch = "";
			platform = "";
			argv = [];
			argv0 = "";
			execArgv = [];
			execPath = "";
			title = "";
			pid = 200;
			ppid = 100;
			get version() {
				return "";
			}
			get versions() {
				return {};
			}
			get allowedNodeEnvironmentFlags() {
				return /* @__PURE__ */ new Set();
			}
			get sourceMapsEnabled() {
				return false;
			}
			get debugPort() {
				return 0;
			}
			get throwDeprecation() {
				return false;
			}
			get traceDeprecation() {
				return false;
			}
			get features() {
				return {};
			}
			get release() {
				return {};
			}
			get connected() {
				return false;
			}
			get config() {
				return {};
			}
			get moduleLoadList() {
				return [];
			}
			constrainedMemory() {
				return 0;
			}
			availableMemory() {
				return 0;
			}
			uptime() {
				return 0;
			}
			resourceUsage() {
				return {};
			}
			ref() {}
			unref() {}
			umask() {
				throw createNotImplementedError("process.umask");
			}
			getBuiltinModule() {
				return void 0;
			}
			getActiveResourcesInfo() {
				throw createNotImplementedError("process.getActiveResourcesInfo");
			}
			exit() {
				throw createNotImplementedError("process.exit");
			}
			reallyExit() {
				throw createNotImplementedError("process.reallyExit");
			}
			kill() {
				throw createNotImplementedError("process.kill");
			}
			abort() {
				throw createNotImplementedError("process.abort");
			}
			dlopen() {
				throw createNotImplementedError("process.dlopen");
			}
			setSourceMapsEnabled() {
				throw createNotImplementedError("process.setSourceMapsEnabled");
			}
			loadEnvFile() {
				throw createNotImplementedError("process.loadEnvFile");
			}
			disconnect() {
				throw createNotImplementedError("process.disconnect");
			}
			cpuUsage() {
				throw createNotImplementedError("process.cpuUsage");
			}
			setUncaughtExceptionCaptureCallback() {
				throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
			}
			hasUncaughtExceptionCaptureCallback() {
				throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
			}
			initgroups() {
				throw createNotImplementedError("process.initgroups");
			}
			openStdin() {
				throw createNotImplementedError("process.openStdin");
			}
			assert() {
				throw createNotImplementedError("process.assert");
			}
			binding() {
				throw createNotImplementedError("process.binding");
			}
			permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
			report = {
				directory: "",
				filename: "",
				signal: "SIGUSR2",
				compact: false,
				reportOnFatalError: false,
				reportOnSignal: false,
				reportOnUncaughtException: false,
				getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
				writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport"),
			};
			finalization = {
				register: /* @__PURE__ */ notImplemented("process.finalization.register"),
				unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
				registerBeforeExit: /* @__PURE__ */ notImplemented(
					"process.finalization.registerBeforeExit",
				),
			};
			memoryUsage = Object.assign(
				() => ({
					arrayBuffers: 0,
					rss: 0,
					external: 0,
					heapTotal: 0,
					heapUsed: 0,
				}),
				{ rss: /* @__PURE__ */ __name(() => 0, "rss") },
			);
			mainModule = void 0;
			domain = void 0;
			send = void 0;
			exitCode = void 0;
			channel = void 0;
			getegid = void 0;
			geteuid = void 0;
			getgid = void 0;
			getgroups = void 0;
			getuid = void 0;
			setegid = void 0;
			seteuid = void 0;
			setgid = void 0;
			setgroups = void 0;
			setuid = void 0;
			_events = void 0;
			_eventsCount = void 0;
			_exiting = void 0;
			_maxListeners = void 0;
			_debugEnd = void 0;
			_debugProcess = void 0;
			_fatalException = void 0;
			_getActiveHandles = void 0;
			_getActiveRequests = void 0;
			_kill = void 0;
			_preload_modules = void 0;
			_rawDebug = void 0;
			_startProfilerIdleNotifier = void 0;
			_stopProfilerIdleNotifier = void 0;
			_tickCallback = void 0;
			_disconnect = void 0;
			_handleQueue = void 0;
			_pendingMessage = void 0;
			_channel = void 0;
			_send = void 0;
			_linkedBinding = void 0;
		};
	},
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess,
	getBuiltinModule,
	exit,
	platform,
	nextTick,
	unenvProcess,
	abort,
	addListener,
	allowedNodeEnvironmentFlags,
	hasUncaughtExceptionCaptureCallback,
	setUncaughtExceptionCaptureCallback,
	loadEnvFile,
	sourceMapsEnabled,
	arch,
	argv,
	argv0,
	chdir,
	config,
	connected,
	constrainedMemory,
	availableMemory,
	cpuUsage,
	cwd,
	debugPort,
	dlopen,
	disconnect,
	emit,
	emitWarning,
	env,
	eventNames,
	execArgv,
	execPath,
	finalization,
	features,
	getActiveResourcesInfo,
	getMaxListeners,
	hrtime3,
	kill,
	listeners,
	listenerCount,
	memoryUsage,
	on,
	off,
	once,
	pid,
	ppid,
	prependListener,
	prependOnceListener,
	rawListeners,
	release,
	removeAllListeners,
	removeListener,
	report,
	resourceUsage,
	setMaxListeners,
	setSourceMapsEnabled,
	stderr,
	stdin,
	stdout,
	title,
	throwDeprecation,
	traceDeprecation,
	umask,
	uptime,
	version,
	versions,
	domain,
	initgroups,
	moduleLoadList,
	reallyExit,
	openStdin,
	assert2,
	binding,
	send,
	exitCode,
	channel,
	getegid,
	geteuid,
	getgid,
	getgroups,
	getuid,
	setegid,
	seteuid,
	setgid,
	setgroups,
	setuid,
	permission,
	mainModule,
	_events,
	_eventsCount,
	_exiting,
	_maxListeners,
	_debugEnd,
	_debugProcess,
	_fatalException,
	_getActiveHandles,
	_getActiveRequests,
	_kill,
	_preload_modules,
	_rawDebug,
	_startProfilerIdleNotifier,
	_stopProfilerIdleNotifier,
	_tickCallback,
	_disconnect,
	_handleQueue,
	_pendingMessage,
	_channel,
	_send,
	_linkedBinding,
	_process,
	process_default;
var init_process2 = __esm({
	"node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_hrtime();
		init_process();
		globalProcess = globalThis["process"];
		getBuiltinModule = globalProcess.getBuiltinModule;
		({ exit, platform, nextTick } = getBuiltinModule("node:process"));
		unenvProcess = new Process({
			env: globalProcess.env,
			hrtime,
			nextTick,
		});
		({
			abort,
			addListener,
			allowedNodeEnvironmentFlags,
			hasUncaughtExceptionCaptureCallback,
			setUncaughtExceptionCaptureCallback,
			loadEnvFile,
			sourceMapsEnabled,
			arch,
			argv,
			argv0,
			chdir,
			config,
			connected,
			constrainedMemory,
			availableMemory,
			cpuUsage,
			cwd,
			debugPort,
			dlopen,
			disconnect,
			emit,
			emitWarning,
			env,
			eventNames,
			execArgv,
			execPath,
			finalization,
			features,
			getActiveResourcesInfo,
			getMaxListeners,
			hrtime: hrtime3,
			kill,
			listeners,
			listenerCount,
			memoryUsage,
			on,
			off,
			once,
			pid,
			ppid,
			prependListener,
			prependOnceListener,
			rawListeners,
			release,
			removeAllListeners,
			removeListener,
			report,
			resourceUsage,
			setMaxListeners,
			setSourceMapsEnabled,
			stderr,
			stdin,
			stdout,
			title,
			throwDeprecation,
			traceDeprecation,
			umask,
			uptime,
			version,
			versions,
			domain,
			initgroups,
			moduleLoadList,
			reallyExit,
			openStdin,
			assert: assert2,
			binding,
			send,
			exitCode,
			channel,
			getegid,
			geteuid,
			getgid,
			getgroups,
			getuid,
			setegid,
			seteuid,
			setgid,
			setgroups,
			setuid,
			permission,
			mainModule,
			_events,
			_eventsCount,
			_exiting,
			_maxListeners,
			_debugEnd,
			_debugProcess,
			_fatalException,
			_getActiveHandles,
			_getActiveRequests,
			_kill,
			_preload_modules,
			_rawDebug,
			_startProfilerIdleNotifier,
			_stopProfilerIdleNotifier,
			_tickCallback,
			_disconnect,
			_handleQueue,
			_pendingMessage,
			_channel,
			_send,
			_linkedBinding,
		} = unenvProcess);
		_process = {
			abort,
			addListener,
			allowedNodeEnvironmentFlags,
			hasUncaughtExceptionCaptureCallback,
			setUncaughtExceptionCaptureCallback,
			loadEnvFile,
			sourceMapsEnabled,
			arch,
			argv,
			argv0,
			chdir,
			config,
			connected,
			constrainedMemory,
			availableMemory,
			cpuUsage,
			cwd,
			debugPort,
			dlopen,
			disconnect,
			emit,
			emitWarning,
			env,
			eventNames,
			execArgv,
			execPath,
			exit,
			finalization,
			features,
			getBuiltinModule,
			getActiveResourcesInfo,
			getMaxListeners,
			hrtime: hrtime3,
			kill,
			listeners,
			listenerCount,
			memoryUsage,
			nextTick,
			on,
			off,
			once,
			pid,
			platform,
			ppid,
			prependListener,
			prependOnceListener,
			rawListeners,
			release,
			removeAllListeners,
			removeListener,
			report,
			resourceUsage,
			setMaxListeners,
			setSourceMapsEnabled,
			stderr,
			stdin,
			stdout,
			title,
			throwDeprecation,
			traceDeprecation,
			umask,
			uptime,
			version,
			versions,
			// @ts-expect-error old API
			domain,
			initgroups,
			moduleLoadList,
			reallyExit,
			openStdin,
			assert: assert2,
			binding,
			send,
			exitCode,
			channel,
			getegid,
			geteuid,
			getgid,
			getgroups,
			getuid,
			setegid,
			seteuid,
			setgid,
			setgroups,
			setuid,
			permission,
			mainModule,
			_events,
			_eventsCount,
			_exiting,
			_maxListeners,
			_debugEnd,
			_debugProcess,
			_fatalException,
			_getActiveHandles,
			_getActiveRequests,
			_kill,
			_preload_modules,
			_rawDebug,
			_startProfilerIdleNotifier,
			_stopProfilerIdleNotifier,
			_tickCallback,
			_disconnect,
			_handleQueue,
			_pendingMessage,
			_channel,
			_send,
			_linkedBinding,
		};
		process_default = _process;
	},
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
	"node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
		init_process2();
		globalThis.process = process_default;
	},
});

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase,
	raw,
	escapeRe,
	stringBufferToString,
	escapeToBuffer,
	resolveCallbackSync,
	resolveCallback;
var init_html = __esm({
	"node_modules/hono/dist/utils/html.js"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		HtmlEscapedCallbackPhase = {
			Stringify: 1,
			BeforeStream: 2,
			Stream: 3,
		};
		raw = /* @__PURE__ */ __name((value, callbacks) => {
			const escapedString = new String(value);
			escapedString.isEscaped = true;
			escapedString.callbacks = callbacks;
			return escapedString;
		}, "raw");
		escapeRe = /[&<>'"]/;
		stringBufferToString = /* @__PURE__ */ __name(async (buffer, callbacks) => {
			let str = "";
			callbacks ||= [];
			const resolvedBuffer = await Promise.all(buffer);
			for (let i = resolvedBuffer.length - 1; ; i--) {
				str += resolvedBuffer[i];
				i--;
				if (i < 0) {
					break;
				}
				let r = resolvedBuffer[i];
				if (typeof r === "object") {
					callbacks.push(...(r.callbacks || []));
				}
				const isEscaped = r.isEscaped;
				r = await (typeof r === "object" ? r.toString() : r);
				if (typeof r === "object") {
					callbacks.push(...(r.callbacks || []));
				}
				if (r.isEscaped ?? isEscaped) {
					str += r;
				} else {
					const buf = [str];
					escapeToBuffer(r, buf);
					str = buf[0];
				}
			}
			return raw(str, callbacks);
		}, "stringBufferToString");
		escapeToBuffer = /* @__PURE__ */ __name((str, buffer) => {
			const match = str.search(escapeRe);
			if (match === -1) {
				buffer[0] += str;
				return;
			}
			let escape2;
			let index2;
			let lastIndex = 0;
			for (index2 = match; index2 < str.length; index2++) {
				switch (str.charCodeAt(index2)) {
					case 34:
						escape2 = "&quot;";
						break;
					case 39:
						escape2 = "&#39;";
						break;
					case 38:
						escape2 = "&amp;";
						break;
					case 60:
						escape2 = "&lt;";
						break;
					case 62:
						escape2 = "&gt;";
						break;
					default:
						continue;
				}
				buffer[0] += str.substring(lastIndex, index2) + escape2;
				lastIndex = index2 + 1;
			}
			buffer[0] += str.substring(lastIndex, index2);
		}, "escapeToBuffer");
		resolveCallbackSync = /* @__PURE__ */ __name((str) => {
			const callbacks = str.callbacks;
			if (!callbacks?.length) {
				return str;
			}
			const buffer = [str];
			const context2 = {};
			callbacks.forEach((c) =>
				c({ phase: HtmlEscapedCallbackPhase.Stringify, buffer, context: context2 }),
			);
			return buffer[0];
		}, "resolveCallbackSync");
		resolveCallback = /* @__PURE__ */ __name(
			async (str, phase, preserveCallbacks, context2, buffer) => {
				if (typeof str === "object" && !(str instanceof String)) {
					if (!(str instanceof Promise)) {
						str = str.toString();
					}
					if (str instanceof Promise) {
						str = await str;
					}
				}
				const callbacks = str.callbacks;
				if (!callbacks?.length) {
					return Promise.resolve(str);
				}
				if (buffer) {
					buffer[0] += str;
				} else {
					buffer = [str];
				}
				const resStr = Promise.all(
					callbacks.map((c) => c({ phase, buffer, context: context2 })),
				).then((res) =>
					Promise.all(
						res
							.filter(Boolean)
							.map((str2) => resolveCallback(str2, phase, false, context2, buffer)),
					).then(() => buffer[0]),
				);
				if (preserveCallbacks) {
					return raw(await resStr, callbacks);
				} else {
					return resStr;
				}
			},
			"resolveCallback",
		);
	},
});

// node_modules/hono/dist/helper/html/index.js
var html;
var init_html2 = __esm({
	"node_modules/hono/dist/helper/html/index.js"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_html();
		html = /* @__PURE__ */ __name((strings, ...values) => {
			const buffer = [""];
			for (let i = 0, len = strings.length - 1; i < len; i++) {
				buffer[0] += strings[i];
				const children = Array.isArray(values[i]) ? values[i].flat(Number.POSITIVE_INFINITY) : [values[i]];
				for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
					const child = children[i2];
					if (typeof child === "string") {
						escapeToBuffer(child, buffer);
					} else if (typeof child === "number") {
						buffer[0] += child;
					} else if (typeof child === "boolean" || child === null || child === void 0) {
						continue;
					} else if (typeof child === "object" && child.isEscaped) {
						if (child.callbacks) {
							buffer.unshift("", child);
						} else {
							const tmp = child.toString();
							if (tmp instanceof Promise) {
								buffer.unshift("", tmp);
							} else {
								buffer[0] += tmp;
							}
						}
					} else if (child instanceof Promise) {
						buffer.unshift("", child);
					} else {
						escapeToBuffer(child.toString(), buffer);
					}
				}
			}
			buffer[0] += strings.at(-1);
			return buffer.length === 1
				? "callbacks" in buffer
					? raw(resolveCallbackSync(raw(buffer[0], buffer.callbacks)))
					: raw(buffer[0])
				: stringBufferToString(buffer, buffer.callbacks);
		}, "html");
	},
});

// src/web/routes.ts
var AppRoutes;
var init_routes = __esm({
	"src/web/routes.ts"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		AppRoutes = {
			ALL: "*",
			ROOT: "/",
			AUTHORIZE: "/authorize",
			AUTH_CONFIRM: "/auth/confirm",
			AUTH_CALLBACK: "/auth/callback",
			LOGIN: "/login",
			LOGOUT: "/logout",
			SSE: "/sse",
		};
	},
});

// node_modules/@supabase/node-fetch/browser.js
var browser_exports = {};
__export(browser_exports, {
	Headers: () => Headers2,
	Request: () => Request2,
	Response: () => Response2,
	default: () => browser_default,
	fetch: () => fetch2,
});
var getGlobal, globalObject, fetch2, browser_default, Headers2, Request2, Response2;
var init_browser = __esm({
	"node_modules/@supabase/node-fetch/browser.js"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		getGlobal = /* @__PURE__ */ __name(() => {
			if (typeof self !== "undefined") {
				return self;
			}
			if (typeof window !== "undefined") {
				return window;
			}
			if (typeof global !== "undefined") {
				return global;
			}
			throw new Error("unable to locate global object");
		}, "getGlobal");
		globalObject = getGlobal();
		fetch2 = globalObject.fetch;
		browser_default = globalObject.fetch.bind(globalObject);
		Headers2 = globalObject.Headers;
		Request2 = globalObject.Request;
		Response2 = globalObject.Response;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js
var require_PostgrestError = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		var PostgrestError2 = class extends Error {
			static {
				__name(this, "PostgrestError");
			}
			constructor(context2) {
				super(context2.message);
				this.name = "PostgrestError";
				this.details = context2.details;
				this.hint = context2.hint;
				this.code = context2.code;
			}
		};
		exports.default = PostgrestError2;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js
var require_PostgrestBuilder = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __importDefault =
			(exports && exports.__importDefault) ||
			((mod) => mod && mod.__esModule ? mod : { default: mod });
		Object.defineProperty(exports, "__esModule", { value: true });
		var node_fetch_1 = __importDefault((init_browser(), __toCommonJS(browser_exports)));
		var PostgrestError_1 = __importDefault(require_PostgrestError());
		var PostgrestBuilder2 = class {
			static {
				__name(this, "PostgrestBuilder");
			}
			constructor(builder) {
				this.shouldThrowOnError = false;
				this.method = builder.method;
				this.url = builder.url;
				this.headers = builder.headers;
				this.schema = builder.schema;
				this.body = builder.body;
				this.shouldThrowOnError = builder.shouldThrowOnError;
				this.signal = builder.signal;
				this.isMaybeSingle = builder.isMaybeSingle;
				if (builder.fetch) {
					this.fetch = builder.fetch;
				} else if (typeof fetch === "undefined") {
					this.fetch = node_fetch_1.default;
				} else {
					this.fetch = fetch;
				}
			}
			/**
			 * If there's an error with the query, throwOnError will reject the promise by
			 * throwing the error instead of returning it as part of a successful response.
			 *
			 * {@link https://github.com/supabase/supabase-js/issues/92}
			 */
			throwOnError() {
				this.shouldThrowOnError = true;
				return this;
			}
			/**
			 * Set an HTTP header for the request.
			 */
			setHeader(name, value) {
				this.headers = Object.assign({}, this.headers);
				this.headers[name] = value;
				return this;
			}
			then(onfulfilled, onrejected) {
				if (this.schema === void 0) {
				} else if (["GET", "HEAD"].includes(this.method)) {
					this.headers["Accept-Profile"] = this.schema;
				} else {
					this.headers["Content-Profile"] = this.schema;
				}
				if (this.method !== "GET" && this.method !== "HEAD") {
					this.headers["Content-Type"] = "application/json";
				}
				const _fetch = this.fetch;
				let res = _fetch(this.url.toString(), {
					method: this.method,
					headers: this.headers,
					body: JSON.stringify(this.body),
					signal: this.signal,
				}).then(async (res2) => {
					var _a2, _b, _c;
					let error3 = null;
					let data = null;
					let count3 = null;
					let status = res2.status;
					let statusText = res2.statusText;
					if (res2.ok) {
						if (this.method !== "HEAD") {
							const body = await res2.text();
							if (body === "") {
							} else if (this.headers["Accept"] === "text/csv") {
								data = body;
							} else if (
								this.headers["Accept"] &&
								this.headers["Accept"].includes("application/vnd.pgrst.plan+text")
							) {
								data = body;
							} else {
								data = JSON.parse(body);
							}
						}
						const countHeader =
							(_a2 = this.headers["Prefer"]) === null || _a2 === void 0
								? void 0
								: _a2.match(/count=(exact|planned|estimated)/);
						const contentRange =
							(_b = res2.headers.get("content-range")) === null || _b === void 0
								? void 0
								: _b.split("/");
						if (countHeader && contentRange && contentRange.length > 1) {
							count3 = Number.parseInt(contentRange[1]);
						}
						if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
							if (data.length > 1) {
								error3 = {
									// https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
									code: "PGRST116",
									details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
									hint: null,
									message:
										"JSON object requested, multiple (or no) rows returned",
								};
								data = null;
								count3 = null;
								status = 406;
								statusText = "Not Acceptable";
							} else if (data.length === 1) {
								data = data[0];
							} else {
								data = null;
							}
						}
					} else {
						const body = await res2.text();
						try {
							error3 = JSON.parse(body);
							if (Array.isArray(error3) && res2.status === 404) {
								data = [];
								error3 = null;
								status = 200;
								statusText = "OK";
							}
						} catch (_d) {
							if (res2.status === 404 && body === "") {
								status = 204;
								statusText = "No Content";
							} else {
								error3 = {
									message: body,
								};
							}
						}
						if (
							error3 &&
							this.isMaybeSingle &&
							((_c =
								error3 === null || error3 === void 0 ? void 0 : error3.details) ===
								null || _c === void 0
								? void 0
								: _c.includes("0 rows"))
						) {
							error3 = null;
							status = 200;
							statusText = "OK";
						}
						if (error3 && this.shouldThrowOnError) {
							throw new PostgrestError_1.default(error3);
						}
					}
					const postgrestResponse = {
						error: error3,
						data,
						count: count3,
						status,
						statusText,
					};
					return postgrestResponse;
				});
				if (!this.shouldThrowOnError) {
					res = res.catch((fetchError) => {
						var _a2, _b, _c;
						return {
							error: {
								message: `${(_a2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a2 !== void 0 ? _a2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
								details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
								hint: "",
								code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`,
							},
							data: null,
							count: null,
							status: 0,
							statusText: "",
						};
					});
				}
				return res.then(onfulfilled, onrejected);
			}
			/**
			 * Override the type of the returned `data`.
			 *
			 * @typeParam NewResult - The new result type to override with
			 * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
			 */
			returns() {
				return this;
			}
			/**
			 * Override the type of the returned `data` field in the response.
			 *
			 * @typeParam NewResult - The new type to cast the response data to
			 * @typeParam Options - Optional type configuration (defaults to { merge: true })
			 * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
			 * @example
			 * ```typescript
			 * // Merge with existing types (default behavior)
			 * const query = supabase
			 *   .from('users')
			 *   .select()
			 *   .overrideTypes<{ custom_field: string }>()
			 *
			 * // Replace existing types completely
			 * const replaceQuery = supabase
			 *   .from('users')
			 *   .select()
			 *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
			 * ```
			 * @returns A PostgrestBuilder instance with the new type
			 */
			overrideTypes() {
				return this;
			}
		};
		exports.default = PostgrestBuilder2;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js
var require_PostgrestTransformBuilder = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __importDefault =
			(exports && exports.__importDefault) ||
			((mod) => mod && mod.__esModule ? mod : { default: mod });
		Object.defineProperty(exports, "__esModule", { value: true });
		var PostgrestBuilder_1 = __importDefault(require_PostgrestBuilder());
		var PostgrestTransformBuilder2 = class extends PostgrestBuilder_1.default {
			static {
				__name(this, "PostgrestTransformBuilder");
			}
			/**
			 * Perform a SELECT on the query result.
			 *
			 * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
			 * return modified rows. By calling this method, modified rows are returned in
			 * `data`.
			 *
			 * @param columns - The columns to retrieve, separated by commas
			 */
			select(columns) {
				let quoted = false;
				const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*")
					.split("")
					.map((c) => {
						if (/\s/.test(c) && !quoted) {
							return "";
						}
						if (c === '"') {
							quoted = !quoted;
						}
						return c;
					})
					.join("");
				this.url.searchParams.set("select", cleanedColumns);
				if (this.headers["Prefer"]) {
					this.headers["Prefer"] += ",";
				}
				this.headers["Prefer"] += "return=representation";
				return this;
			}
			/**
			 * Order the query result by `column`.
			 *
			 * You can call this method multiple times to order by multiple columns.
			 *
			 * You can order referenced tables, but it only affects the ordering of the
			 * parent table if you use `!inner` in the query.
			 *
			 * @param column - The column to order by
			 * @param options - Named parameters
			 * @param options.ascending - If `true`, the result will be in ascending order
			 * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
			 * `null`s appear last.
			 * @param options.referencedTable - Set this to order a referenced table by
			 * its columns
			 * @param options.foreignTable - Deprecated, use `options.referencedTable`
			 * instead
			 */
			order(
				column,
				{ ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {},
			) {
				const key = referencedTable ? `${referencedTable}.order` : "order";
				const existingOrder = this.url.searchParams.get(key);
				this.url.searchParams.set(
					key,
					`${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`,
				);
				return this;
			}
			/**
			 * Limit the query result by `count`.
			 *
			 * @param count - The maximum number of rows to return
			 * @param options - Named parameters
			 * @param options.referencedTable - Set this to limit rows of referenced
			 * tables instead of the parent table
			 * @param options.foreignTable - Deprecated, use `options.referencedTable`
			 * instead
			 */
			limit(count3, { foreignTable, referencedTable = foreignTable } = {}) {
				const key =
					typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
				this.url.searchParams.set(key, `${count3}`);
				return this;
			}
			/**
			 * Limit the query result by starting at an offset `from` and ending at the offset `to`.
			 * Only records within this range are returned.
			 * This respects the query order and if there is no order clause the range could behave unexpectedly.
			 * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
			 * and fourth rows of the query.
			 *
			 * @param from - The starting index from which to limit the result
			 * @param to - The last index to which to limit the result
			 * @param options - Named parameters
			 * @param options.referencedTable - Set this to limit rows of referenced
			 * tables instead of the parent table
			 * @param options.foreignTable - Deprecated, use `options.referencedTable`
			 * instead
			 */
			range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
				const keyOffset =
					typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
				const keyLimit =
					typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
				this.url.searchParams.set(keyOffset, `${from}`);
				this.url.searchParams.set(keyLimit, `${to - from + 1}`);
				return this;
			}
			/**
			 * Set the AbortSignal for the fetch request.
			 *
			 * @param signal - The AbortSignal to use for the fetch request
			 */
			abortSignal(signal) {
				this.signal = signal;
				return this;
			}
			/**
			 * Return `data` as a single object instead of an array of objects.
			 *
			 * Query result must be one row (e.g. using `.limit(1)`), otherwise this
			 * returns an error.
			 */
			single() {
				this.headers["Accept"] = "application/vnd.pgrst.object+json";
				return this;
			}
			/**
			 * Return `data` as a single object instead of an array of objects.
			 *
			 * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
			 * this returns an error.
			 */
			maybeSingle() {
				if (this.method === "GET") {
					this.headers["Accept"] = "application/json";
				} else {
					this.headers["Accept"] = "application/vnd.pgrst.object+json";
				}
				this.isMaybeSingle = true;
				return this;
			}
			/**
			 * Return `data` as a string in CSV format.
			 */
			csv() {
				this.headers["Accept"] = "text/csv";
				return this;
			}
			/**
			 * Return `data` as an object in [GeoJSON](https://geojson.org) format.
			 */
			geojson() {
				this.headers["Accept"] = "application/geo+json";
				return this;
			}
			/**
			 * Return `data` as the EXPLAIN plan for the query.
			 *
			 * You need to enable the
			 * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
			 * setting before using this method.
			 *
			 * @param options - Named parameters
			 *
			 * @param options.analyze - If `true`, the query will be executed and the
			 * actual run time will be returned
			 *
			 * @param options.verbose - If `true`, the query identifier will be returned
			 * and `data` will include the output columns of the query
			 *
			 * @param options.settings - If `true`, include information on configuration
			 * parameters that affect query planning
			 *
			 * @param options.buffers - If `true`, include information on buffer usage
			 *
			 * @param options.wal - If `true`, include information on WAL record generation
			 *
			 * @param options.format - The format of the output, can be `"text"` (default)
			 * or `"json"`
			 */
			explain({
				analyze = false,
				verbose = false,
				settings = false,
				buffers = false,
				wal = false,
				format = "text",
			} = {}) {
				var _a2;
				const options2 = [
					analyze ? "analyze" : null,
					verbose ? "verbose" : null,
					settings ? "settings" : null,
					buffers ? "buffers" : null,
					wal ? "wal" : null,
				]
					.filter(Boolean)
					.join("|");
				const forMediatype =
					(_a2 = this.headers["Accept"]) !== null && _a2 !== void 0
						? _a2
						: "application/json";
				this.headers["Accept"] =
					`application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options2};`;
				if (format === "json") return this;
				else return this;
			}
			/**
			 * Rollback the query.
			 *
			 * `data` will still be returned, but the query is not committed.
			 */
			rollback() {
				var _a2;
				if (
					((_a2 = this.headers["Prefer"]) !== null && _a2 !== void 0 ? _a2 : "").trim()
						.length > 0
				) {
					this.headers["Prefer"] += ",tx=rollback";
				} else {
					this.headers["Prefer"] = "tx=rollback";
				}
				return this;
			}
			/**
			 * Override the type of the returned `data`.
			 *
			 * @typeParam NewResult - The new result type to override with
			 * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
			 */
			returns() {
				return this;
			}
		};
		exports.default = PostgrestTransformBuilder2;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js
var require_PostgrestFilterBuilder = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __importDefault =
			(exports && exports.__importDefault) ||
			((mod) => mod && mod.__esModule ? mod : { default: mod });
		Object.defineProperty(exports, "__esModule", { value: true });
		var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
		var PostgrestFilterBuilder2 = class extends PostgrestTransformBuilder_1.default {
			static {
				__name(this, "PostgrestFilterBuilder");
			}
			/**
			 * Match only rows where `column` is equal to `value`.
			 *
			 * To check if the value of `column` is NULL, you should use `.is()` instead.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			eq(column, value) {
				this.url.searchParams.append(column, `eq.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` is not equal to `value`.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			neq(column, value) {
				this.url.searchParams.append(column, `neq.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` is greater than `value`.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			gt(column, value) {
				this.url.searchParams.append(column, `gt.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` is greater than or equal to `value`.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			gte(column, value) {
				this.url.searchParams.append(column, `gte.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` is less than `value`.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			lt(column, value) {
				this.url.searchParams.append(column, `lt.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` is less than or equal to `value`.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			lte(column, value) {
				this.url.searchParams.append(column, `lte.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` matches `pattern` case-sensitively.
			 *
			 * @param column - The column to filter on
			 * @param pattern - The pattern to match with
			 */
			like(column, pattern) {
				this.url.searchParams.append(column, `like.${pattern}`);
				return this;
			}
			/**
			 * Match only rows where `column` matches all of `patterns` case-sensitively.
			 *
			 * @param column - The column to filter on
			 * @param patterns - The patterns to match with
			 */
			likeAllOf(column, patterns) {
				this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
				return this;
			}
			/**
			 * Match only rows where `column` matches any of `patterns` case-sensitively.
			 *
			 * @param column - The column to filter on
			 * @param patterns - The patterns to match with
			 */
			likeAnyOf(column, patterns) {
				this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
				return this;
			}
			/**
			 * Match only rows where `column` matches `pattern` case-insensitively.
			 *
			 * @param column - The column to filter on
			 * @param pattern - The pattern to match with
			 */
			ilike(column, pattern) {
				this.url.searchParams.append(column, `ilike.${pattern}`);
				return this;
			}
			/**
			 * Match only rows where `column` matches all of `patterns` case-insensitively.
			 *
			 * @param column - The column to filter on
			 * @param patterns - The patterns to match with
			 */
			ilikeAllOf(column, patterns) {
				this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
				return this;
			}
			/**
			 * Match only rows where `column` matches any of `patterns` case-insensitively.
			 *
			 * @param column - The column to filter on
			 * @param patterns - The patterns to match with
			 */
			ilikeAnyOf(column, patterns) {
				this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
				return this;
			}
			/**
			 * Match only rows where `column` IS `value`.
			 *
			 * For non-boolean columns, this is only relevant for checking if the value of
			 * `column` is NULL by setting `value` to `null`.
			 *
			 * For boolean columns, you can also set `value` to `true` or `false` and it
			 * will behave the same way as `.eq()`.
			 *
			 * @param column - The column to filter on
			 * @param value - The value to filter with
			 */
			is(column, value) {
				this.url.searchParams.append(column, `is.${value}`);
				return this;
			}
			/**
			 * Match only rows where `column` is included in the `values` array.
			 *
			 * @param column - The column to filter on
			 * @param values - The values array to filter with
			 */
			in(column, values) {
				const cleanedValues = Array.from(new Set(values))
					.map((s) => {
						if (typeof s === "string" && /[,()]/.test(s)) return `"${s}"`;
						else return `${s}`;
					})
					.join(",");
				this.url.searchParams.append(column, `in.(${cleanedValues})`);
				return this;
			}
			/**
			 * Only relevant for jsonb, array, and range columns. Match only rows where
			 * `column` contains every element appearing in `value`.
			 *
			 * @param column - The jsonb, array, or range column to filter on
			 * @param value - The jsonb, array, or range value to filter with
			 */
			contains(column, value) {
				if (typeof value === "string") {
					this.url.searchParams.append(column, `cs.${value}`);
				} else if (Array.isArray(value)) {
					this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
				} else {
					this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
				}
				return this;
			}
			/**
			 * Only relevant for jsonb, array, and range columns. Match only rows where
			 * every element appearing in `column` is contained by `value`.
			 *
			 * @param column - The jsonb, array, or range column to filter on
			 * @param value - The jsonb, array, or range value to filter with
			 */
			containedBy(column, value) {
				if (typeof value === "string") {
					this.url.searchParams.append(column, `cd.${value}`);
				} else if (Array.isArray(value)) {
					this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
				} else {
					this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
				}
				return this;
			}
			/**
			 * Only relevant for range columns. Match only rows where every element in
			 * `column` is greater than any element in `range`.
			 *
			 * @param column - The range column to filter on
			 * @param range - The range to filter with
			 */
			rangeGt(column, range) {
				this.url.searchParams.append(column, `sr.${range}`);
				return this;
			}
			/**
			 * Only relevant for range columns. Match only rows where every element in
			 * `column` is either contained in `range` or greater than any element in
			 * `range`.
			 *
			 * @param column - The range column to filter on
			 * @param range - The range to filter with
			 */
			rangeGte(column, range) {
				this.url.searchParams.append(column, `nxl.${range}`);
				return this;
			}
			/**
			 * Only relevant for range columns. Match only rows where every element in
			 * `column` is less than any element in `range`.
			 *
			 * @param column - The range column to filter on
			 * @param range - The range to filter with
			 */
			rangeLt(column, range) {
				this.url.searchParams.append(column, `sl.${range}`);
				return this;
			}
			/**
			 * Only relevant for range columns. Match only rows where every element in
			 * `column` is either contained in `range` or less than any element in
			 * `range`.
			 *
			 * @param column - The range column to filter on
			 * @param range - The range to filter with
			 */
			rangeLte(column, range) {
				this.url.searchParams.append(column, `nxr.${range}`);
				return this;
			}
			/**
			 * Only relevant for range columns. Match only rows where `column` is
			 * mutually exclusive to `range` and there can be no element between the two
			 * ranges.
			 *
			 * @param column - The range column to filter on
			 * @param range - The range to filter with
			 */
			rangeAdjacent(column, range) {
				this.url.searchParams.append(column, `adj.${range}`);
				return this;
			}
			/**
			 * Only relevant for array and range columns. Match only rows where
			 * `column` and `value` have an element in common.
			 *
			 * @param column - The array or range column to filter on
			 * @param value - The array or range value to filter with
			 */
			overlaps(column, value) {
				if (typeof value === "string") {
					this.url.searchParams.append(column, `ov.${value}`);
				} else {
					this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
				}
				return this;
			}
			/**
			 * Only relevant for text and tsvector columns. Match only rows where
			 * `column` matches the query string in `query`.
			 *
			 * @param column - The text or tsvector column to filter on
			 * @param query - The query text to match with
			 * @param options - Named parameters
			 * @param options.config - The text search configuration to use
			 * @param options.type - Change how the `query` text is interpreted
			 */
			textSearch(column, query, { config: config2, type } = {}) {
				let typePart = "";
				if (type === "plain") {
					typePart = "pl";
				} else if (type === "phrase") {
					typePart = "ph";
				} else if (type === "websearch") {
					typePart = "w";
				}
				const configPart = config2 === void 0 ? "" : `(${config2})`;
				this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
				return this;
			}
			/**
			 * Match only rows where each column in `query` keys is equal to its
			 * associated value. Shorthand for multiple `.eq()`s.
			 *
			 * @param query - The object to filter with, with column names as keys mapped
			 * to their filter values
			 */
			match(query) {
				Object.entries(query).forEach(([column, value]) => {
					this.url.searchParams.append(column, `eq.${value}`);
				});
				return this;
			}
			/**
			 * Match only rows which doesn't satisfy the filter.
			 *
			 * Unlike most filters, `opearator` and `value` are used as-is and need to
			 * follow [PostgREST
			 * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
			 * to make sure they are properly sanitized.
			 *
			 * @param column - The column to filter on
			 * @param operator - The operator to be negated to filter with, following
			 * PostgREST syntax
			 * @param value - The value to filter with, following PostgREST syntax
			 */
			not(column, operator, value) {
				this.url.searchParams.append(column, `not.${operator}.${value}`);
				return this;
			}
			/**
			 * Match only rows which satisfy at least one of the filters.
			 *
			 * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
			 * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
			 * to make sure it's properly sanitized.
			 *
			 * It's currently not possible to do an `.or()` filter across multiple tables.
			 *
			 * @param filters - The filters to use, following PostgREST syntax
			 * @param options - Named parameters
			 * @param options.referencedTable - Set this to filter on referenced tables
			 * instead of the parent table
			 * @param options.foreignTable - Deprecated, use `referencedTable` instead
			 */
			or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
				const key = referencedTable ? `${referencedTable}.or` : "or";
				this.url.searchParams.append(key, `(${filters})`);
				return this;
			}
			/**
			 * Match only rows which satisfy the filter. This is an escape hatch - you
			 * should use the specific filter methods wherever possible.
			 *
			 * Unlike most filters, `opearator` and `value` are used as-is and need to
			 * follow [PostgREST
			 * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
			 * to make sure they are properly sanitized.
			 *
			 * @param column - The column to filter on
			 * @param operator - The operator to filter with, following PostgREST syntax
			 * @param value - The value to filter with, following PostgREST syntax
			 */
			filter(column, operator, value) {
				this.url.searchParams.append(column, `${operator}.${value}`);
				return this;
			}
		};
		exports.default = PostgrestFilterBuilder2;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js
var require_PostgrestQueryBuilder = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __importDefault =
			(exports && exports.__importDefault) ||
			((mod) => mod && mod.__esModule ? mod : { default: mod });
		Object.defineProperty(exports, "__esModule", { value: true });
		var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
		var PostgrestQueryBuilder2 = class {
			static {
				__name(this, "PostgrestQueryBuilder");
			}
			constructor(url, { headers = {}, schema, fetch: fetch3 }) {
				this.url = url;
				this.headers = headers;
				this.schema = schema;
				this.fetch = fetch3;
			}
			/**
			 * Perform a SELECT query on the table or view.
			 *
			 * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
			 *
			 * @param options - Named parameters
			 *
			 * @param options.head - When set to `true`, `data` will not be returned.
			 * Useful if you only need the count.
			 *
			 * @param options.count - Count algorithm to use to count rows in the table or view.
			 *
			 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
			 * hood.
			 *
			 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
			 * statistics under the hood.
			 *
			 * `"estimated"`: Uses exact count for low numbers and planned count for high
			 * numbers.
			 */
			select(columns, { head: head2 = false, count: count3 } = {}) {
				const method = head2 ? "HEAD" : "GET";
				let quoted = false;
				const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*")
					.split("")
					.map((c) => {
						if (/\s/.test(c) && !quoted) {
							return "";
						}
						if (c === '"') {
							quoted = !quoted;
						}
						return c;
					})
					.join("");
				this.url.searchParams.set("select", cleanedColumns);
				if (count3) {
					this.headers["Prefer"] = `count=${count3}`;
				}
				return new PostgrestFilterBuilder_1.default({
					method,
					url: this.url,
					headers: this.headers,
					schema: this.schema,
					fetch: this.fetch,
					allowEmpty: false,
				});
			}
			/**
			 * Perform an INSERT into the table or view.
			 *
			 * By default, inserted rows are not returned. To return it, chain the call
			 * with `.select()`.
			 *
			 * @param values - The values to insert. Pass an object to insert a single row
			 * or an array to insert multiple rows.
			 *
			 * @param options - Named parameters
			 *
			 * @param options.count - Count algorithm to use to count inserted rows.
			 *
			 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
			 * hood.
			 *
			 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
			 * statistics under the hood.
			 *
			 * `"estimated"`: Uses exact count for low numbers and planned count for high
			 * numbers.
			 *
			 * @param options.defaultToNull - Make missing fields default to `null`.
			 * Otherwise, use the default value for the column. Only applies for bulk
			 * inserts.
			 */
			insert(values, { count: count3, defaultToNull = true } = {}) {
				const method = "POST";
				const prefersHeaders = [];
				if (this.headers["Prefer"]) {
					prefersHeaders.push(this.headers["Prefer"]);
				}
				if (count3) {
					prefersHeaders.push(`count=${count3}`);
				}
				if (!defaultToNull) {
					prefersHeaders.push("missing=default");
				}
				this.headers["Prefer"] = prefersHeaders.join(",");
				if (Array.isArray(values)) {
					const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
					if (columns.length > 0) {
						const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
						this.url.searchParams.set("columns", uniqueColumns.join(","));
					}
				}
				return new PostgrestFilterBuilder_1.default({
					method,
					url: this.url,
					headers: this.headers,
					schema: this.schema,
					body: values,
					fetch: this.fetch,
					allowEmpty: false,
				});
			}
			/**
			 * Perform an UPSERT on the table or view. Depending on the column(s) passed
			 * to `onConflict`, `.upsert()` allows you to perform the equivalent of
			 * `.insert()` if a row with the corresponding `onConflict` columns doesn't
			 * exist, or if it does exist, perform an alternative action depending on
			 * `ignoreDuplicates`.
			 *
			 * By default, upserted rows are not returned. To return it, chain the call
			 * with `.select()`.
			 *
			 * @param values - The values to upsert with. Pass an object to upsert a
			 * single row or an array to upsert multiple rows.
			 *
			 * @param options - Named parameters
			 *
			 * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
			 * duplicate rows are determined. Two rows are duplicates if all the
			 * `onConflict` columns are equal.
			 *
			 * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
			 * `false`, duplicate rows are merged with existing rows.
			 *
			 * @param options.count - Count algorithm to use to count upserted rows.
			 *
			 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
			 * hood.
			 *
			 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
			 * statistics under the hood.
			 *
			 * `"estimated"`: Uses exact count for low numbers and planned count for high
			 * numbers.
			 *
			 * @param options.defaultToNull - Make missing fields default to `null`.
			 * Otherwise, use the default value for the column. This only applies when
			 * inserting new rows, not when merging with existing rows under
			 * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
			 */
			upsert(
				values,
				{ onConflict, ignoreDuplicates = false, count: count3, defaultToNull = true } = {},
			) {
				const method = "POST";
				const prefersHeaders = [
					`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`,
				];
				if (onConflict !== void 0) this.url.searchParams.set("on_conflict", onConflict);
				if (this.headers["Prefer"]) {
					prefersHeaders.push(this.headers["Prefer"]);
				}
				if (count3) {
					prefersHeaders.push(`count=${count3}`);
				}
				if (!defaultToNull) {
					prefersHeaders.push("missing=default");
				}
				this.headers["Prefer"] = prefersHeaders.join(",");
				if (Array.isArray(values)) {
					const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
					if (columns.length > 0) {
						const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
						this.url.searchParams.set("columns", uniqueColumns.join(","));
					}
				}
				return new PostgrestFilterBuilder_1.default({
					method,
					url: this.url,
					headers: this.headers,
					schema: this.schema,
					body: values,
					fetch: this.fetch,
					allowEmpty: false,
				});
			}
			/**
			 * Perform an UPDATE on the table or view.
			 *
			 * By default, updated rows are not returned. To return it, chain the call
			 * with `.select()` after filters.
			 *
			 * @param values - The values to update with
			 *
			 * @param options - Named parameters
			 *
			 * @param options.count - Count algorithm to use to count updated rows.
			 *
			 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
			 * hood.
			 *
			 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
			 * statistics under the hood.
			 *
			 * `"estimated"`: Uses exact count for low numbers and planned count for high
			 * numbers.
			 */
			update(values, { count: count3 } = {}) {
				const method = "PATCH";
				const prefersHeaders = [];
				if (this.headers["Prefer"]) {
					prefersHeaders.push(this.headers["Prefer"]);
				}
				if (count3) {
					prefersHeaders.push(`count=${count3}`);
				}
				this.headers["Prefer"] = prefersHeaders.join(",");
				return new PostgrestFilterBuilder_1.default({
					method,
					url: this.url,
					headers: this.headers,
					schema: this.schema,
					body: values,
					fetch: this.fetch,
					allowEmpty: false,
				});
			}
			/**
			 * Perform a DELETE on the table or view.
			 *
			 * By default, deleted rows are not returned. To return it, chain the call
			 * with `.select()` after filters.
			 *
			 * @param options - Named parameters
			 *
			 * @param options.count - Count algorithm to use to count deleted rows.
			 *
			 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
			 * hood.
			 *
			 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
			 * statistics under the hood.
			 *
			 * `"estimated"`: Uses exact count for low numbers and planned count for high
			 * numbers.
			 */
			delete({ count: count3 } = {}) {
				const method = "DELETE";
				const prefersHeaders = [];
				if (count3) {
					prefersHeaders.push(`count=${count3}`);
				}
				if (this.headers["Prefer"]) {
					prefersHeaders.unshift(this.headers["Prefer"]);
				}
				this.headers["Prefer"] = prefersHeaders.join(",");
				return new PostgrestFilterBuilder_1.default({
					method,
					url: this.url,
					headers: this.headers,
					schema: this.schema,
					fetch: this.fetch,
					allowEmpty: false,
				});
			}
		};
		exports.default = PostgrestQueryBuilder2;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/version.js
var require_version = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/version.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.version = void 0;
		exports.version = "0.0.0-automated";
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/constants.js
var require_constants = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/constants.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.DEFAULT_HEADERS = void 0;
		var version_1 = require_version();
		exports.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version_1.version}` };
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js
var require_PostgrestClient = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __importDefault =
			(exports && exports.__importDefault) ||
			((mod) => mod && mod.__esModule ? mod : { default: mod });
		Object.defineProperty(exports, "__esModule", { value: true });
		var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
		var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
		var constants_1 = require_constants();
		var PostgrestClient2 = class _PostgrestClient {
			static {
				__name(this, "PostgrestClient");
			}
			// TODO: Add back shouldThrowOnError once we figure out the typings
			/**
			 * Creates a PostgREST client.
			 *
			 * @param url - URL of the PostgREST endpoint
			 * @param options - Named parameters
			 * @param options.headers - Custom headers
			 * @param options.schema - Postgres schema to switch to
			 * @param options.fetch - Custom fetch
			 */
			constructor(url, { headers = {}, schema, fetch: fetch3 } = {}) {
				this.url = url;
				this.headers = Object.assign(
					Object.assign({}, constants_1.DEFAULT_HEADERS),
					headers,
				);
				this.schemaName = schema;
				this.fetch = fetch3;
			}
			/**
			 * Perform a query on a table or a view.
			 *
			 * @param relation - The table or view name to query
			 */
			from(relation) {
				const url = new URL(`${this.url}/${relation}`);
				return new PostgrestQueryBuilder_1.default(url, {
					headers: Object.assign({}, this.headers),
					schema: this.schemaName,
					fetch: this.fetch,
				});
			}
			/**
			 * Select a schema to query or perform an function (rpc) call.
			 *
			 * The schema needs to be on the list of exposed schemas inside Supabase.
			 *
			 * @param schema - The schema to query
			 */
			schema(schema) {
				return new _PostgrestClient(this.url, {
					headers: this.headers,
					schema,
					fetch: this.fetch,
				});
			}
			/**
			 * Perform a function call.
			 *
			 * @param fn - The function name to call
			 * @param args - The arguments to pass to the function call
			 * @param options - Named parameters
			 * @param options.head - When set to `true`, `data` will not be returned.
			 * Useful if you only need the count.
			 * @param options.get - When set to `true`, the function will be called with
			 * read-only access mode.
			 * @param options.count - Count algorithm to use to count rows returned by the
			 * function. Only applicable for [set-returning
			 * functions](https://www.postgresql.org/docs/current/functions-srf.html).
			 *
			 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
			 * hood.
			 *
			 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
			 * statistics under the hood.
			 *
			 * `"estimated"`: Uses exact count for low numbers and planned count for high
			 * numbers.
			 */
			rpc(fn, args = {}, { head: head2 = false, get: get2 = false, count: count3 } = {}) {
				let method;
				const url = new URL(`${this.url}/rpc/${fn}`);
				let body;
				if (head2 || get2) {
					method = head2 ? "HEAD" : "GET";
					Object.entries(args)
						.filter(([_, value]) => value !== void 0)
						.map(([name, value]) => [
							name,
							Array.isArray(value) ? `{${value.join(",")}}` : `${value}`,
						])
						.forEach(([name, value]) => {
							url.searchParams.append(name, value);
						});
				} else {
					method = "POST";
					body = args;
				}
				const headers = Object.assign({}, this.headers);
				if (count3) {
					headers["Prefer"] = `count=${count3}`;
				}
				return new PostgrestFilterBuilder_1.default({
					method,
					url,
					headers,
					schema: this.schemaName,
					body,
					fetch: this.fetch,
					allowEmpty: false,
				});
			}
		};
		exports.default = PostgrestClient2;
	},
});

// node_modules/@supabase/postgrest-js/dist/cjs/index.js
var require_cjs = __commonJS({
	"node_modules/@supabase/postgrest-js/dist/cjs/index.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __importDefault =
			(exports && exports.__importDefault) ||
			((mod) => mod && mod.__esModule ? mod : { default: mod });
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.PostgrestError =
			exports.PostgrestBuilder =
			exports.PostgrestTransformBuilder =
			exports.PostgrestFilterBuilder =
			exports.PostgrestQueryBuilder =
			exports.PostgrestClient =
				void 0;
		var PostgrestClient_1 = __importDefault(require_PostgrestClient());
		exports.PostgrestClient = PostgrestClient_1.default;
		var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
		exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
		var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
		exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
		var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
		exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
		var PostgrestBuilder_1 = __importDefault(require_PostgrestBuilder());
		exports.PostgrestBuilder = PostgrestBuilder_1.default;
		var PostgrestError_1 = __importDefault(require_PostgrestError());
		exports.PostgrestError = PostgrestError_1.default;
		exports.default = {
			PostgrestClient: PostgrestClient_1.default,
			PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
			PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
			PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
			PostgrestBuilder: PostgrestBuilder_1.default,
			PostgrestError: PostgrestError_1.default,
		};
	},
});

// node_modules/ws/browser.js
var require_browser = __commonJS({
	"node_modules/ws/browser.js"(exports, module) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		module.exports = () => {
			throw new Error(
				"ws does not work in the browser. Browser clients must use the native WebSocket object",
			);
		};
	},
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
	"node_modules/cookie/dist/index.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.parse = parse3;
		exports.serialize = serialize3;
		var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
		var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
		var domainValueRegExp =
			/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
		var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
		var __toString = Object.prototype.toString;
		var NullObject = /* @__PURE__ */ (() => {
			const C = /* @__PURE__ */ __name(() => {}, "C");
			C.prototype = /* @__PURE__ */ Object.create(null);
			return C;
		})();
		function parse3(str, options2) {
			const obj = new NullObject();
			const len = str.length;
			if (len < 2) return obj;
			const dec = options2?.decode || decode;
			let index2 = 0;
			do {
				const eqIdx = str.indexOf("=", index2);
				if (eqIdx === -1) break;
				const colonIdx = str.indexOf(";", index2);
				const endIdx = colonIdx === -1 ? len : colonIdx;
				if (eqIdx > endIdx) {
					index2 = str.lastIndexOf(";", eqIdx - 1) + 1;
					continue;
				}
				const keyStartIdx = startIndex(str, index2, eqIdx);
				const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
				const key = str.slice(keyStartIdx, keyEndIdx);
				if (obj[key] === void 0) {
					const valStartIdx = startIndex(str, eqIdx + 1, endIdx);
					const valEndIdx = endIndex(str, endIdx, valStartIdx);
					const value = dec(str.slice(valStartIdx, valEndIdx));
					obj[key] = value;
				}
				index2 = endIdx + 1;
			} while (index2 < len);
			return obj;
		}
		__name(parse3, "parse");
		function startIndex(str, index2, max) {
			do {
				const code = str.charCodeAt(index2);
				if (code !== 32 && code !== 9) return index2;
			} while (++index2 < max);
			return max;
		}
		__name(startIndex, "startIndex");
		function endIndex(str, index2, min) {
			while (index2 > min) {
				const code = str.charCodeAt(--index2);
				if (code !== 32 && code !== 9) return index2 + 1;
			}
			return min;
		}
		__name(endIndex, "endIndex");
		function serialize3(name, val, options2) {
			const enc = options2?.encode || encodeURIComponent;
			if (!cookieNameRegExp.test(name)) {
				throw new TypeError(`argument name is invalid: ${name}`);
			}
			const value = enc(val);
			if (!cookieValueRegExp.test(value)) {
				throw new TypeError(`argument val is invalid: ${val}`);
			}
			let str = name + "=" + value;
			if (!options2) return str;
			if (options2.maxAge !== void 0) {
				if (!Number.isInteger(options2.maxAge)) {
					throw new TypeError(`option maxAge is invalid: ${options2.maxAge}`);
				}
				str += "; Max-Age=" + options2.maxAge;
			}
			if (options2.domain) {
				if (!domainValueRegExp.test(options2.domain)) {
					throw new TypeError(`option domain is invalid: ${options2.domain}`);
				}
				str += "; Domain=" + options2.domain;
			}
			if (options2.path) {
				if (!pathValueRegExp.test(options2.path)) {
					throw new TypeError(`option path is invalid: ${options2.path}`);
				}
				str += "; Path=" + options2.path;
			}
			if (options2.expires) {
				if (!isDate(options2.expires) || !Number.isFinite(options2.expires.valueOf())) {
					throw new TypeError(`option expires is invalid: ${options2.expires}`);
				}
				str += "; Expires=" + options2.expires.toUTCString();
			}
			if (options2.httpOnly) {
				str += "; HttpOnly";
			}
			if (options2.secure) {
				str += "; Secure";
			}
			if (options2.partitioned) {
				str += "; Partitioned";
			}
			if (options2.priority) {
				const priority =
					typeof options2.priority === "string"
						? options2.priority.toLowerCase()
						: void 0;
				switch (priority) {
					case "low":
						str += "; Priority=Low";
						break;
					case "medium":
						str += "; Priority=Medium";
						break;
					case "high":
						str += "; Priority=High";
						break;
					default:
						throw new TypeError(`option priority is invalid: ${options2.priority}`);
				}
			}
			if (options2.sameSite) {
				const sameSite =
					typeof options2.sameSite === "string"
						? options2.sameSite.toLowerCase()
						: options2.sameSite;
				switch (sameSite) {
					case true:
					case "strict":
						str += "; SameSite=Strict";
						break;
					case "lax":
						str += "; SameSite=Lax";
						break;
					case "none":
						str += "; SameSite=None";
						break;
					default:
						throw new TypeError(`option sameSite is invalid: ${options2.sameSite}`);
				}
			}
			return str;
		}
		__name(serialize3, "serialize");
		function decode(str) {
			if (str.indexOf("%") === -1) return str;
			try {
				return decodeURIComponent(str);
			} catch (e) {
				return str;
			}
		}
		__name(decode, "decode");
		function isDate(val) {
			return __toString.call(val) === "[object Date]";
		}
		__name(isDate, "isDate");
	},
});

// src/web/templates/confirm.ts
var confirm_exports = {};
__export(confirm_exports, {
	renderConfirmScreen: () => renderConfirmScreen,
});
var renderConfirmScreen;
var init_confirm = __esm({
	"src/web/templates/confirm.ts"() {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		init_html2();
		init_routes();
		renderConfirmScreen = /* @__PURE__ */ __name(({ email }) => {
			return html`
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-heading font-bold mb-6 text-gray-900">
                Enter verification code
            </h1>
            
            <p class="mb-6 text-gray-600">
                We've sent a verification code to <strong>${email}</strong>. 
                Please enter the code below to complete your login.
            </p>

            <form method="POST" action='${AppRoutes.AUTH_CONFIRM}' class="space-y-4">
                <input type="hidden" name="email" value="${email}">
                <div>
                    <label
                            for="otp"
                            class="block text-sm font-medium text-gray-700 mb-1"
                    >Verification Code</label
                    >
                    <input
                            type="text"
                            id="otp"
                            name="otp"
                            required
                            autocomplete="one-time-code"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                </div>
                <button
                        type="submit"
                        class="w-full py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                    Verify
                </button>
            </form>
            
            <div class="mt-4 text-center">
                <a href="${AppRoutes.AUTHORIZE}" class="text-primary hover:underline">Back to login</a>
            </div>
        </div>
    `;
		}, "renderConfirmScreen");
	},
});

// node_modules/snakecase-keys/node_modules/map-obj/index.js
var require_map_obj = __commonJS({
	"node_modules/snakecase-keys/node_modules/map-obj/index.js"(exports, module) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var isObject3 = /* @__PURE__ */ __name(
			(value) => typeof value === "object" && value !== null,
			"isObject",
		);
		var mapObjectSkip2 = Symbol("skip");
		var isObjectCustom2 = /* @__PURE__ */ __name(
			(value) =>
				isObject3(value) &&
				!(value instanceof RegExp) &&
				!(value instanceof Error) &&
				!(value instanceof Date),
			"isObjectCustom",
		);
		var mapObject2 = /* @__PURE__ */ __name(
			(object, mapper, options2, isSeen = /* @__PURE__ */ new WeakMap()) => {
				options2 = {
					deep: false,
					target: {},
					...options2,
				};
				if (isSeen.has(object)) {
					return isSeen.get(object);
				}
				isSeen.set(object, options2.target);
				const { target } = options2;
				delete options2.target;
				const mapArray = /* @__PURE__ */ __name(
					(array) =>
						array.map((element) =>
							isObjectCustom2(element)
								? mapObject2(element, mapper, options2, isSeen)
								: element,
						),
					"mapArray",
				);
				if (Array.isArray(object)) {
					return mapArray(object);
				}
				for (const [key, value] of Object.entries(object)) {
					const mapResult = mapper(key, value, object);
					if (mapResult === mapObjectSkip2) {
						continue;
					}
					let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
					if (newKey === "__proto__") {
						continue;
					}
					if (options2.deep && shouldRecurse && isObjectCustom2(newValue)) {
						newValue = Array.isArray(newValue)
							? mapArray(newValue)
							: mapObject2(newValue, mapper, options2, isSeen);
					}
					target[newKey] = newValue;
				}
				return target;
			},
			"mapObject",
		);
		module.exports = (object, mapper, options2) => {
			if (!isObject3(object)) {
				throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
			}
			return mapObject2(object, mapper, options2);
		};
		module.exports.mapObjectSkip = mapObjectSkip2;
	},
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
	"node_modules/tslib/tslib.js"(exports, module) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var __extends;
		var __assign;
		var __rest3;
		var __decorate;
		var __param;
		var __esDecorate;
		var __runInitializers;
		var __propKey;
		var __setFunctionName;
		var __metadata;
		var __awaiter9;
		var __generator;
		var __exportStar;
		var __values;
		var __read;
		var __spread;
		var __spreadArrays;
		var __spreadArray;
		var __await;
		var __asyncGenerator;
		var __asyncDelegator;
		var __asyncValues;
		var __makeTemplateObject;
		var __importStar;
		var __importDefault;
		var __classPrivateFieldGet2;
		var __classPrivateFieldSet2;
		var __classPrivateFieldIn;
		var __createBinding;
		var __addDisposableResource;
		var __disposeResources;
		var __rewriteRelativeImportExtension;
		(function (factory) {
			var root =
				typeof global === "object"
					? global
					: typeof self === "object"
						? self
						: typeof this === "object"
							? this
							: {};
			if (typeof define === "function" && define.amd) {
				define("tslib", ["exports"], (exports2) => {
					factory(createExporter(root, createExporter(exports2)));
				});
			} else if (typeof module === "object" && typeof module.exports === "object") {
				factory(createExporter(root, createExporter(module.exports)));
			} else {
				factory(createExporter(root));
			}
			function createExporter(exports2, previous) {
				if (exports2 !== root) {
					if (typeof Object.create === "function") {
						Object.defineProperty(exports2, "__esModule", { value: true });
					} else {
						exports2.__esModule = true;
					}
				}
				return (id, v) => (exports2[id] = previous ? previous(id, v) : v);
			}
			__name(createExporter, "createExporter");
		})((exporter) => {
			var extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					((d, b) => {
						d.__proto__ = b;
					})) ||
				((d, b) => {
					for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
				});
			__extends = /* @__PURE__ */ __name((d, b) => {
				if (typeof b !== "function" && b !== null)
					throw new TypeError(
						"Class extends value " + String(b) + " is not a constructor or null",
					);
				extendStatics(d, b);
				function __() {
					this.constructor = d;
				}
				__name(__, "__");
				d.prototype =
					b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
			}, "__extends");
			__assign =
				Object.assign ||
				((t) => {
					for (var s, i = 1, n = arguments.length; i < n; i++) {
						s = arguments[i];
						for (var p in s)
							if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
					}
					return t;
				});
			__rest3 = /* @__PURE__ */ __name((s, e) => {
				var t = {};
				for (var p in s)
					if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
				if (s != null && typeof Object.getOwnPropertySymbols === "function")
					for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
						if (
							e.indexOf(p[i]) < 0 &&
							Object.prototype.propertyIsEnumerable.call(s, p[i])
						)
							t[p[i]] = s[p[i]];
					}
				return t;
			}, "__rest");
			__decorate = /* @__PURE__ */ __name((decorators, target, key, desc) => {
				var c = arguments.length,
					r =
						c < 3
							? target
							: desc === null
								? (desc = Object.getOwnPropertyDescriptor(target, key))
								: desc,
					d;
				if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
					r = Reflect.decorate(decorators, target, key, desc);
				else
					for (var i = decorators.length - 1; i >= 0; i--)
						if ((d = decorators[i]))
							r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
				return c > 3 && r && Object.defineProperty(target, key, r), r;
			}, "__decorate");
			__param = /* @__PURE__ */ __name((paramIndex, decorator) => (target, key) => {
					decorator(target, key, paramIndex);
				}, "__param");
			__esDecorate = /* @__PURE__ */ __name((
				ctor,
				descriptorIn,
				decorators,
				contextIn,
				initializers,
				extraInitializers,
			) => {
				function accept(f) {
					if (f !== void 0 && typeof f !== "function")
						throw new TypeError("Function expected");
					return f;
				}
				__name(accept, "accept");
				var kind = contextIn.kind,
					key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
				var target =
					!descriptorIn && ctor ? (contextIn["static"] ? ctor : ctor.prototype) : null;
				var descriptor =
					descriptorIn ||
					(target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
				var _,
					done = false;
				for (var i = decorators.length - 1; i >= 0; i--) {
					var context2 = {};
					for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
					for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
					context2.addInitializer = (f) => {
						if (done)
							throw new TypeError(
								"Cannot add initializers after decoration has completed",
							);
						extraInitializers.push(accept(f || null));
					};
					var result = (0, decorators[i])(
						kind === "accessor"
							? { get: descriptor.get, set: descriptor.set }
							: descriptor[key],
						context2,
					);
					if (kind === "accessor") {
						if (result === void 0) continue;
						if (result === null || typeof result !== "object")
							throw new TypeError("Object expected");
						if ((_ = accept(result.get))) descriptor.get = _;
						if ((_ = accept(result.set))) descriptor.set = _;
						if ((_ = accept(result.init))) initializers.unshift(_);
					} else if ((_ = accept(result))) {
						if (kind === "field") initializers.unshift(_);
						else descriptor[key] = _;
					}
				}
				if (target) Object.defineProperty(target, contextIn.name, descriptor);
				done = true;
			}, "__esDecorate");
			__runInitializers = /* @__PURE__ */ __name((thisArg, initializers, value) => {
				var useValue = arguments.length > 2;
				for (var i = 0; i < initializers.length; i++) {
					value = useValue
						? initializers[i].call(thisArg, value)
						: initializers[i].call(thisArg);
				}
				return useValue ? value : void 0;
			}, "__runInitializers");
			__propKey = /* @__PURE__ */ __name((x) => typeof x === "symbol" ? x : "".concat(x), "__propKey");
			__setFunctionName = /* @__PURE__ */ __name((f, name, prefix) => {
				if (typeof name === "symbol")
					name = name.description ? "[".concat(name.description, "]") : "";
				return Object.defineProperty(f, "name", {
					configurable: true,
					value: prefix ? "".concat(prefix, " ", name) : name,
				});
			}, "__setFunctionName");
			__metadata = /* @__PURE__ */ __name((metadataKey, metadataValue) => {
				if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
					return Reflect.metadata(metadataKey, metadataValue);
			}, "__metadata");
			__awaiter9 = /* @__PURE__ */ __name((thisArg, _arguments, P, generator) => {
				function adopt(value) {
					return value instanceof P
						? value
						: new P((resolve) => {
								resolve(value);
							});
				}
				__name(adopt, "adopt");
				return new (P || (P = Promise))((resolve, reject) => {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					__name(fulfilled, "fulfilled");
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					__name(rejected, "rejected");
					function step(result) {
						result.done
							? resolve(result.value)
							: adopt(result.value).then(fulfilled, rejected);
					}
					__name(step, "step");
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			}, "__awaiter");
			__generator = /* @__PURE__ */ __name((thisArg, body) => {
				var _ = {
						label: 0,
						sent: /* @__PURE__ */ __name(() => {
							if (t[0] & 1) throw t[1];
							return t[1];
						}, "sent"),
						trys: [],
						ops: [],
					},
					f,
					y,
					t,
					g = Object.create(
						(typeof Iterator === "function" ? Iterator : Object).prototype,
					);
				return (
					(g.next = verb(0)),
					(g["throw"] = verb(1)),
					(g["return"] = verb(2)),
					typeof Symbol === "function" &&
						(g[Symbol.iterator] = function () {
							return this;
						}),
					g
				);
				function verb(n) {
					return (v) => step([n, v]);
				}
				__name(verb, "verb");
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while ((g && ((g = 0), op[0] && (_ = 0)), _))
						try {
							if (
								((f = 1),
								y &&
									(t =
										op[0] & 2
											? y["return"]
											: op[0]
												? y["throw"] || ((t = y["return"]) && t.call(y), 0)
												: y.next) &&
									!(t = t.call(y, op[1])).done)
							)
								return t;
							if (((y = 0), t)) op = [op[0] & 2, t.value];
							switch (op[0]) {
								case 0:
								case 1:
									t = op;
									break;
								case 4:
									_.label++;
									return { value: op[1], done: false };
								case 5:
									_.label++;
									y = op[1];
									op = [0];
									continue;
								case 7:
									op = _.ops.pop();
									_.trys.pop();
									continue;
								default:
									if (
										!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
										(op[0] === 6 || op[0] === 2)
									) {
										_ = 0;
										continue;
									}
									if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
										_.label = op[1];
										break;
									}
									if (op[0] === 6 && _.label < t[1]) {
										_.label = t[1];
										t = op;
										break;
									}
									if (t && _.label < t[2]) {
										_.label = t[2];
										_.ops.push(op);
										break;
									}
									if (t[2]) _.ops.pop();
									_.trys.pop();
									continue;
							}
							op = body.call(thisArg, _);
						} catch (e) {
							op = [6, e];
							y = 0;
						} finally {
							f = t = 0;
						}
					if (op[0] & 5) throw op[1];
					return { value: op[0] ? op[1] : void 0, done: true };
				}
				__name(step, "step");
			}, "__generator");
			__exportStar = /* @__PURE__ */ __name((m, o) => {
				for (var p in m)
					if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
						__createBinding(o, m, p);
			}, "__exportStar");
			__createBinding = Object.create
				? ((o, m, k, k2) => {
						if (k2 === void 0) k2 = k;
						var desc = Object.getOwnPropertyDescriptor(m, k);
						if (
							!desc ||
							("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
						) {
							desc = {
								enumerable: true,
								get: /* @__PURE__ */ __name(() => m[k], "get"),
							};
						}
						Object.defineProperty(o, k2, desc);
					})
				: ((o, m, k, k2) => {
						if (k2 === void 0) k2 = k;
						o[k2] = m[k];
					});
			__values = /* @__PURE__ */ __name((o) => {
				var s = typeof Symbol === "function" && Symbol.iterator,
					m = s && o[s],
					i = 0;
				if (m) return m.call(o);
				if (o && typeof o.length === "number")
					return {
						next: /* @__PURE__ */ __name(() => {
							if (o && i >= o.length) o = void 0;
							return { value: o && o[i++], done: !o };
						}, "next"),
					};
				throw new TypeError(
					s ? "Object is not iterable." : "Symbol.iterator is not defined.",
				);
			}, "__values");
			__read = /* @__PURE__ */ __name((o, n) => {
				var m = typeof Symbol === "function" && o[Symbol.iterator];
				if (!m) return o;
				var i = m.call(o),
					r,
					ar = [],
					e;
				try {
					while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
				} catch (error3) {
					e = { error: error3 };
				} finally {
					try {
						if (r && !r.done && (m = i["return"])) m.call(i);
					} finally {
						if (e) throw e.error;
					}
				}
				return ar;
			}, "__read");
			__spread = /* @__PURE__ */ __name(() => {
				for (var ar = [], i = 0; i < arguments.length; i++)
					ar = ar.concat(__read(arguments[i]));
				return ar;
			}, "__spread");
			__spreadArrays = /* @__PURE__ */ __name(() => {
				for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
				for (var r = Array(s), k = 0, i = 0; i < il; i++)
					for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
				return r;
			}, "__spreadArrays");
			__spreadArray = /* @__PURE__ */ __name((to, from, pack) => {
				if (pack || arguments.length === 2)
					for (var i = 0, l = from.length, ar; i < l; i++) {
						if (ar || !(i in from)) {
							if (!ar) ar = Array.prototype.slice.call(from, 0, i);
							ar[i] = from[i];
						}
					}
				return to.concat(ar || Array.prototype.slice.call(from));
			}, "__spreadArray");
			__await = /* @__PURE__ */ __name(function (v) {
				return this instanceof __await ? ((this.v = v), this) : new __await(v);
			}, "__await");
			__asyncGenerator = /* @__PURE__ */ __name((thisArg, _arguments, generator) => {
				if (!Symbol.asyncIterator)
					throw new TypeError("Symbol.asyncIterator is not defined.");
				var g = generator.apply(thisArg, _arguments || []),
					i,
					q = [];
				return (
					(i = Object.create(
						(typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype,
					)),
					verb("next"),
					verb("throw"),
					verb("return", awaitReturn),
					(i[Symbol.asyncIterator] = function () {
						return this;
					}),
					i
				);
				function awaitReturn(f) {
					return (v) => Promise.resolve(v).then(f, reject);
				}
				__name(awaitReturn, "awaitReturn");
				function verb(n, f) {
					if (g[n]) {
						i[n] = (v) => new Promise((a, b) => {
								q.push([n, v, a, b]) > 1 || resume(n, v);
							});
						if (f) i[n] = f(i[n]);
					}
				}
				__name(verb, "verb");
				function resume(n, v) {
					try {
						step(g[n](v));
					} catch (e) {
						settle(q[0][3], e);
					}
				}
				__name(resume, "resume");
				function step(r) {
					r.value instanceof __await
						? Promise.resolve(r.value.v).then(fulfill, reject)
						: settle(q[0][2], r);
				}
				__name(step, "step");
				function fulfill(value) {
					resume("next", value);
				}
				__name(fulfill, "fulfill");
				function reject(value) {
					resume("throw", value);
				}
				__name(reject, "reject");
				function settle(f, v) {
					if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
				}
				__name(settle, "settle");
			}, "__asyncGenerator");
			__asyncDelegator = /* @__PURE__ */ __name((o) => {
				var i, p;
				return (
					(i = {}),
					verb("next"),
					verb("throw", (e) => {
						throw e;
					}),
					verb("return"),
					(i[Symbol.iterator] = function () {
						return this;
					}),
					i
				);
				function verb(n, f) {
					i[n] = o[n]
						? ((v) => (p = !p)
									? { value: __await(o[n](v)), done: false }
									: f
										? f(v)
										: v)
						: f;
				}
				__name(verb, "verb");
			}, "__asyncDelegator");
			__asyncValues = /* @__PURE__ */ __name((o) => {
				if (!Symbol.asyncIterator)
					throw new TypeError("Symbol.asyncIterator is not defined.");
				var m = o[Symbol.asyncIterator],
					i;
				return m
					? m.call(o)
					: ((o = typeof __values === "function" ? __values(o) : o[Symbol.iterator]()),
						(i = {}),
						verb("next"),
						verb("throw"),
						verb("return"),
						(i[Symbol.asyncIterator] = function () {
							return this;
						}),
						i);
				function verb(n) {
					i[n] =
						o[n] &&
						((v) => new Promise((resolve, reject) => {
								(v = o[n](v)), settle(resolve, reject, v.done, v.value);
							}));
				}
				__name(verb, "verb");
				function settle(resolve, reject, d, v) {
					Promise.resolve(v).then((v2) => {
						resolve({ value: v2, done: d });
					}, reject);
				}
				__name(settle, "settle");
			}, "__asyncValues");
			__makeTemplateObject = /* @__PURE__ */ __name((cooked, raw2) => {
				if (Object.defineProperty) {
					Object.defineProperty(cooked, "raw", { value: raw2 });
				} else {
					cooked.raw = raw2;
				}
				return cooked;
			}, "__makeTemplateObject");
			var __setModuleDefault = Object.create
				? ((o, v) => {
						Object.defineProperty(o, "default", { enumerable: true, value: v });
					})
				: ((o, v) => {
						o["default"] = v;
					});
			var ownKeys = /* @__PURE__ */ __name((o) => {
				ownKeys =
					Object.getOwnPropertyNames ||
					((o2) => {
						var ar = [];
						for (var k in o2)
							if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
						return ar;
					});
				return ownKeys(o);
			}, "ownKeys");
			__importStar = /* @__PURE__ */ __name((mod) => {
				if (mod && mod.__esModule) return mod;
				var result = {};
				if (mod != null) {
					for (var k = ownKeys(mod), i = 0; i < k.length; i++)
						if (k[i] !== "default") __createBinding(result, mod, k[i]);
				}
				__setModuleDefault(result, mod);
				return result;
			}, "__importStar");
			__importDefault = /* @__PURE__ */ __name((mod) => mod && mod.__esModule ? mod : { default: mod }, "__importDefault");
			__classPrivateFieldGet2 = /* @__PURE__ */ __name((receiver, state, kind, f) => {
				if (kind === "a" && !f)
					throw new TypeError("Private accessor was defined without a getter");
				if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
					throw new TypeError(
						"Cannot read private member from an object whose class did not declare it",
					);
				return kind === "m"
					? f
					: kind === "a"
						? f.call(receiver)
						: f
							? f.value
							: state.get(receiver);
			}, "__classPrivateFieldGet");
			__classPrivateFieldSet2 = /* @__PURE__ */ __name((
				receiver,
				state,
				value,
				kind,
				f,
			) => {
				if (kind === "m") throw new TypeError("Private method is not writable");
				if (kind === "a" && !f)
					throw new TypeError("Private accessor was defined without a setter");
				if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
					throw new TypeError(
						"Cannot write private member to an object whose class did not declare it",
					);
				return (
					kind === "a"
						? f.call(receiver, value)
						: f
							? (f.value = value)
							: state.set(receiver, value),
					value
				);
			}, "__classPrivateFieldSet");
			__classPrivateFieldIn = /* @__PURE__ */ __name((state, receiver) => {
				if (
					receiver === null ||
					(typeof receiver !== "object" && typeof receiver !== "function")
				)
					throw new TypeError("Cannot use 'in' operator on non-object");
				return typeof state === "function" ? receiver === state : state.has(receiver);
			}, "__classPrivateFieldIn");
			__addDisposableResource = /* @__PURE__ */ __name((env4, value, async) => {
				if (value !== null && value !== void 0) {
					if (typeof value !== "object" && typeof value !== "function")
						throw new TypeError("Object expected.");
					var dispose, inner;
					if (async) {
						if (!Symbol.asyncDispose)
							throw new TypeError("Symbol.asyncDispose is not defined.");
						dispose = value[Symbol.asyncDispose];
					}
					if (dispose === void 0) {
						if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
						dispose = value[Symbol.dispose];
						if (async) inner = dispose;
					}
					if (typeof dispose !== "function")
						throw new TypeError("Object not disposable.");
					if (inner)
						dispose = /* @__PURE__ */ __name(function () {
							try {
								inner.call(this);
							} catch (e) {
								return Promise.reject(e);
							}
						}, "dispose");
					env4.stack.push({ value, dispose, async });
				} else if (async) {
					env4.stack.push({ async: true });
				}
				return value;
			}, "__addDisposableResource");
			var _SuppressedError =
				typeof SuppressedError === "function"
					? SuppressedError
					: ((error3, suppressed, message) => {
							var e = new Error(message);
							return (
								(e.name = "SuppressedError"),
								(e.error = error3),
								(e.suppressed = suppressed),
								e
							);
						});
			__disposeResources = /* @__PURE__ */ __name((env4) => {
				function fail(e) {
					env4.error = env4.hasError
						? new _SuppressedError(
								e,
								env4.error,
								"An error was suppressed during disposal.",
							)
						: e;
					env4.hasError = true;
				}
				__name(fail, "fail");
				var r,
					s = 0;
				function next() {
					while ((r = env4.stack.pop())) {
						try {
							if (!r.async && s === 1)
								return (s = 0), env4.stack.push(r), Promise.resolve().then(next);
							if (r.dispose) {
								var result = r.dispose.call(r.value);
								if (r.async)
									return (
										(s |= 2),
										Promise.resolve(result).then(next, (e) => {
											fail(e);
											return next();
										})
									);
							} else s |= 1;
						} catch (e) {
							fail(e);
						}
					}
					if (s === 1)
						return env4.hasError ? Promise.reject(env4.error) : Promise.resolve();
					if (env4.hasError) throw env4.error;
				}
				__name(next, "next");
				return next();
			}, "__disposeResources");
			__rewriteRelativeImportExtension = /* @__PURE__ */ __name((path, preserveJsx) => {
				if (typeof path === "string" && /^\.\.?\//.test(path)) {
					return path.replace(
						/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
						(m, tsx, d, ext, cm) => tsx
								? preserveJsx
									? ".jsx"
									: ".js"
								: d && (!ext || !cm)
									? m
									: d + ext + "." + cm.toLowerCase() + "js",
					);
				}
				return path;
			}, "__rewriteRelativeImportExtension");
			exporter("__extends", __extends);
			exporter("__assign", __assign);
			exporter("__rest", __rest3);
			exporter("__decorate", __decorate);
			exporter("__param", __param);
			exporter("__esDecorate", __esDecorate);
			exporter("__runInitializers", __runInitializers);
			exporter("__propKey", __propKey);
			exporter("__setFunctionName", __setFunctionName);
			exporter("__metadata", __metadata);
			exporter("__awaiter", __awaiter9);
			exporter("__generator", __generator);
			exporter("__exportStar", __exportStar);
			exporter("__createBinding", __createBinding);
			exporter("__values", __values);
			exporter("__read", __read);
			exporter("__spread", __spread);
			exporter("__spreadArrays", __spreadArrays);
			exporter("__spreadArray", __spreadArray);
			exporter("__await", __await);
			exporter("__asyncGenerator", __asyncGenerator);
			exporter("__asyncDelegator", __asyncDelegator);
			exporter("__asyncValues", __asyncValues);
			exporter("__makeTemplateObject", __makeTemplateObject);
			exporter("__importStar", __importStar);
			exporter("__importDefault", __importDefault);
			exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
			exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
			exporter("__classPrivateFieldIn", __classPrivateFieldIn);
			exporter("__addDisposableResource", __addDisposableResource);
			exporter("__disposeResources", __disposeResources);
			exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension);
		});
	},
});

// node_modules/lower-case/dist/index.js
var require_dist2 = __commonJS({
	"node_modules/lower-case/dist/index.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.lowerCase = exports.localeLowerCase = void 0;
		var SUPPORTED_LOCALE = {
			tr: {
				regexp: /\u0130|\u0049|\u0049\u0307/g,
				map: {
					\u0130: "i",
					I: "\u0131",
					I\u0307: "i",
				},
			},
			az: {
				regexp: /\u0130/g,
				map: {
					\u0130: "i",
					I: "\u0131",
					I\u0307: "i",
				},
			},
			lt: {
				regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
				map: {
					I: "i\u0307",
					J: "j\u0307",
					\u012E: "\u012F\u0307",
					\u00CC: "i\u0307\u0300",
					\u00CD: "i\u0307\u0301",
					\u0128: "i\u0307\u0303",
				},
			},
		};
		function localeLowerCase(str, locale) {
			var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
			if (lang)
				return lowerCase(
					str.replace(lang.regexp, (m) => lang.map[m]),
				);
			return lowerCase(str);
		}
		__name(localeLowerCase, "localeLowerCase");
		exports.localeLowerCase = localeLowerCase;
		function lowerCase(str) {
			return str.toLowerCase();
		}
		__name(lowerCase, "lowerCase");
		exports.lowerCase = lowerCase;
	},
});

// node_modules/no-case/dist/index.js
var require_dist3 = __commonJS({
	"node_modules/no-case/dist/index.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.noCase = void 0;
		var lower_case_1 = require_dist2();
		var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
		var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
		function noCase(input, options2) {
			if (options2 === void 0) {
				options2 = {};
			}
			var _a2 = options2.splitRegexp,
				splitRegexp = _a2 === void 0 ? DEFAULT_SPLIT_REGEXP : _a2,
				_b = options2.stripRegexp,
				stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b,
				_c = options2.transform,
				transform2 = _c === void 0 ? lower_case_1.lowerCase : _c,
				_d = options2.delimiter,
				delimiter = _d === void 0 ? " " : _d;
			var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
			var start = 0;
			var end = result.length;
			while (result.charAt(start) === "\0") start++;
			while (result.charAt(end - 1) === "\0") end--;
			return result.slice(start, end).split("\0").map(transform2).join(delimiter);
		}
		__name(noCase, "noCase");
		exports.noCase = noCase;
		function replace(input, re, value) {
			if (re instanceof RegExp) return input.replace(re, value);
			return re.reduce((input2, re2) => input2.replace(re2, value), input);
		}
		__name(replace, "replace");
	},
});

// node_modules/dot-case/dist/index.js
var require_dist4 = __commonJS({
	"node_modules/dot-case/dist/index.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.dotCase = void 0;
		var tslib_1 = require_tslib();
		var no_case_1 = require_dist3();
		function dotCase(input, options2) {
			if (options2 === void 0) {
				options2 = {};
			}
			return no_case_1.noCase(input, tslib_1.__assign({ delimiter: "." }, options2));
		}
		__name(dotCase, "dotCase");
		exports.dotCase = dotCase;
	},
});

// node_modules/snake-case/dist/index.js
var require_dist5 = __commonJS({
	"node_modules/snake-case/dist/index.js"(exports) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.snakeCase = void 0;
		var tslib_1 = require_tslib();
		var dot_case_1 = require_dist4();
		function snakeCase(input, options2) {
			if (options2 === void 0) {
				options2 = {};
			}
			return dot_case_1.dotCase(input, tslib_1.__assign({ delimiter: "_" }, options2));
		}
		__name(snakeCase, "snakeCase");
		exports.snakeCase = snakeCase;
	},
});

// node_modules/snakecase-keys/index.js
var require_snakecase_keys = __commonJS({
	"node_modules/snakecase-keys/index.js"(exports, module) {
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
		init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
		init_performance2();
		var map = require_map_obj();
		var { snakeCase } = require_dist5();
		var PlainObjectConstructor = {}.constructor;
		module.exports = (obj, options2) => {
			if (Array.isArray(obj)) {
				if (obj.some((item) => item.constructor !== PlainObjectConstructor)) {
					throw new Error("obj must be array of plain objects");
				}
			} else {
				if (obj.constructor !== PlainObjectConstructor) {
					throw new Error("obj must be an plain object");
				}
			}
			options2 = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options2);
			return map(
				obj,
				(key, val) => [
						matches(options2.exclude, key)
							? key
							: snakeCase(key, options2.parsingOptions),
						val,
						mapperOptions(key, val, options2),
					],
				options2,
			);
		};
		function matches(patterns, value) {
			return patterns.some((pattern) => typeof pattern === "string" ? pattern === value : pattern.test(value));
		}
		__name(matches, "matches");
		function mapperOptions(key, val, options2) {
			return options2.shouldRecurse
				? { shouldRecurse: options2.shouldRecurse(key, val) }
				: void 0;
		}
		__name(mapperOptions, "mapperOptions");
	},
});

// src/index.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/web/app.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono-base.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/compose.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
	return (context2, next) => {
		let index2 = -1;
		return dispatch(0);
		async function dispatch(i) {
			if (i <= index2) {
				throw new Error("next() called multiple times");
			}
			index2 = i;
			let res;
			let isError = false;
			let handler;
			if (middleware[i]) {
				handler = middleware[i][0][0];
				context2.req.routeIndex = i;
			} else {
				handler = (i === middleware.length && next) || void 0;
			}
			if (handler) {
				try {
					res = await handler(context2, () => dispatch(i + 1));
				} catch (err) {
					if (err instanceof Error && onError) {
						context2.error = err;
						res = await onError(err, context2);
						isError = true;
					} else {
						throw err;
					}
				}
			} else {
				if (context2.finalized === false && onNotFound) {
					res = await onNotFound(context2);
				}
			}
			if (res && (context2.finalized === false || isError)) {
				context2.res = res;
			}
			return context2;
		}
		__name(dispatch, "dispatch");
	};
}, "compose");

// node_modules/hono/dist/context.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/body.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var parseBody = /* @__PURE__ */ __name(
	async (request, options2 = /* @__PURE__ */ Object.create(null)) => {
		const { all = false, dot = false } = options2;
		const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
		const contentType = headers.get("Content-Type");
		if (
			contentType?.startsWith("multipart/form-data") ||
			contentType?.startsWith("application/x-www-form-urlencoded")
		) {
			return parseFormData(request, { all, dot });
		}
		return {};
	},
	"parseBody",
);
async function parseFormData(request, options2) {
	const formData = await request.formData();
	if (formData) {
		return convertFormDataToBodyData(formData, options2);
	}
	return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options2) {
	const form = /* @__PURE__ */ Object.create(null);
	formData.forEach((value, key) => {
		const shouldParseAllValues = options2.all || key.endsWith("[]");
		if (!shouldParseAllValues) {
			form[key] = value;
		} else {
			handleParsingAllValues(form, key, value);
		}
	});
	if (options2.dot) {
		Object.entries(form).forEach(([key, value]) => {
			const shouldParseDotValues = key.includes(".");
			if (shouldParseDotValues) {
				handleParsingNestedValues(form, key, value);
				delete form[key];
			}
		});
	}
	return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
	if (form[key] !== void 0) {
		if (Array.isArray(form[key])) {
			form[key].push(value);
		} else {
			form[key] = [form[key], value];
		}
	} else {
		form[key] = value;
	}
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
	let nestedForm = form;
	const keys = key.split(".");
	keys.forEach((key2, index2) => {
		if (index2 === keys.length - 1) {
			nestedForm[key2] = value;
		} else {
			if (
				!nestedForm[key2] ||
				typeof nestedForm[key2] !== "object" ||
				Array.isArray(nestedForm[key2]) ||
				nestedForm[key2] instanceof File
			) {
				nestedForm[key2] = /* @__PURE__ */ Object.create(null);
			}
			nestedForm = nestedForm[key2];
		}
	});
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
	const paths = path.split("/");
	if (paths[0] === "") {
		paths.shift();
	}
	return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
	const { groups, path } = extractGroupsFromPath(routePath);
	const paths = splitPath(path);
	return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
	const groups = [];
	path = path.replace(/\{[^}]+\}/g, (match, index2) => {
		const mark = `@${index2}`;
		groups.push([mark, match]);
		return mark;
	});
	return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
	for (let i = groups.length - 1; i >= 0; i--) {
		const [mark] = groups[i];
		for (let j = paths.length - 1; j >= 0; j--) {
			if (paths[j].includes(mark)) {
				paths[j] = paths[j].replace(mark, groups[i][1]);
				break;
			}
		}
	}
	return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
	if (label === "*") {
		return "*";
	}
	const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
	if (match) {
		const cacheKey = `${label}#${next}`;
		if (!patternCache[cacheKey]) {
			if (match[2]) {
				patternCache[cacheKey] =
					next && next[0] !== ":" && next[0] !== "*"
						? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)]
						: [label, match[1], new RegExp(`^${match[2]}$`)];
			} else {
				patternCache[cacheKey] = [label, match[1], true];
			}
		}
		return patternCache[cacheKey];
	}
	return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
	try {
		return decoder(str);
	} catch {
		return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
			try {
				return decoder(match);
			} catch {
				return match;
			}
		});
	}
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
	const url = request.url;
	const start = url.indexOf("/", 8);
	let i = start;
	for (; i < url.length; i++) {
		const charCode = url.charCodeAt(i);
		if (charCode === 37) {
			const queryIndex = url.indexOf("?", i);
			const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
			return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
		} else if (charCode === 63) {
			break;
		}
	}
	return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
	const result = getPath(request);
	return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
	if (rest.length) {
		sub = mergePath(sub, ...rest);
	}
	return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
	if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
		return null;
	}
	const segments = path.split("/");
	const results = [];
	let basePath = "";
	segments.forEach((segment) => {
		if (segment !== "" && !/\:/.test(segment)) {
			basePath += "/" + segment;
		} else if (/\:/.test(segment)) {
			if (/\?/.test(segment)) {
				if (results.length === 0 && basePath === "") {
					results.push("/");
				} else {
					results.push(basePath);
				}
				const optionalSegment = segment.replace("?", "");
				basePath += "/" + optionalSegment;
				results.push(basePath);
			} else {
				basePath += "/" + segment;
			}
		}
	});
	return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
	if (!/[%+]/.test(value)) {
		return value;
	}
	if (value.indexOf("+") !== -1) {
		value = value.replace(/\+/g, " ");
	}
	return value.indexOf("%") !== -1 ? decodeURIComponent_(value) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
	let encoded;
	if (!multiple && key && !/[%+]/.test(key)) {
		let keyIndex2 = url.indexOf(`?${key}`, 8);
		if (keyIndex2 === -1) {
			keyIndex2 = url.indexOf(`&${key}`, 8);
		}
		while (keyIndex2 !== -1) {
			const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
			if (trailingKeyCode === 61) {
				const valueIndex = keyIndex2 + key.length + 2;
				const endIndex = url.indexOf("&", valueIndex);
				return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
			} else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
				return "";
			}
			keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
		}
		encoded = /[%+]/.test(url);
		if (!encoded) {
			return void 0;
		}
	}
	const results = {};
	encoded ??= /[%+]/.test(url);
	let keyIndex = url.indexOf("?", 8);
	while (keyIndex !== -1) {
		const nextKeyIndex = url.indexOf("&", keyIndex + 1);
		let valueIndex = url.indexOf("=", keyIndex);
		if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
			valueIndex = -1;
		}
		let name = url.slice(
			keyIndex + 1,
			valueIndex === -1 ? (nextKeyIndex === -1 ? void 0 : nextKeyIndex) : valueIndex,
		);
		if (encoded) {
			name = _decodeURI(name);
		}
		keyIndex = nextKeyIndex;
		if (name === "") {
			continue;
		}
		let value;
		if (valueIndex === -1) {
			value = "";
		} else {
			value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
			if (encoded) {
				value = _decodeURI(value);
			}
		}
		if (multiple) {
			if (!(results[name] && Array.isArray(results[name]))) {
				results[name] = [];
			}
			results[name].push(value);
		} else {
			results[name] ??= value;
		}
	}
	return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
	return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name(
	(str) => tryDecode(str, decodeURIComponent_),
	"tryDecodeURIComponent",
);
var HonoRequest = class {
	static {
		__name(this, "HonoRequest");
	}
	raw;
	#validatedData;
	#matchResult;
	routeIndex = 0;
	path;
	bodyCache = {};
	constructor(request, path = "/", matchResult = [[]]) {
		this.raw = request;
		this.path = path;
		this.#matchResult = matchResult;
		this.#validatedData = {};
	}
	param(key) {
		return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
	}
	#getDecodedParam(key) {
		const paramKey = this.#matchResult[0][this.routeIndex][1][key];
		const param = this.#getParamValue(paramKey);
		return param ? (/\%/.test(param) ? tryDecodeURIComponent(param) : param) : void 0;
	}
	#getAllDecodedParams() {
		const decoded = {};
		const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
		for (const key of keys) {
			const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
			if (value && typeof value === "string") {
				decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
			}
		}
		return decoded;
	}
	#getParamValue(paramKey) {
		return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
	}
	query(key) {
		return getQueryParam(this.url, key);
	}
	queries(key) {
		return getQueryParams(this.url, key);
	}
	header(name) {
		if (name) {
			return this.raw.headers.get(name) ?? void 0;
		}
		const headerData = {};
		this.raw.headers.forEach((value, key) => {
			headerData[key] = value;
		});
		return headerData;
	}
	async parseBody(options2) {
		return (this.bodyCache.parsedBody ??= await parseBody(this, options2));
	}
	#cachedBody = /* @__PURE__ */ __name((key) => {
		const { bodyCache, raw: raw2 } = this;
		const cachedBody = bodyCache[key];
		if (cachedBody) {
			return cachedBody;
		}
		const anyCachedKey = Object.keys(bodyCache)[0];
		if (anyCachedKey) {
			return bodyCache[anyCachedKey].then((body) => {
				if (anyCachedKey === "json") {
					body = JSON.stringify(body);
				}
				return new Response(body)[key]();
			});
		}
		return (bodyCache[key] = raw2[key]());
	}, "#cachedBody");
	json() {
		return this.#cachedBody("json");
	}
	text() {
		return this.#cachedBody("text");
	}
	arrayBuffer() {
		return this.#cachedBody("arrayBuffer");
	}
	blob() {
		return this.#cachedBody("blob");
	}
	formData() {
		return this.#cachedBody("formData");
	}
	addValidatedData(target, data) {
		this.#validatedData[target] = data;
	}
	valid(target) {
		return this.#validatedData[target];
	}
	get url() {
		return this.raw.url;
	}
	get method() {
		return this.raw.method;
	}
	get matchedRoutes() {
		return this.#matchResult[0].map(([[, route]]) => route);
	}
	get routePath() {
		return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
	}
};

// node_modules/hono/dist/context.js
init_html();
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = /* @__PURE__ */ __name((headers, map = {}) => {
	for (const key of Object.keys(map)) {
		headers.set(key, map[key]);
	}
	return headers;
}, "setHeaders");
var Context = class {
	static {
		__name(this, "Context");
	}
	#rawRequest;
	#req;
	env = {};
	#var;
	finalized = false;
	error;
	#status = 200;
	#executionCtx;
	#headers;
	#preparedHeaders;
	#res;
	#isFresh = true;
	#layout;
	#renderer;
	#notFoundHandler;
	#matchResult;
	#path;
	constructor(req, options2) {
		this.#rawRequest = req;
		if (options2) {
			this.#executionCtx = options2.executionCtx;
			this.env = options2.env;
			this.#notFoundHandler = options2.notFoundHandler;
			this.#path = options2.path;
			this.#matchResult = options2.matchResult;
		}
	}
	get req() {
		this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
		return this.#req;
	}
	get event() {
		if (this.#executionCtx && "respondWith" in this.#executionCtx) {
			return this.#executionCtx;
		} else {
			throw Error("This context has no FetchEvent");
		}
	}
	get executionCtx() {
		if (this.#executionCtx) {
			return this.#executionCtx;
		} else {
			throw Error("This context has no ExecutionContext");
		}
	}
	get res() {
		this.#isFresh = false;
		return (this.#res ||= new Response("404 Not Found", { status: 404 }));
	}
	set res(_res) {
		this.#isFresh = false;
		if (this.#res && _res) {
			_res = new Response(_res.body, _res);
			for (const [k, v] of this.#res.headers.entries()) {
				if (k === "content-type") {
					continue;
				}
				if (k === "set-cookie") {
					const cookies = this.#res.headers.getSetCookie();
					_res.headers.delete("set-cookie");
					for (const cookie of cookies) {
						_res.headers.append("set-cookie", cookie);
					}
				} else {
					_res.headers.set(k, v);
				}
			}
		}
		this.#res = _res;
		this.finalized = true;
	}
	render = /* @__PURE__ */ __name((...args) => {
		this.#renderer ??= (content) => this.html(content);
		return this.#renderer(...args);
	}, "render");
	setLayout = /* @__PURE__ */ __name((layout2) => (this.#layout = layout2), "setLayout");
	getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
	setRenderer = /* @__PURE__ */ __name((renderer) => {
		this.#renderer = renderer;
	}, "setRenderer");
	header = /* @__PURE__ */ __name((name, value, options2) => {
		if (this.finalized) {
			this.#res = new Response(this.#res.body, this.#res);
		}
		if (value === void 0) {
			if (this.#headers) {
				this.#headers.delete(name);
			} else if (this.#preparedHeaders) {
				delete this.#preparedHeaders[name.toLocaleLowerCase()];
			}
			if (this.finalized) {
				this.res.headers.delete(name);
			}
			return;
		}
		if (options2?.append) {
			if (!this.#headers) {
				this.#isFresh = false;
				this.#headers = new Headers(this.#preparedHeaders);
				this.#preparedHeaders = {};
			}
			this.#headers.append(name, value);
		} else {
			if (this.#headers) {
				this.#headers.set(name, value);
			} else {
				this.#preparedHeaders ??= {};
				this.#preparedHeaders[name.toLowerCase()] = value;
			}
		}
		if (this.finalized) {
			if (options2?.append) {
				this.res.headers.append(name, value);
			} else {
				this.res.headers.set(name, value);
			}
		}
	}, "header");
	status = /* @__PURE__ */ __name((status) => {
		this.#isFresh = false;
		this.#status = status;
	}, "status");
	set = /* @__PURE__ */ __name((key, value) => {
		this.#var ??= /* @__PURE__ */ new Map();
		this.#var.set(key, value);
	}, "set");
	get = /* @__PURE__ */ __name((key) => {
		return this.#var ? this.#var.get(key) : void 0;
	}, "get");
	get var() {
		if (!this.#var) {
			return {};
		}
		return Object.fromEntries(this.#var);
	}
	#newResponse(data, arg, headers) {
		if (this.#isFresh && !headers && !arg && this.#status === 200) {
			return new Response(data, {
				headers: this.#preparedHeaders,
			});
		}
		if (arg && typeof arg !== "number") {
			const header = new Headers(arg.headers);
			if (this.#headers) {
				this.#headers.forEach((v, k) => {
					if (k === "set-cookie") {
						header.append(k, v);
					} else {
						header.set(k, v);
					}
				});
			}
			const headers2 = setHeaders(header, this.#preparedHeaders);
			return new Response(data, {
				headers: headers2,
				status: arg.status ?? this.#status,
			});
		}
		const status = typeof arg === "number" ? arg : this.#status;
		this.#preparedHeaders ??= {};
		this.#headers ??= new Headers();
		setHeaders(this.#headers, this.#preparedHeaders);
		if (this.#res) {
			this.#res.headers.forEach((v, k) => {
				if (k === "set-cookie") {
					this.#headers?.append(k, v);
				} else {
					this.#headers?.set(k, v);
				}
			});
			setHeaders(this.#headers, this.#preparedHeaders);
		}
		headers ??= {};
		for (const [k, v] of Object.entries(headers)) {
			if (typeof v === "string") {
				this.#headers.set(k, v);
			} else {
				this.#headers.delete(k);
				for (const v2 of v) {
					this.#headers.append(k, v2);
				}
			}
		}
		return new Response(data, {
			status,
			headers: this.#headers,
		});
	}
	newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
	body = /* @__PURE__ */ __name((data, arg, headers) => {
		return typeof arg === "number"
			? this.#newResponse(data, arg, headers)
			: this.#newResponse(data, arg);
	}, "body");
	text = /* @__PURE__ */ __name((text, arg, headers) => {
		if (!this.#preparedHeaders) {
			if (this.#isFresh && !headers && !arg) {
				return new Response(text);
			}
			this.#preparedHeaders = {};
		}
		this.#preparedHeaders["content-type"] = TEXT_PLAIN;
		if (typeof arg === "number") {
			return this.#newResponse(text, arg, headers);
		}
		return this.#newResponse(text, arg);
	}, "text");
	json = /* @__PURE__ */ __name((object, arg, headers) => {
		const body = JSON.stringify(object);
		this.#preparedHeaders ??= {};
		this.#preparedHeaders["content-type"] = "application/json";
		return typeof arg === "number"
			? this.#newResponse(body, arg, headers)
			: this.#newResponse(body, arg);
	}, "json");
	html = /* @__PURE__ */ __name((html3, arg, headers) => {
		this.#preparedHeaders ??= {};
		this.#preparedHeaders["content-type"] = "text/html; charset=UTF-8";
		if (typeof html3 === "object") {
			return resolveCallback(html3, HtmlEscapedCallbackPhase.Stringify, false, {}).then(
				(html22) => {
					return typeof arg === "number"
						? this.#newResponse(html22, arg, headers)
						: this.#newResponse(html22, arg);
				},
			);
		}
		return typeof arg === "number"
			? this.#newResponse(html3, arg, headers)
			: this.#newResponse(html3, arg);
	}, "html");
	redirect = /* @__PURE__ */ __name((location, status) => {
		this.#headers ??= new Headers();
		this.#headers.set("Location", String(location));
		return this.newResponse(null, status ?? 302);
	}, "redirect");
	notFound = /* @__PURE__ */ __name(() => {
		this.#notFoundHandler ??= () => new Response();
		return this.#notFoundHandler(this);
	}, "notFound");
};

// node_modules/hono/dist/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
	static {
		__name(this, "UnsupportedPathError");
	}
};

// node_modules/hono/dist/utils/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
	return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
	if ("getResponse" in err) {
		return err.getResponse();
	}
	console.error(err);
	return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class {
	static {
		__name(this, "Hono");
	}
	get;
	post;
	put;
	delete;
	options;
	patch;
	all;
	on;
	use;
	router;
	getPath;
	_basePath = "/";
	#path = "/";
	routes = [];
	constructor(options2 = {}) {
		const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
		allMethods.forEach((method) => {
			this[method] = (args1, ...args) => {
				if (typeof args1 === "string") {
					this.#path = args1;
				} else {
					this.#addRoute(method, this.#path, args1);
				}
				args.forEach((handler) => {
					this.#addRoute(method, this.#path, handler);
				});
				return this;
			};
		});
		this.on = (method, path, ...handlers) => {
			for (const p of [path].flat()) {
				this.#path = p;
				for (const m of [method].flat()) {
					handlers.map((handler) => {
						this.#addRoute(m.toUpperCase(), this.#path, handler);
					});
				}
			}
			return this;
		};
		this.use = (arg1, ...handlers) => {
			if (typeof arg1 === "string") {
				this.#path = arg1;
			} else {
				this.#path = "*";
				handlers.unshift(arg1);
			}
			handlers.forEach((handler) => {
				this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
			});
			return this;
		};
		const { strict, ...optionsWithoutStrict } = options2;
		Object.assign(this, optionsWithoutStrict);
		this.getPath = (strict ?? true) ? (options2.getPath ?? getPath) : getPathNoStrict;
	}
	#clone() {
		const clone = new Hono({
			router: this.router,
			getPath: this.getPath,
		});
		clone.routes = this.routes;
		return clone;
	}
	#notFoundHandler = notFoundHandler;
	errorHandler = errorHandler;
	route(path, app2) {
		const subApp = this.basePath(path);
		app2.routes.map((r) => {
			let handler;
			if (app2.errorHandler === errorHandler) {
				handler = r.handler;
			} else {
				handler = /* @__PURE__ */ __name(
					async (c, next) =>
						(await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res,
					"handler",
				);
				handler[COMPOSED_HANDLER] = r.handler;
			}
			subApp.#addRoute(r.method, r.path, handler);
		});
		return this;
	}
	basePath(path) {
		const subApp = this.#clone();
		subApp._basePath = mergePath(this._basePath, path);
		return subApp;
	}
	onError = /* @__PURE__ */ __name((handler) => {
		this.errorHandler = handler;
		return this;
	}, "onError");
	notFound = /* @__PURE__ */ __name((handler) => {
		this.#notFoundHandler = handler;
		return this;
	}, "notFound");
	mount(path, applicationHandler, options2) {
		let replaceRequest;
		let optionHandler;
		if (options2) {
			if (typeof options2 === "function") {
				optionHandler = options2;
			} else {
				optionHandler = options2.optionHandler;
				replaceRequest = options2.replaceRequest;
			}
		}
		const getOptions = optionHandler
			? (c) => {
					const options22 = optionHandler(c);
					return Array.isArray(options22) ? options22 : [options22];
				}
			: (c) => {
					let executionContext = void 0;
					try {
						executionContext = c.executionCtx;
					} catch {}
					return [c.env, executionContext];
				};
		replaceRequest ||= (() => {
			const mergedPath = mergePath(this._basePath, path);
			const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
			return (request) => {
				const url = new URL(request.url);
				url.pathname = url.pathname.slice(pathPrefixLength) || "/";
				return new Request(url, request);
			};
		})();
		const handler = /* @__PURE__ */ __name(async (c, next) => {
			const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
			if (res) {
				return res;
			}
			await next();
		}, "handler");
		this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
		return this;
	}
	#addRoute(method, path, handler) {
		method = method.toUpperCase();
		path = mergePath(this._basePath, path);
		const r = { path, method, handler };
		this.router.add(method, path, [handler, r]);
		this.routes.push(r);
	}
	#handleError(err, c) {
		if (err instanceof Error) {
			return this.errorHandler(err, c);
		}
		throw err;
	}
	#dispatch(request, executionCtx, env4, method) {
		if (method === "HEAD") {
			return (async () =>
				new Response(null, await this.#dispatch(request, executionCtx, env4, "GET")))();
		}
		const path = this.getPath(request, { env: env4 });
		const matchResult = this.router.match(method, path);
		const c = new Context(request, {
			path,
			matchResult,
			env: env4,
			executionCtx,
			notFoundHandler: this.#notFoundHandler,
		});
		if (matchResult[0].length === 1) {
			let res;
			try {
				res = matchResult[0][0][0][0](c, async () => {
					c.res = await this.#notFoundHandler(c);
				});
			} catch (err) {
				return this.#handleError(err, c);
			}
			return res instanceof Promise
				? res
						.then(
							(resolved) =>
								resolved || (c.finalized ? c.res : this.#notFoundHandler(c)),
						)
						.catch((err) => this.#handleError(err, c))
				: (res ?? this.#notFoundHandler(c));
		}
		const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
		return (async () => {
			try {
				const context2 = await composed(c);
				if (!context2.finalized) {
					throw new Error(
						"Context is not finalized. Did you forget to return a Response object or `await next()`?",
					);
				}
				return context2.res;
			} catch (err) {
				return this.#handleError(err, c);
			}
		})();
	}
	fetch = /* @__PURE__ */ __name((request, ...rest) => {
		return this.#dispatch(request, rest[1], rest[0], request.method);
	}, "fetch");
	request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
		if (input instanceof Request) {
			return this.fetch(
				requestInit ? new Request(input, requestInit) : input,
				Env,
				executionCtx,
			);
		}
		input = input.toString();
		return this.fetch(
			new Request(
				/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
				requestInit,
			),
			Env,
			executionCtx,
		);
	}, "request");
	fire = /* @__PURE__ */ __name(() => {
		addEventListener("fetch", (event) => {
			event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
		});
	}, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
	if (a.length === 1) {
		return b.length === 1 ? (a < b ? -1 : 1) : -1;
	}
	if (b.length === 1) {
		return 1;
	}
	if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
		return 1;
	} else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
		return -1;
	}
	if (a === LABEL_REG_EXP_STR) {
		return 1;
	} else if (b === LABEL_REG_EXP_STR) {
		return -1;
	}
	return a.length === b.length ? (a < b ? -1 : 1) : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class {
	static {
		__name(this, "Node");
	}
	#index;
	#varIndex;
	#children = /* @__PURE__ */ Object.create(null);
	insert(tokens, index2, paramMap, context2, pathErrorCheckOnly) {
		if (tokens.length === 0) {
			if (this.#index !== void 0) {
				throw PATH_ERROR;
			}
			if (pathErrorCheckOnly) {
				return;
			}
			this.#index = index2;
			return;
		}
		const [token, ...restTokens] = tokens;
		const pattern =
			token === "*"
				? restTokens.length === 0
					? ["", "", ONLY_WILDCARD_REG_EXP_STR]
					: ["", "", LABEL_REG_EXP_STR]
				: token === "/*"
					? ["", "", TAIL_WILDCARD_REG_EXP_STR]
					: token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
		let node;
		if (pattern) {
			const name = pattern[1];
			let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
			if (name && pattern[2]) {
				regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
				if (/\((?!\?:)/.test(regexpStr)) {
					throw PATH_ERROR;
				}
			}
			node = this.#children[regexpStr];
			if (!node) {
				if (
					Object.keys(this.#children).some(
						(k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR,
					)
				) {
					throw PATH_ERROR;
				}
				if (pathErrorCheckOnly) {
					return;
				}
				node = this.#children[regexpStr] = new Node();
				if (name !== "") {
					node.#varIndex = context2.varIndex++;
				}
			}
			if (!pathErrorCheckOnly && name !== "") {
				paramMap.push([name, node.#varIndex]);
			}
		} else {
			node = this.#children[token];
			if (!node) {
				if (
					Object.keys(this.#children).some(
						(k) =>
							k.length > 1 &&
							k !== ONLY_WILDCARD_REG_EXP_STR &&
							k !== TAIL_WILDCARD_REG_EXP_STR,
					)
				) {
					throw PATH_ERROR;
				}
				if (pathErrorCheckOnly) {
					return;
				}
				node = this.#children[token] = new Node();
			}
		}
		node.insert(restTokens, index2, paramMap, context2, pathErrorCheckOnly);
	}
	buildRegExpStr() {
		const childKeys = Object.keys(this.#children).sort(compareKey);
		const strList = childKeys.map((k) => {
			const c = this.#children[k];
			return (
				(typeof c.#varIndex === "number"
					? `(${k})@${c.#varIndex}`
					: regExpMetaChars.has(k)
						? `\\${k}`
						: k) + c.buildRegExpStr()
			);
		});
		if (typeof this.#index === "number") {
			strList.unshift(`#${this.#index}`);
		}
		if (strList.length === 0) {
			return "";
		}
		if (strList.length === 1) {
			return strList[0];
		}
		return "(?:" + strList.join("|") + ")";
	}
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Trie = class {
	static {
		__name(this, "Trie");
	}
	#context = { varIndex: 0 };
	#root = new Node();
	insert(path, index2, pathErrorCheckOnly) {
		const paramAssoc = [];
		const groups = [];
		for (let i = 0; ; ) {
			let replaced = false;
			path = path.replace(/\{[^}]+\}/g, (m) => {
				const mark = `@\\${i}`;
				groups[i] = [mark, m];
				i++;
				replaced = true;
				return mark;
			});
			if (!replaced) {
				break;
			}
		}
		const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
		for (let i = groups.length - 1; i >= 0; i--) {
			const [mark] = groups[i];
			for (let j = tokens.length - 1; j >= 0; j--) {
				if (tokens[j].indexOf(mark) !== -1) {
					tokens[j] = tokens[j].replace(mark, groups[i][1]);
					break;
				}
			}
		}
		this.#root.insert(tokens, index2, paramAssoc, this.#context, pathErrorCheckOnly);
		return paramAssoc;
	}
	buildRegExp() {
		let regexp = this.#root.buildRegExpStr();
		if (regexp === "") {
			return [/^$/, [], []];
		}
		let captureIndex = 0;
		const indexReplacementMap = [];
		const paramReplacementMap = [];
		regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
			if (handlerIndex !== void 0) {
				indexReplacementMap[++captureIndex] = Number(handlerIndex);
				return "$()";
			}
			if (paramIndex !== void 0) {
				paramReplacementMap[Number(paramIndex)] = ++captureIndex;
				return "";
			}
			return "";
		});
		return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
	}
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
	return (wildcardRegExpCache[path] ??= new RegExp(
		path === "*"
			? ""
			: `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) =>
					metaChar ? `\\${metaChar}` : "(?:|/.*)",
				)}$`,
	));
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
	wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
	const trie = new Trie();
	const handlerData = [];
	if (routes.length === 0) {
		return nullMatcher;
	}
	const routesWithStaticPathFlag = routes
		.map((route) => [!/\*|\/:/.test(route[0]), ...route])
		.sort(([isStaticA, pathA], [isStaticB, pathB]) =>
			isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length,
		);
	const staticMap = /* @__PURE__ */ Object.create(null);
	for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
		const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
		if (pathErrorCheckOnly) {
			staticMap[path] = [
				handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]),
				emptyParam,
			];
		} else {
			j++;
		}
		let paramAssoc;
		try {
			paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
		} catch (e) {
			throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
		}
		if (pathErrorCheckOnly) {
			continue;
		}
		handlerData[j] = handlers.map(([h, paramCount]) => {
			const paramIndexMap = /* @__PURE__ */ Object.create(null);
			paramCount -= 1;
			for (; paramCount >= 0; paramCount--) {
				const [key, value] = paramAssoc[paramCount];
				paramIndexMap[key] = value;
			}
			return [h, paramIndexMap];
		});
	}
	const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
	for (let i = 0, len = handlerData.length; i < len; i++) {
		for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
			const map = handlerData[i][j]?.[1];
			if (!map) {
				continue;
			}
			const keys = Object.keys(map);
			for (let k = 0, len3 = keys.length; k < len3; k++) {
				map[keys[k]] = paramReplacementMap[map[keys[k]]];
			}
		}
	}
	const handlerMap = [];
	for (const i in indexReplacementMap) {
		handlerMap[i] = handlerData[indexReplacementMap[i]];
	}
	return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
	if (!middleware) {
		return void 0;
	}
	for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
		if (buildWildcardRegExp(k).test(path)) {
			return [...middleware[k]];
		}
	}
	return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
	static {
		__name(this, "RegExpRouter");
	}
	name = "RegExpRouter";
	#middleware;
	#routes;
	constructor() {
		this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
		this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
	}
	add(method, path, handler) {
		const middleware = this.#middleware;
		const routes = this.#routes;
		if (!middleware || !routes) {
			throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
		}
		if (!middleware[method]) {
			[middleware, routes].forEach((handlerMap) => {
				handlerMap[method] = /* @__PURE__ */ Object.create(null);
				Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
					handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
				});
			});
		}
		if (path === "/*") {
			path = "*";
		}
		const paramCount = (path.match(/\/:/g) || []).length;
		if (/\*$/.test(path)) {
			const re = buildWildcardRegExp(path);
			if (method === METHOD_NAME_ALL) {
				Object.keys(middleware).forEach((m) => {
					middleware[m][path] ||=
						findMiddleware(middleware[m], path) ||
						findMiddleware(middleware[METHOD_NAME_ALL], path) ||
						[];
				});
			} else {
				middleware[method][path] ||=
					findMiddleware(middleware[method], path) ||
					findMiddleware(middleware[METHOD_NAME_ALL], path) ||
					[];
			}
			Object.keys(middleware).forEach((m) => {
				if (method === METHOD_NAME_ALL || method === m) {
					Object.keys(middleware[m]).forEach((p) => {
						re.test(p) && middleware[m][p].push([handler, paramCount]);
					});
				}
			});
			Object.keys(routes).forEach((m) => {
				if (method === METHOD_NAME_ALL || method === m) {
					Object.keys(routes[m]).forEach(
						(p) => re.test(p) && routes[m][p].push([handler, paramCount]),
					);
				}
			});
			return;
		}
		const paths = checkOptionalParameter(path) || [path];
		for (let i = 0, len = paths.length; i < len; i++) {
			const path2 = paths[i];
			Object.keys(routes).forEach((m) => {
				if (method === METHOD_NAME_ALL || method === m) {
					routes[m][path2] ||= [
						...(findMiddleware(middleware[m], path2) ||
							findMiddleware(middleware[METHOD_NAME_ALL], path2) ||
							[]),
					];
					routes[m][path2].push([handler, paramCount - len + i + 1]);
				}
			});
		}
	}
	match(method, path) {
		clearWildcardRegExpCache();
		const matchers = this.#buildAllMatchers();
		this.match = (method2, path2) => {
			const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
			const staticMatch = matcher[2][path2];
			if (staticMatch) {
				return staticMatch;
			}
			const match = path2.match(matcher[0]);
			if (!match) {
				return [[], emptyParam];
			}
			const index2 = match.indexOf("", 1);
			return [matcher[1][index2], match];
		};
		return this.match(method, path);
	}
	#buildAllMatchers() {
		const matchers = /* @__PURE__ */ Object.create(null);
		Object.keys(this.#routes)
			.concat(Object.keys(this.#middleware))
			.forEach((method) => {
				matchers[method] ||= this.#buildMatcher(method);
			});
		this.#middleware = this.#routes = void 0;
		return matchers;
	}
	#buildMatcher(method) {
		const routes = [];
		let hasOwnRoute = method === METHOD_NAME_ALL;
		[this.#middleware, this.#routes].forEach((r) => {
			const ownRoute = r[method]
				? Object.keys(r[method]).map((path) => [path, r[method][path]])
				: [];
			if (ownRoute.length !== 0) {
				hasOwnRoute ||= true;
				routes.push(...ownRoute);
			} else if (method !== METHOD_NAME_ALL) {
				routes.push(
					...Object.keys(r[METHOD_NAME_ALL]).map((path) => [
						path,
						r[METHOD_NAME_ALL][path],
					]),
				);
			}
		});
		if (!hasOwnRoute) {
			return null;
		} else {
			return buildMatcherFromPreprocessedRoutes(routes);
		}
	}
};

// node_modules/hono/dist/router/smart-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SmartRouter = class {
	static {
		__name(this, "SmartRouter");
	}
	name = "SmartRouter";
	#routers = [];
	#routes = [];
	constructor(init) {
		this.#routers = init.routers;
	}
	add(method, path, handler) {
		if (!this.#routes) {
			throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
		}
		this.#routes.push([method, path, handler]);
	}
	match(method, path) {
		if (!this.#routes) {
			throw new Error("Fatal error");
		}
		const routers = this.#routers;
		const routes = this.#routes;
		const len = routers.length;
		let i = 0;
		let res;
		for (; i < len; i++) {
			const router = routers[i];
			try {
				for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
					router.add(...routes[i2]);
				}
				res = router.match(method, path);
			} catch (e) {
				if (e instanceof UnsupportedPathError) {
					continue;
				}
				throw e;
			}
			this.match = router.match.bind(router);
			this.#routers = [router];
			this.#routes = void 0;
			break;
		}
		if (i === len) {
			throw new Error("Fatal error");
		}
		this.name = `SmartRouter + ${this.activeRouter.name}`;
		return res;
	}
	get activeRouter() {
		if (this.#routes || this.#routers.length !== 1) {
			throw new Error("No active router has been determined yet.");
		}
		return this.#routers[0];
	}
};

// node_modules/hono/dist/router/trie-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
	static {
		__name(this, "Node");
	}
	#methods;
	#children;
	#patterns;
	#order = 0;
	#params = emptyParams;
	constructor(method, handler, children) {
		this.#children = children || /* @__PURE__ */ Object.create(null);
		this.#methods = [];
		if (method && handler) {
			const m = /* @__PURE__ */ Object.create(null);
			m[method] = { handler, possibleKeys: [], score: 0 };
			this.#methods = [m];
		}
		this.#patterns = [];
	}
	insert(method, path, handler) {
		this.#order = ++this.#order;
		let curNode = this;
		const parts = splitRoutingPath(path);
		const possibleKeys = [];
		for (let i = 0, len = parts.length; i < len; i++) {
			const p = parts[i];
			const nextP = parts[i + 1];
			const pattern = getPattern(p, nextP);
			const key = Array.isArray(pattern) ? pattern[0] : p;
			if (Object.keys(curNode.#children).includes(key)) {
				curNode = curNode.#children[key];
				const pattern2 = getPattern(p, nextP);
				if (pattern2) {
					possibleKeys.push(pattern2[1]);
				}
				continue;
			}
			curNode.#children[key] = new Node2();
			if (pattern) {
				curNode.#patterns.push(pattern);
				possibleKeys.push(pattern[1]);
			}
			curNode = curNode.#children[key];
		}
		const m = /* @__PURE__ */ Object.create(null);
		const handlerSet = {
			handler,
			possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
			score: this.#order,
		};
		m[method] = handlerSet;
		curNode.#methods.push(m);
		return curNode;
	}
	#getHandlerSets(node, method, nodeParams, params) {
		const handlerSets = [];
		for (let i = 0, len = node.#methods.length; i < len; i++) {
			const m = node.#methods[i];
			const handlerSet = m[method] || m[METHOD_NAME_ALL];
			const processedSet = {};
			if (handlerSet !== void 0) {
				handlerSet.params = /* @__PURE__ */ Object.create(null);
				handlerSets.push(handlerSet);
				if (nodeParams !== emptyParams || (params && params !== emptyParams)) {
					for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
						const key = handlerSet.possibleKeys[i2];
						const processed = processedSet[handlerSet.score];
						handlerSet.params[key] =
							params?.[key] && !processed
								? params[key]
								: (nodeParams[key] ?? params?.[key]);
						processedSet[handlerSet.score] = true;
					}
				}
			}
		}
		return handlerSets;
	}
	search(method, path) {
		const handlerSets = [];
		this.#params = emptyParams;
		let curNodes = [this];
		const parts = splitPath(path);
		const curNodesQueue = [];
		for (let i = 0, len = parts.length; i < len; i++) {
			const part = parts[i];
			const isLast = i === len - 1;
			const tempNodes = [];
			for (let j = 0, len2 = curNodes.length; j < len2; j++) {
				const node = curNodes[j];
				const nextNode = node.#children[part];
				if (nextNode) {
					nextNode.#params = node.#params;
					if (isLast) {
						if (nextNode.#children["*"]) {
							handlerSets.push(
								...this.#getHandlerSets(
									nextNode.#children["*"],
									method,
									node.#params,
								),
							);
						}
						handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
					} else {
						tempNodes.push(nextNode);
					}
				}
				for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
					const pattern = node.#patterns[k];
					const params = node.#params === emptyParams ? {} : { ...node.#params };
					if (pattern === "*") {
						const astNode = node.#children["*"];
						if (astNode) {
							handlerSets.push(
								...this.#getHandlerSets(astNode, method, node.#params),
							);
							astNode.#params = params;
							tempNodes.push(astNode);
						}
						continue;
					}
					if (part === "") {
						continue;
					}
					const [key, name, matcher] = pattern;
					const child = node.#children[key];
					const restPathString = parts.slice(i).join("/");
					if (matcher instanceof RegExp) {
						const m = matcher.exec(restPathString);
						if (m) {
							params[name] = m[0];
							handlerSets.push(
								...this.#getHandlerSets(child, method, node.#params, params),
							);
							if (Object.keys(child.#children).length) {
								child.#params = params;
								const componentCount = m[0].match(/\//)?.length ?? 0;
								const targetCurNodes = (curNodesQueue[componentCount] ||= []);
								targetCurNodes.push(child);
							}
							continue;
						}
					}
					if (matcher === true || matcher.test(part)) {
						params[name] = part;
						if (isLast) {
							handlerSets.push(
								...this.#getHandlerSets(child, method, params, node.#params),
							);
							if (child.#children["*"]) {
								handlerSets.push(
									...this.#getHandlerSets(
										child.#children["*"],
										method,
										params,
										node.#params,
									),
								);
							}
						} else {
							child.#params = params;
							tempNodes.push(child);
						}
					}
				}
			}
			curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
		}
		if (handlerSets.length > 1) {
			handlerSets.sort((a, b) => {
				return a.score - b.score;
			});
		}
		return [handlerSets.map(({ handler, params }) => [handler, params])];
	}
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
	static {
		__name(this, "TrieRouter");
	}
	name = "TrieRouter";
	#node;
	constructor() {
		this.#node = new Node2();
	}
	add(method, path, handler) {
		const results = checkOptionalParameter(path);
		if (results) {
			for (let i = 0, len = results.length; i < len; i++) {
				this.#node.insert(method, results[i], handler);
			}
			return;
		}
		this.#node.insert(method, path, handler);
	}
	match(method, path) {
		return this.#node.search(method, path);
	}
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
	static {
		__name(this, "Hono");
	}
	constructor(options2 = {}) {
		super(options2);
		this.router =
			options2.router ??
			new SmartRouter({
				routers: [new RegExpRouter(), new TrieRouter()],
			});
	}
};

// src/web/handlers/index.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/web/handlers/root.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/web/templates/baseLayout.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_html2();
init_routes();
var _a;
var layout = /* @__PURE__ */ __name(
	(content, title2) =>
		html(
			_a ||
				(_a = __template([
					'\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8"/>\n        <meta\n                name="viewport"\n                content="width=device-width, initial-scale=1.0"\n        />\n        <title>',
					`</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: "#3498db",
                            secondary: "#2ecc71",
                            accent: "#f39c12",
                        },
                        fontFamily: {
                            sans: ["Inter", "system-ui", "sans-serif"],
                            heading: ["Roboto", "system-ui", "sans-serif"],
                        },
                    },
                },
            };
        <\/script>
        <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body
            class="bg-gray-50 text-gray-800 font-sans leading-relaxed flex flex-col min-h-screen"
    >
    <header class="bg-white shadow-sm mb-8">
        <div
                class="container mx-auto px-4 py-4 flex justify-between items-center"
        >
            <a
                    href='`,
					`'
                    class="text-xl font-heading font-bold text-primary hover:text-primary/80 transition-colors"
            >Kollektiv MCP</a
            >
        </div>
    </header>
    <main class="container mx-auto px-4 pb-12 flex-grow">
        `,
					'\n    </main>\n    <footer class="bg-gray-100 py-6 mt-12">\n        <div class="container mx-auto px-4 text-center text-gray-600">\n            <p>\n                &copy; ',
					" Kollektiv MCP.\n                All rights reserved.\n            </p>\n        </div>\n    </footer>\n    </body>\n    </html>\n",
				])),
			title2,
			AppRoutes.AUTHORIZE,
			content,
			/* @__PURE__ */ new Date().getFullYear(),
		),
	"layout",
);

// src/web/templates/root.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_html2();

// node_modules/marked/lib/marked.esm.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function _getDefaults() {
	return {
		async: false,
		breaks: false,
		extensions: null,
		gfm: true,
		hooks: null,
		pedantic: false,
		renderer: null,
		silent: false,
		tokenizer: null,
		walkTokens: null,
	};
}
__name(_getDefaults, "_getDefaults");
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
	_defaults = newDefaults;
}
__name(changeDefaults, "changeDefaults");
var noopTest = { exec: /* @__PURE__ */ __name(() => null, "exec") };
function edit(regex, opt = "") {
	let source = typeof regex === "string" ? regex : regex.source;
	const obj = {
		replace: /* @__PURE__ */ __name((name, val) => {
			let valSource = typeof val === "string" ? val : val.source;
			valSource = valSource.replace(other.caret, "$1");
			source = source.replace(name, valSource);
			return obj;
		}, "replace"),
		getRegex: /* @__PURE__ */ __name(() => {
			return new RegExp(source, opt);
		}, "getRegex"),
	};
	return obj;
}
__name(edit, "edit");
var other = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceTabs: /^\t+/,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] /,
	listReplaceTask: /^\[[ xX]\] +/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: /* @__PURE__ */ __name(
		(bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
		"listItemRegex",
	),
	nextBulletRegex: /* @__PURE__ */ __name(
		(indent) =>
			new RegExp(
				`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`,
			),
		"nextBulletRegex",
	),
	hrRegex: /* @__PURE__ */ __name(
		(indent) =>
			new RegExp(
				`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
			),
		"hrRegex",
	),
	fencesBeginRegex: /* @__PURE__ */ __name(
		(indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
		"fencesBeginRegex",
	),
	headingBeginRegex: /* @__PURE__ */ __name(
		(indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
		"headingBeginRegex",
	),
	htmlBeginRegex: /* @__PURE__ */ __name(
		(indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i"),
		"htmlBeginRegex",
	),
};
var newline = /^(?:[ \t]*(?:\n|$))+/;
var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var fences =
	/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheadingCore =
	/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var lheading = edit(lheadingCore)
	.replace(/bull/g, bullet)
	.replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
	.replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
	.replace(/blockquote/g, / {0,3}>/)
	.replace(/heading/g, / {0,3}#{1,6}/)
	.replace(/html/g, / {0,3}<[^\n>]+>\n/)
	.replace(/\|table/g, "")
	.getRegex();
var lheadingGfm = edit(lheadingCore)
	.replace(/bull/g, bullet)
	.replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
	.replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
	.replace(/blockquote/g, / {0,3}>/)
	.replace(/heading/g, / {0,3}#{1,6}/)
	.replace(/html/g, / {0,3}<[^\n>]+>\n/)
	.replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/)
	.getRegex();
var _paragraph =
	/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(
	/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/,
)
	.replace("label", _blockLabel)
	.replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/)
	.getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
	.replace(/bull/g, bullet)
	.getRegex();
var _tag =
	"address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html2 = edit(
	"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
	"i",
)
	.replace("comment", _comment)
	.replace("tag", _tag)
	.replace(
		"attribute",
		/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
	)
	.getRegex();
var paragraph = edit(_paragraph)
	.replace("hr", hr)
	.replace("heading", " {0,3}#{1,6}(?:\\s|$)")
	.replace("|lheading", "")
	.replace("|table", "")
	.replace("blockquote", " {0,3}>")
	.replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
	.replace("list", " {0,3}(?:[*+-]|1[.)]) ")
	.replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)")
	.replace("tag", _tag)
	.getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
	.replace("paragraph", paragraph)
	.getRegex();
var blockNormal = {
	blockquote,
	code: blockCode,
	def,
	fences,
	heading,
	hr,
	html: html2,
	lheading,
	list,
	newline,
	paragraph,
	table: noopTest,
	text: blockText,
};
var gfmTable = edit(
	"^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
)
	.replace("hr", hr)
	.replace("heading", " {0,3}#{1,6}(?:\\s|$)")
	.replace("blockquote", " {0,3}>")
	.replace("code", "(?: {4}| {0,3}	)[^\\n]")
	.replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
	.replace("list", " {0,3}(?:[*+-]|1[.)]) ")
	.replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)")
	.replace("tag", _tag)
	.getRegex();
var blockGfm = {
	...blockNormal,
	lheading: lheadingGfm,
	table: gfmTable,
	paragraph: edit(_paragraph)
		.replace("hr", hr)
		.replace("heading", " {0,3}#{1,6}(?:\\s|$)")
		.replace("|lheading", "")
		.replace("table", gfmTable)
		.replace("blockquote", " {0,3}>")
		.replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
		.replace("list", " {0,3}(?:[*+-]|1[.)]) ")
		.replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)")
		.replace("tag", _tag)
		.getRegex(),
};
var blockPedantic = {
	...blockNormal,
	html: edit(
		`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`,
	)
		.replace("comment", _comment)
		.replace(
			/tag/g,
			"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
		)
		.getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: noopTest,
	// fences not supported
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: edit(_paragraph)
		.replace("hr", hr)
		.replace("heading", " *#{1,6} *[^\n]")
		.replace("lheading", lheading)
		.replace("|table", "")
		.replace("blockquote", " {0,3}>")
		.replace("|fences", "")
		.replace("|list", "")
		.replace("|html", "")
		.replace("|tag", "")
		.getRegex(),
};
var escape$1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = /[\p{P}\p{S}]/u;
var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
var punctuation = edit(/^((?![*_])punctSpace)/, "u")
	.replace(/punctSpace/g, _punctuationOrSpace)
	.getRegex();
var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongLDelimGfm = edit(emStrongLDelimCore, "u")
	.replace(/punct/g, _punctuationGfmStrongEm)
	.getRegex();
var emStrongRDelimAstCore =
	"^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu")
	.replace(/notPunctSpace/g, _notPunctuationOrSpace)
	.replace(/punctSpace/g, _punctuationOrSpace)
	.replace(/punct/g, _punctuation)
	.getRegex();
var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu")
	.replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm)
	.replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm)
	.replace(/punct/g, _punctuationGfmStrongEm)
	.getRegex();
var emStrongRDelimUnd = edit(
	"^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
	"gu",
)
	.replace(/notPunctSpace/g, _notPunctuationOrSpace)
	.replace(/punctSpace/g, _punctuationOrSpace)
	.replace(/punct/g, _punctuation)
	.getRegex();
var anyPunctuation = edit(/\\(punct)/, "gu")
	.replace(/punct/g, _punctuation)
	.getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
	.replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
	.replace(
		"email",
		/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
	)
	.getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit(
	"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
)
	.replace("comment", _inlineComment)
	.replace(
		"attribute",
		/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
	)
	.getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
	.replace("label", _inlineLabel)
	.replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
	.replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/)
	.getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/)
	.replace("label", _inlineLabel)
	.replace("ref", _blockLabel)
	.getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/)
	.replace("ref", _blockLabel)
	.getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g")
	.replace("reflink", reflink)
	.replace("nolink", nolink)
	.getRegex();
var inlineNormal = {
	_backpedal: noopTest,
	// only used for GFM url
	anyPunctuation,
	autolink,
	blockSkip,
	br,
	code: inlineCode,
	del: noopTest,
	emStrongLDelim,
	emStrongRDelimAst,
	emStrongRDelimUnd,
	escape: escape$1,
	link,
	nolink,
	punctuation,
	reflink,
	reflinkSearch,
	tag,
	text: inlineText,
	url: noopTest,
};
var inlinePedantic = {
	...inlineNormal,
	link: edit(/^!?\[(label)\]\((.*?)\)/)
		.replace("label", _inlineLabel)
		.getRegex(),
	reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
		.replace("label", _inlineLabel)
		.getRegex(),
};
var inlineGfm = {
	...inlineNormal,
	emStrongRDelimAst: emStrongRDelimAstGfm,
	emStrongLDelim: emStrongLDelimGfm,
	url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i")
		.replace(
			"email",
			/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
		)
		.getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
	text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
};
var inlineBreaks = {
	...inlineGfm,
	br: edit(br).replace("{2,}", "*").getRegex(),
	text: edit(inlineGfm.text)
		.replace("\\b_", "\\b_| {2,}\\n")
		.replace(/\{2,\}/g, "*")
		.getRegex(),
};
var block = {
	normal: blockNormal,
	gfm: blockGfm,
	pedantic: blockPedantic,
};
var inline = {
	normal: inlineNormal,
	gfm: inlineGfm,
	breaks: inlineBreaks,
	pedantic: inlinePedantic,
};
var escapeReplacements = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};
var getEscapeReplacement = /* @__PURE__ */ __name(
	(ch) => escapeReplacements[ch],
	"getEscapeReplacement",
);
function escape(html3, encode) {
	if (encode) {
		if (other.escapeTest.test(html3)) {
			return html3.replace(other.escapeReplace, getEscapeReplacement);
		}
	} else {
		if (other.escapeTestNoEncode.test(html3)) {
			return html3.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
		}
	}
	return html3;
}
__name(escape, "escape");
function cleanUrl(href) {
	try {
		href = encodeURI(href).replace(other.percentDecode, "%");
	} catch {
		return null;
	}
	return href;
}
__name(cleanUrl, "cleanUrl");
function splitCells(tableRow, count3) {
	const row = tableRow.replace(other.findPipe, (match, offset, str) => {
			let escaped = false;
			let curr = offset;
			while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
			if (escaped) {
				return "|";
			} else {
				return " |";
			}
		}),
		cells = row.split(other.splitPipe);
	let i = 0;
	if (!cells[0].trim()) {
		cells.shift();
	}
	if (cells.length > 0 && !cells.at(-1)?.trim()) {
		cells.pop();
	}
	if (count3) {
		if (cells.length > count3) {
			cells.splice(count3);
		} else {
			while (cells.length < count3) cells.push("");
		}
	}
	for (; i < cells.length; i++) {
		cells[i] = cells[i].trim().replace(other.slashPipe, "|");
	}
	return cells;
}
__name(splitCells, "splitCells");
function rtrim(str, c, invert) {
	const l = str.length;
	if (l === 0) {
		return "";
	}
	let suffLen = 0;
	while (suffLen < l) {
		const currChar = str.charAt(l - suffLen - 1);
		if (currChar === c && true) {
			suffLen++;
		} else {
			break;
		}
	}
	return str.slice(0, l - suffLen);
}
__name(rtrim, "rtrim");
function findClosingBracket(str, b) {
	if (str.indexOf(b[1]) === -1) {
		return -1;
	}
	let level = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === "\\") {
			i++;
		} else if (str[i] === b[0]) {
			level++;
		} else if (str[i] === b[1]) {
			level--;
			if (level < 0) {
				return i;
			}
		}
	}
	if (level > 0) {
		return -2;
	}
	return -1;
}
__name(findClosingBracket, "findClosingBracket");
function outputLink(cap, link2, raw2, lexer2, rules) {
	const href = link2.href;
	const title2 = link2.title || null;
	const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
	if (cap[0].charAt(0) !== "!") {
		lexer2.state.inLink = true;
		const token = {
			type: "link",
			raw: raw2,
			href,
			title: title2,
			text,
			tokens: lexer2.inlineTokens(text),
		};
		lexer2.state.inLink = false;
		return token;
	}
	return {
		type: "image",
		raw: raw2,
		href,
		title: title2,
		text,
	};
}
__name(outputLink, "outputLink");
function indentCodeCompensation(raw2, text, rules) {
	const matchIndentToCode = raw2.match(rules.other.indentCodeCompensation);
	if (matchIndentToCode === null) {
		return text;
	}
	const indentToCode = matchIndentToCode[1];
	return text
		.split("\n")
		.map((node) => {
			const matchIndentInNode = node.match(rules.other.beginningSpace);
			if (matchIndentInNode === null) {
				return node;
			}
			const [indentInNode] = matchIndentInNode;
			if (indentInNode.length >= indentToCode.length) {
				return node.slice(indentToCode.length);
			}
			return node;
		})
		.join("\n");
}
__name(indentCodeCompensation, "indentCodeCompensation");
var _Tokenizer = class {
	static {
		__name(this, "_Tokenizer");
	}
	options;
	rules;
	// set by the lexer
	lexer;
	// set by the lexer
	constructor(options2) {
		this.options = options2 || _defaults;
	}
	space(src) {
		const cap = this.rules.block.newline.exec(src);
		if (cap && cap[0].length > 0) {
			return {
				type: "space",
				raw: cap[0],
			};
		}
	}
	code(src) {
		const cap = this.rules.block.code.exec(src);
		if (cap) {
			const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
			return {
				type: "code",
				raw: cap[0],
				codeBlockStyle: "indented",
				text: !this.options.pedantic ? rtrim(text, "\n") : text,
			};
		}
	}
	fences(src) {
		const cap = this.rules.block.fences.exec(src);
		if (cap) {
			const raw2 = cap[0];
			const text = indentCodeCompensation(raw2, cap[3] || "", this.rules);
			return {
				type: "code",
				raw: raw2,
				lang: cap[2]
					? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
					: cap[2],
				text,
			};
		}
	}
	heading(src) {
		const cap = this.rules.block.heading.exec(src);
		if (cap) {
			let text = cap[2].trim();
			if (this.rules.other.endingHash.test(text)) {
				const trimmed = rtrim(text, "#");
				if (this.options.pedantic) {
					text = trimmed.trim();
				} else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
					text = trimmed.trim();
				}
			}
			return {
				type: "heading",
				raw: cap[0],
				depth: cap[1].length,
				text,
				tokens: this.lexer.inline(text),
			};
		}
	}
	hr(src) {
		const cap = this.rules.block.hr.exec(src);
		if (cap) {
			return {
				type: "hr",
				raw: rtrim(cap[0], "\n"),
			};
		}
	}
	blockquote(src) {
		const cap = this.rules.block.blockquote.exec(src);
		if (cap) {
			let lines = rtrim(cap[0], "\n").split("\n");
			let raw2 = "";
			let text = "";
			const tokens = [];
			while (lines.length > 0) {
				let inBlockquote = false;
				const currentLines = [];
				let i;
				for (i = 0; i < lines.length; i++) {
					if (this.rules.other.blockquoteStart.test(lines[i])) {
						currentLines.push(lines[i]);
						inBlockquote = true;
					} else if (!inBlockquote) {
						currentLines.push(lines[i]);
					} else {
						break;
					}
				}
				lines = lines.slice(i);
				const currentRaw = currentLines.join("\n");
				const currentText = currentRaw
					.replace(this.rules.other.blockquoteSetextReplace, "\n    $1")
					.replace(this.rules.other.blockquoteSetextReplace2, "");
				raw2 = raw2
					? `${raw2}
${currentRaw}`
					: currentRaw;
				text = text
					? `${text}
${currentText}`
					: currentText;
				const top = this.lexer.state.top;
				this.lexer.state.top = true;
				this.lexer.blockTokens(currentText, tokens, true);
				this.lexer.state.top = top;
				if (lines.length === 0) {
					break;
				}
				const lastToken = tokens.at(-1);
				if (lastToken?.type === "code") {
					break;
				} else if (lastToken?.type === "blockquote") {
					const oldToken = lastToken;
					const newText = oldToken.raw + "\n" + lines.join("\n");
					const newToken = this.blockquote(newText);
					tokens[tokens.length - 1] = newToken;
					raw2 = raw2.substring(0, raw2.length - oldToken.raw.length) + newToken.raw;
					text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
					break;
				} else if (lastToken?.type === "list") {
					const oldToken = lastToken;
					const newText = oldToken.raw + "\n" + lines.join("\n");
					const newToken = this.list(newText);
					tokens[tokens.length - 1] = newToken;
					raw2 = raw2.substring(0, raw2.length - lastToken.raw.length) + newToken.raw;
					text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
					lines = newText.substring(tokens.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: raw2,
				tokens,
				text,
			};
		}
	}
	list(src) {
		let cap = this.rules.block.list.exec(src);
		if (cap) {
			let bull = cap[1].trim();
			const isordered = bull.length > 1;
			const list2 = {
				type: "list",
				raw: "",
				ordered: isordered,
				start: isordered ? +bull.slice(0, -1) : "",
				loose: false,
				items: [],
			};
			bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
			if (this.options.pedantic) {
				bull = isordered ? bull : "[*+-]";
			}
			const itemRegex = this.rules.other.listItemRegex(bull);
			let endsWithBlankLine = false;
			while (src) {
				let endEarly = false;
				let raw2 = "";
				let itemContents = "";
				if (!(cap = itemRegex.exec(src))) {
					break;
				}
				if (this.rules.block.hr.test(src)) {
					break;
				}
				raw2 = cap[0];
				src = src.substring(raw2.length);
				let line = cap[2]
					.split("\n", 1)[0]
					.replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
				let nextLine = src.split("\n", 1)[0];
				let blankLine = !line.trim();
				let indent = 0;
				if (this.options.pedantic) {
					indent = 2;
					itemContents = line.trimStart();
				} else if (blankLine) {
					indent = cap[1].length + 1;
				} else {
					indent = cap[2].search(this.rules.other.nonSpaceChar);
					indent = indent > 4 ? 1 : indent;
					itemContents = line.slice(indent);
					indent += cap[1].length;
				}
				if (blankLine && this.rules.other.blankLine.test(nextLine)) {
					raw2 += nextLine + "\n";
					src = src.substring(nextLine.length + 1);
					endEarly = true;
				}
				if (!endEarly) {
					const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
					const hrRegex = this.rules.other.hrRegex(indent);
					const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
					const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
					const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
					while (src) {
						const rawLine = src.split("\n", 1)[0];
						let nextLineWithoutTabs;
						nextLine = rawLine;
						if (this.options.pedantic) {
							nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
							nextLineWithoutTabs = nextLine;
						} else {
							nextLineWithoutTabs = nextLine.replace(
								this.rules.other.tabCharGlobal,
								"    ",
							);
						}
						if (fencesBeginRegex.test(nextLine)) {
							break;
						}
						if (headingBeginRegex.test(nextLine)) {
							break;
						}
						if (htmlBeginRegex.test(nextLine)) {
							break;
						}
						if (nextBulletRegex.test(nextLine)) {
							break;
						}
						if (hrRegex.test(nextLine)) {
							break;
						}
						if (
							nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent ||
							!nextLine.trim()
						) {
							itemContents += "\n" + nextLineWithoutTabs.slice(indent);
						} else {
							if (blankLine) {
								break;
							}
							if (
								line
									.replace(this.rules.other.tabCharGlobal, "    ")
									.search(this.rules.other.nonSpaceChar) >= 4
							) {
								break;
							}
							if (fencesBeginRegex.test(line)) {
								break;
							}
							if (headingBeginRegex.test(line)) {
								break;
							}
							if (hrRegex.test(line)) {
								break;
							}
							itemContents += "\n" + nextLine;
						}
						if (!blankLine && !nextLine.trim()) {
							blankLine = true;
						}
						raw2 += rawLine + "\n";
						src = src.substring(rawLine.length + 1);
						line = nextLineWithoutTabs.slice(indent);
					}
				}
				if (!list2.loose) {
					if (endsWithBlankLine) {
						list2.loose = true;
					} else if (this.rules.other.doubleBlankLine.test(raw2)) {
						endsWithBlankLine = true;
					}
				}
				let istask = null;
				let ischecked;
				if (this.options.gfm) {
					istask = this.rules.other.listIsTask.exec(itemContents);
					if (istask) {
						ischecked = istask[0] !== "[ ] ";
						itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
					}
				}
				list2.items.push({
					type: "list_item",
					raw: raw2,
					task: !!istask,
					checked: ischecked,
					loose: false,
					text: itemContents,
					tokens: [],
				});
				list2.raw += raw2;
			}
			const lastItem = list2.items.at(-1);
			if (lastItem) {
				lastItem.raw = lastItem.raw.trimEnd();
				lastItem.text = lastItem.text.trimEnd();
			} else {
				return;
			}
			list2.raw = list2.raw.trimEnd();
			for (let i = 0; i < list2.items.length; i++) {
				this.lexer.state.top = false;
				list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
				if (!list2.loose) {
					const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
					const hasMultipleLineBreaks =
						spacers.length > 0 &&
						spacers.some((t) => this.rules.other.anyLine.test(t.raw));
					list2.loose = hasMultipleLineBreaks;
				}
			}
			if (list2.loose) {
				for (let i = 0; i < list2.items.length; i++) {
					list2.items[i].loose = true;
				}
			}
			return list2;
		}
	}
	html(src) {
		const cap = this.rules.block.html.exec(src);
		if (cap) {
			const token = {
				type: "html",
				block: true,
				raw: cap[0],
				pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
				text: cap[0],
			};
			return token;
		}
	}
	def(src) {
		const cap = this.rules.block.def.exec(src);
		if (cap) {
			const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
			const href = cap[2]
				? cap[2]
						.replace(this.rules.other.hrefBrackets, "$1")
						.replace(this.rules.inline.anyPunctuation, "$1")
				: "";
			const title2 = cap[3]
				? cap[3]
						.substring(1, cap[3].length - 1)
						.replace(this.rules.inline.anyPunctuation, "$1")
				: cap[3];
			return {
				type: "def",
				tag: tag2,
				raw: cap[0],
				href,
				title: title2,
			};
		}
	}
	table(src) {
		const cap = this.rules.block.table.exec(src);
		if (!cap) {
			return;
		}
		if (!this.rules.other.tableDelimiter.test(cap[2])) {
			return;
		}
		const headers = splitCells(cap[1]);
		const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
		const rows = cap[3]?.trim()
			? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n")
			: [];
		const item = {
			type: "table",
			raw: cap[0],
			header: [],
			align: [],
			rows: [],
		};
		if (headers.length !== aligns.length) {
			return;
		}
		for (const align of aligns) {
			if (this.rules.other.tableAlignRight.test(align)) {
				item.align.push("right");
			} else if (this.rules.other.tableAlignCenter.test(align)) {
				item.align.push("center");
			} else if (this.rules.other.tableAlignLeft.test(align)) {
				item.align.push("left");
			} else {
				item.align.push(null);
			}
		}
		for (let i = 0; i < headers.length; i++) {
			item.header.push({
				text: headers[i],
				tokens: this.lexer.inline(headers[i]),
				header: true,
				align: item.align[i],
			});
		}
		for (const row of rows) {
			item.rows.push(
				splitCells(row, item.header.length).map((cell, i) => {
					return {
						text: cell,
						tokens: this.lexer.inline(cell),
						header: false,
						align: item.align[i],
					};
				}),
			);
		}
		return item;
	}
	lheading(src) {
		const cap = this.rules.block.lheading.exec(src);
		if (cap) {
			return {
				type: "heading",
				raw: cap[0],
				depth: cap[2].charAt(0) === "=" ? 1 : 2,
				text: cap[1],
				tokens: this.lexer.inline(cap[1]),
			};
		}
	}
	paragraph(src) {
		const cap = this.rules.block.paragraph.exec(src);
		if (cap) {
			const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
			return {
				type: "paragraph",
				raw: cap[0],
				text,
				tokens: this.lexer.inline(text),
			};
		}
	}
	text(src) {
		const cap = this.rules.block.text.exec(src);
		if (cap) {
			return {
				type: "text",
				raw: cap[0],
				text: cap[0],
				tokens: this.lexer.inline(cap[0]),
			};
		}
	}
	escape(src) {
		const cap = this.rules.inline.escape.exec(src);
		if (cap) {
			return {
				type: "escape",
				raw: cap[0],
				text: cap[1],
			};
		}
	}
	tag(src) {
		const cap = this.rules.inline.tag.exec(src);
		if (cap) {
			if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
				this.lexer.state.inLink = true;
			} else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
				this.lexer.state.inLink = false;
			}
			if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
				this.lexer.state.inRawBlock = true;
			} else if (
				this.lexer.state.inRawBlock &&
				this.rules.other.endPreScriptTag.test(cap[0])
			) {
				this.lexer.state.inRawBlock = false;
			}
			return {
				type: "html",
				raw: cap[0],
				inLink: this.lexer.state.inLink,
				inRawBlock: this.lexer.state.inRawBlock,
				block: false,
				text: cap[0],
			};
		}
	}
	link(src) {
		const cap = this.rules.inline.link.exec(src);
		if (cap) {
			const trimmedUrl = cap[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
				if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
					return;
				}
				const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
				if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
					return;
				}
			} else {
				const lastParenIndex = findClosingBracket(cap[2], "()");
				if (lastParenIndex === -2) {
					return;
				}
				if (lastParenIndex > -1) {
					const start = cap[0].indexOf("!") === 0 ? 5 : 4;
					const linkLen = start + cap[1].length + lastParenIndex;
					cap[2] = cap[2].substring(0, lastParenIndex);
					cap[0] = cap[0].substring(0, linkLen).trim();
					cap[3] = "";
				}
			}
			let href = cap[2];
			let title2 = "";
			if (this.options.pedantic) {
				const link2 = this.rules.other.pedanticHrefTitle.exec(href);
				if (link2) {
					href = link2[1];
					title2 = link2[3];
				}
			} else {
				title2 = cap[3] ? cap[3].slice(1, -1) : "";
			}
			href = href.trim();
			if (this.rules.other.startAngleBracket.test(href)) {
				if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
					href = href.slice(1);
				} else {
					href = href.slice(1, -1);
				}
			}
			return outputLink(
				cap,
				{
					href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
					title: title2 ? title2.replace(this.rules.inline.anyPunctuation, "$1") : title2,
				},
				cap[0],
				this.lexer,
				this.rules,
			);
		}
	}
	reflink(src, links) {
		let cap;
		if (
			(cap = this.rules.inline.reflink.exec(src)) ||
			(cap = this.rules.inline.nolink.exec(src))
		) {
			const linkString = (cap[2] || cap[1]).replace(
				this.rules.other.multipleSpaceGlobal,
				" ",
			);
			const link2 = links[linkString.toLowerCase()];
			if (!link2) {
				const text = cap[0].charAt(0);
				return {
					type: "text",
					raw: text,
					text,
				};
			}
			return outputLink(cap, link2, cap[0], this.lexer, this.rules);
		}
	}
	emStrong(src, maskedSrc, prevChar = "") {
		let match = this.rules.inline.emStrongLDelim.exec(src);
		if (!match) return;
		if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
		const nextChar = match[1] || match[2] || "";
		if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
			const lLength = [...match[0]].length - 1;
			let rDelim,
				rLength,
				delimTotal = lLength,
				midDelimTotal = 0;
			const endReg =
				match[0][0] === "*"
					? this.rules.inline.emStrongRDelimAst
					: this.rules.inline.emStrongRDelimUnd;
			endReg.lastIndex = 0;
			maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
			while ((match = endReg.exec(maskedSrc)) != null) {
				rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
				if (!rDelim) continue;
				rLength = [...rDelim].length;
				if (match[3] || match[4]) {
					delimTotal += rLength;
					continue;
				} else if (match[5] || match[6]) {
					if (lLength % 3 && !((lLength + rLength) % 3)) {
						midDelimTotal += rLength;
						continue;
					}
				}
				delimTotal -= rLength;
				if (delimTotal > 0) continue;
				rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
				const lastCharLength = [...match[0]][0].length;
				const raw2 = src.slice(0, lLength + match.index + lastCharLength + rLength);
				if (Math.min(lLength, rLength) % 2) {
					const text2 = raw2.slice(1, -1);
					return {
						type: "em",
						raw: raw2,
						text: text2,
						tokens: this.lexer.inlineTokens(text2),
					};
				}
				const text = raw2.slice(2, -2);
				return {
					type: "strong",
					raw: raw2,
					text,
					tokens: this.lexer.inlineTokens(text),
				};
			}
		}
	}
	codespan(src) {
		const cap = this.rules.inline.code.exec(src);
		if (cap) {
			let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
			const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
			const hasSpaceCharsOnBothEnds =
				this.rules.other.startingSpaceChar.test(text) &&
				this.rules.other.endingSpaceChar.test(text);
			if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
				text = text.substring(1, text.length - 1);
			}
			return {
				type: "codespan",
				raw: cap[0],
				text,
			};
		}
	}
	br(src) {
		const cap = this.rules.inline.br.exec(src);
		if (cap) {
			return {
				type: "br",
				raw: cap[0],
			};
		}
	}
	del(src) {
		const cap = this.rules.inline.del.exec(src);
		if (cap) {
			return {
				type: "del",
				raw: cap[0],
				text: cap[2],
				tokens: this.lexer.inlineTokens(cap[2]),
			};
		}
	}
	autolink(src) {
		const cap = this.rules.inline.autolink.exec(src);
		if (cap) {
			let text, href;
			if (cap[2] === "@") {
				text = cap[1];
				href = "mailto:" + text;
			} else {
				text = cap[1];
				href = text;
			}
			return {
				type: "link",
				raw: cap[0],
				text,
				href,
				tokens: [
					{
						type: "text",
						raw: text,
						text,
					},
				],
			};
		}
	}
	url(src) {
		let cap;
		if ((cap = this.rules.inline.url.exec(src))) {
			let text, href;
			if (cap[2] === "@") {
				text = cap[0];
				href = "mailto:" + text;
			} else {
				let prevCapZero;
				do {
					prevCapZero = cap[0];
					cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
				} while (prevCapZero !== cap[0]);
				text = cap[0];
				if (cap[1] === "www.") {
					href = "http://" + cap[0];
				} else {
					href = cap[0];
				}
			}
			return {
				type: "link",
				raw: cap[0],
				text,
				href,
				tokens: [
					{
						type: "text",
						raw: text,
						text,
					},
				],
			};
		}
	}
	inlineText(src) {
		const cap = this.rules.inline.text.exec(src);
		if (cap) {
			const escaped = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: cap[0],
				text: cap[0],
				escaped,
			};
		}
	}
};
var _Lexer = class __Lexer {
	static {
		__name(this, "_Lexer");
	}
	tokens;
	options;
	state;
	tokenizer;
	inlineQueue;
	constructor(options2) {
		this.tokens = [];
		this.tokens.links = /* @__PURE__ */ Object.create(null);
		this.options = options2 || _defaults;
		this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
		this.tokenizer = this.options.tokenizer;
		this.tokenizer.options = this.options;
		this.tokenizer.lexer = this;
		this.inlineQueue = [];
		this.state = {
			inLink: false,
			inRawBlock: false,
			top: true,
		};
		const rules = {
			other,
			block: block.normal,
			inline: inline.normal,
		};
		if (this.options.pedantic) {
			rules.block = block.pedantic;
			rules.inline = inline.pedantic;
		} else if (this.options.gfm) {
			rules.block = block.gfm;
			if (this.options.breaks) {
				rules.inline = inline.breaks;
			} else {
				rules.inline = inline.gfm;
			}
		}
		this.tokenizer.rules = rules;
	}
	/**
	 * Expose Rules
	 */
	static get rules() {
		return {
			block,
			inline,
		};
	}
	/**
	 * Static Lex Method
	 */
	static lex(src, options2) {
		const lexer2 = new __Lexer(options2);
		return lexer2.lex(src);
	}
	/**
	 * Static Lex Inline Method
	 */
	static lexInline(src, options2) {
		const lexer2 = new __Lexer(options2);
		return lexer2.inlineTokens(src);
	}
	/**
	 * Preprocessing
	 */
	lex(src) {
		src = src.replace(other.carriageReturn, "\n");
		this.blockTokens(src, this.tokens);
		for (let i = 0; i < this.inlineQueue.length; i++) {
			const next = this.inlineQueue[i];
			this.inlineTokens(next.src, next.tokens);
		}
		this.inlineQueue = [];
		return this.tokens;
	}
	blockTokens(src, tokens = [], lastParagraphClipped = false) {
		if (this.options.pedantic) {
			src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
		}
		while (src) {
			let token;
			if (
				this.options.extensions?.block?.some((extTokenizer) => {
					if ((token = extTokenizer.call({ lexer: this }, src, tokens))) {
						src = src.substring(token.raw.length);
						tokens.push(token);
						return true;
					}
					return false;
				})
			) {
				continue;
			}
			if ((token = this.tokenizer.space(src))) {
				src = src.substring(token.raw.length);
				const lastToken = tokens.at(-1);
				if (token.raw.length === 1 && lastToken !== void 0) {
					lastToken.raw += "\n";
				} else {
					tokens.push(token);
				}
				continue;
			}
			if ((token = this.tokenizer.code(src))) {
				src = src.substring(token.raw.length);
				const lastToken = tokens.at(-1);
				if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.text;
					this.inlineQueue.at(-1).src = lastToken.text;
				} else {
					tokens.push(token);
				}
				continue;
			}
			if ((token = this.tokenizer.fences(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.heading(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.hr(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.blockquote(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.list(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.html(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.def(src))) {
				src = src.substring(token.raw.length);
				const lastToken = tokens.at(-1);
				if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.raw;
					this.inlineQueue.at(-1).src = lastToken.text;
				} else if (!this.tokens.links[token.tag]) {
					this.tokens.links[token.tag] = {
						href: token.href,
						title: token.title,
					};
				}
				continue;
			}
			if ((token = this.tokenizer.table(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.lheading(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			let cutSrc = src;
			if (this.options.extensions?.startBlock) {
				let startIndex = Number.POSITIVE_INFINITY;
				const tempSrc = src.slice(1);
				let tempStart;
				this.options.extensions.startBlock.forEach((getStartIndex) => {
					tempStart = getStartIndex.call({ lexer: this }, tempSrc);
					if (typeof tempStart === "number" && tempStart >= 0) {
						startIndex = Math.min(startIndex, tempStart);
					}
				});
				if (startIndex < Number.POSITIVE_INFINITY && startIndex >= 0) {
					cutSrc = src.substring(0, startIndex + 1);
				}
			}
			if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
				const lastToken = tokens.at(-1);
				if (lastParagraphClipped && lastToken?.type === "paragraph") {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.text;
					this.inlineQueue.pop();
					this.inlineQueue.at(-1).src = lastToken.text;
				} else {
					tokens.push(token);
				}
				lastParagraphClipped = cutSrc.length !== src.length;
				src = src.substring(token.raw.length);
				continue;
			}
			if ((token = this.tokenizer.text(src))) {
				src = src.substring(token.raw.length);
				const lastToken = tokens.at(-1);
				if (lastToken?.type === "text") {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.text;
					this.inlineQueue.pop();
					this.inlineQueue.at(-1).src = lastToken.text;
				} else {
					tokens.push(token);
				}
				continue;
			}
			if (src) {
				const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
				if (this.options.silent) {
					console.error(errMsg);
					break;
				} else {
					throw new Error(errMsg);
				}
			}
		}
		this.state.top = true;
		return tokens;
	}
	inline(src, tokens = []) {
		this.inlineQueue.push({ src, tokens });
		return tokens;
	}
	/**
	 * Lexing/Compiling
	 */
	inlineTokens(src, tokens = []) {
		let maskedSrc = src;
		let match = null;
		if (this.tokens.links) {
			const links = Object.keys(this.tokens.links);
			if (links.length > 0) {
				while (
					(match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null
				) {
					if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
						maskedSrc =
							maskedSrc.slice(0, match.index) +
							"[" +
							"a".repeat(match[0].length - 2) +
							"]" +
							maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
					}
				}
			}
		}
		while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
			maskedSrc =
				maskedSrc.slice(0, match.index) +
				"++" +
				maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
		}
		while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
			maskedSrc =
				maskedSrc.slice(0, match.index) +
				"[" +
				"a".repeat(match[0].length - 2) +
				"]" +
				maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
		}
		let keepPrevChar = false;
		let prevChar = "";
		while (src) {
			if (!keepPrevChar) {
				prevChar = "";
			}
			keepPrevChar = false;
			let token;
			if (
				this.options.extensions?.inline?.some((extTokenizer) => {
					if ((token = extTokenizer.call({ lexer: this }, src, tokens))) {
						src = src.substring(token.raw.length);
						tokens.push(token);
						return true;
					}
					return false;
				})
			) {
				continue;
			}
			if ((token = this.tokenizer.escape(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.tag(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.link(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.reflink(src, this.tokens.links))) {
				src = src.substring(token.raw.length);
				const lastToken = tokens.at(-1);
				if (token.type === "text" && lastToken?.type === "text") {
					lastToken.raw += token.raw;
					lastToken.text += token.text;
				} else {
					tokens.push(token);
				}
				continue;
			}
			if ((token = this.tokenizer.emStrong(src, maskedSrc, prevChar))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.codespan(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.br(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.del(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if ((token = this.tokenizer.autolink(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (!this.state.inLink && (token = this.tokenizer.url(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			let cutSrc = src;
			if (this.options.extensions?.startInline) {
				let startIndex = Number.POSITIVE_INFINITY;
				const tempSrc = src.slice(1);
				let tempStart;
				this.options.extensions.startInline.forEach((getStartIndex) => {
					tempStart = getStartIndex.call({ lexer: this }, tempSrc);
					if (typeof tempStart === "number" && tempStart >= 0) {
						startIndex = Math.min(startIndex, tempStart);
					}
				});
				if (startIndex < Number.POSITIVE_INFINITY && startIndex >= 0) {
					cutSrc = src.substring(0, startIndex + 1);
				}
			}
			if ((token = this.tokenizer.inlineText(cutSrc))) {
				src = src.substring(token.raw.length);
				if (token.raw.slice(-1) !== "_") {
					prevChar = token.raw.slice(-1);
				}
				keepPrevChar = true;
				const lastToken = tokens.at(-1);
				if (lastToken?.type === "text") {
					lastToken.raw += token.raw;
					lastToken.text += token.text;
				} else {
					tokens.push(token);
				}
				continue;
			}
			if (src) {
				const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
				if (this.options.silent) {
					console.error(errMsg);
					break;
				} else {
					throw new Error(errMsg);
				}
			}
		}
		return tokens;
	}
};
var _Renderer = class {
	static {
		__name(this, "_Renderer");
	}
	options;
	parser;
	// set by the parser
	constructor(options2) {
		this.options = options2 || _defaults;
	}
	space(token) {
		return "";
	}
	code({ text, lang, escaped }) {
		const langString = (lang || "").match(other.notSpaceStart)?.[0];
		const code = text.replace(other.endingNewline, "") + "\n";
		if (!langString) {
			return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
		}
		return (
			'<pre><code class="language-' +
			escape(langString) +
			'">' +
			(escaped ? code : escape(code, true)) +
			"</code></pre>\n"
		);
	}
	blockquote({ tokens }) {
		const body = this.parser.parse(tokens);
		return `<blockquote>
${body}</blockquote>
`;
	}
	html({ text }) {
		return text;
	}
	heading({ tokens, depth }) {
		return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
	}
	hr(token) {
		return "<hr>\n";
	}
	list(token) {
		const ordered = token.ordered;
		const start = token.start;
		let body = "";
		for (let j = 0; j < token.items.length; j++) {
			const item = token.items[j];
			body += this.listitem(item);
		}
		const type = ordered ? "ol" : "ul";
		const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
		return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
	}
	listitem(item) {
		let itemBody = "";
		if (item.task) {
			const checkbox = this.checkbox({ checked: !!item.checked });
			if (item.loose) {
				if (item.tokens[0]?.type === "paragraph") {
					item.tokens[0].text = checkbox + " " + item.tokens[0].text;
					if (
						item.tokens[0].tokens &&
						item.tokens[0].tokens.length > 0 &&
						item.tokens[0].tokens[0].type === "text"
					) {
						item.tokens[0].tokens[0].text =
							checkbox + " " + escape(item.tokens[0].tokens[0].text);
						item.tokens[0].tokens[0].escaped = true;
					}
				} else {
					item.tokens.unshift({
						type: "text",
						raw: checkbox + " ",
						text: checkbox + " ",
						escaped: true,
					});
				}
			} else {
				itemBody += checkbox + " ";
			}
		}
		itemBody += this.parser.parse(item.tokens, !!item.loose);
		return `<li>${itemBody}</li>
`;
	}
	checkbox({ checked }) {
		return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
	}
	paragraph({ tokens }) {
		return `<p>${this.parser.parseInline(tokens)}</p>
`;
	}
	table(token) {
		let header = "";
		let cell = "";
		for (let j = 0; j < token.header.length; j++) {
			cell += this.tablecell(token.header[j]);
		}
		header += this.tablerow({ text: cell });
		let body = "";
		for (let j = 0; j < token.rows.length; j++) {
			const row = token.rows[j];
			cell = "";
			for (let k = 0; k < row.length; k++) {
				cell += this.tablecell(row[k]);
			}
			body += this.tablerow({ text: cell });
		}
		if (body) body = `<tbody>${body}</tbody>`;
		return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
	}
	tablerow({ text }) {
		return `<tr>
${text}</tr>
`;
	}
	tablecell(token) {
		const content = this.parser.parseInline(token.tokens);
		const type = token.header ? "th" : "td";
		const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
		return (
			tag2 +
			content +
			`</${type}>
`
		);
	}
	/**
	 * span level renderer
	 */
	strong({ tokens }) {
		return `<strong>${this.parser.parseInline(tokens)}</strong>`;
	}
	em({ tokens }) {
		return `<em>${this.parser.parseInline(tokens)}</em>`;
	}
	codespan({ text }) {
		return `<code>${escape(text, true)}</code>`;
	}
	br(token) {
		return "<br>";
	}
	del({ tokens }) {
		return `<del>${this.parser.parseInline(tokens)}</del>`;
	}
	link({ href, title: title2, tokens }) {
		const text = this.parser.parseInline(tokens);
		const cleanHref = cleanUrl(href);
		if (cleanHref === null) {
			return text;
		}
		href = cleanHref;
		let out = '<a href="' + href + '"';
		if (title2) {
			out += ' title="' + escape(title2) + '"';
		}
		out += ">" + text + "</a>";
		return out;
	}
	image({ href, title: title2, text }) {
		const cleanHref = cleanUrl(href);
		if (cleanHref === null) {
			return escape(text);
		}
		href = cleanHref;
		let out = `<img src="${href}" alt="${text}"`;
		if (title2) {
			out += ` title="${escape(title2)}"`;
		}
		out += ">";
		return out;
	}
	text(token) {
		return "tokens" in token && token.tokens
			? this.parser.parseInline(token.tokens)
			: "escaped" in token && token.escaped
				? token.text
				: escape(token.text);
	}
};
var _TextRenderer = class {
	static {
		__name(this, "_TextRenderer");
	}
	// no need for block level renderers
	strong({ text }) {
		return text;
	}
	em({ text }) {
		return text;
	}
	codespan({ text }) {
		return text;
	}
	del({ text }) {
		return text;
	}
	html({ text }) {
		return text;
	}
	text({ text }) {
		return text;
	}
	link({ text }) {
		return "" + text;
	}
	image({ text }) {
		return "" + text;
	}
	br() {
		return "";
	}
};
var _Parser = class __Parser {
	static {
		__name(this, "_Parser");
	}
	options;
	renderer;
	textRenderer;
	constructor(options2) {
		this.options = options2 || _defaults;
		this.options.renderer = this.options.renderer || new _Renderer();
		this.renderer = this.options.renderer;
		this.renderer.options = this.options;
		this.renderer.parser = this;
		this.textRenderer = new _TextRenderer();
	}
	/**
	 * Static Parse Method
	 */
	static parse(tokens, options2) {
		const parser2 = new __Parser(options2);
		return parser2.parse(tokens);
	}
	/**
	 * Static Parse Inline Method
	 */
	static parseInline(tokens, options2) {
		const parser2 = new __Parser(options2);
		return parser2.parseInline(tokens);
	}
	/**
	 * Parse Loop
	 */
	parse(tokens, top = true) {
		let out = "";
		for (let i = 0; i < tokens.length; i++) {
			const anyToken = tokens[i];
			if (this.options.extensions?.renderers?.[anyToken.type]) {
				const genericToken = anyToken;
				const ret = this.options.extensions.renderers[genericToken.type].call(
					{ parser: this },
					genericToken,
				);
				if (
					ret !== false ||
					![
						"space",
						"hr",
						"heading",
						"code",
						"table",
						"blockquote",
						"list",
						"html",
						"paragraph",
						"text",
					].includes(genericToken.type)
				) {
					out += ret || "";
					continue;
				}
			}
			const token = anyToken;
			switch (token.type) {
				case "space": {
					out += this.renderer.space(token);
					continue;
				}
				case "hr": {
					out += this.renderer.hr(token);
					continue;
				}
				case "heading": {
					out += this.renderer.heading(token);
					continue;
				}
				case "code": {
					out += this.renderer.code(token);
					continue;
				}
				case "table": {
					out += this.renderer.table(token);
					continue;
				}
				case "blockquote": {
					out += this.renderer.blockquote(token);
					continue;
				}
				case "list": {
					out += this.renderer.list(token);
					continue;
				}
				case "html": {
					out += this.renderer.html(token);
					continue;
				}
				case "paragraph": {
					out += this.renderer.paragraph(token);
					continue;
				}
				case "text": {
					let textToken = token;
					let body = this.renderer.text(textToken);
					while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
						textToken = tokens[++i];
						body += "\n" + this.renderer.text(textToken);
					}
					if (top) {
						out += this.renderer.paragraph({
							type: "paragraph",
							raw: body,
							text: body,
							tokens: [{ type: "text", raw: body, text: body, escaped: true }],
						});
					} else {
						out += body;
					}
					continue;
				}
				default: {
					const errMsg = 'Token with "' + token.type + '" type was not found.';
					if (this.options.silent) {
						console.error(errMsg);
						return "";
					} else {
						throw new Error(errMsg);
					}
				}
			}
		}
		return out;
	}
	/**
	 * Parse Inline Tokens
	 */
	parseInline(tokens, renderer = this.renderer) {
		let out = "";
		for (let i = 0; i < tokens.length; i++) {
			const anyToken = tokens[i];
			if (this.options.extensions?.renderers?.[anyToken.type]) {
				const ret = this.options.extensions.renderers[anyToken.type].call(
					{ parser: this },
					anyToken,
				);
				if (
					ret !== false ||
					![
						"escape",
						"html",
						"link",
						"image",
						"strong",
						"em",
						"codespan",
						"br",
						"del",
						"text",
					].includes(anyToken.type)
				) {
					out += ret || "";
					continue;
				}
			}
			const token = anyToken;
			switch (token.type) {
				case "escape": {
					out += renderer.text(token);
					break;
				}
				case "html": {
					out += renderer.html(token);
					break;
				}
				case "link": {
					out += renderer.link(token);
					break;
				}
				case "image": {
					out += renderer.image(token);
					break;
				}
				case "strong": {
					out += renderer.strong(token);
					break;
				}
				case "em": {
					out += renderer.em(token);
					break;
				}
				case "codespan": {
					out += renderer.codespan(token);
					break;
				}
				case "br": {
					out += renderer.br(token);
					break;
				}
				case "del": {
					out += renderer.del(token);
					break;
				}
				case "text": {
					out += renderer.text(token);
					break;
				}
				default: {
					const errMsg = 'Token with "' + token.type + '" type was not found.';
					if (this.options.silent) {
						console.error(errMsg);
						return "";
					} else {
						throw new Error(errMsg);
					}
				}
			}
		}
		return out;
	}
};
var _Hooks = class {
	static {
		__name(this, "_Hooks");
	}
	options;
	block;
	constructor(options2) {
		this.options = options2 || _defaults;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
	]);
	/**
	 * Process markdown before marked
	 */
	preprocess(markdown) {
		return markdown;
	}
	/**
	 * Process HTML after marked is finished
	 */
	postprocess(html3) {
		return html3;
	}
	/**
	 * Process all tokens before walk tokens
	 */
	processAllTokens(tokens) {
		return tokens;
	}
	/**
	 * Provide function to tokenize markdown
	 */
	provideLexer() {
		return this.block ? _Lexer.lex : _Lexer.lexInline;
	}
	/**
	 * Provide function to parse tokens
	 */
	provideParser() {
		return this.block ? _Parser.parse : _Parser.parseInline;
	}
};
var Marked = class {
	static {
		__name(this, "Marked");
	}
	defaults = _getDefaults();
	options = this.setOptions;
	parse = this.parseMarkdown(true);
	parseInline = this.parseMarkdown(false);
	Parser = _Parser;
	Renderer = _Renderer;
	TextRenderer = _TextRenderer;
	Lexer = _Lexer;
	Tokenizer = _Tokenizer;
	Hooks = _Hooks;
	constructor(...args) {
		this.use(...args);
	}
	/**
	 * Run callback for every token
	 */
	walkTokens(tokens, callback) {
		let values = [];
		for (const token of tokens) {
			values = values.concat(callback.call(this, token));
			switch (token.type) {
				case "table": {
					const tableToken = token;
					for (const cell of tableToken.header) {
						values = values.concat(this.walkTokens(cell.tokens, callback));
					}
					for (const row of tableToken.rows) {
						for (const cell of row) {
							values = values.concat(this.walkTokens(cell.tokens, callback));
						}
					}
					break;
				}
				case "list": {
					const listToken = token;
					values = values.concat(this.walkTokens(listToken.items, callback));
					break;
				}
				default: {
					const genericToken = token;
					if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
						this.defaults.extensions.childTokens[genericToken.type].forEach(
							(childTokens) => {
								const tokens2 = genericToken[childTokens].flat(Number.POSITIVE_INFINITY);
								values = values.concat(this.walkTokens(tokens2, callback));
							},
						);
					} else if (genericToken.tokens) {
						values = values.concat(this.walkTokens(genericToken.tokens, callback));
					}
				}
			}
		}
		return values;
	}
	use(...args) {
		const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
		args.forEach((pack) => {
			const opts = { ...pack };
			opts.async = this.defaults.async || opts.async || false;
			if (pack.extensions) {
				pack.extensions.forEach((ext) => {
					if (!ext.name) {
						throw new Error("extension name required");
					}
					if ("renderer" in ext) {
						const prevRenderer = extensions.renderers[ext.name];
						if (prevRenderer) {
							extensions.renderers[ext.name] = function (...args2) {
								let ret = ext.renderer.apply(this, args2);
								if (ret === false) {
									ret = prevRenderer.apply(this, args2);
								}
								return ret;
							};
						} else {
							extensions.renderers[ext.name] = ext.renderer;
						}
					}
					if ("tokenizer" in ext) {
						if (!ext.level || (ext.level !== "block" && ext.level !== "inline")) {
							throw new Error("extension level must be 'block' or 'inline'");
						}
						const extLevel = extensions[ext.level];
						if (extLevel) {
							extLevel.unshift(ext.tokenizer);
						} else {
							extensions[ext.level] = [ext.tokenizer];
						}
						if (ext.start) {
							if (ext.level === "block") {
								if (extensions.startBlock) {
									extensions.startBlock.push(ext.start);
								} else {
									extensions.startBlock = [ext.start];
								}
							} else if (ext.level === "inline") {
								if (extensions.startInline) {
									extensions.startInline.push(ext.start);
								} else {
									extensions.startInline = [ext.start];
								}
							}
						}
					}
					if ("childTokens" in ext && ext.childTokens) {
						extensions.childTokens[ext.name] = ext.childTokens;
					}
				});
				opts.extensions = extensions;
			}
			if (pack.renderer) {
				const renderer = this.defaults.renderer || new _Renderer(this.defaults);
				for (const prop in pack.renderer) {
					if (!(prop in renderer)) {
						throw new Error(`renderer '${prop}' does not exist`);
					}
					if (["options", "parser"].includes(prop)) {
						continue;
					}
					const rendererProp = prop;
					const rendererFunc = pack.renderer[rendererProp];
					const prevRenderer = renderer[rendererProp];
					renderer[rendererProp] = (...args2) => {
						let ret = rendererFunc.apply(renderer, args2);
						if (ret === false) {
							ret = prevRenderer.apply(renderer, args2);
						}
						return ret || "";
					};
				}
				opts.renderer = renderer;
			}
			if (pack.tokenizer) {
				const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
				for (const prop in pack.tokenizer) {
					if (!(prop in tokenizer)) {
						throw new Error(`tokenizer '${prop}' does not exist`);
					}
					if (["options", "rules", "lexer"].includes(prop)) {
						continue;
					}
					const tokenizerProp = prop;
					const tokenizerFunc = pack.tokenizer[tokenizerProp];
					const prevTokenizer = tokenizer[tokenizerProp];
					tokenizer[tokenizerProp] = (...args2) => {
						let ret = tokenizerFunc.apply(tokenizer, args2);
						if (ret === false) {
							ret = prevTokenizer.apply(tokenizer, args2);
						}
						return ret;
					};
				}
				opts.tokenizer = tokenizer;
			}
			if (pack.hooks) {
				const hooks = this.defaults.hooks || new _Hooks();
				for (const prop in pack.hooks) {
					if (!(prop in hooks)) {
						throw new Error(`hook '${prop}' does not exist`);
					}
					if (["options", "block"].includes(prop)) {
						continue;
					}
					const hooksProp = prop;
					const hooksFunc = pack.hooks[hooksProp];
					const prevHook = hooks[hooksProp];
					if (_Hooks.passThroughHooks.has(prop)) {
						hooks[hooksProp] = (arg) => {
							if (this.defaults.async) {
								return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
									return prevHook.call(hooks, ret2);
								});
							}
							const ret = hooksFunc.call(hooks, arg);
							return prevHook.call(hooks, ret);
						};
					} else {
						hooks[hooksProp] = (...args2) => {
							let ret = hooksFunc.apply(hooks, args2);
							if (ret === false) {
								ret = prevHook.apply(hooks, args2);
							}
							return ret;
						};
					}
				}
				opts.hooks = hooks;
			}
			if (pack.walkTokens) {
				const walkTokens2 = this.defaults.walkTokens;
				const packWalktokens = pack.walkTokens;
				opts.walkTokens = function (token) {
					let values = [];
					values.push(packWalktokens.call(this, token));
					if (walkTokens2) {
						values = values.concat(walkTokens2.call(this, token));
					}
					return values;
				};
			}
			this.defaults = { ...this.defaults, ...opts };
		});
		return this;
	}
	setOptions(opt) {
		this.defaults = { ...this.defaults, ...opt };
		return this;
	}
	lexer(src, options2) {
		return _Lexer.lex(src, options2 ?? this.defaults);
	}
	parser(tokens, options2) {
		return _Parser.parse(tokens, options2 ?? this.defaults);
	}
	parseMarkdown(blockType) {
		const parse3 = /* @__PURE__ */ __name((src, options2) => {
			const origOpt = { ...options2 };
			const opt = { ...this.defaults, ...origOpt };
			const throwError = this.onError(!!opt.silent, !!opt.async);
			if (this.defaults.async === true && origOpt.async === false) {
				return throwError(
					new Error(
						"marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.",
					),
				);
			}
			if (typeof src === "undefined" || src === null) {
				return throwError(new Error("marked(): input parameter is undefined or null"));
			}
			if (typeof src !== "string") {
				return throwError(
					new Error(
						"marked(): input parameter is of type " +
							Object.prototype.toString.call(src) +
							", string expected",
					),
				);
			}
			if (opt.hooks) {
				opt.hooks.options = opt;
				opt.hooks.block = blockType;
			}
			const lexer2 = opt.hooks
				? opt.hooks.provideLexer()
				: blockType
					? _Lexer.lex
					: _Lexer.lexInline;
			const parser2 = opt.hooks
				? opt.hooks.provideParser()
				: blockType
					? _Parser.parse
					: _Parser.parseInline;
			if (opt.async) {
				return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src)
					.then((src2) => lexer2(src2, opt))
					.then((tokens) => (opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens))
					.then((tokens) =>
						opt.walkTokens
							? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(
									() => tokens,
								)
							: tokens,
					)
					.then((tokens) => parser2(tokens, opt))
					.then((html3) => (opt.hooks ? opt.hooks.postprocess(html3) : html3))
					.catch(throwError);
			}
			try {
				if (opt.hooks) {
					src = opt.hooks.preprocess(src);
				}
				let tokens = lexer2(src, opt);
				if (opt.hooks) {
					tokens = opt.hooks.processAllTokens(tokens);
				}
				if (opt.walkTokens) {
					this.walkTokens(tokens, opt.walkTokens);
				}
				let html3 = parser2(tokens, opt);
				if (opt.hooks) {
					html3 = opt.hooks.postprocess(html3);
				}
				return html3;
			} catch (e) {
				return throwError(e);
			}
		}, "parse");
		return parse3;
	}
	onError(silent, async) {
		return (e) => {
			e.message += "\nPlease report this to https://github.com/markedjs/marked.";
			if (silent) {
				const msg =
					"<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
				if (async) {
					return Promise.resolve(msg);
				}
				return msg;
			}
			if (async) {
				return Promise.reject(e);
			}
			throw e;
		};
	}
};
var markedInstance = new Marked();
function marked(src, opt) {
	return markedInstance.parse(src, opt);
}
__name(marked, "marked");
marked.options = marked.setOptions = (options2) => {
	markedInstance.setOptions(options2);
	marked.defaults = markedInstance.defaults;
	changeDefaults(marked.defaults);
	return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = (...args) => {
	markedInstance.use(...args);
	marked.defaults = markedInstance.defaults;
	changeDefaults(marked.defaults);
	return marked;
};
marked.walkTokens = (tokens, callback) => markedInstance.walkTokens(tokens, callback);
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// src/web/templates/root.ts
import { env as env2 } from "cloudflare:workers";
var homeContent = /* @__PURE__ */ __name(async (req) => {
	const origin = new URL(req.url).origin;
	const res = await env2.ASSETS.fetch(`${origin}/README.md`);
	const markdown = await res.text();
	const content = await marked(markdown);
	return html`
        <div class="max-w-4xl mx-auto markdown">${raw(content)}</div>
    `;
}, "homeContent");

// src/web/handlers/root.ts
var rootHandler = /* @__PURE__ */ __name(async (c) => {
	console.log("[GET /] Handling request.");
	const content = await homeContent(c.req.raw);
	return c.html(layout(content, "MCP Remote Auth Demo - Home"));
}, "rootHandler");

// src/web/handlers/authorize.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/web/middleware/supabase.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/ssr/dist/module/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/ssr/dist/module/createBrowserClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/supabase-js/dist/module/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/functions-js/dist/module/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/functions-js/dist/module/helper.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var resolveFetch = /* @__PURE__ */ __name((customFetch) => {
	let _fetch;
	if (customFetch) {
		_fetch = customFetch;
	} else if (typeof fetch === "undefined") {
		_fetch = /* @__PURE__ */ __name(
			(...args) =>
				Promise.resolve()
					.then(() => (init_browser(), browser_exports))
					.then(({ default: fetch3 }) => fetch3(...args)),
			"_fetch",
		);
	} else {
		_fetch = fetch;
	}
	return (...args) => _fetch(...args);
}, "resolveFetch");

// node_modules/@supabase/functions-js/dist/module/types.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var FunctionsError = class extends Error {
	static {
		__name(this, "FunctionsError");
	}
	constructor(message, name = "FunctionsError", context2) {
		super(message);
		this.name = name;
		this.context = context2;
	}
};
var FunctionsFetchError = class extends FunctionsError {
	static {
		__name(this, "FunctionsFetchError");
	}
	constructor(context2) {
		super("Failed to send a request to the Edge Function", "FunctionsFetchError", context2);
	}
};
var FunctionsRelayError = class extends FunctionsError {
	static {
		__name(this, "FunctionsRelayError");
	}
	constructor(context2) {
		super("Relay Error invoking the Edge Function", "FunctionsRelayError", context2);
	}
};
var FunctionsHttpError = class extends FunctionsError {
	static {
		__name(this, "FunctionsHttpError");
	}
	constructor(context2) {
		super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context2);
	}
};
var FunctionRegion;
((FunctionRegion2) => {
	FunctionRegion2["Any"] = "any";
	FunctionRegion2["ApNortheast1"] = "ap-northeast-1";
	FunctionRegion2["ApNortheast2"] = "ap-northeast-2";
	FunctionRegion2["ApSouth1"] = "ap-south-1";
	FunctionRegion2["ApSoutheast1"] = "ap-southeast-1";
	FunctionRegion2["ApSoutheast2"] = "ap-southeast-2";
	FunctionRegion2["CaCentral1"] = "ca-central-1";
	FunctionRegion2["EuCentral1"] = "eu-central-1";
	FunctionRegion2["EuWest1"] = "eu-west-1";
	FunctionRegion2["EuWest2"] = "eu-west-2";
	FunctionRegion2["EuWest3"] = "eu-west-3";
	FunctionRegion2["SaEast1"] = "sa-east-1";
	FunctionRegion2["UsEast1"] = "us-east-1";
	FunctionRegion2["UsWest1"] = "us-west-1";
	FunctionRegion2["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var FunctionsClient = class {
	static {
		__name(this, "FunctionsClient");
	}
	constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
		this.url = url;
		this.headers = headers;
		this.region = region;
		this.fetch = resolveFetch(customFetch);
	}
	/**
	 * Updates the authorization header
	 * @param token - the new jwt token sent in the authorisation header
	 */
	setAuth(token) {
		this.headers.Authorization = `Bearer ${token}`;
	}
	/**
	 * Invokes a function
	 * @param functionName - The name of the Function to invoke.
	 * @param options - Options for invoking the Function.
	 */
	invoke(functionName, options2 = {}) {
		var _a2;
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const { headers, method, body: functionArgs } = options2;
				const _headers = {};
				let { region } = options2;
				if (!region) {
					region = this.region;
				}
				if (region && region !== "any") {
					_headers["x-region"] = region;
				}
				let body;
				if (
					functionArgs &&
					((headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type")) ||
						!headers)
				) {
					if (
						(typeof Blob !== "undefined" && functionArgs instanceof Blob) ||
						functionArgs instanceof ArrayBuffer
					) {
						_headers["Content-Type"] = "application/octet-stream";
						body = functionArgs;
					} else if (typeof functionArgs === "string") {
						_headers["Content-Type"] = "text/plain";
						body = functionArgs;
					} else if (
						typeof FormData !== "undefined" &&
						functionArgs instanceof FormData
					) {
						body = functionArgs;
					} else {
						_headers["Content-Type"] = "application/json";
						body = JSON.stringify(functionArgs);
					}
				}
				const response = yield this.fetch(`${this.url}/${functionName}`, {
					method: method || "POST",
					// headers priority is (high to low):
					// 1. invoke-level headers
					// 2. client-level headers
					// 3. default Content-Type header
					headers: Object.assign(
						Object.assign(Object.assign({}, _headers), this.headers),
						headers,
					),
					body,
				}).catch((fetchError) => {
					throw new FunctionsFetchError(fetchError);
				});
				const isRelayError = response.headers.get("x-relay-error");
				if (isRelayError && isRelayError === "true") {
					throw new FunctionsRelayError(response);
				}
				if (!response.ok) {
					throw new FunctionsHttpError(response);
				}
				const responseType = (
					(_a2 = response.headers.get("Content-Type")) !== null && _a2 !== void 0
						? _a2
						: "text/plain"
				)
					.split(";")[0]
					.trim();
				let data;
				if (responseType === "application/json") {
					data = yield response.json();
				} else if (responseType === "application/octet-stream") {
					data = yield response.blob();
				} else if (responseType === "text/event-stream") {
					data = response;
				} else if (responseType === "multipart/form-data") {
					data = yield response.formData();
				} else {
					data = yield response.text();
				}
				return { data, error: null };
			} catch (error3) {
				return { data: null, error: error3 };
			}
		});
	}
};

// node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_cjs = __toESM(require_cjs(), 1);
var {
	PostgrestClient,
	PostgrestQueryBuilder,
	PostgrestFilterBuilder,
	PostgrestTransformBuilder,
	PostgrestBuilder,
	PostgrestError,
} = import_cjs.default;

// node_modules/@supabase/realtime-js/dist/module/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var version2 = "2.11.2";

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_HEADERS = { "X-Client-Info": `realtime-js/${version2}` };
var VSN = "1.0.0";
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var SOCKET_STATES;
((SOCKET_STATES2) => {
	SOCKET_STATES2[(SOCKET_STATES2["connecting"] = 0)] = "connecting";
	SOCKET_STATES2[(SOCKET_STATES2["open"] = 1)] = "open";
	SOCKET_STATES2[(SOCKET_STATES2["closing"] = 2)] = "closing";
	SOCKET_STATES2[(SOCKET_STATES2["closed"] = 3)] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
((CHANNEL_STATES2) => {
	CHANNEL_STATES2["closed"] = "closed";
	CHANNEL_STATES2["errored"] = "errored";
	CHANNEL_STATES2["joined"] = "joined";
	CHANNEL_STATES2["joining"] = "joining";
	CHANNEL_STATES2["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
((CHANNEL_EVENTS2) => {
	CHANNEL_EVENTS2["close"] = "phx_close";
	CHANNEL_EVENTS2["error"] = "phx_error";
	CHANNEL_EVENTS2["join"] = "phx_join";
	CHANNEL_EVENTS2["reply"] = "phx_reply";
	CHANNEL_EVENTS2["leave"] = "phx_leave";
	CHANNEL_EVENTS2["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
((TRANSPORTS2) => {
	TRANSPORTS2["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
((CONNECTION_STATE2) => {
	CONNECTION_STATE2["Connecting"] = "connecting";
	CONNECTION_STATE2["Open"] = "open";
	CONNECTION_STATE2["Closing"] = "closing";
	CONNECTION_STATE2["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Serializer = class {
	static {
		__name(this, "Serializer");
	}
	constructor() {
		this.HEADER_LENGTH = 1;
	}
	decode(rawPayload, callback) {
		if (rawPayload.constructor === ArrayBuffer) {
			return callback(this._binaryDecode(rawPayload));
		}
		if (typeof rawPayload === "string") {
			return callback(JSON.parse(rawPayload));
		}
		return callback({});
	}
	_binaryDecode(buffer) {
		const view = new DataView(buffer);
		const decoder = new TextDecoder();
		return this._decodeBroadcast(buffer, view, decoder);
	}
	_decodeBroadcast(buffer, view, decoder) {
		const topicSize = view.getUint8(1);
		const eventSize = view.getUint8(2);
		let offset = this.HEADER_LENGTH + 2;
		const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
		offset = offset + topicSize;
		const event = decoder.decode(buffer.slice(offset, offset + eventSize));
		offset = offset + eventSize;
		const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
		return { ref: null, topic, event, payload: data };
	}
};

// node_modules/@supabase/realtime-js/dist/module/lib/timer.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Timer = class {
	static {
		__name(this, "Timer");
	}
	constructor(callback, timerCalc) {
		this.callback = callback;
		this.timerCalc = timerCalc;
		this.timer = void 0;
		this.tries = 0;
		this.callback = callback;
		this.timerCalc = timerCalc;
	}
	reset() {
		this.tries = 0;
		clearTimeout(this.timer);
	}
	// Cancels any previous scheduleTimeout and schedules callback
	scheduleTimeout() {
		clearTimeout(this.timer);
		this.timer = setTimeout(
			() => {
				this.tries = this.tries + 1;
				this.callback();
			},
			this.timerCalc(this.tries + 1),
		);
	}
};

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var PostgresTypes;
((PostgresTypes2) => {
	PostgresTypes2["abstime"] = "abstime";
	PostgresTypes2["bool"] = "bool";
	PostgresTypes2["date"] = "date";
	PostgresTypes2["daterange"] = "daterange";
	PostgresTypes2["float4"] = "float4";
	PostgresTypes2["float8"] = "float8";
	PostgresTypes2["int2"] = "int2";
	PostgresTypes2["int4"] = "int4";
	PostgresTypes2["int4range"] = "int4range";
	PostgresTypes2["int8"] = "int8";
	PostgresTypes2["int8range"] = "int8range";
	PostgresTypes2["json"] = "json";
	PostgresTypes2["jsonb"] = "jsonb";
	PostgresTypes2["money"] = "money";
	PostgresTypes2["numeric"] = "numeric";
	PostgresTypes2["oid"] = "oid";
	PostgresTypes2["reltime"] = "reltime";
	PostgresTypes2["text"] = "text";
	PostgresTypes2["time"] = "time";
	PostgresTypes2["timestamp"] = "timestamp";
	PostgresTypes2["timestamptz"] = "timestamptz";
	PostgresTypes2["timetz"] = "timetz";
	PostgresTypes2["tsrange"] = "tsrange";
	PostgresTypes2["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
var convertChangeData = /* @__PURE__ */ __name((columns, record, options2 = {}) => {
	var _a2;
	const skipTypes = (_a2 = options2.skipTypes) !== null && _a2 !== void 0 ? _a2 : [];
	return Object.keys(record).reduce((acc, rec_key) => {
		acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
		return acc;
	}, {});
}, "convertChangeData");
var convertColumn = /* @__PURE__ */ __name((columnName, columns, record, skipTypes) => {
	const column = columns.find((x) => x.name === columnName);
	const colType = column === null || column === void 0 ? void 0 : column.type;
	const value = record[columnName];
	if (colType && !skipTypes.includes(colType)) {
		return convertCell(colType, value);
	}
	return noop(value);
}, "convertColumn");
var convertCell = /* @__PURE__ */ __name((type, value) => {
	if (type.charAt(0) === "_") {
		const dataType = type.slice(1, type.length);
		return toArray(value, dataType);
	}
	switch (type) {
		case PostgresTypes.bool:
			return toBoolean(value);
		case PostgresTypes.float4:
		case PostgresTypes.float8:
		case PostgresTypes.int2:
		case PostgresTypes.int4:
		case PostgresTypes.int8:
		case PostgresTypes.numeric:
		case PostgresTypes.oid:
			return toNumber(value);
		case PostgresTypes.json:
		case PostgresTypes.jsonb:
			return toJson(value);
		case PostgresTypes.timestamp:
			return toTimestampString(value);
		// Format to be consistent with PostgREST
		case PostgresTypes.abstime:
		// To allow users to cast it based on Timezone
		case PostgresTypes.date:
		// To allow users to cast it based on Timezone
		case PostgresTypes.daterange:
		case PostgresTypes.int4range:
		case PostgresTypes.int8range:
		case PostgresTypes.money:
		case PostgresTypes.reltime:
		// To allow users to cast it based on Timezone
		case PostgresTypes.text:
		case PostgresTypes.time:
		// To allow users to cast it based on Timezone
		case PostgresTypes.timestamptz:
		// To allow users to cast it based on Timezone
		case PostgresTypes.timetz:
		// To allow users to cast it based on Timezone
		case PostgresTypes.tsrange:
		case PostgresTypes.tstzrange:
			return noop(value);
		default:
			return noop(value);
	}
}, "convertCell");
var noop = /* @__PURE__ */ __name((value) => {
	return value;
}, "noop");
var toBoolean = /* @__PURE__ */ __name((value) => {
	switch (value) {
		case "t":
			return true;
		case "f":
			return false;
		default:
			return value;
	}
}, "toBoolean");
var toNumber = /* @__PURE__ */ __name((value) => {
	if (typeof value === "string") {
		const parsedValue = Number.parseFloat(value);
		if (!Number.isNaN(parsedValue)) {
			return parsedValue;
		}
	}
	return value;
}, "toNumber");
var toJson = /* @__PURE__ */ __name((value) => {
	if (typeof value === "string") {
		try {
			return JSON.parse(value);
		} catch (error3) {
			console.log(`JSON parse error: ${error3}`);
			return value;
		}
	}
	return value;
}, "toJson");
var toArray = /* @__PURE__ */ __name((value, type) => {
	if (typeof value !== "string") {
		return value;
	}
	const lastIdx = value.length - 1;
	const closeBrace = value[lastIdx];
	const openBrace = value[0];
	if (openBrace === "{" && closeBrace === "}") {
		let arr;
		const valTrim = value.slice(1, lastIdx);
		try {
			arr = JSON.parse("[" + valTrim + "]");
		} catch (_) {
			arr = valTrim ? valTrim.split(",") : [];
		}
		return arr.map((val) => convertCell(type, val));
	}
	return value;
}, "toArray");
var toTimestampString = /* @__PURE__ */ __name((value) => {
	if (typeof value === "string") {
		return value.replace(" ", "T");
	}
	return value;
}, "toTimestampString");
var httpEndpointURL = /* @__PURE__ */ __name((socketUrl) => {
	let url = socketUrl;
	url = url.replace(/^ws/i, "http");
	url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "");
	return url.replace(/\/+$/, "");
}, "httpEndpointURL");

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/realtime-js/dist/module/lib/push.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Push = class {
	static {
		__name(this, "Push");
	}
	/**
	 * Initializes the Push
	 *
	 * @param channel The Channel
	 * @param event The event, for example `"phx_join"`
	 * @param payload The payload, for example `{user_id: 123}`
	 * @param timeout The push timeout in milliseconds
	 */
	constructor(channel2, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
		this.channel = channel2;
		this.event = event;
		this.payload = payload;
		this.timeout = timeout;
		this.sent = false;
		this.timeoutTimer = void 0;
		this.ref = "";
		this.receivedResp = null;
		this.recHooks = [];
		this.refEvent = null;
	}
	resend(timeout) {
		this.timeout = timeout;
		this._cancelRefEvent();
		this.ref = "";
		this.refEvent = null;
		this.receivedResp = null;
		this.sent = false;
		this.send();
	}
	send() {
		if (this._hasReceived("timeout")) {
			return;
		}
		this.startTimeout();
		this.sent = true;
		this.channel.socket.push({
			topic: this.channel.topic,
			event: this.event,
			payload: this.payload,
			ref: this.ref,
			join_ref: this.channel._joinRef(),
		});
	}
	updatePayload(payload) {
		this.payload = Object.assign(Object.assign({}, this.payload), payload);
	}
	receive(status, callback) {
		var _a2;
		if (this._hasReceived(status)) {
			callback((_a2 = this.receivedResp) === null || _a2 === void 0 ? void 0 : _a2.response);
		}
		this.recHooks.push({ status, callback });
		return this;
	}
	startTimeout() {
		if (this.timeoutTimer) {
			return;
		}
		this.ref = this.channel.socket._makeRef();
		this.refEvent = this.channel._replyEventName(this.ref);
		const callback = /* @__PURE__ */ __name((payload) => {
			this._cancelRefEvent();
			this._cancelTimeout();
			this.receivedResp = payload;
			this._matchReceive(payload);
		}, "callback");
		this.channel._on(this.refEvent, {}, callback);
		this.timeoutTimer = setTimeout(() => {
			this.trigger("timeout", {});
		}, this.timeout);
	}
	trigger(status, response) {
		if (this.refEvent) this.channel._trigger(this.refEvent, { status, response });
	}
	destroy() {
		this._cancelRefEvent();
		this._cancelTimeout();
	}
	_cancelRefEvent() {
		if (!this.refEvent) {
			return;
		}
		this.channel._off(this.refEvent, {});
	}
	_cancelTimeout() {
		clearTimeout(this.timeoutTimer);
		this.timeoutTimer = void 0;
	}
	_matchReceive({ status, response }) {
		this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
	}
	_hasReceived(status) {
		return this.receivedResp && this.receivedResp.status === status;
	}
};

// node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var REALTIME_PRESENCE_LISTEN_EVENTS;
((REALTIME_PRESENCE_LISTEN_EVENTS2) => {
	REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
	REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
	REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
var RealtimePresence = class _RealtimePresence {
	static {
		__name(this, "RealtimePresence");
	}
	/**
	 * Initializes the Presence.
	 *
	 * @param channel - The RealtimeChannel
	 * @param opts - The options,
	 *        for example `{events: {state: 'state', diff: 'diff'}}`
	 */
	constructor(channel2, opts) {
		this.channel = channel2;
		this.state = {};
		this.pendingDiffs = [];
		this.joinRef = null;
		this.caller = {
			onJoin: /* @__PURE__ */ __name(() => {}, "onJoin"),
			onLeave: /* @__PURE__ */ __name(() => {}, "onLeave"),
			onSync: /* @__PURE__ */ __name(() => {}, "onSync"),
		};
		const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
			state: "presence_state",
			diff: "presence_diff",
		};
		this.channel._on(events.state, {}, (newState) => {
			const { onJoin, onLeave, onSync } = this.caller;
			this.joinRef = this.channel._joinRef();
			this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
			this.pendingDiffs.forEach((diff) => {
				this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
			});
			this.pendingDiffs = [];
			onSync();
		});
		this.channel._on(events.diff, {}, (diff) => {
			const { onJoin, onLeave, onSync } = this.caller;
			if (this.inPendingSyncState()) {
				this.pendingDiffs.push(diff);
			} else {
				this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
				onSync();
			}
		});
		this.onJoin((key, currentPresences, newPresences) => {
			this.channel._trigger("presence", {
				event: "join",
				key,
				currentPresences,
				newPresences,
			});
		});
		this.onLeave((key, currentPresences, leftPresences) => {
			this.channel._trigger("presence", {
				event: "leave",
				key,
				currentPresences,
				leftPresences,
			});
		});
		this.onSync(() => {
			this.channel._trigger("presence", { event: "sync" });
		});
	}
	/**
	 * Used to sync the list of presences on the server with the
	 * client's state.
	 *
	 * An optional `onJoin` and `onLeave` callback can be provided to
	 * react to changes in the client's local presences across
	 * disconnects and reconnects with the server.
	 *
	 * @internal
	 */
	static syncState(currentState, newState, onJoin, onLeave) {
		const state = this.cloneDeep(currentState);
		const transformedState = this.transformState(newState);
		const joins = {};
		const leaves = {};
		this.map(state, (key, presences) => {
			if (!transformedState[key]) {
				leaves[key] = presences;
			}
		});
		this.map(transformedState, (key, newPresences) => {
			const currentPresences = state[key];
			if (currentPresences) {
				const newPresenceRefs = newPresences.map((m) => m.presence_ref);
				const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
				const joinedPresences = newPresences.filter(
					(m) => curPresenceRefs.indexOf(m.presence_ref) < 0,
				);
				const leftPresences = currentPresences.filter(
					(m) => newPresenceRefs.indexOf(m.presence_ref) < 0,
				);
				if (joinedPresences.length > 0) {
					joins[key] = joinedPresences;
				}
				if (leftPresences.length > 0) {
					leaves[key] = leftPresences;
				}
			} else {
				joins[key] = newPresences;
			}
		});
		return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
	}
	/**
	 * Used to sync a diff of presence join and leave events from the
	 * server, as they happen.
	 *
	 * Like `syncState`, `syncDiff` accepts optional `onJoin` and
	 * `onLeave` callbacks to react to a user joining or leaving from a
	 * device.
	 *
	 * @internal
	 */
	static syncDiff(state, diff, onJoin, onLeave) {
		const { joins, leaves } = {
			joins: this.transformState(diff.joins),
			leaves: this.transformState(diff.leaves),
		};
		if (!onJoin) {
			onJoin = /* @__PURE__ */ __name(() => {}, "onJoin");
		}
		if (!onLeave) {
			onLeave = /* @__PURE__ */ __name(() => {}, "onLeave");
		}
		this.map(joins, (key, newPresences) => {
			var _a2;
			const currentPresences = (_a2 = state[key]) !== null && _a2 !== void 0 ? _a2 : [];
			state[key] = this.cloneDeep(newPresences);
			if (currentPresences.length > 0) {
				const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
				const curPresences = currentPresences.filter(
					(m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0,
				);
				state[key].unshift(...curPresences);
			}
			onJoin(key, currentPresences, newPresences);
		});
		this.map(leaves, (key, leftPresences) => {
			let currentPresences = state[key];
			if (!currentPresences) return;
			const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
			currentPresences = currentPresences.filter(
				(m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0,
			);
			state[key] = currentPresences;
			onLeave(key, currentPresences, leftPresences);
			if (currentPresences.length === 0) delete state[key];
		});
		return state;
	}
	/** @internal */
	static map(obj, func) {
		return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
	}
	/**
	 * Remove 'metas' key
	 * Change 'phx_ref' to 'presence_ref'
	 * Remove 'phx_ref' and 'phx_ref_prev'
	 *
	 * @example
	 * // returns {
	 *  abc123: [
	 *    { presence_ref: '2', user_id: 1 },
	 *    { presence_ref: '3', user_id: 2 }
	 *  ]
	 * }
	 * RealtimePresence.transformState({
	 *  abc123: {
	 *    metas: [
	 *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
	 *      { phx_ref: '3', user_id: 2 }
	 *    ]
	 *  }
	 * })
	 *
	 * @internal
	 */
	static transformState(state) {
		state = this.cloneDeep(state);
		return Object.getOwnPropertyNames(state).reduce((newState, key) => {
			const presences = state[key];
			if ("metas" in presences) {
				newState[key] = presences.metas.map((presence) => {
					presence["presence_ref"] = presence["phx_ref"];
					delete presence["phx_ref"];
					delete presence["phx_ref_prev"];
					return presence;
				});
			} else {
				newState[key] = presences;
			}
			return newState;
		}, {});
	}
	/** @internal */
	static cloneDeep(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
	/** @internal */
	onJoin(callback) {
		this.caller.onJoin = callback;
	}
	/** @internal */
	onLeave(callback) {
		this.caller.onLeave = callback;
	}
	/** @internal */
	onSync(callback) {
		this.caller.onSync = callback;
	}
	/** @internal */
	inPendingSyncState() {
		return !this.joinRef || this.joinRef !== this.channel._joinRef();
	}
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
((REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) => {
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
((REALTIME_LISTEN_TYPES2) => {
	REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
	REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
	REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
	REALTIME_LISTEN_TYPES2["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
((REALTIME_SUBSCRIBE_STATES2) => {
	REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
	REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
	REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
	REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
var RealtimeChannel = class _RealtimeChannel {
	static {
		__name(this, "RealtimeChannel");
	}
	constructor(topic, params = { config: {} }, socket) {
		this.topic = topic;
		this.params = params;
		this.socket = socket;
		this.bindings = {};
		this.state = CHANNEL_STATES.closed;
		this.joinedOnce = false;
		this.pushBuffer = [];
		this.subTopic = topic.replace(/^realtime:/i, "");
		this.params.config = Object.assign(
			{
				broadcast: { ack: false, self: false },
				presence: { key: "" },
				private: false,
			},
			params.config,
		);
		this.timeout = this.socket.timeout;
		this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
		this.rejoinTimer = new Timer(
			() => this._rejoinUntilConnected(),
			this.socket.reconnectAfterMs,
		);
		this.joinPush.receive("ok", () => {
			this.state = CHANNEL_STATES.joined;
			this.rejoinTimer.reset();
			this.pushBuffer.forEach((pushEvent) => pushEvent.send());
			this.pushBuffer = [];
		});
		this._onClose(() => {
			this.rejoinTimer.reset();
			this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
			this.state = CHANNEL_STATES.closed;
			this.socket._remove(this);
		});
		this._onError((reason) => {
			if (this._isLeaving() || this._isClosed()) {
				return;
			}
			this.socket.log("channel", `error ${this.topic}`, reason);
			this.state = CHANNEL_STATES.errored;
			this.rejoinTimer.scheduleTimeout();
		});
		this.joinPush.receive("timeout", () => {
			if (!this._isJoining()) {
				return;
			}
			this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
			this.state = CHANNEL_STATES.errored;
			this.rejoinTimer.scheduleTimeout();
		});
		this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
			this._trigger(this._replyEventName(ref), payload);
		});
		this.presence = new RealtimePresence(this);
		this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint) + "/api/broadcast";
		this.private = this.params.config.private || false;
	}
	/** Subscribe registers your client with the server */
	subscribe(callback, timeout = this.timeout) {
		var _a2, _b;
		if (!this.socket.isConnected()) {
			this.socket.connect();
		}
		if (this.joinedOnce) {
			throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
		} else {
			const {
				config: { broadcast, presence, private: isPrivate },
			} = this.params;
			this._onError((e) =>
				callback === null || callback === void 0
					? void 0
					: callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e),
			);
			this._onClose(() =>
				callback === null || callback === void 0
					? void 0
					: callback(REALTIME_SUBSCRIBE_STATES.CLOSED),
			);
			const accessTokenPayload = {};
			const config2 = {
				broadcast,
				presence,
				postgres_changes:
					(_b =
						(_a2 = this.bindings.postgres_changes) === null || _a2 === void 0
							? void 0
							: _a2.map((r) => r.filter)) !== null && _b !== void 0
						? _b
						: [],
				private: isPrivate,
			};
			if (this.socket.accessTokenValue) {
				accessTokenPayload.access_token = this.socket.accessTokenValue;
			}
			this.updateJoinPayload(Object.assign({ config: config2 }, accessTokenPayload));
			this.joinedOnce = true;
			this._rejoin(timeout);
			this.joinPush
				.receive("ok", async ({ postgres_changes }) => {
					var _a3;
					this.socket.setAuth();
					if (postgres_changes === void 0) {
						callback === null || callback === void 0
							? void 0
							: callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
						return;
					} else {
						const clientPostgresBindings = this.bindings.postgres_changes;
						const bindingsLen =
							(_a3 =
								clientPostgresBindings === null || clientPostgresBindings === void 0
									? void 0
									: clientPostgresBindings.length) !== null && _a3 !== void 0
								? _a3
								: 0;
						const newPostgresBindings = [];
						for (let i = 0; i < bindingsLen; i++) {
							const clientPostgresBinding = clientPostgresBindings[i];
							const {
								filter: { event, schema, table: table3, filter },
							} = clientPostgresBinding;
							const serverPostgresFilter = postgres_changes && postgres_changes[i];
							if (
								serverPostgresFilter &&
								serverPostgresFilter.event === event &&
								serverPostgresFilter.schema === schema &&
								serverPostgresFilter.table === table3 &&
								serverPostgresFilter.filter === filter
							) {
								newPostgresBindings.push(
									Object.assign(Object.assign({}, clientPostgresBinding), {
										id: serverPostgresFilter.id,
									}),
								);
							} else {
								this.unsubscribe();
								callback === null || callback === void 0
									? void 0
									: callback(
											REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR,
											new Error(
												"mismatch between server and client bindings for postgres changes",
											),
										);
								return;
							}
						}
						this.bindings.postgres_changes = newPostgresBindings;
						callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
						return;
					}
				})
				.receive("error", (error3) => {
					callback === null || callback === void 0
						? void 0
						: callback(
								REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR,
								new Error(
									JSON.stringify(Object.values(error3).join(", ") || "error"),
								),
							);
					return;
				})
				.receive("timeout", () => {
					callback === null || callback === void 0
						? void 0
						: callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
					return;
				});
		}
		return this;
	}
	presenceState() {
		return this.presence.state;
	}
	async track(payload, opts = {}) {
		return await this.send(
			{
				type: "presence",
				event: "track",
				payload,
			},
			opts.timeout || this.timeout,
		);
	}
	async untrack(opts = {}) {
		return await this.send(
			{
				type: "presence",
				event: "untrack",
			},
			opts,
		);
	}
	on(type, filter, callback) {
		return this._on(type, filter, callback);
	}
	/**
	 * Sends a message into the channel.
	 *
	 * @param args Arguments to send to channel
	 * @param args.type The type of event to send
	 * @param args.event The name of the event being sent
	 * @param args.payload Payload to be sent
	 * @param opts Options to be used during the send process
	 */
	async send(args, opts = {}) {
		var _a2, _b;
		if (!this._canPush() && args.type === "broadcast") {
			const { event, payload: endpoint_payload } = args;
			const authorization = this.socket.accessTokenValue
				? `Bearer ${this.socket.accessTokenValue}`
				: "";
			const options2 = {
				method: "POST",
				headers: {
					Authorization: authorization,
					apikey: this.socket.apiKey ? this.socket.apiKey : "",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: [
						{
							topic: this.subTopic,
							event,
							payload: endpoint_payload,
							private: this.private,
						},
					],
				}),
			};
			try {
				const response = await this._fetchWithTimeout(
					this.broadcastEndpointURL,
					options2,
					(_a2 = opts.timeout) !== null && _a2 !== void 0 ? _a2 : this.timeout,
				);
				await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
				return response.ok ? "ok" : "error";
			} catch (error3) {
				if (error3.name === "AbortError") {
					return "timed out";
				} else {
					return "error";
				}
			}
		} else {
			return new Promise((resolve) => {
				var _a3, _b2, _c;
				const push = this._push(args.type, args, opts.timeout || this.timeout);
				if (
					args.type === "broadcast" &&
					!((_c =
						(_b2 =
							(_a3 = this.params) === null || _a3 === void 0
								? void 0
								: _a3.config) === null || _b2 === void 0
							? void 0
							: _b2.broadcast) === null || _c === void 0
						? void 0
						: _c.ack)
				) {
					resolve("ok");
				}
				push.receive("ok", () => resolve("ok"));
				push.receive("error", () => resolve("error"));
				push.receive("timeout", () => resolve("timed out"));
			});
		}
	}
	updateJoinPayload(payload) {
		this.joinPush.updatePayload(payload);
	}
	/**
	 * Leaves the channel.
	 *
	 * Unsubscribes from server events, and instructs channel to terminate on server.
	 * Triggers onClose() hooks.
	 *
	 * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
	 * channel.unsubscribe().receive("ok", () => alert("left!") )
	 */
	unsubscribe(timeout = this.timeout) {
		this.state = CHANNEL_STATES.leaving;
		const onClose = /* @__PURE__ */ __name(() => {
			this.socket.log("channel", `leave ${this.topic}`);
			this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
		}, "onClose");
		this.rejoinTimer.reset();
		this.joinPush.destroy();
		return new Promise((resolve) => {
			const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
			leavePush
				.receive("ok", () => {
					onClose();
					resolve("ok");
				})
				.receive("timeout", () => {
					onClose();
					resolve("timed out");
				})
				.receive("error", () => {
					resolve("error");
				});
			leavePush.send();
			if (!this._canPush()) {
				leavePush.trigger("ok", {});
			}
		});
	}
	/** @internal */
	async _fetchWithTimeout(url, options2, timeout) {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		const response = await this.socket.fetch(
			url,
			Object.assign(Object.assign({}, options2), { signal: controller.signal }),
		);
		clearTimeout(id);
		return response;
	}
	/** @internal */
	_push(event, payload, timeout = this.timeout) {
		if (!this.joinedOnce) {
			throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
		}
		const pushEvent = new Push(this, event, payload, timeout);
		if (this._canPush()) {
			pushEvent.send();
		} else {
			pushEvent.startTimeout();
			this.pushBuffer.push(pushEvent);
		}
		return pushEvent;
	}
	/**
	 * Overridable message hook
	 *
	 * Receives all events for specialized message handling before dispatching to the channel callbacks.
	 * Must return the payload, modified or unmodified.
	 *
	 * @internal
	 */
	_onMessage(_event, payload, _ref) {
		return payload;
	}
	/** @internal */
	_isMember(topic) {
		return this.topic === topic;
	}
	/** @internal */
	_joinRef() {
		return this.joinPush.ref;
	}
	/** @internal */
	_trigger(type, payload, ref) {
		var _a2, _b;
		const typeLower = type.toLocaleLowerCase();
		const { close, error: error3, leave, join } = CHANNEL_EVENTS;
		const events = [close, error3, leave, join];
		if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
			return;
		}
		let handledPayload = this._onMessage(typeLower, payload, ref);
		if (payload && !handledPayload) {
			throw "channel onMessage callbacks must return the payload, modified or unmodified";
		}
		if (["insert", "update", "delete"].includes(typeLower)) {
			(_a2 = this.bindings.postgres_changes) === null || _a2 === void 0
				? void 0
				: _a2
						.filter((bind) => {
							var _a3, _b2, _c;
							return (
								((_a3 = bind.filter) === null || _a3 === void 0
									? void 0
									: _a3.event) === "*" ||
								((_c =
									(_b2 = bind.filter) === null || _b2 === void 0
										? void 0
										: _b2.event) === null || _c === void 0
									? void 0
									: _c.toLocaleLowerCase()) === typeLower
							);
						})
						.map((bind) => bind.callback(handledPayload, ref));
		} else {
			(_b = this.bindings[typeLower]) === null || _b === void 0
				? void 0
				: _b
						.filter((bind) => {
							var _a3, _b2, _c, _d, _e, _f;
							if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
								if ("id" in bind) {
									const bindId = bind.id;
									const bindEvent =
										(_a3 = bind.filter) === null || _a3 === void 0
											? void 0
											: _a3.event;
									return (
										bindId &&
										((_b2 = payload.ids) === null || _b2 === void 0
											? void 0
											: _b2.includes(bindId)) &&
										(bindEvent === "*" ||
											(bindEvent === null || bindEvent === void 0
												? void 0
												: bindEvent.toLocaleLowerCase()) ===
												((_c = payload.data) === null || _c === void 0
													? void 0
													: _c.type.toLocaleLowerCase()))
									);
								} else {
									const bindEvent =
										(_e =
											(_d =
												bind === null || bind === void 0
													? void 0
													: bind.filter) === null || _d === void 0
												? void 0
												: _d.event) === null || _e === void 0
											? void 0
											: _e.toLocaleLowerCase();
									return (
										bindEvent === "*" ||
										bindEvent ===
											((_f =
												payload === null || payload === void 0
													? void 0
													: payload.event) === null || _f === void 0
												? void 0
												: _f.toLocaleLowerCase())
									);
								}
							} else {
								return bind.type.toLocaleLowerCase() === typeLower;
							}
						})
						.map((bind) => {
							if (typeof handledPayload === "object" && "ids" in handledPayload) {
								const postgresChanges = handledPayload.data;
								const {
									schema,
									table: table3,
									commit_timestamp,
									type: type2,
									errors,
								} = postgresChanges;
								const enrichedPayload = {
									schema,
									table: table3,
									commit_timestamp,
									eventType: type2,
									new: {},
									old: {},
									errors,
								};
								handledPayload = Object.assign(
									Object.assign({}, enrichedPayload),
									this._getPayloadRecords(postgresChanges),
								);
							}
							bind.callback(handledPayload, ref);
						});
		}
	}
	/** @internal */
	_isClosed() {
		return this.state === CHANNEL_STATES.closed;
	}
	/** @internal */
	_isJoined() {
		return this.state === CHANNEL_STATES.joined;
	}
	/** @internal */
	_isJoining() {
		return this.state === CHANNEL_STATES.joining;
	}
	/** @internal */
	_isLeaving() {
		return this.state === CHANNEL_STATES.leaving;
	}
	/** @internal */
	_replyEventName(ref) {
		return `chan_reply_${ref}`;
	}
	/** @internal */
	_on(type, filter, callback) {
		const typeLower = type.toLocaleLowerCase();
		const binding2 = {
			type: typeLower,
			filter,
			callback,
		};
		if (this.bindings[typeLower]) {
			this.bindings[typeLower].push(binding2);
		} else {
			this.bindings[typeLower] = [binding2];
		}
		return this;
	}
	/** @internal */
	_off(type, filter) {
		const typeLower = type.toLocaleLowerCase();
		this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
			var _a2;
			return !(
				((_a2 = bind.type) === null || _a2 === void 0
					? void 0
					: _a2.toLocaleLowerCase()) === typeLower &&
				_RealtimeChannel.isEqual(bind.filter, filter)
			);
		});
		return this;
	}
	/** @internal */
	static isEqual(obj1, obj2) {
		if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			return false;
		}
		for (const k in obj1) {
			if (obj1[k] !== obj2[k]) {
				return false;
			}
		}
		return true;
	}
	/** @internal */
	_rejoinUntilConnected() {
		this.rejoinTimer.scheduleTimeout();
		if (this.socket.isConnected()) {
			this._rejoin();
		}
	}
	/**
	 * Registers a callback that will be executed when the channel closes.
	 *
	 * @internal
	 */
	_onClose(callback) {
		this._on(CHANNEL_EVENTS.close, {}, callback);
	}
	/**
	 * Registers a callback that will be executed when the channel encounteres an error.
	 *
	 * @internal
	 */
	_onError(callback) {
		this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
	}
	/**
	 * Returns `true` if the socket is connected and the channel has been joined.
	 *
	 * @internal
	 */
	_canPush() {
		return this.socket.isConnected() && this._isJoined();
	}
	/** @internal */
	_rejoin(timeout = this.timeout) {
		if (this._isLeaving()) {
			return;
		}
		this.socket._leaveOpenTopic(this.topic);
		this.state = CHANNEL_STATES.joining;
		this.joinPush.resend(timeout);
	}
	/** @internal */
	_getPayloadRecords(payload) {
		const records = {
			new: {},
			old: {},
		};
		if (payload.type === "INSERT" || payload.type === "UPDATE") {
			records.new = convertChangeData(payload.columns, payload.record);
		}
		if (payload.type === "UPDATE" || payload.type === "DELETE") {
			records.old = convertChangeData(payload.columns, payload.old_record);
		}
		return records;
	}
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var noop2 = /* @__PURE__ */ __name(() => {}, "noop");
var NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== "undefined";
var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
var RealtimeClient = class {
	static {
		__name(this, "RealtimeClient");
	}
	/**
	 * Initializes the Socket.
	 *
	 * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
	 * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
	 * @param options.transport The Websocket Transport, for example WebSocket.
	 * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
	 * @param options.params The optional params to pass when connecting.
	 * @param options.headers The optional headers to pass when connecting.
	 * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
	 * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
	 * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
	 * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
	 * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
	 * @param options.worker Use Web Worker to set a side flow. Defaults to false.
	 * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
	 */
	constructor(endPoint, options2) {
		var _a2;
		this.accessTokenValue = null;
		this.apiKey = null;
		this.channels = [];
		this.endPoint = "";
		this.httpEndpoint = "";
		this.headers = DEFAULT_HEADERS;
		this.params = {};
		this.timeout = DEFAULT_TIMEOUT;
		this.heartbeatIntervalMs = 3e4;
		this.heartbeatTimer = void 0;
		this.pendingHeartbeatRef = null;
		this.ref = 0;
		this.logger = noop2;
		this.conn = null;
		this.sendBuffer = [];
		this.serializer = new Serializer();
		this.stateChangeCallbacks = {
			open: [],
			close: [],
			error: [],
			message: [],
		};
		this.accessToken = null;
		this._resolveFetch = (customFetch) => {
			let _fetch;
			if (customFetch) {
				_fetch = customFetch;
			} else if (typeof fetch === "undefined") {
				_fetch = /* @__PURE__ */ __name(
					(...args) =>
						Promise.resolve()
							.then(() => (init_browser(), browser_exports))
							.then(({ default: fetch3 }) => fetch3(...args)),
					"_fetch",
				);
			} else {
				_fetch = fetch;
			}
			return (...args) => _fetch(...args);
		};
		this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
		this.httpEndpoint = httpEndpointURL(endPoint);
		if (options2 === null || options2 === void 0 ? void 0 : options2.transport) {
			this.transport = options2.transport;
		} else {
			this.transport = null;
		}
		if (options2 === null || options2 === void 0 ? void 0 : options2.params)
			this.params = options2.params;
		if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
			this.headers = Object.assign(Object.assign({}, this.headers), options2.headers);
		if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
			this.timeout = options2.timeout;
		if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
			this.logger = options2.logger;
		if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
			this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
		const accessTokenValue =
			(_a2 = options2 === null || options2 === void 0 ? void 0 : options2.params) === null ||
			_a2 === void 0
				? void 0
				: _a2.apikey;
		if (accessTokenValue) {
			this.accessTokenValue = accessTokenValue;
			this.apiKey = accessTokenValue;
		}
		this.reconnectAfterMs = (
			options2 === null || options2 === void 0
				? void 0
				: options2.reconnectAfterMs
		)
			? options2.reconnectAfterMs
			: (tries) => {
					return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
				};
		this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode)
			? options2.encode
			: (payload, callback) => {
					return callback(JSON.stringify(payload));
				};
		this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode)
			? options2.decode
			: this.serializer.decode.bind(this.serializer);
		this.reconnectTimer = new Timer(async () => {
			this.disconnect();
			this.connect();
		}, this.reconnectAfterMs);
		this.fetch = this._resolveFetch(
			options2 === null || options2 === void 0 ? void 0 : options2.fetch,
		);
		if (options2 === null || options2 === void 0 ? void 0 : options2.worker) {
			if (typeof window !== "undefined" && !window.Worker) {
				throw new Error("Web Worker is not supported");
			}
			this.worker =
				(options2 === null || options2 === void 0 ? void 0 : options2.worker) || false;
			this.workerUrl = options2 === null || options2 === void 0 ? void 0 : options2.workerUrl;
		}
		this.accessToken =
			(options2 === null || options2 === void 0 ? void 0 : options2.accessToken) || null;
	}
	/**
	 * Connects the socket, unless already connected.
	 */
	connect() {
		if (this.conn) {
			return;
		}
		if (this.transport) {
			this.conn = new this.transport(this.endpointURL(), void 0, {
				headers: this.headers,
			});
			return;
		}
		if (NATIVE_WEBSOCKET_AVAILABLE) {
			this.conn = new WebSocket(this.endpointURL());
			this.setupConnection();
			return;
		}
		this.conn = new WSWebSocketDummy(this.endpointURL(), void 0, {
			close: /* @__PURE__ */ __name(() => {
				this.conn = null;
			}, "close"),
		});
		Promise.resolve()
			.then(() => __toESM(require_browser()))
			.then(({ default: WS }) => {
				this.conn = new WS(this.endpointURL(), void 0, {
					headers: this.headers,
				});
				this.setupConnection();
			});
	}
	/**
	 * Returns the URL of the websocket.
	 * @returns string The URL of the websocket.
	 */
	endpointURL() {
		return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
	}
	/**
	 * Disconnects the socket.
	 *
	 * @param code A numeric status code to send on disconnect.
	 * @param reason A custom reason for the disconnect.
	 */
	disconnect(code, reason) {
		if (this.conn) {
			this.conn.onclose = () => {};
			if (code) {
				this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
			} else {
				this.conn.close();
			}
			this.conn = null;
			this.heartbeatTimer && clearInterval(this.heartbeatTimer);
			this.reconnectTimer.reset();
		}
	}
	/**
	 * Returns all created channels
	 */
	getChannels() {
		return this.channels;
	}
	/**
	 * Unsubscribes and removes a single channel
	 * @param channel A RealtimeChannel instance
	 */
	async removeChannel(channel2) {
		const status = await channel2.unsubscribe();
		if (this.channels.length === 0) {
			this.disconnect();
		}
		return status;
	}
	/**
	 * Unsubscribes and removes all channels
	 */
	async removeAllChannels() {
		const values_1 = await Promise.all(this.channels.map((channel2) => channel2.unsubscribe()));
		this.disconnect();
		return values_1;
	}
	/**
	 * Logs the message.
	 *
	 * For customized logging, `this.logger` can be overridden.
	 */
	log(kind, msg, data) {
		this.logger(kind, msg, data);
	}
	/**
	 * Returns the current state of the socket.
	 */
	connectionState() {
		switch (this.conn && this.conn.readyState) {
			case SOCKET_STATES.connecting:
				return CONNECTION_STATE.Connecting;
			case SOCKET_STATES.open:
				return CONNECTION_STATE.Open;
			case SOCKET_STATES.closing:
				return CONNECTION_STATE.Closing;
			default:
				return CONNECTION_STATE.Closed;
		}
	}
	/**
	 * Returns `true` is the connection is open.
	 */
	isConnected() {
		return this.connectionState() === CONNECTION_STATE.Open;
	}
	channel(topic, params = { config: {} }) {
		const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
		this.channels.push(chan);
		return chan;
	}
	/**
	 * Push out a message if the socket is connected.
	 *
	 * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
	 */
	push(data) {
		const { topic, event, payload, ref } = data;
		const callback = /* @__PURE__ */ __name(() => {
			this.encode(data, (result) => {
				var _a2;
				(_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.send(result);
			});
		}, "callback");
		this.log("push", `${topic} ${event} (${ref})`, payload);
		if (this.isConnected()) {
			callback();
		} else {
			this.sendBuffer.push(callback);
		}
	}
	/**
	 * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
	 *
	 * If param is null it will use the `accessToken` callback function or the token set on the client.
	 *
	 * On callback used, it will set the value of the token internal to the client.
	 *
	 * @param token A JWT string to override the token set on the client.
	 */
	async setAuth(token = null) {
		const tokenToSend =
			token || (this.accessToken && (await this.accessToken())) || this.accessTokenValue;
		if (tokenToSend) {
			let parsed = null;
			try {
				parsed = JSON.parse(atob(tokenToSend.split(".")[1]));
			} catch (_error) {}
			if (parsed && parsed.exp) {
				const now = Math.floor(Date.now() / 1e3);
				const valid = now - parsed.exp < 0;
				if (!valid) {
					this.log(
						"auth",
						`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${parsed.exp}`,
					);
					return Promise.reject(
						`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${parsed.exp}`,
					);
				}
			}
			this.accessTokenValue = tokenToSend;
			this.channels.forEach((channel2) => {
				tokenToSend && channel2.updateJoinPayload({ access_token: tokenToSend });
				if (channel2.joinedOnce && channel2._isJoined()) {
					channel2._push(CHANNEL_EVENTS.access_token, {
						access_token: tokenToSend,
					});
				}
			});
		}
	}
	/**
	 * Sends a heartbeat message if the socket is connected.
	 */
	async sendHeartbeat() {
		var _a2;
		if (!this.isConnected()) {
			return;
		}
		if (this.pendingHeartbeatRef) {
			this.pendingHeartbeatRef = null;
			this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
			(_a2 = this.conn) === null || _a2 === void 0
				? void 0
				: _a2.close(WS_CLOSE_NORMAL, "hearbeat timeout");
			return;
		}
		this.pendingHeartbeatRef = this._makeRef();
		this.push({
			topic: "phoenix",
			event: "heartbeat",
			payload: {},
			ref: this.pendingHeartbeatRef,
		});
		this.setAuth();
	}
	/**
	 * Flushes send buffer
	 */
	flushSendBuffer() {
		if (this.isConnected() && this.sendBuffer.length > 0) {
			this.sendBuffer.forEach((callback) => callback());
			this.sendBuffer = [];
		}
	}
	/**
	 * Return the next message ref, accounting for overflows
	 *
	 * @internal
	 */
	_makeRef() {
		const newRef = this.ref + 1;
		if (newRef === this.ref) {
			this.ref = 0;
		} else {
			this.ref = newRef;
		}
		return this.ref.toString();
	}
	/**
	 * Unsubscribe from channels with the specified topic.
	 *
	 * @internal
	 */
	_leaveOpenTopic(topic) {
		const dupChannel = this.channels.find(
			(c) => c.topic === topic && (c._isJoined() || c._isJoining()),
		);
		if (dupChannel) {
			this.log("transport", `leaving duplicate topic "${topic}"`);
			dupChannel.unsubscribe();
		}
	}
	/**
	 * Removes a subscription from the socket.
	 *
	 * @param channel An open subscription.
	 *
	 * @internal
	 */
	_remove(channel2) {
		this.channels = this.channels.filter((c) => c._joinRef() !== channel2._joinRef());
	}
	/**
	 * Sets up connection handlers.
	 *
	 * @internal
	 */
	setupConnection() {
		if (this.conn) {
			this.conn.binaryType = "arraybuffer";
			this.conn.onopen = () => this._onConnOpen();
			this.conn.onerror = (error3) => this._onConnError(error3);
			this.conn.onmessage = (event) => this._onConnMessage(event);
			this.conn.onclose = (event) => this._onConnClose(event);
		}
	}
	/** @internal */
	_onConnMessage(rawMessage) {
		this.decode(rawMessage.data, (msg) => {
			const { topic, event, payload, ref } = msg;
			if (ref && ref === this.pendingHeartbeatRef) {
				this.pendingHeartbeatRef = null;
			}
			this.log(
				"receive",
				`${payload.status || ""} ${topic} ${event} ${(ref && "(" + ref + ")") || ""}`,
				payload,
			);
			this.channels
				.filter((channel2) => channel2._isMember(topic))
				.forEach((channel2) => channel2._trigger(event, payload, ref));
			this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
		});
	}
	/** @internal */
	async _onConnOpen() {
		this.log("transport", `connected to ${this.endpointURL()}`);
		this.flushSendBuffer();
		this.reconnectTimer.reset();
		if (!this.worker) {
			this.heartbeatTimer && clearInterval(this.heartbeatTimer);
			this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
		} else {
			if (this.workerUrl) {
				this.log("worker", `starting worker for from ${this.workerUrl}`);
			} else {
				this.log("worker", `starting default worker`);
			}
			const objectUrl = this._workerObjectUrl(this.workerUrl);
			this.workerRef = new Worker(objectUrl);
			this.workerRef.onerror = (error3) => {
				this.log("worker", "worker error", error3.message);
				this.workerRef.terminate();
			};
			this.workerRef.onmessage = (event) => {
				if (event.data.event === "keepAlive") {
					this.sendHeartbeat();
				}
			};
			this.workerRef.postMessage({
				event: "start",
				interval: this.heartbeatIntervalMs,
			});
		}
		this.stateChangeCallbacks.open.forEach((callback) => callback());
	}
	/** @internal */
	_onConnClose(event) {
		this.log("transport", "close", event);
		this._triggerChanError();
		this.heartbeatTimer && clearInterval(this.heartbeatTimer);
		this.reconnectTimer.scheduleTimeout();
		this.stateChangeCallbacks.close.forEach((callback) => callback(event));
	}
	/** @internal */
	_onConnError(error3) {
		this.log("transport", error3.message);
		this._triggerChanError();
		this.stateChangeCallbacks.error.forEach((callback) => callback(error3));
	}
	/** @internal */
	_triggerChanError() {
		this.channels.forEach((channel2) => channel2._trigger(CHANNEL_EVENTS.error));
	}
	/** @internal */
	_appendParams(url, params) {
		if (Object.keys(params).length === 0) {
			return url;
		}
		const prefix = url.match(/\?/) ? "&" : "?";
		const query = new URLSearchParams(params);
		return `${url}${prefix}${query}`;
	}
	_workerObjectUrl(url) {
		let result_url;
		if (url) {
			result_url = url;
		} else {
			const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
			result_url = URL.createObjectURL(blob);
		}
		return result_url;
	}
};
var WSWebSocketDummy = class {
	static {
		__name(this, "WSWebSocketDummy");
	}
	constructor(address, _protocols, options2) {
		this.binaryType = "arraybuffer";
		this.onclose = () => {};
		this.onerror = () => {};
		this.onmessage = () => {};
		this.onopen = () => {};
		this.readyState = SOCKET_STATES.connecting;
		this.send = () => {};
		this.url = null;
		this.url = address;
		this.close = options2.close;
	}
};

// node_modules/@supabase/storage-js/dist/module/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/storage-js/dist/module/lib/errors.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var StorageError = class extends Error {
	static {
		__name(this, "StorageError");
	}
	constructor(message) {
		super(message);
		this.__isStorageError = true;
		this.name = "StorageError";
	}
};
function isStorageError(error3) {
	return typeof error3 === "object" && error3 !== null && "__isStorageError" in error3;
}
__name(isStorageError, "isStorageError");
var StorageApiError = class extends StorageError {
	static {
		__name(this, "StorageApiError");
	}
	constructor(message, status) {
		super(message);
		this.name = "StorageApiError";
		this.status = status;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
		};
	}
};
var StorageUnknownError = class extends StorageError {
	static {
		__name(this, "StorageUnknownError");
	}
	constructor(message, originalError) {
		super(message);
		this.name = "StorageUnknownError";
		this.originalError = originalError;
	}
};

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/storage-js/dist/module/lib/helpers.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __awaiter2 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var resolveFetch2 = /* @__PURE__ */ __name((customFetch) => {
	let _fetch;
	if (customFetch) {
		_fetch = customFetch;
	} else if (typeof fetch === "undefined") {
		_fetch = /* @__PURE__ */ __name(
			(...args) =>
				Promise.resolve()
					.then(() => (init_browser(), browser_exports))
					.then(({ default: fetch3 }) => fetch3(...args)),
			"_fetch",
		);
	} else {
		_fetch = fetch;
	}
	return (...args) => _fetch(...args);
}, "resolveFetch");
var resolveResponse = /* @__PURE__ */ __name(
	() =>
		__awaiter2(void 0, void 0, void 0, function* () {
			if (typeof Response === "undefined") {
				return (yield Promise.resolve().then(() => (init_browser(), browser_exports)))
					.Response;
			}
			return Response;
		}),
	"resolveResponse",
);
var recursiveToCamel = /* @__PURE__ */ __name((item) => {
	if (Array.isArray(item)) {
		return item.map((el) => recursiveToCamel(el));
	} else if (typeof item === "function" || item !== Object(item)) {
		return item;
	}
	const result = {};
	Object.entries(item).forEach(([key, value]) => {
		const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
		result[newKey] = recursiveToCamel(value);
	});
	return result;
}, "recursiveToCamel");

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
var __awaiter3 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var _getErrorMessage = /* @__PURE__ */ __name(
	(err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err),
	"_getErrorMessage",
);
var handleError = /* @__PURE__ */ __name(
	(error3, reject, options2) =>
		__awaiter3(void 0, void 0, void 0, function* () {
			const Res = yield resolveResponse();
			if (
				error3 instanceof Res &&
				!(options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
			) {
				error3
					.json()
					.then((err) => {
						reject(new StorageApiError(_getErrorMessage(err), error3.status || 500));
					})
					.catch((err) => {
						reject(new StorageUnknownError(_getErrorMessage(err), err));
					});
			} else {
				reject(new StorageUnknownError(_getErrorMessage(error3), error3));
			}
		}),
	"handleError",
);
var _getRequestParams = /* @__PURE__ */ __name((method, options2, parameters, body) => {
	const params = {
		method,
		headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {},
	};
	if (method === "GET") {
		return params;
	}
	params.headers = Object.assign(
		{ "Content-Type": "application/json" },
		options2 === null || options2 === void 0 ? void 0 : options2.headers,
	);
	if (body) {
		params.body = JSON.stringify(body);
	}
	return Object.assign(Object.assign({}, params), parameters);
}, "_getRequestParams");
function _handleRequest(fetcher, method, url, options2, parameters, body) {
	return __awaiter3(this, void 0, void 0, function* () {
		return new Promise((resolve, reject) => {
			fetcher(url, _getRequestParams(method, options2, parameters, body))
				.then((result) => {
					if (!result.ok) throw result;
					if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
						return result;
					return result.json();
				})
				.then((data) => resolve(data))
				.catch((error3) => handleError(error3, reject, options2));
		});
	});
}
__name(_handleRequest, "_handleRequest");
function get(fetcher, url, options2, parameters) {
	return __awaiter3(this, void 0, void 0, function* () {
		return _handleRequest(fetcher, "GET", url, options2, parameters);
	});
}
__name(get, "get");
function post(fetcher, url, body, options2, parameters) {
	return __awaiter3(this, void 0, void 0, function* () {
		return _handleRequest(fetcher, "POST", url, options2, parameters, body);
	});
}
__name(post, "post");
function put(fetcher, url, body, options2, parameters) {
	return __awaiter3(this, void 0, void 0, function* () {
		return _handleRequest(fetcher, "PUT", url, options2, parameters, body);
	});
}
__name(put, "put");
function head(fetcher, url, options2, parameters) {
	return __awaiter3(this, void 0, void 0, function* () {
		return _handleRequest(
			fetcher,
			"HEAD",
			url,
			Object.assign(Object.assign({}, options2), { noResolveJson: true }),
			parameters,
		);
	});
}
__name(head, "head");
function remove(fetcher, url, body, options2, parameters) {
	return __awaiter3(this, void 0, void 0, function* () {
		return _handleRequest(fetcher, "DELETE", url, options2, parameters, body);
	});
}
__name(remove, "remove");

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var __awaiter4 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var DEFAULT_SEARCH_OPTIONS = {
	limit: 100,
	offset: 0,
	sortBy: {
		column: "name",
		order: "asc",
	},
};
var DEFAULT_FILE_OPTIONS = {
	cacheControl: "3600",
	contentType: "text/plain;charset=UTF-8",
	upsert: false,
};
var StorageFileApi = class {
	static {
		__name(this, "StorageFileApi");
	}
	constructor(url, headers = {}, bucketId, fetch3) {
		this.url = url;
		this.headers = headers;
		this.bucketId = bucketId;
		this.fetch = resolveFetch2(fetch3);
	}
	/**
	 * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
	 *
	 * @param method HTTP method.
	 * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	 * @param fileBody The body of the file to be stored in the bucket.
	 */
	uploadOrUpdate(method, path, fileBody, fileOptions) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				let body;
				const options2 = Object.assign(
					Object.assign({}, DEFAULT_FILE_OPTIONS),
					fileOptions,
				);
				let headers = Object.assign(
					Object.assign({}, this.headers),
					method === "POST" && { "x-upsert": String(options2.upsert) },
				);
				const metadata = options2.metadata;
				if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
					body = new FormData();
					body.append("cacheControl", options2.cacheControl);
					if (metadata) {
						body.append("metadata", this.encodeMetadata(metadata));
					}
					body.append("", fileBody);
				} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
					body = fileBody;
					body.append("cacheControl", options2.cacheControl);
					if (metadata) {
						body.append("metadata", this.encodeMetadata(metadata));
					}
				} else {
					body = fileBody;
					headers["cache-control"] = `max-age=${options2.cacheControl}`;
					headers["content-type"] = options2.contentType;
					if (metadata) {
						headers["x-metadata"] = this.toBase64(this.encodeMetadata(metadata));
					}
				}
				if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
					headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
				}
				const cleanPath = this._removeEmptyFolders(path);
				const _path = this._getFinalPath(cleanPath);
				const res = yield this.fetch(
					`${this.url}/object/${_path}`,
					Object.assign(
						{ method, body, headers },
						(options2 === null || options2 === void 0 ? void 0 : options2.duplex)
							? { duplex: options2.duplex }
							: {},
					),
				);
				const data = yield res.json();
				if (res.ok) {
					return {
						data: { path: cleanPath, id: data.Id, fullPath: data.Key },
						error: null,
					};
				} else {
					const error3 = data;
					return { data: null, error: error3 };
				}
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Uploads a file to an existing bucket.
	 *
	 * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	 * @param fileBody The body of the file to be stored in the bucket.
	 */
	upload(path, fileBody, fileOptions) {
		return __awaiter4(this, void 0, void 0, function* () {
			return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
		});
	}
	/**
	 * Upload a file with a token generated from `createSignedUploadUrl`.
	 * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	 * @param token The token generated from `createSignedUploadUrl`
	 * @param fileBody The body of the file to be stored in the bucket.
	 */
	uploadToSignedUrl(path, token, fileBody, fileOptions) {
		return __awaiter4(this, void 0, void 0, function* () {
			const cleanPath = this._removeEmptyFolders(path);
			const _path = this._getFinalPath(cleanPath);
			const url = new URL(this.url + `/object/upload/sign/${_path}`);
			url.searchParams.set("token", token);
			try {
				let body;
				const options2 = Object.assign(
					{ upsert: DEFAULT_FILE_OPTIONS.upsert },
					fileOptions,
				);
				const headers = Object.assign(Object.assign({}, this.headers), {
					"x-upsert": String(options2.upsert),
				});
				if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
					body = new FormData();
					body.append("cacheControl", options2.cacheControl);
					body.append("", fileBody);
				} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
					body = fileBody;
					body.append("cacheControl", options2.cacheControl);
				} else {
					body = fileBody;
					headers["cache-control"] = `max-age=${options2.cacheControl}`;
					headers["content-type"] = options2.contentType;
				}
				const res = yield this.fetch(url.toString(), {
					method: "PUT",
					body,
					headers,
				});
				const data = yield res.json();
				if (res.ok) {
					return {
						data: { path: cleanPath, fullPath: data.Key },
						error: null,
					};
				} else {
					const error3 = data;
					return { data: null, error: error3 };
				}
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Creates a signed upload URL.
	 * Signed upload URLs can be used to upload files to the bucket without further authentication.
	 * They are valid for 2 hours.
	 * @param path The file path, including the current file name. For example `folder/image.png`.
	 * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
	 */
	createSignedUploadUrl(path, options2) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const _path = this._getFinalPath(path);
				const headers = Object.assign({}, this.headers);
				if (options2 === null || options2 === void 0 ? void 0 : options2.upsert) {
					headers["x-upsert"] = "true";
				}
				const data = yield post(
					this.fetch,
					`${this.url}/object/upload/sign/${_path}`,
					{},
					{ headers },
				);
				const url = new URL(this.url + data.url);
				const token = url.searchParams.get("token");
				if (!token) {
					throw new StorageError("No token returned by API");
				}
				return { data: { signedUrl: url.toString(), path, token }, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Replaces an existing file at the specified path with a new one.
	 *
	 * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
	 * @param fileBody The body of the file to be stored in the bucket.
	 */
	update(path, fileBody, fileOptions) {
		return __awaiter4(this, void 0, void 0, function* () {
			return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
		});
	}
	/**
	 * Moves an existing file to a new path in the same bucket.
	 *
	 * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	 * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
	 * @param options The destination options.
	 */
	move(fromPath, toPath, options2) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const data = yield post(
					this.fetch,
					`${this.url}/object/move`,
					{
						bucketId: this.bucketId,
						sourceKey: fromPath,
						destinationKey: toPath,
						destinationBucket:
							options2 === null || options2 === void 0
								? void 0
								: options2.destinationBucket,
					},
					{ headers: this.headers },
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Copies an existing file to a new path in the same bucket.
	 *
	 * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	 * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
	 * @param options The destination options.
	 */
	copy(fromPath, toPath, options2) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const data = yield post(
					this.fetch,
					`${this.url}/object/copy`,
					{
						bucketId: this.bucketId,
						sourceKey: fromPath,
						destinationKey: toPath,
						destinationBucket:
							options2 === null || options2 === void 0
								? void 0
								: options2.destinationBucket,
					},
					{ headers: this.headers },
				);
				return { data: { path: data.Key }, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
	 *
	 * @param path The file path, including the current file name. For example `folder/image.png`.
	 * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
	 * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	 * @param options.transform Transform the asset before serving it to the client.
	 */
	createSignedUrl(path, expiresIn, options2) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const _path = this._getFinalPath(path);
				let data = yield post(
					this.fetch,
					`${this.url}/object/sign/${_path}`,
					Object.assign(
						{ expiresIn },
						(options2 === null || options2 === void 0 ? void 0 : options2.transform)
							? { transform: options2.transform }
							: {},
					),
					{ headers: this.headers },
				);
				const downloadQueryParam = (
					options2 === null || options2 === void 0
						? void 0
						: options2.download
				)
					? `&download=${options2.download === true ? "" : options2.download}`
					: "";
				const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
				data = { signedUrl };
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
	 *
	 * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
	 * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
	 * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	 */
	createSignedUrls(paths, expiresIn, options2) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const data = yield post(
					this.fetch,
					`${this.url}/object/sign/${this.bucketId}`,
					{ expiresIn, paths },
					{ headers: this.headers },
				);
				const downloadQueryParam = (
					options2 === null || options2 === void 0
						? void 0
						: options2.download
				)
					? `&download=${options2.download === true ? "" : options2.download}`
					: "";
				return {
					data: data.map((datum) =>
						Object.assign(Object.assign({}, datum), {
							signedUrl: datum.signedURL
								? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`)
								: null,
						}),
					),
					error: null,
				};
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
	 *
	 * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
	 * @param options.transform Transform the asset before serving it to the client.
	 */
	download(path, options2) {
		return __awaiter4(this, void 0, void 0, function* () {
			const wantsTransformation =
				typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !==
				"undefined";
			const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
			const transformationQuery = this.transformOptsToQueryString(
				(options2 === null || options2 === void 0 ? void 0 : options2.transform) || {},
			);
			const queryString = transformationQuery ? `?${transformationQuery}` : "";
			try {
				const _path = this._getFinalPath(path);
				const res = yield get(
					this.fetch,
					`${this.url}/${renderPath}/${_path}${queryString}`,
					{
						headers: this.headers,
						noResolveJson: true,
					},
				);
				const data = yield res.blob();
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Retrieves the details of an existing file.
	 * @param path
	 */
	info(path) {
		return __awaiter4(this, void 0, void 0, function* () {
			const _path = this._getFinalPath(path);
			try {
				const data = yield get(this.fetch, `${this.url}/object/info/${_path}`, {
					headers: this.headers,
				});
				return { data: recursiveToCamel(data), error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Checks the existence of a file.
	 * @param path
	 */
	exists(path) {
		return __awaiter4(this, void 0, void 0, function* () {
			const _path = this._getFinalPath(path);
			try {
				yield head(this.fetch, `${this.url}/object/${_path}`, {
					headers: this.headers,
				});
				return { data: true, error: null };
			} catch (error3) {
				if (isStorageError(error3) && error3 instanceof StorageUnknownError) {
					const originalError = error3.originalError;
					if (
						[400, 404].includes(
							originalError === null || originalError === void 0
								? void 0
								: originalError.status,
						)
					) {
						return { data: false, error: error3 };
					}
				}
				throw error3;
			}
		});
	}
	/**
	 * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
	 * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
	 *
	 * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
	 * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	 * @param options.transform Transform the asset before serving it to the client.
	 */
	getPublicUrl(path, options2) {
		const _path = this._getFinalPath(path);
		const _queryString = [];
		const downloadQueryParam = (
			options2 === null || options2 === void 0
				? void 0
				: options2.download
		)
			? `download=${options2.download === true ? "" : options2.download}`
			: "";
		if (downloadQueryParam !== "") {
			_queryString.push(downloadQueryParam);
		}
		const wantsTransformation =
			typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !==
			"undefined";
		const renderPath = wantsTransformation ? "render/image" : "object";
		const transformationQuery = this.transformOptsToQueryString(
			(options2 === null || options2 === void 0 ? void 0 : options2.transform) || {},
		);
		if (transformationQuery !== "") {
			_queryString.push(transformationQuery);
		}
		let queryString = _queryString.join("&");
		if (queryString !== "") {
			queryString = `?${queryString}`;
		}
		return {
			data: {
				publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`),
			},
		};
	}
	/**
	 * Deletes files within the same bucket
	 *
	 * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
	 */
	remove(paths) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const data = yield remove(
					this.fetch,
					`${this.url}/object/${this.bucketId}`,
					{ prefixes: paths },
					{ headers: this.headers },
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Get file metadata
	 * @param id the file id to retrieve metadata
	 */
	// async getMetadata(
	//   id: string
	// ): Promise<
	//   | {
	//       data: Metadata
	//       error: null
	//     }
	//   | {
	//       data: null
	//       error: StorageError
	//     }
	// > {
	//   try {
	//     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
	//     return { data, error: null }
	//   } catch (error) {
	//     if (isStorageError(error)) {
	//       return { data: null, error }
	//     }
	//     throw error
	//   }
	// }
	/**
	 * Update file metadata
	 * @param id the file id to update metadata
	 * @param meta the new file metadata
	 */
	// async updateMetadata(
	//   id: string,
	//   meta: Metadata
	// ): Promise<
	//   | {
	//       data: Metadata
	//       error: null
	//     }
	//   | {
	//       data: null
	//       error: StorageError
	//     }
	// > {
	//   try {
	//     const data = await post(
	//       this.fetch,
	//       `${this.url}/metadata/${id}`,
	//       { ...meta },
	//       { headers: this.headers }
	//     )
	//     return { data, error: null }
	//   } catch (error) {
	//     if (isStorageError(error)) {
	//       return { data: null, error }
	//     }
	//     throw error
	//   }
	// }
	/**
	 * Lists all the files within a bucket.
	 * @param path The folder path.
	 */
	list(path, options2, parameters) {
		return __awaiter4(this, void 0, void 0, function* () {
			try {
				const body = Object.assign(
					Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options2),
					{ prefix: path || "" },
				);
				const data = yield post(
					this.fetch,
					`${this.url}/object/list/${this.bucketId}`,
					body,
					{ headers: this.headers },
					parameters,
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	encodeMetadata(metadata) {
		return JSON.stringify(metadata);
	}
	toBase64(data) {
		if (typeof Buffer !== "undefined") {
			return Buffer.from(data).toString("base64");
		}
		return btoa(data);
	}
	_getFinalPath(path) {
		return `${this.bucketId}/${path}`;
	}
	_removeEmptyFolders(path) {
		return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
	}
	transformOptsToQueryString(transform2) {
		const params = [];
		if (transform2.width) {
			params.push(`width=${transform2.width}`);
		}
		if (transform2.height) {
			params.push(`height=${transform2.height}`);
		}
		if (transform2.resize) {
			params.push(`resize=${transform2.resize}`);
		}
		if (transform2.format) {
			params.push(`format=${transform2.format}`);
		}
		if (transform2.quality) {
			params.push(`quality=${transform2.quality}`);
		}
		return params.join("&");
	}
};

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/storage-js/dist/module/lib/version.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var version3 = "2.7.1";

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS2 = { "X-Client-Info": `storage-js/${version3}` };

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var __awaiter5 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var StorageBucketApi = class {
	static {
		__name(this, "StorageBucketApi");
	}
	constructor(url, headers = {}, fetch3) {
		this.url = url;
		this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
		this.fetch = resolveFetch2(fetch3);
	}
	/**
	 * Retrieves the details of all Storage buckets within an existing project.
	 */
	listBuckets() {
		return __awaiter5(this, void 0, void 0, function* () {
			try {
				const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Retrieves the details of an existing Storage bucket.
	 *
	 * @param id The unique identifier of the bucket you would like to retrieve.
	 */
	getBucket(id) {
		return __awaiter5(this, void 0, void 0, function* () {
			try {
				const data = yield get(this.fetch, `${this.url}/bucket/${id}`, {
					headers: this.headers,
				});
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Creates a new Storage bucket
	 *
	 * @param id A unique identifier for the bucket you are creating.
	 * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
	 * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	 * The global file size limit takes precedence over this value.
	 * The default value is null, which doesn't set a per bucket file size limit.
	 * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	 * The default value is null, which allows files with all mime types to be uploaded.
	 * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	 * @returns newly created bucket id
	 */
	createBucket(
		id,
		options2 = {
			public: false,
		},
	) {
		return __awaiter5(this, void 0, void 0, function* () {
			try {
				const data = yield post(
					this.fetch,
					`${this.url}/bucket`,
					{
						id,
						name: id,
						public: options2.public,
						file_size_limit: options2.fileSizeLimit,
						allowed_mime_types: options2.allowedMimeTypes,
					},
					{ headers: this.headers },
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Updates a Storage bucket
	 *
	 * @param id A unique identifier for the bucket you are updating.
	 * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
	 * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	 * The global file size limit takes precedence over this value.
	 * The default value is null, which doesn't set a per bucket file size limit.
	 * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	 * The default value is null, which allows files with all mime types to be uploaded.
	 * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	 */
	updateBucket(id, options2) {
		return __awaiter5(this, void 0, void 0, function* () {
			try {
				const data = yield put(
					this.fetch,
					`${this.url}/bucket/${id}`,
					{
						id,
						name: id,
						public: options2.public,
						file_size_limit: options2.fileSizeLimit,
						allowed_mime_types: options2.allowedMimeTypes,
					},
					{ headers: this.headers },
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Removes all objects inside a single bucket.
	 *
	 * @param id The unique identifier of the bucket you would like to empty.
	 */
	emptyBucket(id) {
		return __awaiter5(this, void 0, void 0, function* () {
			try {
				const data = yield post(
					this.fetch,
					`${this.url}/bucket/${id}/empty`,
					{},
					{ headers: this.headers },
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
	 * You must first `empty()` the bucket.
	 *
	 * @param id The unique identifier of the bucket you would like to delete.
	 */
	deleteBucket(id) {
		return __awaiter5(this, void 0, void 0, function* () {
			try {
				const data = yield remove(
					this.fetch,
					`${this.url}/bucket/${id}`,
					{},
					{ headers: this.headers },
				);
				return { data, error: null };
			} catch (error3) {
				if (isStorageError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
};

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient = class extends StorageBucketApi {
	static {
		__name(this, "StorageClient");
	}
	constructor(url, headers = {}, fetch3) {
		super(url, headers, fetch3);
	}
	/**
	 * Perform file operation in a bucket.
	 *
	 * @param id The bucket id to operate on.
	 */
	from(id) {
		return new StorageFileApi(this.url, this.headers, id, this.fetch);
	}
};

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/supabase-js/dist/module/lib/version.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var version4 = "2.49.4";

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var JS_ENV = "";
if (typeof Deno !== "undefined") {
	JS_ENV = "deno";
} else if (typeof document !== "undefined") {
	JS_ENV = "web";
} else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
	JS_ENV = "react-native";
} else {
	JS_ENV = "node";
}
var DEFAULT_HEADERS3 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version4}` };
var DEFAULT_GLOBAL_OPTIONS = {
	headers: DEFAULT_HEADERS3,
};
var DEFAULT_DB_OPTIONS = {
	schema: "public",
};
var DEFAULT_AUTH_OPTIONS = {
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	flowType: "implicit",
};
var DEFAULT_REALTIME_OPTIONS = {};

// node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_browser();
var __awaiter6 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var resolveFetch3 = /* @__PURE__ */ __name((customFetch) => {
	let _fetch;
	if (customFetch) {
		_fetch = customFetch;
	} else if (typeof fetch === "undefined") {
		_fetch = browser_default;
	} else {
		_fetch = fetch;
	}
	return (...args) => _fetch(...args);
}, "resolveFetch");
var resolveHeadersConstructor = /* @__PURE__ */ __name(() => {
	if (typeof Headers === "undefined") {
		return Headers2;
	}
	return Headers;
}, "resolveHeadersConstructor");
var fetchWithAuth = /* @__PURE__ */ __name((supabaseKey, getAccessToken, customFetch) => {
	const fetch3 = resolveFetch3(customFetch);
	const HeadersConstructor = resolveHeadersConstructor();
	return (input, init) =>
		__awaiter6(void 0, void 0, void 0, function* () {
			var _a2;
			const accessToken =
				(_a2 = yield getAccessToken()) !== null && _a2 !== void 0 ? _a2 : supabaseKey;
			const headers = new HeadersConstructor(
				init === null || init === void 0 ? void 0 : init.headers,
			);
			if (!headers.has("apikey")) {
				headers.set("apikey", supabaseKey);
			}
			if (!headers.has("Authorization")) {
				headers.set("Authorization", `Bearer ${accessToken}`);
			}
			return fetch3(input, Object.assign(Object.assign({}, init), { headers }));
		});
}, "fetchWithAuth");

// node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __awaiter7 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
function stripTrailingSlash(url) {
	return url.replace(/\/$/, "");
}
__name(stripTrailingSlash, "stripTrailingSlash");
function applySettingDefaults(options2, defaults) {
	const {
		db: dbOptions,
		auth: authOptions,
		realtime: realtimeOptions,
		global: globalOptions,
	} = options2;
	const {
		db: DEFAULT_DB_OPTIONS2,
		auth: DEFAULT_AUTH_OPTIONS2,
		realtime: DEFAULT_REALTIME_OPTIONS2,
		global: DEFAULT_GLOBAL_OPTIONS2,
	} = defaults;
	const result = {
		db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
		auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
		realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
		global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions),
		accessToken: /* @__PURE__ */ __name(
			() =>
				__awaiter7(this, void 0, void 0, function* () {
					return "";
				}),
			"accessToken",
		),
	};
	if (options2.accessToken) {
		result.accessToken = options2.accessToken;
	} else {
		delete result.accessToken;
	}
	return result;
}
__name(applySettingDefaults, "applySettingDefaults");

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/lib/fetch.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/lib/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/lib/version.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var version5 = "2.69.1";

// node_modules/@supabase/auth-js/dist/module/lib/constants.js
var AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3;
var AUTO_REFRESH_TICK_THRESHOLD = 3;
var EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
var GOTRUE_URL = "http://localhost:9999";
var STORAGE_KEY = "supabase.auth.token";
var DEFAULT_HEADERS4 = { "X-Client-Info": `gotrue-js/${version5}` };
var API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
var API_VERSIONS = {
	"2024-01-01": {
		timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
		name: "2024-01-01",
	},
};
var BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
var JWKS_TTL = 6e5;

// node_modules/@supabase/auth-js/dist/module/lib/helpers.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/lib/errors.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var AuthError = class extends Error {
	static {
		__name(this, "AuthError");
	}
	constructor(message, status, code) {
		super(message);
		this.__isAuthError = true;
		this.name = "AuthError";
		this.status = status;
		this.code = code;
	}
};
function isAuthError(error3) {
	return typeof error3 === "object" && error3 !== null && "__isAuthError" in error3;
}
__name(isAuthError, "isAuthError");
var AuthApiError = class extends AuthError {
	static {
		__name(this, "AuthApiError");
	}
	constructor(message, status, code) {
		super(message, status, code);
		this.name = "AuthApiError";
		this.status = status;
		this.code = code;
	}
};
function isAuthApiError(error3) {
	return isAuthError(error3) && error3.name === "AuthApiError";
}
__name(isAuthApiError, "isAuthApiError");
var AuthUnknownError = class extends AuthError {
	static {
		__name(this, "AuthUnknownError");
	}
	constructor(message, originalError) {
		super(message);
		this.name = "AuthUnknownError";
		this.originalError = originalError;
	}
};
var CustomAuthError = class extends AuthError {
	static {
		__name(this, "CustomAuthError");
	}
	constructor(message, name, status, code) {
		super(message, status, code);
		this.name = name;
		this.status = status;
	}
};
var AuthSessionMissingError = class extends CustomAuthError {
	static {
		__name(this, "AuthSessionMissingError");
	}
	constructor() {
		super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
	}
};
function isAuthSessionMissingError(error3) {
	return isAuthError(error3) && error3.name === "AuthSessionMissingError";
}
__name(isAuthSessionMissingError, "isAuthSessionMissingError");
var AuthInvalidTokenResponseError = class extends CustomAuthError {
	static {
		__name(this, "AuthInvalidTokenResponseError");
	}
	constructor() {
		super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
	}
};
var AuthInvalidCredentialsError = class extends CustomAuthError {
	static {
		__name(this, "AuthInvalidCredentialsError");
	}
	constructor(message) {
		super(message, "AuthInvalidCredentialsError", 400, void 0);
	}
};
var AuthImplicitGrantRedirectError = class extends CustomAuthError {
	static {
		__name(this, "AuthImplicitGrantRedirectError");
	}
	constructor(message, details = null) {
		super(message, "AuthImplicitGrantRedirectError", 500, void 0);
		this.details = null;
		this.details = details;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			details: this.details,
		};
	}
};
function isAuthImplicitGrantRedirectError(error3) {
	return isAuthError(error3) && error3.name === "AuthImplicitGrantRedirectError";
}
__name(isAuthImplicitGrantRedirectError, "isAuthImplicitGrantRedirectError");
var AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
	static {
		__name(this, "AuthPKCEGrantCodeExchangeError");
	}
	constructor(message, details = null) {
		super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
		this.details = null;
		this.details = details;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			details: this.details,
		};
	}
};
var AuthRetryableFetchError = class extends CustomAuthError {
	static {
		__name(this, "AuthRetryableFetchError");
	}
	constructor(message, status) {
		super(message, "AuthRetryableFetchError", status, void 0);
	}
};
function isAuthRetryableFetchError(error3) {
	return isAuthError(error3) && error3.name === "AuthRetryableFetchError";
}
__name(isAuthRetryableFetchError, "isAuthRetryableFetchError");
var AuthWeakPasswordError = class extends CustomAuthError {
	static {
		__name(this, "AuthWeakPasswordError");
	}
	constructor(message, status, reasons) {
		super(message, "AuthWeakPasswordError", status, "weak_password");
		this.reasons = reasons;
	}
};
var AuthInvalidJwtError = class extends CustomAuthError {
	static {
		__name(this, "AuthInvalidJwtError");
	}
	constructor(message) {
		super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
	}
};

// node_modules/@supabase/auth-js/dist/module/lib/base64url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var IGNORE_BASE64URL = " 	\n\r=".split("");
var FROM_BASE64URL = (() => {
	const charMap = new Array(128);
	for (let i = 0; i < charMap.length; i += 1) {
		charMap[i] = -1;
	}
	for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
		charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
	}
	for (let i = 0; i < TO_BASE64URL.length; i += 1) {
		charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
	}
	return charMap;
})();
function byteFromBase64URL(charCode, state, emit2) {
	const bits = FROM_BASE64URL[charCode];
	if (bits > -1) {
		state.queue = (state.queue << 6) | bits;
		state.queuedBits += 6;
		while (state.queuedBits >= 8) {
			emit2((state.queue >> (state.queuedBits - 8)) & 255);
			state.queuedBits -= 8;
		}
	} else if (bits === -2) {
		return;
	} else {
		throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
	}
}
__name(byteFromBase64URL, "byteFromBase64URL");
function stringFromBase64URL(str) {
	const conv = [];
	const utf8Emit = /* @__PURE__ */ __name((codepoint) => {
		conv.push(String.fromCodePoint(codepoint));
	}, "utf8Emit");
	const utf8State = {
		utf8seq: 0,
		codepoint: 0,
	};
	const b64State = { queue: 0, queuedBits: 0 };
	const byteEmit = /* @__PURE__ */ __name((byte) => {
		stringFromUTF8(byte, utf8State, utf8Emit);
	}, "byteEmit");
	for (let i = 0; i < str.length; i += 1) {
		byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
	}
	return conv.join("");
}
__name(stringFromBase64URL, "stringFromBase64URL");
function codepointToUTF8(codepoint, emit2) {
	if (codepoint <= 127) {
		emit2(codepoint);
		return;
	} else if (codepoint <= 2047) {
		emit2(192 | (codepoint >> 6));
		emit2(128 | (codepoint & 63));
		return;
	} else if (codepoint <= 65535) {
		emit2(224 | (codepoint >> 12));
		emit2(128 | ((codepoint >> 6) & 63));
		emit2(128 | (codepoint & 63));
		return;
	} else if (codepoint <= 1114111) {
		emit2(240 | (codepoint >> 18));
		emit2(128 | ((codepoint >> 12) & 63));
		emit2(128 | ((codepoint >> 6) & 63));
		emit2(128 | (codepoint & 63));
		return;
	}
	throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
__name(codepointToUTF8, "codepointToUTF8");
function stringToUTF8(str, emit2) {
	for (let i = 0; i < str.length; i += 1) {
		let codepoint = str.charCodeAt(i);
		if (codepoint > 55295 && codepoint <= 56319) {
			const highSurrogate = ((codepoint - 55296) * 1024) & 65535;
			const lowSurrogate = (str.charCodeAt(i + 1) - 56320) & 65535;
			codepoint = (lowSurrogate | highSurrogate) + 65536;
			i += 1;
		}
		codepointToUTF8(codepoint, emit2);
	}
}
__name(stringToUTF8, "stringToUTF8");
function stringFromUTF8(byte, state, emit2) {
	if (state.utf8seq === 0) {
		if (byte <= 127) {
			emit2(byte);
			return;
		}
		for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
			if (((byte >> (7 - leadingBit)) & 1) === 0) {
				state.utf8seq = leadingBit;
				break;
			}
		}
		if (state.utf8seq === 2) {
			state.codepoint = byte & 31;
		} else if (state.utf8seq === 3) {
			state.codepoint = byte & 15;
		} else if (state.utf8seq === 4) {
			state.codepoint = byte & 7;
		} else {
			throw new Error("Invalid UTF-8 sequence");
		}
		state.utf8seq -= 1;
	} else if (state.utf8seq > 0) {
		if (byte <= 127) {
			throw new Error("Invalid UTF-8 sequence");
		}
		state.codepoint = (state.codepoint << 6) | (byte & 63);
		state.utf8seq -= 1;
		if (state.utf8seq === 0) {
			emit2(state.codepoint);
		}
	}
}
__name(stringFromUTF8, "stringFromUTF8");
function base64UrlToUint8Array(str) {
	const result = [];
	const state = { queue: 0, queuedBits: 0 };
	const onByte = /* @__PURE__ */ __name((byte) => {
		result.push(byte);
	}, "onByte");
	for (let i = 0; i < str.length; i += 1) {
		byteFromBase64URL(str.charCodeAt(i), state, onByte);
	}
	return new Uint8Array(result);
}
__name(base64UrlToUint8Array, "base64UrlToUint8Array");
function stringToUint8Array(str) {
	const result = [];
	stringToUTF8(str, (byte) => result.push(byte));
	return new Uint8Array(result);
}
__name(stringToUint8Array, "stringToUint8Array");

// node_modules/@supabase/auth-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
	const timeNow = Math.round(Date.now() / 1e3);
	return timeNow + expiresIn;
}
__name(expiresAt, "expiresAt");
function uuid() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 3) | 8;
		return v.toString(16);
	});
}
__name(uuid, "uuid");
var isBrowser = /* @__PURE__ */ __name(
	() => typeof window !== "undefined" && typeof document !== "undefined",
	"isBrowser",
);
var localStorageWriteTests = {
	tested: false,
	writable: false,
};
var supportsLocalStorage = /* @__PURE__ */ __name(() => {
	if (!isBrowser()) {
		return false;
	}
	try {
		if (typeof globalThis.localStorage !== "object") {
			return false;
		}
	} catch (e) {
		return false;
	}
	if (localStorageWriteTests.tested) {
		return localStorageWriteTests.writable;
	}
	const randomKey = `lswt-${Math.random()}${Math.random()}`;
	try {
		globalThis.localStorage.setItem(randomKey, randomKey);
		globalThis.localStorage.removeItem(randomKey);
		localStorageWriteTests.tested = true;
		localStorageWriteTests.writable = true;
	} catch (e) {
		localStorageWriteTests.tested = true;
		localStorageWriteTests.writable = false;
	}
	return localStorageWriteTests.writable;
}, "supportsLocalStorage");
function parseParametersFromURL(href) {
	const result = {};
	const url = new URL(href);
	if (url.hash && url.hash[0] === "#") {
		try {
			const hashSearchParams = new URLSearchParams(url.hash.substring(1));
			hashSearchParams.forEach((value, key) => {
				result[key] = value;
			});
		} catch (e) {}
	}
	url.searchParams.forEach((value, key) => {
		result[key] = value;
	});
	return result;
}
__name(parseParametersFromURL, "parseParametersFromURL");
var resolveFetch4 = /* @__PURE__ */ __name((customFetch) => {
	let _fetch;
	if (customFetch) {
		_fetch = customFetch;
	} else if (typeof fetch === "undefined") {
		_fetch = /* @__PURE__ */ __name(
			(...args) =>
				Promise.resolve()
					.then(() => (init_browser(), browser_exports))
					.then(({ default: fetch3 }) => fetch3(...args)),
			"_fetch",
		);
	} else {
		_fetch = fetch;
	}
	return (...args) => _fetch(...args);
}, "resolveFetch");
var looksLikeFetchResponse = /* @__PURE__ */ __name((maybeResponse) => {
	return (
		typeof maybeResponse === "object" &&
		maybeResponse !== null &&
		"status" in maybeResponse &&
		"ok" in maybeResponse &&
		"json" in maybeResponse &&
		typeof maybeResponse.json === "function"
	);
}, "looksLikeFetchResponse");
var setItemAsync = /* @__PURE__ */ __name(async (storage, key, data) => {
	await storage.setItem(key, JSON.stringify(data));
}, "setItemAsync");
var getItemAsync = /* @__PURE__ */ __name(async (storage, key) => {
	const value = await storage.getItem(key);
	if (!value) {
		return null;
	}
	try {
		return JSON.parse(value);
	} catch (_a2) {
		return value;
	}
}, "getItemAsync");
var removeItemAsync = /* @__PURE__ */ __name(async (storage, key) => {
	await storage.removeItem(key);
}, "removeItemAsync");
var Deferred = class _Deferred {
	static {
		__name(this, "Deferred");
	}
	constructor() {
		this.promise = new _Deferred.promiseConstructor((res, rej) => {
			this.resolve = res;
			this.reject = rej;
		});
	}
};
Deferred.promiseConstructor = Promise;
function decodeJWT(token) {
	const parts = token.split(".");
	if (parts.length !== 3) {
		throw new AuthInvalidJwtError("Invalid JWT structure");
	}
	for (let i = 0; i < parts.length; i++) {
		if (!BASE64URL_REGEX.test(parts[i])) {
			throw new AuthInvalidJwtError("JWT not in base64url format");
		}
	}
	const data = {
		// using base64url lib
		header: JSON.parse(stringFromBase64URL(parts[0])),
		payload: JSON.parse(stringFromBase64URL(parts[1])),
		signature: base64UrlToUint8Array(parts[2]),
		raw: {
			header: parts[0],
			payload: parts[1],
		},
	};
	return data;
}
__name(decodeJWT, "decodeJWT");
async function sleep(time3) {
	return await new Promise((accept) => {
		setTimeout(() => accept(null), time3);
	});
}
__name(sleep, "sleep");
function retryable(fn, isRetryable) {
	const promise = new Promise((accept, reject) => {
		(async () => {
			for (let attempt = 0; attempt < Number.POSITIVE_INFINITY; attempt++) {
				try {
					const result = await fn(attempt);
					if (!isRetryable(attempt, null, result)) {
						accept(result);
						return;
					}
				} catch (e) {
					if (!isRetryable(attempt, e)) {
						reject(e);
						return;
					}
				}
			}
		})();
	});
	return promise;
}
__name(retryable, "retryable");
function dec2hex(dec) {
	return ("0" + dec.toString(16)).substr(-2);
}
__name(dec2hex, "dec2hex");
function generatePKCEVerifier() {
	const verifierLength = 56;
	const array = new Uint32Array(verifierLength);
	if (typeof crypto === "undefined") {
		const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
		const charSetLen = charSet.length;
		let verifier = "";
		for (let i = 0; i < verifierLength; i++) {
			verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
		}
		return verifier;
	}
	crypto.getRandomValues(array);
	return Array.from(array, dec2hex).join("");
}
__name(generatePKCEVerifier, "generatePKCEVerifier");
async function sha256(randomString) {
	const encoder = new TextEncoder();
	const encodedData = encoder.encode(randomString);
	const hash = await crypto.subtle.digest("SHA-256", encodedData);
	const bytes = new Uint8Array(hash);
	return Array.from(bytes)
		.map((c) => String.fromCharCode(c))
		.join("");
}
__name(sha256, "sha256");
async function generatePKCEChallenge(verifier) {
	const hasCryptoSupport =
		typeof crypto !== "undefined" &&
		typeof crypto.subtle !== "undefined" &&
		typeof TextEncoder !== "undefined";
	if (!hasCryptoSupport) {
		console.warn(
			"WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.",
		);
		return verifier;
	}
	const hashed = await sha256(verifier);
	return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(generatePKCEChallenge, "generatePKCEChallenge");
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
	const codeVerifier = generatePKCEVerifier();
	let storedCodeVerifier = codeVerifier;
	if (isPasswordRecovery) {
		storedCodeVerifier += "/PASSWORD_RECOVERY";
	}
	await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
	const codeChallenge = await generatePKCEChallenge(codeVerifier);
	const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
	return [codeChallenge, codeChallengeMethod];
}
__name(getCodeChallengeAndMethod, "getCodeChallengeAndMethod");
var API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
	const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
	if (!apiVersion) {
		return null;
	}
	if (!apiVersion.match(API_VERSION_REGEX)) {
		return null;
	}
	try {
		const date = /* @__PURE__ */ new Date(`${apiVersion}T00:00:00.0Z`);
		return date;
	} catch (e) {
		return null;
	}
}
__name(parseResponseAPIVersion, "parseResponseAPIVersion");
function validateExp(exp) {
	if (!exp) {
		throw new Error("Missing exp claim");
	}
	const timeNow = Math.floor(Date.now() / 1e3);
	if (exp <= timeNow) {
		throw new Error("JWT has expired");
	}
}
__name(validateExp, "validateExp");
function getAlgorithm(alg) {
	switch (alg) {
		case "RS256":
			return {
				name: "RSASSA-PKCS1-v1_5",
				hash: { name: "SHA-256" },
			};
		case "ES256":
			return {
				name: "ECDSA",
				namedCurve: "P-256",
				hash: { name: "SHA-256" },
			};
		default:
			throw new Error("Invalid alg claim");
	}
}
__name(getAlgorithm, "getAlgorithm");

// node_modules/@supabase/auth-js/dist/module/lib/fetch.js
var __rest = (s, e) => {
	var t = {};
	for (var p in s)
		if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function")
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
				t[p[i]] = s[p[i]];
		}
	return t;
};
var _getErrorMessage2 = /* @__PURE__ */ __name(
	(err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err),
	"_getErrorMessage",
);
var NETWORK_ERROR_CODES = [502, 503, 504];
async function handleError2(error3) {
	var _a2;
	if (!looksLikeFetchResponse(error3)) {
		throw new AuthRetryableFetchError(_getErrorMessage2(error3), 0);
	}
	if (NETWORK_ERROR_CODES.includes(error3.status)) {
		throw new AuthRetryableFetchError(_getErrorMessage2(error3), error3.status);
	}
	let data;
	try {
		data = await error3.json();
	} catch (e) {
		throw new AuthUnknownError(_getErrorMessage2(e), e);
	}
	let errorCode = void 0;
	const responseAPIVersion = parseResponseAPIVersion(error3);
	if (
		responseAPIVersion &&
		responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp &&
		typeof data === "object" &&
		data &&
		typeof data.code === "string"
	) {
		errorCode = data.code;
	} else if (typeof data === "object" && data && typeof data.error_code === "string") {
		errorCode = data.error_code;
	}
	if (!errorCode) {
		if (
			typeof data === "object" &&
			data &&
			typeof data.weak_password === "object" &&
			data.weak_password &&
			Array.isArray(data.weak_password.reasons) &&
			data.weak_password.reasons.length &&
			data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)
		) {
			throw new AuthWeakPasswordError(
				_getErrorMessage2(data),
				error3.status,
				data.weak_password.reasons,
			);
		}
	} else if (errorCode === "weak_password") {
		throw new AuthWeakPasswordError(
			_getErrorMessage2(data),
			error3.status,
			((_a2 = data.weak_password) === null || _a2 === void 0 ? void 0 : _a2.reasons) || [],
		);
	} else if (errorCode === "session_not_found") {
		throw new AuthSessionMissingError();
	}
	throw new AuthApiError(_getErrorMessage2(data), error3.status || 500, errorCode);
}
__name(handleError2, "handleError");
var _getRequestParams2 = /* @__PURE__ */ __name((method, options2, parameters, body) => {
	const params = {
		method,
		headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {},
	};
	if (method === "GET") {
		return params;
	}
	params.headers = Object.assign(
		{ "Content-Type": "application/json;charset=UTF-8" },
		options2 === null || options2 === void 0 ? void 0 : options2.headers,
	);
	params.body = JSON.stringify(body);
	return Object.assign(Object.assign({}, params), parameters);
}, "_getRequestParams");
async function _request(fetcher, method, url, options2) {
	var _a2;
	const headers = Object.assign(
		{},
		options2 === null || options2 === void 0 ? void 0 : options2.headers,
	);
	if (!headers[API_VERSION_HEADER_NAME]) {
		headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
	}
	if (options2 === null || options2 === void 0 ? void 0 : options2.jwt) {
		headers["Authorization"] = `Bearer ${options2.jwt}`;
	}
	const qs =
		(_a2 = options2 === null || options2 === void 0 ? void 0 : options2.query) !== null &&
		_a2 !== void 0
			? _a2
			: {};
	if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
		qs["redirect_to"] = options2.redirectTo;
	}
	const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
	const data = await _handleRequest2(
		fetcher,
		method,
		url + queryString,
		{
			headers,
			noResolveJson:
				options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson,
		},
		{},
		options2 === null || options2 === void 0 ? void 0 : options2.body,
	);
	return (options2 === null || options2 === void 0 ? void 0 : options2.xform)
		? options2 === null || options2 === void 0
			? void 0
			: options2.xform(data)
		: { data: Object.assign({}, data), error: null };
}
__name(_request, "_request");
async function _handleRequest2(fetcher, method, url, options2, parameters, body) {
	const requestParams = _getRequestParams2(method, options2, parameters, body);
	let result;
	try {
		result = await fetcher(url, Object.assign({}, requestParams));
	} catch (e) {
		console.error(e);
		throw new AuthRetryableFetchError(_getErrorMessage2(e), 0);
	}
	if (!result.ok) {
		await handleError2(result);
	}
	if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson) {
		return result;
	}
	try {
		return await result.json();
	} catch (e) {
		await handleError2(e);
	}
}
__name(_handleRequest2, "_handleRequest");
function _sessionResponse(data) {
	var _a2;
	let session = null;
	if (hasSession(data)) {
		session = Object.assign({}, data);
		if (!data.expires_at) {
			session.expires_at = expiresAt(data.expires_in);
		}
	}
	const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
	return { data: { session, user }, error: null };
}
__name(_sessionResponse, "_sessionResponse");
function _sessionResponsePassword(data) {
	const response = _sessionResponse(data);
	if (
		!response.error &&
		data.weak_password &&
		typeof data.weak_password === "object" &&
		Array.isArray(data.weak_password.reasons) &&
		data.weak_password.reasons.length &&
		data.weak_password.message &&
		typeof data.weak_password.message === "string" &&
		data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)
	) {
		response.data.weak_password = data.weak_password;
	}
	return response;
}
__name(_sessionResponsePassword, "_sessionResponsePassword");
function _userResponse(data) {
	var _a2;
	const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
	return { data: { user }, error: null };
}
__name(_userResponse, "_userResponse");
function _ssoResponse(data) {
	return { data, error: null };
}
__name(_ssoResponse, "_ssoResponse");
function _generateLinkResponse(data) {
	const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data,
		rest = __rest(data, [
			"action_link",
			"email_otp",
			"hashed_token",
			"redirect_to",
			"verification_type",
		]);
	const properties = {
		action_link,
		email_otp,
		hashed_token,
		redirect_to,
		verification_type,
	};
	const user = Object.assign({}, rest);
	return {
		data: {
			properties,
			user,
		},
		error: null,
	};
}
__name(_generateLinkResponse, "_generateLinkResponse");
function _noResolveJsonResponse(data) {
	return data;
}
__name(_noResolveJsonResponse, "_noResolveJsonResponse");
function hasSession(data) {
	return data.access_token && data.refresh_token && data.expires_in;
}
__name(hasSession, "hasSession");

// node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
var __rest2 = (s, e) => {
	var t = {};
	for (var p in s)
		if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function")
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
				t[p[i]] = s[p[i]];
		}
	return t;
};
var GoTrueAdminApi = class {
	static {
		__name(this, "GoTrueAdminApi");
	}
	constructor({ url = "", headers = {}, fetch: fetch3 }) {
		this.url = url;
		this.headers = headers;
		this.fetch = resolveFetch4(fetch3);
		this.mfa = {
			listFactors: this._listFactors.bind(this),
			deleteFactor: this._deleteFactor.bind(this),
		};
	}
	/**
	 * Removes a logged-in session.
	 * @param jwt A valid, logged-in JWT.
	 * @param scope The logout sope.
	 */
	async signOut(jwt, scope = "global") {
		try {
			await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
				headers: this.headers,
				jwt,
				noResolveJson: true,
			});
			return { data: null, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Sends an invite link to an email address.
	 * @param email The email address of the user.
	 * @param options Additional options to be included when inviting.
	 */
	async inviteUserByEmail(email, options2 = {}) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/invite`, {
				body: { email, data: options2.data },
				headers: this.headers,
				redirectTo: options2.redirectTo,
				xform: _userResponse,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Generates email links and OTPs to be sent via a custom email provider.
	 * @param email The user's email.
	 * @param options.password User password. For signup only.
	 * @param options.data Optional user metadata. For signup only.
	 * @param options.redirectTo The redirect url which should be appended to the generated link
	 */
	async generateLink(params) {
		try {
			const { options: options2 } = params,
				rest = __rest2(params, ["options"]);
			const body = Object.assign(Object.assign({}, rest), options2);
			if ("newEmail" in rest) {
				body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
				delete body["newEmail"];
			}
			return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
				body,
				headers: this.headers,
				xform: _generateLinkResponse,
				redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.redirectTo,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return {
					data: {
						properties: null,
						user: null,
					},
					error: error3,
				};
			}
			throw error3;
		}
	}
	// User Admin API
	/**
	 * Creates a new user.
	 * This function should only be called on a server. Never expose your `service_role` key in the browser.
	 */
	async createUser(attributes) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
				body: attributes,
				headers: this.headers,
				xform: _userResponse,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Get a list of users.
	 *
	 * This function should only be called on a server. Never expose your `service_role` key in the browser.
	 * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
	 */
	async listUsers(params) {
		var _a2, _b, _c, _d, _e, _f, _g;
		try {
			const pagination = { nextPage: null, lastPage: 0, total: 0 };
			const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
				headers: this.headers,
				noResolveJson: true,
				query: {
					page:
						(_b =
							(_a2 = params === null || params === void 0 ? void 0 : params.page) ===
								null || _a2 === void 0
								? void 0
								: _a2.toString()) !== null && _b !== void 0
							? _b
							: "",
					per_page:
						(_d =
							(_c =
								params === null || params === void 0 ? void 0 : params.perPage) ===
								null || _c === void 0
								? void 0
								: _c.toString()) !== null && _d !== void 0
							? _d
							: "",
				},
				xform: _noResolveJsonResponse,
			});
			if (response.error) throw response.error;
			const users = await response.json();
			const total =
				(_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
			const links =
				(_g =
					(_f = response.headers.get("link")) === null || _f === void 0
						? void 0
						: _f.split(",")) !== null && _g !== void 0
					? _g
					: [];
			if (links.length > 0) {
				links.forEach((link2) => {
					const page = Number.parseInt(link2.split(";")[0].split("=")[1].substring(0, 1));
					const rel = JSON.parse(link2.split(";")[1].split("=")[1]);
					pagination[`${rel}Page`] = page;
				});
				pagination.total = Number.parseInt(total);
			}
			return { data: Object.assign(Object.assign({}, users), pagination), error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { users: [] }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Get user by id.
	 *
	 * @param uid The user's unique identifier
	 *
	 * This function should only be called on a server. Never expose your `service_role` key in the browser.
	 */
	async getUserById(uid) {
		try {
			return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
				headers: this.headers,
				xform: _userResponse,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Updates the user data.
	 *
	 * @param attributes The data you want to update.
	 *
	 * This function should only be called on a server. Never expose your `service_role` key in the browser.
	 */
	async updateUserById(uid, attributes) {
		try {
			return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
				body: attributes,
				headers: this.headers,
				xform: _userResponse,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Delete a user. Requires a `service_role` key.
	 *
	 * @param id The user id you want to remove.
	 * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
	 * Defaults to false for backward compatibility.
	 *
	 * This function should only be called on a server. Never expose your `service_role` key in the browser.
	 */
	async deleteUser(id, shouldSoftDelete = false) {
		try {
			return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
				headers: this.headers,
				body: {
					should_soft_delete: shouldSoftDelete,
				},
				xform: _userResponse,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	async _listFactors(params) {
		try {
			const { data, error: error3 } = await _request(
				this.fetch,
				"GET",
				`${this.url}/admin/users/${params.userId}/factors`,
				{
					headers: this.headers,
					xform: /* @__PURE__ */ __name((factors) => {
						return { data: { factors }, error: null };
					}, "xform"),
				},
			);
			return { data, error: error3 };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	async _deleteFactor(params) {
		try {
			const data = await _request(
				this.fetch,
				"DELETE",
				`${this.url}/admin/users/${params.userId}/factors/${params.id}`,
				{
					headers: this.headers,
				},
			);
			return { data, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
};

// node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var localStorageAdapter = {
	getItem: /* @__PURE__ */ __name((key) => {
		if (!supportsLocalStorage()) {
			return null;
		}
		return globalThis.localStorage.getItem(key);
	}, "getItem"),
	setItem: /* @__PURE__ */ __name((key, value) => {
		if (!supportsLocalStorage()) {
			return;
		}
		globalThis.localStorage.setItem(key, value);
	}, "setItem"),
	removeItem: /* @__PURE__ */ __name((key) => {
		if (!supportsLocalStorage()) {
			return;
		}
		globalThis.localStorage.removeItem(key);
	}, "removeItem"),
};
function memoryLocalStorageAdapter(store = {}) {
	return {
		getItem: /* @__PURE__ */ __name((key) => {
			return store[key] || null;
		}, "getItem"),
		setItem: /* @__PURE__ */ __name((key, value) => {
			store[key] = value;
		}, "setItem"),
		removeItem: /* @__PURE__ */ __name((key) => {
			delete store[key];
		}, "removeItem"),
	};
}
__name(memoryLocalStorageAdapter, "memoryLocalStorageAdapter");

// node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function polyfillGlobalThis() {
	if (typeof globalThis === "object") return;
	try {
		Object.defineProperty(Object.prototype, "__magic__", {
			get: /* @__PURE__ */ __name(function () {
				return this;
			}, "get"),
			configurable: true,
		});
		__magic__.globalThis = __magic__;
		delete Object.prototype.__magic__;
	} catch (e) {
		if (typeof self !== "undefined") {
			self.globalThis = self;
		}
	}
}
__name(polyfillGlobalThis, "polyfillGlobalThis");

// node_modules/@supabase/auth-js/dist/module/lib/locks.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var internals = {
	/**
	 * @experimental
	 */
	debug: !!(
		globalThis &&
		supportsLocalStorage() &&
		globalThis.localStorage &&
		globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true"
	),
};
var LockAcquireTimeoutError = class extends Error {
	static {
		__name(this, "LockAcquireTimeoutError");
	}
	constructor(message) {
		super(message);
		this.isAcquireTimeout = true;
	}
};
var NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
	static {
		__name(this, "NavigatorLockAcquireTimeoutError");
	}
};
async function navigatorLock(name, acquireTimeout, fn) {
	if (internals.debug) {
		console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
	}
	const abortController = new globalThis.AbortController();
	if (acquireTimeout > 0) {
		setTimeout(() => {
			abortController.abort();
			if (internals.debug) {
				console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
			}
		}, acquireTimeout);
	}
	return await Promise.resolve().then(() =>
		globalThis.navigator.locks.request(
			name,
			acquireTimeout === 0
				? {
						mode: "exclusive",
						ifAvailable: true,
					}
				: {
						mode: "exclusive",
						signal: abortController.signal,
					},
			async (lock) => {
				if (lock) {
					if (internals.debug) {
						console.log(
							"@supabase/gotrue-js: navigatorLock: acquired",
							name,
							lock.name,
						);
					}
					try {
						return await fn();
					} finally {
						if (internals.debug) {
							console.log(
								"@supabase/gotrue-js: navigatorLock: released",
								name,
								lock.name,
							);
						}
					}
				} else {
					if (acquireTimeout === 0) {
						if (internals.debug) {
							console.log(
								"@supabase/gotrue-js: navigatorLock: not immediately available",
								name,
							);
						}
						throw new NavigatorLockAcquireTimeoutError(
							`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`,
						);
					} else {
						if (internals.debug) {
							try {
								const result = await globalThis.navigator.locks.query();
								console.log(
									"@supabase/gotrue-js: Navigator LockManager state",
									JSON.stringify(result, null, "  "),
								);
							} catch (e) {
								console.warn(
									"@supabase/gotrue-js: Error when querying Navigator LockManager state",
									e,
								);
							}
						}
						console.warn(
							"@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
						);
						return await fn();
					}
				}
			},
		),
	);
}
__name(navigatorLock, "navigatorLock");

// node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
polyfillGlobalThis();
var DEFAULT_OPTIONS = {
	url: GOTRUE_URL,
	storageKey: STORAGE_KEY,
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	headers: DEFAULT_HEADERS4,
	flowType: "implicit",
	debug: false,
	hasCustomAuthorizationHeader: false,
};
async function lockNoOp(name, acquireTimeout, fn) {
	return await fn();
}
__name(lockNoOp, "lockNoOp");
var GoTrueClient = class _GoTrueClient {
	static {
		__name(this, "GoTrueClient");
	}
	/**
	 * Create a new client for use in the browser.
	 */
	constructor(options2) {
		var _a2, _b;
		this.memoryStorage = null;
		this.stateChangeEmitters = /* @__PURE__ */ new Map();
		this.autoRefreshTicker = null;
		this.visibilityChangedCallback = null;
		this.refreshingDeferred = null;
		this.initializePromise = null;
		this.detectSessionInUrl = true;
		this.hasCustomAuthorizationHeader = false;
		this.suppressGetSessionWarning = false;
		this.lockAcquired = false;
		this.pendingInLock = [];
		this.broadcastChannel = null;
		this.logger = console.log;
		this.instanceID = _GoTrueClient.nextInstanceID;
		_GoTrueClient.nextInstanceID += 1;
		if (this.instanceID > 0 && isBrowser()) {
			console.warn(
				"Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.",
			);
		}
		const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
		this.logDebugMessages = !!settings.debug;
		if (typeof settings.debug === "function") {
			this.logger = settings.debug;
		}
		this.persistSession = settings.persistSession;
		this.storageKey = settings.storageKey;
		this.autoRefreshToken = settings.autoRefreshToken;
		this.admin = new GoTrueAdminApi({
			url: settings.url,
			headers: settings.headers,
			fetch: settings.fetch,
		});
		this.url = settings.url;
		this.headers = settings.headers;
		this.fetch = resolveFetch4(settings.fetch);
		this.lock = settings.lock || lockNoOp;
		this.detectSessionInUrl = settings.detectSessionInUrl;
		this.flowType = settings.flowType;
		this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
		if (settings.lock) {
			this.lock = settings.lock;
		} else if (
			isBrowser() &&
			((_a2 =
				globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) ===
				null || _a2 === void 0
				? void 0
				: _a2.locks)
		) {
			this.lock = navigatorLock;
		} else {
			this.lock = lockNoOp;
		}
		this.jwks = { keys: [] };
		this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
		this.mfa = {
			verify: this._verify.bind(this),
			enroll: this._enroll.bind(this),
			unenroll: this._unenroll.bind(this),
			challenge: this._challenge.bind(this),
			listFactors: this._listFactors.bind(this),
			challengeAndVerify: this._challengeAndVerify.bind(this),
			getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
		};
		if (this.persistSession) {
			if (settings.storage) {
				this.storage = settings.storage;
			} else {
				if (supportsLocalStorage()) {
					this.storage = localStorageAdapter;
				} else {
					this.memoryStorage = {};
					this.storage = memoryLocalStorageAdapter(this.memoryStorage);
				}
			}
		} else {
			this.memoryStorage = {};
			this.storage = memoryLocalStorageAdapter(this.memoryStorage);
		}
		if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
			try {
				this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
			} catch (e) {
				console.error(
					"Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
					e,
				);
			}
			(_b = this.broadcastChannel) === null || _b === void 0
				? void 0
				: _b.addEventListener("message", async (event) => {
						this._debug(
							"received broadcast notification from other tab or client",
							event,
						);
						await this._notifyAllSubscribers(
							event.data.event,
							event.data.session,
							false,
						);
					});
		}
		this.initialize();
	}
	_debug(...args) {
		if (this.logDebugMessages) {
			this.logger(
				`GoTrueClient@${this.instanceID} (${version5}) ${(/* @__PURE__ */ new Date()).toISOString()}`,
				...args,
			);
		}
		return this;
	}
	/**
	 * Initializes the client session either from the url or from storage.
	 * This method is automatically called when instantiating the client, but should also be called
	 * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
	 */
	async initialize() {
		if (this.initializePromise) {
			return await this.initializePromise;
		}
		this.initializePromise = (async () => {
			return await this._acquireLock(-1, async () => {
				return await this._initialize();
			});
		})();
		return await this.initializePromise;
	}
	/**
	 * IMPORTANT:
	 * 1. Never throw in this method, as it is called from the constructor
	 * 2. Never return a session from this method as it would be cached over
	 *    the whole lifetime of the client
	 */
	async _initialize() {
		var _a2;
		try {
			const params = parseParametersFromURL(window.location.href);
			let callbackUrlType = "none";
			if (this._isImplicitGrantCallback(params)) {
				callbackUrlType = "implicit";
			} else if (await this._isPKCECallback(params)) {
				callbackUrlType = "pkce";
			}
			if (isBrowser() && this.detectSessionInUrl && callbackUrlType !== "none") {
				const { data, error: error3 } = await this._getSessionFromURL(
					params,
					callbackUrlType,
				);
				if (error3) {
					this._debug("#_initialize()", "error detecting session from URL", error3);
					if (isAuthImplicitGrantRedirectError(error3)) {
						const errorCode =
							(_a2 = error3.details) === null || _a2 === void 0 ? void 0 : _a2.code;
						if (
							errorCode === "identity_already_exists" ||
							errorCode === "identity_not_found" ||
							errorCode === "single_identity_not_deletable"
						) {
							return { error: error3 };
						}
					}
					await this._removeSession();
					return { error: error3 };
				}
				const { session, redirectType } = data;
				this._debug(
					"#_initialize()",
					"detected session in URL",
					session,
					"redirect type",
					redirectType,
				);
				await this._saveSession(session);
				setTimeout(async () => {
					if (redirectType === "recovery") {
						await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
					} else {
						await this._notifyAllSubscribers("SIGNED_IN", session);
					}
				}, 0);
				return { error: null };
			}
			await this._recoverAndRefresh();
			return { error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { error: error3 };
			}
			return {
				error: new AuthUnknownError("Unexpected error during initialization", error3),
			};
		} finally {
			await this._handleVisibilityChange();
			this._debug("#_initialize()", "end");
		}
	}
	/**
	 * Creates a new anonymous user.
	 *
	 * @returns A session where the is_anonymous claim in the access token JWT set to true
	 */
	async signInAnonymously(credentials) {
		var _a2, _b, _c;
		try {
			const res = await _request(this.fetch, "POST", `${this.url}/signup`, {
				headers: this.headers,
				body: {
					data:
						(_b =
							(_a2 =
								credentials === null || credentials === void 0
									? void 0
									: credentials.options) === null || _a2 === void 0
								? void 0
								: _a2.data) !== null && _b !== void 0
							? _b
							: {},
					gotrue_meta_security: {
						captcha_token:
							(_c =
								credentials === null || credentials === void 0
									? void 0
									: credentials.options) === null || _c === void 0
								? void 0
								: _c.captchaToken,
					},
				},
				xform: _sessionResponse,
			});
			const { data, error: error3 } = res;
			if (error3 || !data) {
				return { data: { user: null, session: null }, error: error3 };
			}
			const session = data.session;
			const user = data.user;
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", session);
			}
			return { data: { user, session }, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Creates a new user.
	 *
	 * Be aware that if a user account exists in the system you may get back an
	 * error message that attempts to hide this information from the user.
	 * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
	 *
	 * @returns A logged-in session if the server has "autoconfirm" ON
	 * @returns A user if the server has "autoconfirm" OFF
	 */
	async signUp(credentials) {
		var _a2, _b, _c;
		try {
			let res;
			if ("email" in credentials) {
				const { email, password, options: options2 } = credentials;
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce") {
					[codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
						this.storage,
						this.storageKey,
					);
				}
				res = await _request(this.fetch, "POST", `${this.url}/signup`, {
					headers: this.headers,
					redirectTo:
						options2 === null || options2 === void 0
							? void 0
							: options2.emailRedirectTo,
					body: {
						email,
						password,
						data:
							(_a2 =
								options2 === null || options2 === void 0
									? void 0
									: options2.data) !== null && _a2 !== void 0
								? _a2
								: {},
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod,
					},
					xform: _sessionResponse,
				});
			} else if ("phone" in credentials) {
				const { phone, password, options: options2 } = credentials;
				res = await _request(this.fetch, "POST", `${this.url}/signup`, {
					headers: this.headers,
					body: {
						phone,
						password,
						data:
							(_b =
								options2 === null || options2 === void 0
									? void 0
									: options2.data) !== null && _b !== void 0
								? _b
								: {},
						channel:
							(_c =
								options2 === null || options2 === void 0
									? void 0
									: options2.channel) !== null && _c !== void 0
								? _c
								: "sms",
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
					},
					xform: _sessionResponse,
				});
			} else {
				throw new AuthInvalidCredentialsError(
					"You must provide either an email or phone number and a password",
				);
			}
			const { data, error: error3 } = res;
			if (error3 || !data) {
				return { data: { user: null, session: null }, error: error3 };
			}
			const session = data.session;
			const user = data.user;
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", session);
			}
			return { data: { user, session }, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Log in an existing user with an email and password or phone and password.
	 *
	 * Be aware that you may get back an error message that will not distinguish
	 * between the cases where the account does not exist or that the
	 * email/phone and password combination is wrong or that the account can only
	 * be accessed via social login.
	 */
	async signInWithPassword(credentials) {
		try {
			let res;
			if ("email" in credentials) {
				const { email, password, options: options2 } = credentials;
				res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
					headers: this.headers,
					body: {
						email,
						password,
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
					},
					xform: _sessionResponsePassword,
				});
			} else if ("phone" in credentials) {
				const { phone, password, options: options2 } = credentials;
				res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
					headers: this.headers,
					body: {
						phone,
						password,
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
					},
					xform: _sessionResponsePassword,
				});
			} else {
				throw new AuthInvalidCredentialsError(
					"You must provide either an email or phone number and a password",
				);
			}
			const { data, error: error3 } = res;
			if (error3) {
				return { data: { user: null, session: null }, error: error3 };
			} else if (!data || !data.session || !data.user) {
				return {
					data: { user: null, session: null },
					error: new AuthInvalidTokenResponseError(),
				};
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return {
				data: Object.assign(
					{ user: data.user, session: data.session },
					data.weak_password ? { weakPassword: data.weak_password } : null,
				),
				error: error3,
			};
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Log in an existing user via a third-party provider.
	 * This method supports the PKCE flow.
	 */
	async signInWithOAuth(credentials) {
		var _a2, _b, _c, _d;
		return await this._handleProviderSignIn(credentials.provider, {
			redirectTo:
				(_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
			scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
			queryParams:
				(_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
			skipBrowserRedirect:
				(_d = credentials.options) === null || _d === void 0
					? void 0
					: _d.skipBrowserRedirect,
		});
	}
	/**
	 * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
	 */
	async exchangeCodeForSession(authCode) {
		await this.initializePromise;
		return this._acquireLock(-1, async () => {
			return this._exchangeCodeForSession(authCode);
		});
	}
	async _exchangeCodeForSession(authCode) {
		const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
		const [codeVerifier, redirectType] = (
			storageItem !== null && storageItem !== void 0 ? storageItem : ""
		).split("/");
		try {
			const { data, error: error3 } = await _request(
				this.fetch,
				"POST",
				`${this.url}/token?grant_type=pkce`,
				{
					headers: this.headers,
					body: {
						auth_code: authCode,
						code_verifier: codeVerifier,
					},
					xform: _sessionResponse,
				},
			);
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (error3) {
				throw error3;
			}
			if (!data || !data.session || !data.user) {
				return {
					data: { user: null, session: null, redirectType: null },
					error: new AuthInvalidTokenResponseError(),
				};
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return {
				data: Object.assign(Object.assign({}, data), {
					redirectType:
						redirectType !== null && redirectType !== void 0 ? redirectType : null,
				}),
				error: error3,
			};
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null, redirectType: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Allows signing in with an OIDC ID token. The authentication provider used
	 * should be enabled and configured.
	 */
	async signInWithIdToken(credentials) {
		try {
			const { options: options2, provider, token, access_token, nonce } = credentials;
			const res = await _request(
				this.fetch,
				"POST",
				`${this.url}/token?grant_type=id_token`,
				{
					headers: this.headers,
					body: {
						provider,
						id_token: token,
						access_token,
						nonce,
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
					},
					xform: _sessionResponse,
				},
			);
			const { data, error: error3 } = res;
			if (error3) {
				return { data: { user: null, session: null }, error: error3 };
			} else if (!data || !data.session || !data.user) {
				return {
					data: { user: null, session: null },
					error: new AuthInvalidTokenResponseError(),
				};
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return { data, error: error3 };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Log in a user using magiclink or a one-time password (OTP).
	 *
	 * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
	 * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
	 * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
	 *
	 * Be aware that you may get back an error message that will not distinguish
	 * between the cases where the account does not exist or, that the account
	 * can only be accessed via social login.
	 *
	 * Do note that you will need to configure a Whatsapp sender on Twilio
	 * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
	 * channel is not supported on other providers
	 * at this time.
	 * This method supports PKCE when an email is passed.
	 */
	async signInWithOtp(credentials) {
		var _a2, _b, _c, _d, _e;
		try {
			if ("email" in credentials) {
				const { email, options: options2 } = credentials;
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce") {
					[codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
						this.storage,
						this.storageKey,
					);
				}
				const { error: error3 } = await _request(this.fetch, "POST", `${this.url}/otp`, {
					headers: this.headers,
					body: {
						email,
						data:
							(_a2 =
								options2 === null || options2 === void 0
									? void 0
									: options2.data) !== null && _a2 !== void 0
								? _a2
								: {},
						create_user:
							(_b =
								options2 === null || options2 === void 0
									? void 0
									: options2.shouldCreateUser) !== null && _b !== void 0
								? _b
								: true,
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod,
					},
					redirectTo:
						options2 === null || options2 === void 0
							? void 0
							: options2.emailRedirectTo,
				});
				return { data: { user: null, session: null }, error: error3 };
			}
			if ("phone" in credentials) {
				const { phone, options: options2 } = credentials;
				const { data, error: error3 } = await _request(
					this.fetch,
					"POST",
					`${this.url}/otp`,
					{
						headers: this.headers,
						body: {
							phone,
							data:
								(_c =
									options2 === null || options2 === void 0
										? void 0
										: options2.data) !== null && _c !== void 0
									? _c
									: {},
							create_user:
								(_d =
									options2 === null || options2 === void 0
										? void 0
										: options2.shouldCreateUser) !== null && _d !== void 0
									? _d
									: true,
							gotrue_meta_security: {
								captcha_token:
									options2 === null || options2 === void 0
										? void 0
										: options2.captchaToken,
							},
							channel:
								(_e =
									options2 === null || options2 === void 0
										? void 0
										: options2.channel) !== null && _e !== void 0
									? _e
									: "sms",
						},
					},
				);
				return {
					data: {
						user: null,
						session: null,
						messageId: data === null || data === void 0 ? void 0 : data.message_id,
					},
					error: error3,
				};
			}
			throw new AuthInvalidCredentialsError(
				"You must provide either an email or phone number.",
			);
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
	 */
	async verifyOtp(params) {
		var _a2, _b;
		try {
			let redirectTo = void 0;
			let captchaToken = void 0;
			if ("options" in params) {
				redirectTo =
					(_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo;
				captchaToken =
					(_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
			}
			const { data, error: error3 } = await _request(
				this.fetch,
				"POST",
				`${this.url}/verify`,
				{
					headers: this.headers,
					body: Object.assign(Object.assign({}, params), {
						gotrue_meta_security: { captcha_token: captchaToken },
					}),
					redirectTo,
					xform: _sessionResponse,
				},
			);
			if (error3) {
				throw error3;
			}
			if (!data) {
				throw new Error("An error occurred on token verification.");
			}
			const session = data.session;
			const user = data.user;
			if (session === null || session === void 0 ? void 0 : session.access_token) {
				await this._saveSession(session);
				await this._notifyAllSubscribers(
					params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
					session,
				);
			}
			return { data: { user, session }, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Attempts a single-sign on using an enterprise Identity Provider. A
	 * successful SSO attempt will redirect the current page to the identity
	 * provider authorization page. The redirect URL is implementation and SSO
	 * protocol specific.
	 *
	 * You can use it by providing a SSO domain. Typically you can extract this
	 * domain by asking users for their email address. If this domain is
	 * registered on the Auth instance the redirect will use that organization's
	 * currently active SSO Identity Provider for the login.
	 *
	 * If you have built an organization-specific login page, you can use the
	 * organization's SSO Identity Provider UUID directly instead.
	 */
	async signInWithSSO(params) {
		var _a2, _b, _c;
		try {
			let codeChallenge = null;
			let codeChallengeMethod = null;
			if (this.flowType === "pkce") {
				[codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
					this.storage,
					this.storageKey,
				);
			}
			return await _request(this.fetch, "POST", `${this.url}/sso`, {
				body: Object.assign(
					Object.assign(
						Object.assign(
							Object.assign(
								Object.assign(
									{},
									"providerId" in params
										? { provider_id: params.providerId }
										: null,
								),
								"domain" in params ? { domain: params.domain } : null,
							),
							{
								redirect_to:
									(_b =
										(_a2 = params.options) === null || _a2 === void 0
											? void 0
											: _a2.redirectTo) !== null && _b !== void 0
										? _b
										: void 0,
							},
						),
						(
							(_c =
								params === null || params === void 0 ? void 0 : params.options) ===
								null || _c === void 0
								? void 0
								: _c.captchaToken
						)
							? {
									gotrue_meta_security: {
										captcha_token: params.options.captchaToken,
									},
								}
							: null,
					),
					{
						skip_http_redirect: true,
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod,
					},
				),
				headers: this.headers,
				xform: _ssoResponse,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Sends a reauthentication OTP to the user's email or phone number.
	 * Requires the user to be signed-in.
	 */
	async reauthenticate() {
		await this.initializePromise;
		return await this._acquireLock(-1, async () => {
			return await this._reauthenticate();
		});
	}
	async _reauthenticate() {
		try {
			return await this._useSession(async (result) => {
				const {
					data: { session },
					error: sessionError,
				} = result;
				if (sessionError) throw sessionError;
				if (!session) throw new AuthSessionMissingError();
				const { error: error3 } = await _request(
					this.fetch,
					"GET",
					`${this.url}/reauthenticate`,
					{
						headers: this.headers,
						jwt: session.access_token,
					},
				);
				return { data: { user: null, session: null }, error: error3 };
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
	 */
	async resend(credentials) {
		try {
			const endpoint = `${this.url}/resend`;
			if ("email" in credentials) {
				const { email, type, options: options2 } = credentials;
				const { error: error3 } = await _request(this.fetch, "POST", endpoint, {
					headers: this.headers,
					body: {
						email,
						type,
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
					},
					redirectTo:
						options2 === null || options2 === void 0
							? void 0
							: options2.emailRedirectTo,
				});
				return { data: { user: null, session: null }, error: error3 };
			} else if ("phone" in credentials) {
				const { phone, type, options: options2 } = credentials;
				const { data, error: error3 } = await _request(this.fetch, "POST", endpoint, {
					headers: this.headers,
					body: {
						phone,
						type,
						gotrue_meta_security: {
							captcha_token:
								options2 === null || options2 === void 0
									? void 0
									: options2.captchaToken,
						},
					},
				});
				return {
					data: {
						user: null,
						session: null,
						messageId: data === null || data === void 0 ? void 0 : data.message_id,
					},
					error: error3,
				};
			}
			throw new AuthInvalidCredentialsError(
				"You must provide either an email or phone number and a type",
			);
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Returns the session, refreshing it if necessary.
	 *
	 * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
	 *
	 * **IMPORTANT:** This method loads values directly from the storage attached
	 * to the client. If that storage is based on request cookies for example,
	 * the values in it may not be authentic and therefore it's strongly advised
	 * against using this method and its results in such circumstances. A warning
	 * will be emitted if this is detected. Use {@link #getUser()} instead.
	 */
	async getSession() {
		await this.initializePromise;
		const result = await this._acquireLock(-1, async () => {
			return this._useSession(async (result2) => {
				return result2;
			});
		});
		return result;
	}
	/**
	 * Acquires a global lock based on the storage key.
	 */
	async _acquireLock(acquireTimeout, fn) {
		this._debug("#_acquireLock", "begin", acquireTimeout);
		try {
			if (this.lockAcquired) {
				const last = this.pendingInLock.length
					? this.pendingInLock[this.pendingInLock.length - 1]
					: Promise.resolve();
				const result = (async () => {
					await last;
					return await fn();
				})();
				this.pendingInLock.push(
					(async () => {
						try {
							await result;
						} catch (e) {}
					})(),
				);
				return result;
			}
			return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
				this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
				try {
					this.lockAcquired = true;
					const result = fn();
					this.pendingInLock.push(
						(async () => {
							try {
								await result;
							} catch (e) {}
						})(),
					);
					await result;
					while (this.pendingInLock.length) {
						const waitOn = [...this.pendingInLock];
						await Promise.all(waitOn);
						this.pendingInLock.splice(0, waitOn.length);
					}
					return await result;
				} finally {
					this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
					this.lockAcquired = false;
				}
			});
		} finally {
			this._debug("#_acquireLock", "end");
		}
	}
	/**
	 * Use instead of {@link #getSession} inside the library. It is
	 * semantically usually what you want, as getting a session involves some
	 * processing afterwards that requires only one client operating on the
	 * session at once across multiple tabs or processes.
	 */
	async _useSession(fn) {
		this._debug("#_useSession", "begin");
		try {
			const result = await this.__loadSession();
			return await fn(result);
		} finally {
			this._debug("#_useSession", "end");
		}
	}
	/**
	 * NEVER USE DIRECTLY!
	 *
	 * Always use {@link #_useSession}.
	 */
	async __loadSession() {
		this._debug("#__loadSession()", "begin");
		if (!this.lockAcquired) {
			this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
		}
		try {
			let currentSession = null;
			const maybeSession = await getItemAsync(this.storage, this.storageKey);
			this._debug("#getSession()", "session from storage", maybeSession);
			if (maybeSession !== null) {
				if (this._isValidSession(maybeSession)) {
					currentSession = maybeSession;
				} else {
					this._debug("#getSession()", "session from storage is not valid");
					await this._removeSession();
				}
			}
			if (!currentSession) {
				return { data: { session: null }, error: null };
			}
			const hasExpired = currentSession.expires_at
				? currentSession.expires_at * 1e3 - Date.now() < EXPIRY_MARGIN_MS
				: false;
			this._debug(
				"#__loadSession()",
				`session has${hasExpired ? "" : " not"} expired`,
				"expires_at",
				currentSession.expires_at,
			);
			if (!hasExpired) {
				if (this.storage.isServer) {
					let suppressWarning = this.suppressGetSessionWarning;
					const proxySession = new Proxy(currentSession, {
						get: /* @__PURE__ */ __name((target, prop, receiver) => {
							if (!suppressWarning && prop === "user") {
								console.warn(
									"Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
								);
								suppressWarning = true;
								this.suppressGetSessionWarning = true;
							}
							return Reflect.get(target, prop, receiver);
						}, "get"),
					});
					currentSession = proxySession;
				}
				return { data: { session: currentSession }, error: null };
			}
			const { session, error: error3 } = await this._callRefreshToken(
				currentSession.refresh_token,
			);
			if (error3) {
				return { data: { session: null }, error: error3 };
			}
			return { data: { session }, error: null };
		} finally {
			this._debug("#__loadSession()", "end");
		}
	}
	/**
	 * Gets the current user details if there is an existing session. This method
	 * performs a network request to the Supabase Auth server, so the returned
	 * value is authentic and can be used to base authorization rules on.
	 *
	 * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
	 */
	async getUser(jwt) {
		if (jwt) {
			return await this._getUser(jwt);
		}
		await this.initializePromise;
		const result = await this._acquireLock(-1, async () => {
			return await this._getUser();
		});
		return result;
	}
	async _getUser(jwt) {
		try {
			if (jwt) {
				return await _request(this.fetch, "GET", `${this.url}/user`, {
					headers: this.headers,
					jwt,
					xform: _userResponse,
				});
			}
			return await this._useSession(async (result) => {
				var _a2, _b, _c;
				const { data, error: error3 } = result;
				if (error3) {
					throw error3;
				}
				if (
					!((_a2 = data.session) === null || _a2 === void 0
						? void 0
						: _a2.access_token) &&
					!this.hasCustomAuthorizationHeader
				) {
					return { data: { user: null }, error: new AuthSessionMissingError() };
				}
				return await _request(this.fetch, "GET", `${this.url}/user`, {
					headers: this.headers,
					jwt:
						(_c =
							(_b = data.session) === null || _b === void 0
								? void 0
								: _b.access_token) !== null && _c !== void 0
							? _c
							: void 0,
					xform: _userResponse,
				});
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				if (isAuthSessionMissingError(error3)) {
					await this._removeSession();
					await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
				}
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Updates user data for a logged in user.
	 */
	async updateUser(attributes, options2 = {}) {
		await this.initializePromise;
		return await this._acquireLock(-1, async () => {
			return await this._updateUser(attributes, options2);
		});
	}
	async _updateUser(attributes, options2 = {}) {
		try {
			return await this._useSession(async (result) => {
				const { data: sessionData, error: sessionError } = result;
				if (sessionError) {
					throw sessionError;
				}
				if (!sessionData.session) {
					throw new AuthSessionMissingError();
				}
				const session = sessionData.session;
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce" && attributes.email != null) {
					[codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
						this.storage,
						this.storageKey,
					);
				}
				const { data, error: userError } = await _request(
					this.fetch,
					"PUT",
					`${this.url}/user`,
					{
						headers: this.headers,
						redirectTo:
							options2 === null || options2 === void 0
								? void 0
								: options2.emailRedirectTo,
						body: Object.assign(Object.assign({}, attributes), {
							code_challenge: codeChallenge,
							code_challenge_method: codeChallengeMethod,
						}),
						jwt: session.access_token,
						xform: _userResponse,
					},
				);
				if (userError) throw userError;
				session.user = data.user;
				await this._saveSession(session);
				await this._notifyAllSubscribers("USER_UPDATED", session);
				return { data: { user: session.user }, error: null };
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
	 * If the refresh token or access token in the current session is invalid, an error will be thrown.
	 * @param currentSession The current session that minimally contains an access token and refresh token.
	 */
	async setSession(currentSession) {
		await this.initializePromise;
		return await this._acquireLock(-1, async () => {
			return await this._setSession(currentSession);
		});
	}
	async _setSession(currentSession) {
		try {
			if (!currentSession.access_token || !currentSession.refresh_token) {
				throw new AuthSessionMissingError();
			}
			const timeNow = Date.now() / 1e3;
			let expiresAt2 = timeNow;
			let hasExpired = true;
			let session = null;
			const { payload } = decodeJWT(currentSession.access_token);
			if (payload.exp) {
				expiresAt2 = payload.exp;
				hasExpired = expiresAt2 <= timeNow;
			}
			if (hasExpired) {
				const { session: refreshedSession, error: error3 } = await this._callRefreshToken(
					currentSession.refresh_token,
				);
				if (error3) {
					return { data: { user: null, session: null }, error: error3 };
				}
				if (!refreshedSession) {
					return { data: { user: null, session: null }, error: null };
				}
				session = refreshedSession;
			} else {
				const { data, error: error3 } = await this._getUser(currentSession.access_token);
				if (error3) {
					throw error3;
				}
				session = {
					access_token: currentSession.access_token,
					refresh_token: currentSession.refresh_token,
					user: data.user,
					token_type: "bearer",
					expires_in: expiresAt2 - timeNow,
					expires_at: expiresAt2,
				};
				await this._saveSession(session);
				await this._notifyAllSubscribers("SIGNED_IN", session);
			}
			return { data: { user: session.user, session }, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { session: null, user: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Returns a new session, regardless of expiry status.
	 * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
	 * If the current session's refresh token is invalid, an error will be thrown.
	 * @param currentSession The current session. If passed in, it must contain a refresh token.
	 */
	async refreshSession(currentSession) {
		await this.initializePromise;
		return await this._acquireLock(-1, async () => {
			return await this._refreshSession(currentSession);
		});
	}
	async _refreshSession(currentSession) {
		try {
			return await this._useSession(async (result) => {
				var _a2;
				if (!currentSession) {
					const { data, error: error4 } = result;
					if (error4) {
						throw error4;
					}
					currentSession = (_a2 = data.session) !== null && _a2 !== void 0 ? _a2 : void 0;
				}
				if (
					!(currentSession === null || currentSession === void 0
						? void 0
						: currentSession.refresh_token)
				) {
					throw new AuthSessionMissingError();
				}
				const { session, error: error3 } = await this._callRefreshToken(
					currentSession.refresh_token,
				);
				if (error3) {
					return { data: { user: null, session: null }, error: error3 };
				}
				if (!session) {
					return { data: { user: null, session: null }, error: null };
				}
				return { data: { user: session.user, session }, error: null };
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { user: null, session: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Gets the session data from a URL string
	 */
	async _getSessionFromURL(params, callbackUrlType) {
		try {
			if (!isBrowser()) throw new AuthImplicitGrantRedirectError("No browser detected.");
			if (params.error || params.error_description || params.error_code) {
				throw new AuthImplicitGrantRedirectError(
					params.error_description || "Error in URL with unspecified error_description",
					{
						error: params.error || "unspecified_error",
						code: params.error_code || "unspecified_code",
					},
				);
			}
			switch (callbackUrlType) {
				case "implicit":
					if (this.flowType === "pkce") {
						throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
					}
					break;
				case "pkce":
					if (this.flowType === "implicit") {
						throw new AuthImplicitGrantRedirectError(
							"Not a valid implicit grant flow url.",
						);
					}
					break;
				default:
			}
			if (callbackUrlType === "pkce") {
				this._debug("#_initialize()", "begin", "is PKCE flow", true);
				if (!params.code) throw new AuthPKCEGrantCodeExchangeError("No code detected.");
				const { data: data2, error: error4 } = await this._exchangeCodeForSession(
					params.code,
				);
				if (error4) throw error4;
				const url = new URL(window.location.href);
				url.searchParams.delete("code");
				window.history.replaceState(window.history.state, "", url.toString());
				return { data: { session: data2.session, redirectType: null }, error: null };
			}
			const {
				provider_token,
				provider_refresh_token,
				access_token,
				refresh_token,
				expires_in,
				expires_at,
				token_type,
			} = params;
			if (!access_token || !expires_in || !refresh_token || !token_type) {
				throw new AuthImplicitGrantRedirectError("No session defined in URL");
			}
			const timeNow = Math.round(Date.now() / 1e3);
			const expiresIn = Number.parseInt(expires_in);
			let expiresAt2 = timeNow + expiresIn;
			if (expires_at) {
				expiresAt2 = Number.parseInt(expires_at);
			}
			const actuallyExpiresIn = expiresAt2 - timeNow;
			if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS) {
				console.warn(
					`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`,
				);
			}
			const issuedAt = expiresAt2 - expiresIn;
			if (timeNow - issuedAt >= 120) {
				console.warn(
					"@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
					issuedAt,
					expiresAt2,
					timeNow,
				);
			} else if (timeNow - issuedAt < 0) {
				console.warn(
					"@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
					issuedAt,
					expiresAt2,
					timeNow,
				);
			}
			const { data, error: error3 } = await this._getUser(access_token);
			if (error3) throw error3;
			const session = {
				provider_token,
				provider_refresh_token,
				access_token,
				expires_in: expiresIn,
				expires_at: expiresAt2,
				refresh_token,
				token_type,
				user: data.user,
			};
			window.location.hash = "";
			this._debug("#_getSessionFromURL()", "clearing window.location.hash");
			return { data: { session, redirectType: params.type }, error: null };
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { session: null, redirectType: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
	 */
	_isImplicitGrantCallback(params) {
		return Boolean(params.access_token || params.error_description);
	}
	/**
	 * Checks if the current URL and backing storage contain parameters given by a PKCE flow
	 */
	async _isPKCECallback(params) {
		const currentStorageContent = await getItemAsync(
			this.storage,
			`${this.storageKey}-code-verifier`,
		);
		return !!(params.code && currentStorageContent);
	}
	/**
	 * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
	 *
	 * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
	 * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
	 *
	 * If using `others` scope, no `SIGNED_OUT` event is fired!
	 */
	async signOut(options2 = { scope: "global" }) {
		await this.initializePromise;
		return await this._acquireLock(-1, async () => {
			return await this._signOut(options2);
		});
	}
	async _signOut({ scope } = { scope: "global" }) {
		return await this._useSession(async (result) => {
			var _a2;
			const { data, error: sessionError } = result;
			if (sessionError) {
				return { error: sessionError };
			}
			const accessToken =
				(_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token;
			if (accessToken) {
				const { error: error3 } = await this.admin.signOut(accessToken, scope);
				if (error3) {
					if (
						!(
							isAuthApiError(error3) &&
							(error3.status === 404 ||
								error3.status === 401 ||
								error3.status === 403)
						)
					) {
						return { error: error3 };
					}
				}
			}
			if (scope !== "others") {
				await this._removeSession();
				await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			}
			return { error: null };
		});
	}
	/**
	 * Receive a notification every time an auth event happens.
	 * @param callback A callback function to be invoked when an auth event happens.
	 */
	onAuthStateChange(callback) {
		const id = uuid();
		const subscription = {
			id,
			callback,
			unsubscribe: /* @__PURE__ */ __name(() => {
				this._debug("#unsubscribe()", "state change callback with id removed", id);
				this.stateChangeEmitters.delete(id);
			}, "unsubscribe"),
		};
		this._debug("#onAuthStateChange()", "registered callback with id", id);
		this.stateChangeEmitters.set(id, subscription);
		(async () => {
			await this.initializePromise;
			await this._acquireLock(-1, async () => {
				this._emitInitialSession(id);
			});
		})();
		return { data: { subscription } };
	}
	async _emitInitialSession(id) {
		return await this._useSession(async (result) => {
			var _a2, _b;
			try {
				const {
					data: { session },
					error: error3,
				} = result;
				if (error3) throw error3;
				await ((_a2 = this.stateChangeEmitters.get(id)) === null || _a2 === void 0
					? void 0
					: _a2.callback("INITIAL_SESSION", session));
				this._debug("INITIAL_SESSION", "callback id", id, "session", session);
			} catch (err) {
				await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0
					? void 0
					: _b.callback("INITIAL_SESSION", null));
				this._debug("INITIAL_SESSION", "callback id", id, "error", err);
				console.error(err);
			}
		});
	}
	/**
	 * Sends a password reset request to an email address. This method supports the PKCE flow.
	 *
	 * @param email The email address of the user.
	 * @param options.redirectTo The URL to send the user to after they click the password reset link.
	 * @param options.captchaToken Verification token received when the user completes the captcha on the site.
	 */
	async resetPasswordForEmail(email, options2 = {}) {
		let codeChallenge = null;
		let codeChallengeMethod = null;
		if (this.flowType === "pkce") {
			[codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
				this.storage,
				this.storageKey,
				true,
				// isPasswordRecovery
			);
		}
		try {
			return await _request(this.fetch, "POST", `${this.url}/recover`, {
				body: {
					email,
					code_challenge: codeChallenge,
					code_challenge_method: codeChallengeMethod,
					gotrue_meta_security: { captcha_token: options2.captchaToken },
				},
				headers: this.headers,
				redirectTo: options2.redirectTo,
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Gets all the identities linked to a user.
	 */
	async getUserIdentities() {
		var _a2;
		try {
			const { data, error: error3 } = await this.getUser();
			if (error3) throw error3;
			return {
				data: {
					identities: (_a2 = data.user.identities) !== null && _a2 !== void 0 ? _a2 : [],
				},
				error: null,
			};
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Links an oauth identity to an existing user.
	 * This method supports the PKCE flow.
	 */
	async linkIdentity(credentials) {
		var _a2;
		try {
			const { data, error: error3 } = await this._useSession(async (result) => {
				var _a3, _b, _c, _d, _e;
				const { data: data2, error: error4 } = result;
				if (error4) throw error4;
				const url = await this._getUrlForProvider(
					`${this.url}/user/identities/authorize`,
					credentials.provider,
					{
						redirectTo:
							(_a3 = credentials.options) === null || _a3 === void 0
								? void 0
								: _a3.redirectTo,
						scopes:
							(_b = credentials.options) === null || _b === void 0
								? void 0
								: _b.scopes,
						queryParams:
							(_c = credentials.options) === null || _c === void 0
								? void 0
								: _c.queryParams,
						skipBrowserRedirect: true,
					},
				);
				return await _request(this.fetch, "GET", url, {
					headers: this.headers,
					jwt:
						(_e =
							(_d = data2.session) === null || _d === void 0
								? void 0
								: _d.access_token) !== null && _e !== void 0
							? _e
							: void 0,
				});
			});
			if (error3) throw error3;
			if (
				isBrowser() &&
				!((_a2 = credentials.options) === null || _a2 === void 0
					? void 0
					: _a2.skipBrowserRedirect)
			) {
				window.location.assign(data === null || data === void 0 ? void 0 : data.url);
			}
			return {
				data: {
					provider: credentials.provider,
					url: data === null || data === void 0 ? void 0 : data.url,
				},
				error: null,
			};
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: { provider: credentials.provider, url: null }, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
	 */
	async unlinkIdentity(identity) {
		try {
			return await this._useSession(async (result) => {
				var _a2, _b;
				const { data, error: error3 } = result;
				if (error3) {
					throw error3;
				}
				return await _request(
					this.fetch,
					"DELETE",
					`${this.url}/user/identities/${identity.identity_id}`,
					{
						headers: this.headers,
						jwt:
							(_b =
								(_a2 = data.session) === null || _a2 === void 0
									? void 0
									: _a2.access_token) !== null && _b !== void 0
								? _b
								: void 0,
					},
				);
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * Generates a new JWT.
	 * @param refreshToken A valid refresh token that was returned on login.
	 */
	async _refreshAccessToken(refreshToken) {
		const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
		this._debug(debugName, "begin");
		try {
			const startedAt = Date.now();
			return await retryable(
				async (attempt) => {
					if (attempt > 0) {
						await sleep(200 * Math.pow(2, attempt - 1));
					}
					this._debug(debugName, "refreshing attempt", attempt);
					return await _request(
						this.fetch,
						"POST",
						`${this.url}/token?grant_type=refresh_token`,
						{
							body: { refresh_token: refreshToken },
							headers: this.headers,
							xform: _sessionResponse,
						},
					);
				},
				(attempt, error3) => {
					const nextBackOffInterval = 200 * Math.pow(2, attempt);
					return (
						error3 &&
						isAuthRetryableFetchError(error3) && // retryable only if the request can be sent before the backoff overflows the tick duration
						Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION_MS
					);
				},
			);
		} catch (error3) {
			this._debug(debugName, "error", error3);
			if (isAuthError(error3)) {
				return { data: { session: null, user: null }, error: error3 };
			}
			throw error3;
		} finally {
			this._debug(debugName, "end");
		}
	}
	_isValidSession(maybeSession) {
		const isValidSession =
			typeof maybeSession === "object" &&
			maybeSession !== null &&
			"access_token" in maybeSession &&
			"refresh_token" in maybeSession &&
			"expires_at" in maybeSession;
		return isValidSession;
	}
	async _handleProviderSignIn(provider, options2) {
		const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
			redirectTo: options2.redirectTo,
			scopes: options2.scopes,
			queryParams: options2.queryParams,
		});
		this._debug(
			"#_handleProviderSignIn()",
			"provider",
			provider,
			"options",
			options2,
			"url",
			url,
		);
		if (isBrowser() && !options2.skipBrowserRedirect) {
			window.location.assign(url);
		}
		return { data: { provider, url }, error: null };
	}
	/**
	 * Recovers the session from LocalStorage and refreshes the token
	 * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
	 */
	async _recoverAndRefresh() {
		var _a2;
		const debugName = "#_recoverAndRefresh()";
		this._debug(debugName, "begin");
		try {
			const currentSession = await getItemAsync(this.storage, this.storageKey);
			this._debug(debugName, "session from storage", currentSession);
			if (!this._isValidSession(currentSession)) {
				this._debug(debugName, "session is not valid");
				if (currentSession !== null) {
					await this._removeSession();
				}
				return;
			}
			const expiresWithMargin =
				((_a2 = currentSession.expires_at) !== null && _a2 !== void 0 ? _a2 : Number.POSITIVE_INFINITY) *
					1e3 -
					Date.now() <
				EXPIRY_MARGIN_MS;
			this._debug(
				debugName,
				`session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`,
			);
			if (expiresWithMargin) {
				if (this.autoRefreshToken && currentSession.refresh_token) {
					const { error: error3 } = await this._callRefreshToken(
						currentSession.refresh_token,
					);
					if (error3) {
						console.error(error3);
						if (!isAuthRetryableFetchError(error3)) {
							this._debug(
								debugName,
								"refresh failed with a non-retryable error, removing the session",
								error3,
							);
							await this._removeSession();
						}
					}
				}
			} else {
				await this._notifyAllSubscribers("SIGNED_IN", currentSession);
			}
		} catch (err) {
			this._debug(debugName, "error", err);
			console.error(err);
			return;
		} finally {
			this._debug(debugName, "end");
		}
	}
	async _callRefreshToken(refreshToken) {
		var _a2, _b;
		if (!refreshToken) {
			throw new AuthSessionMissingError();
		}
		if (this.refreshingDeferred) {
			return this.refreshingDeferred.promise;
		}
		const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
		this._debug(debugName, "begin");
		try {
			this.refreshingDeferred = new Deferred();
			const { data, error: error3 } = await this._refreshAccessToken(refreshToken);
			if (error3) throw error3;
			if (!data.session) throw new AuthSessionMissingError();
			await this._saveSession(data.session);
			await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
			const result = { session: data.session, error: null };
			this.refreshingDeferred.resolve(result);
			return result;
		} catch (error3) {
			this._debug(debugName, "error", error3);
			if (isAuthError(error3)) {
				const result = { session: null, error: error3 };
				if (!isAuthRetryableFetchError(error3)) {
					await this._removeSession();
				}
				(_a2 = this.refreshingDeferred) === null || _a2 === void 0
					? void 0
					: _a2.resolve(result);
				return result;
			}
			(_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error3);
			throw error3;
		} finally {
			this.refreshingDeferred = null;
			this._debug(debugName, "end");
		}
	}
	async _notifyAllSubscribers(event, session, broadcast = true) {
		const debugName = `#_notifyAllSubscribers(${event})`;
		this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
		try {
			if (this.broadcastChannel && broadcast) {
				this.broadcastChannel.postMessage({ event, session });
			}
			const errors = [];
			const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
				try {
					await x.callback(event, session);
				} catch (e) {
					errors.push(e);
				}
			});
			await Promise.all(promises);
			if (errors.length > 0) {
				for (let i = 0; i < errors.length; i += 1) {
					console.error(errors[i]);
				}
				throw errors[0];
			}
		} finally {
			this._debug(debugName, "end");
		}
	}
	/**
	 * set currentSession and currentUser
	 * process to _startAutoRefreshToken if possible
	 */
	async _saveSession(session) {
		this._debug("#_saveSession()", session);
		this.suppressGetSessionWarning = true;
		await setItemAsync(this.storage, this.storageKey, session);
	}
	async _removeSession() {
		this._debug("#_removeSession()");
		await removeItemAsync(this.storage, this.storageKey);
		await this._notifyAllSubscribers("SIGNED_OUT", null);
	}
	/**
	 * Removes any registered visibilitychange callback.
	 *
	 * {@see #startAutoRefresh}
	 * {@see #stopAutoRefresh}
	 */
	_removeVisibilityChangedCallback() {
		this._debug("#_removeVisibilityChangedCallback()");
		const callback = this.visibilityChangedCallback;
		this.visibilityChangedCallback = null;
		try {
			if (
				callback &&
				isBrowser() &&
				(window === null || window === void 0 ? void 0 : window.removeEventListener)
			) {
				window.removeEventListener("visibilitychange", callback);
			}
		} catch (e) {
			console.error("removing visibilitychange callback failed", e);
		}
	}
	/**
	 * This is the private implementation of {@link #startAutoRefresh}. Use this
	 * within the library.
	 */
	async _startAutoRefresh() {
		await this._stopAutoRefresh();
		this._debug("#_startAutoRefresh()");
		const ticker = setInterval(
			() => this._autoRefreshTokenTick(),
			AUTO_REFRESH_TICK_DURATION_MS,
		);
		this.autoRefreshTicker = ticker;
		if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
			ticker.unref();
		} else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
			Deno.unrefTimer(ticker);
		}
		setTimeout(async () => {
			await this.initializePromise;
			await this._autoRefreshTokenTick();
		}, 0);
	}
	/**
	 * This is the private implementation of {@link #stopAutoRefresh}. Use this
	 * within the library.
	 */
	async _stopAutoRefresh() {
		this._debug("#_stopAutoRefresh()");
		const ticker = this.autoRefreshTicker;
		this.autoRefreshTicker = null;
		if (ticker) {
			clearInterval(ticker);
		}
	}
	/**
	 * Starts an auto-refresh process in the background. The session is checked
	 * every few seconds. Close to the time of expiration a process is started to
	 * refresh the session. If refreshing fails it will be retried for as long as
	 * necessary.
	 *
	 * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
	 * to call this function, it will be called for you.
	 *
	 * On browsers the refresh process works only when the tab/window is in the
	 * foreground to conserve resources as well as prevent race conditions and
	 * flooding auth with requests. If you call this method any managed
	 * visibility change callback will be removed and you must manage visibility
	 * changes on your own.
	 *
	 * On non-browser platforms the refresh process works *continuously* in the
	 * background, which may not be desirable. You should hook into your
	 * platform's foreground indication mechanism and call these methods
	 * appropriately to conserve resources.
	 *
	 * {@see #stopAutoRefresh}
	 */
	async startAutoRefresh() {
		this._removeVisibilityChangedCallback();
		await this._startAutoRefresh();
	}
	/**
	 * Stops an active auto refresh process running in the background (if any).
	 *
	 * If you call this method any managed visibility change callback will be
	 * removed and you must manage visibility changes on your own.
	 *
	 * See {@link #startAutoRefresh} for more details.
	 */
	async stopAutoRefresh() {
		this._removeVisibilityChangedCallback();
		await this._stopAutoRefresh();
	}
	/**
	 * Runs the auto refresh token tick.
	 */
	async _autoRefreshTokenTick() {
		this._debug("#_autoRefreshTokenTick()", "begin");
		try {
			await this._acquireLock(0, async () => {
				try {
					const now = Date.now();
					try {
						return await this._useSession(async (result) => {
							const {
								data: { session },
							} = result;
							if (!session || !session.refresh_token || !session.expires_at) {
								this._debug("#_autoRefreshTokenTick()", "no session");
								return;
							}
							const expiresInTicks = Math.floor(
								(session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION_MS,
							);
							this._debug(
								"#_autoRefreshTokenTick()",
								`access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`,
							);
							if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
								await this._callRefreshToken(session.refresh_token);
							}
						});
					} catch (e) {
						console.error(
							"Auto refresh tick failed with error. This is likely a transient error.",
							e,
						);
					}
				} finally {
					this._debug("#_autoRefreshTokenTick()", "end");
				}
			});
		} catch (e) {
			if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
				this._debug("auto refresh token tick lock not available");
			} else {
				throw e;
			}
		}
	}
	/**
	 * Registers callbacks on the browser / platform, which in-turn run
	 * algorithms when the browser window/tab are in foreground. On non-browser
	 * platforms it assumes always foreground.
	 */
	async _handleVisibilityChange() {
		this._debug("#_handleVisibilityChange()");
		if (
			!isBrowser() ||
			!(window === null || window === void 0 ? void 0 : window.addEventListener)
		) {
			if (this.autoRefreshToken) {
				this.startAutoRefresh();
			}
			return false;
		}
		try {
			this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
			window === null || window === void 0
				? void 0
				: window.addEventListener("visibilitychange", this.visibilityChangedCallback);
			await this._onVisibilityChanged(true);
		} catch (error3) {
			console.error("_handleVisibilityChange", error3);
		}
	}
	/**
	 * Callback registered with `window.addEventListener('visibilitychange')`.
	 */
	async _onVisibilityChanged(calledFromInitialize) {
		const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
		this._debug(methodName, "visibilityState", document.visibilityState);
		if (document.visibilityState === "visible") {
			if (this.autoRefreshToken) {
				this._startAutoRefresh();
			}
			if (!calledFromInitialize) {
				await this.initializePromise;
				await this._acquireLock(-1, async () => {
					if (document.visibilityState !== "visible") {
						this._debug(
							methodName,
							"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
						);
						return;
					}
					await this._recoverAndRefresh();
				});
			}
		} else if (document.visibilityState === "hidden") {
			if (this.autoRefreshToken) {
				this._stopAutoRefresh();
			}
		}
	}
	/**
	 * Generates the relevant login URL for a third-party provider.
	 * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
	 * @param options.scopes A space-separated list of scopes granted to the OAuth application.
	 * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
	 */
	async _getUrlForProvider(url, provider, options2) {
		const urlParams = [`provider=${encodeURIComponent(provider)}`];
		if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
			urlParams.push(`redirect_to=${encodeURIComponent(options2.redirectTo)}`);
		}
		if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
			urlParams.push(`scopes=${encodeURIComponent(options2.scopes)}`);
		}
		if (this.flowType === "pkce") {
			const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
				this.storage,
				this.storageKey,
			);
			const flowParams = new URLSearchParams({
				code_challenge: `${encodeURIComponent(codeChallenge)}`,
				code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`,
			});
			urlParams.push(flowParams.toString());
		}
		if (options2 === null || options2 === void 0 ? void 0 : options2.queryParams) {
			const query = new URLSearchParams(options2.queryParams);
			urlParams.push(query.toString());
		}
		if (options2 === null || options2 === void 0 ? void 0 : options2.skipBrowserRedirect) {
			urlParams.push(`skip_http_redirect=${options2.skipBrowserRedirect}`);
		}
		return `${url}?${urlParams.join("&")}`;
	}
	async _unenroll(params) {
		try {
			return await this._useSession(async (result) => {
				var _a2;
				const { data: sessionData, error: sessionError } = result;
				if (sessionError) {
					return { data: null, error: sessionError };
				}
				return await _request(
					this.fetch,
					"DELETE",
					`${this.url}/factors/${params.factorId}`,
					{
						headers: this.headers,
						jwt:
							(_a2 =
								sessionData === null || sessionData === void 0
									? void 0
									: sessionData.session) === null || _a2 === void 0
								? void 0
								: _a2.access_token,
					},
				);
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	async _enroll(params) {
		try {
			return await this._useSession(async (result) => {
				var _a2, _b;
				const { data: sessionData, error: sessionError } = result;
				if (sessionError) {
					return { data: null, error: sessionError };
				}
				const body = Object.assign(
					{ friendly_name: params.friendlyName, factor_type: params.factorType },
					params.factorType === "phone"
						? { phone: params.phone }
						: { issuer: params.issuer },
				);
				const { data, error: error3 } = await _request(
					this.fetch,
					"POST",
					`${this.url}/factors`,
					{
						body,
						headers: this.headers,
						jwt:
							(_a2 =
								sessionData === null || sessionData === void 0
									? void 0
									: sessionData.session) === null || _a2 === void 0
								? void 0
								: _a2.access_token,
					},
				);
				if (error3) {
					return { data: null, error: error3 };
				}
				if (
					params.factorType === "totp" &&
					((_b = data === null || data === void 0 ? void 0 : data.totp) === null ||
					_b === void 0
						? void 0
						: _b.qr_code)
				) {
					data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
				}
				return { data, error: null };
			});
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
	/**
	 * {@see GoTrueMFAApi#verify}
	 */
	async _verify(params) {
		return this._acquireLock(-1, async () => {
			try {
				return await this._useSession(async (result) => {
					var _a2;
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) {
						return { data: null, error: sessionError };
					}
					const { data, error: error3 } = await _request(
						this.fetch,
						"POST",
						`${this.url}/factors/${params.factorId}/verify`,
						{
							body: { code: params.code, challenge_id: params.challengeId },
							headers: this.headers,
							jwt:
								(_a2 =
									sessionData === null || sessionData === void 0
										? void 0
										: sessionData.session) === null || _a2 === void 0
									? void 0
									: _a2.access_token,
						},
					);
					if (error3) {
						return { data: null, error: error3 };
					}
					await this._saveSession(
						Object.assign(
							{ expires_at: Math.round(Date.now() / 1e3) + data.expires_in },
							data,
						),
					);
					await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
					return { data, error: error3 };
				});
			} catch (error3) {
				if (isAuthError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * {@see GoTrueMFAApi#challenge}
	 */
	async _challenge(params) {
		return this._acquireLock(-1, async () => {
			try {
				return await this._useSession(async (result) => {
					var _a2;
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) {
						return { data: null, error: sessionError };
					}
					return await _request(
						this.fetch,
						"POST",
						`${this.url}/factors/${params.factorId}/challenge`,
						{
							body: { channel: params.channel },
							headers: this.headers,
							jwt:
								(_a2 =
									sessionData === null || sessionData === void 0
										? void 0
										: sessionData.session) === null || _a2 === void 0
									? void 0
									: _a2.access_token,
						},
					);
				});
			} catch (error3) {
				if (isAuthError(error3)) {
					return { data: null, error: error3 };
				}
				throw error3;
			}
		});
	}
	/**
	 * {@see GoTrueMFAApi#challengeAndVerify}
	 */
	async _challengeAndVerify(params) {
		const { data: challengeData, error: challengeError } = await this._challenge({
			factorId: params.factorId,
		});
		if (challengeError) {
			return { data: null, error: challengeError };
		}
		return await this._verify({
			factorId: params.factorId,
			challengeId: challengeData.id,
			code: params.code,
		});
	}
	/**
	 * {@see GoTrueMFAApi#listFactors}
	 */
	async _listFactors() {
		const {
			data: { user },
			error: userError,
		} = await this.getUser();
		if (userError) {
			return { data: null, error: userError };
		}
		const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
		const totp = factors.filter(
			(factor) => factor.factor_type === "totp" && factor.status === "verified",
		);
		const phone = factors.filter(
			(factor) => factor.factor_type === "phone" && factor.status === "verified",
		);
		return {
			data: {
				all: factors,
				totp,
				phone,
			},
			error: null,
		};
	}
	/**
	 * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
	 */
	async _getAuthenticatorAssuranceLevel() {
		return this._acquireLock(-1, async () => {
			return await this._useSession(async (result) => {
				var _a2, _b;
				const {
					data: { session },
					error: sessionError,
				} = result;
				if (sessionError) {
					return { data: null, error: sessionError };
				}
				if (!session) {
					return {
						data: {
							currentLevel: null,
							nextLevel: null,
							currentAuthenticationMethods: [],
						},
						error: null,
					};
				}
				const { payload } = decodeJWT(session.access_token);
				let currentLevel = null;
				if (payload.aal) {
					currentLevel = payload.aal;
				}
				let nextLevel = currentLevel;
				const verifiedFactors =
					(_b =
						(_a2 = session.user.factors) === null || _a2 === void 0
							? void 0
							: _a2.filter((factor) => factor.status === "verified")) !== null &&
					_b !== void 0
						? _b
						: [];
				if (verifiedFactors.length > 0) {
					nextLevel = "aal2";
				}
				const currentAuthenticationMethods = payload.amr || [];
				return {
					data: { currentLevel, nextLevel, currentAuthenticationMethods },
					error: null,
				};
			});
		});
	}
	async fetchJwk(kid, jwks = { keys: [] }) {
		let jwk = jwks.keys.find((key) => key.kid === kid);
		if (jwk) {
			return jwk;
		}
		jwk = this.jwks.keys.find((key) => key.kid === kid);
		if (jwk && this.jwks_cached_at + JWKS_TTL > Date.now()) {
			return jwk;
		}
		const { data, error: error3 } = await _request(
			this.fetch,
			"GET",
			`${this.url}/.well-known/jwks.json`,
			{
				headers: this.headers,
			},
		);
		if (error3) {
			throw error3;
		}
		if (!data.keys || data.keys.length === 0) {
			throw new AuthInvalidJwtError("JWKS is empty");
		}
		this.jwks = data;
		this.jwks_cached_at = Date.now();
		jwk = data.keys.find((key) => key.kid === kid);
		if (!jwk) {
			throw new AuthInvalidJwtError("No matching signing key found in JWKS");
		}
		return jwk;
	}
	/**
	 * @experimental This method may change in future versions.
	 * @description Gets the claims from a JWT. If the JWT is symmetric JWTs, it will call getUser() to verify against the server. If the JWT is asymmetric, it will be verified against the JWKS using the WebCrypto API.
	 */
	async getClaims(jwt, jwks = { keys: [] }) {
		try {
			let token = jwt;
			if (!token) {
				const { data, error: error3 } = await this.getSession();
				if (error3 || !data.session) {
					return { data: null, error: error3 };
				}
				token = data.session.access_token;
			}
			const {
				header,
				payload,
				signature,
				raw: { header: rawHeader, payload: rawPayload },
			} = decodeJWT(token);
			validateExp(payload.exp);
			if (
				!header.kid ||
				header.alg === "HS256" ||
				!("crypto" in globalThis && "subtle" in globalThis.crypto)
			) {
				const { error: error3 } = await this.getUser(token);
				if (error3) {
					throw error3;
				}
				return {
					data: {
						claims: payload,
						header,
						signature,
					},
					error: null,
				};
			}
			const algorithm = getAlgorithm(header.alg);
			const signingKey = await this.fetchJwk(header.kid, jwks);
			const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, [
				"verify",
			]);
			const isValid2 = await crypto.subtle.verify(
				algorithm,
				publicKey,
				signature,
				stringToUint8Array(`${rawHeader}.${rawPayload}`),
			);
			if (!isValid2) {
				throw new AuthInvalidJwtError("Invalid JWT signature");
			}
			return {
				data: {
					claims: payload,
					header,
					signature,
				},
				error: null,
			};
		} catch (error3) {
			if (isAuthError(error3)) {
				return { data: null, error: error3 };
			}
			throw error3;
		}
	}
};
GoTrueClient.nextInstanceID = 0;

// node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/auth-js/dist/module/AuthClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var AuthClient = GoTrueClient;
var AuthClient_default = AuthClient;

// node_modules/@supabase/auth-js/dist/module/lib/types.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient = class extends AuthClient_default {
	static {
		__name(this, "SupabaseAuthClient");
	}
	constructor(options2) {
		super(options2);
	}
};

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter8 = (thisArg, _arguments, P, generator) => {
	function adopt(value) {
		return value instanceof P
			? value
			: new P((resolve) => {
					resolve(value);
				});
	}
	__name(adopt, "adopt");
	return new (P || (P = Promise))((resolve, reject) => {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		__name(fulfilled, "fulfilled");
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		__name(rejected, "rejected");
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		__name(step, "step");
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var SupabaseClient = class {
	static {
		__name(this, "SupabaseClient");
	}
	/**
	 * Create a new client for use in the browser.
	 * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
	 * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
	 * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
	 * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
	 * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
	 * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
	 * @param options.realtime Options passed along to realtime-js constructor.
	 * @param options.global.fetch A custom fetch implementation.
	 * @param options.global.headers Any additional headers to send with each network request.
	 */
	constructor(supabaseUrl, supabaseKey, options2) {
		var _a2, _b, _c;
		this.supabaseUrl = supabaseUrl;
		this.supabaseKey = supabaseKey;
		if (!supabaseUrl) throw new Error("supabaseUrl is required.");
		if (!supabaseKey) throw new Error("supabaseKey is required.");
		const _supabaseUrl = stripTrailingSlash(supabaseUrl);
		this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
		this.authUrl = `${_supabaseUrl}/auth/v1`;
		this.storageUrl = `${_supabaseUrl}/storage/v1`;
		this.functionsUrl = `${_supabaseUrl}/functions/v1`;
		const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
		const DEFAULTS = {
			db: DEFAULT_DB_OPTIONS,
			realtime: DEFAULT_REALTIME_OPTIONS,
			auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), {
				storageKey: defaultStorageKey,
			}),
			global: DEFAULT_GLOBAL_OPTIONS,
		};
		const settings = applySettingDefaults(
			options2 !== null && options2 !== void 0 ? options2 : {},
			DEFAULTS,
		);
		this.storageKey = (_a2 = settings.auth.storageKey) !== null && _a2 !== void 0 ? _a2 : "";
		this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
		if (!settings.accessToken) {
			this.auth = this._initSupabaseAuthClient(
				(_c = settings.auth) !== null && _c !== void 0 ? _c : {},
				this.headers,
				settings.global.fetch,
			);
		} else {
			this.accessToken = settings.accessToken;
			this.auth = new Proxy(
				{},
				{
					get: /* @__PURE__ */ __name((_, prop) => {
						throw new Error(
							`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`,
						);
					}, "get"),
				},
			);
		}
		this.fetch = fetchWithAuth(
			supabaseKey,
			this._getAccessToken.bind(this),
			settings.global.fetch,
		);
		this.realtime = this._initRealtimeClient(
			Object.assign(
				{ headers: this.headers, accessToken: this._getAccessToken.bind(this) },
				settings.realtime,
			),
		);
		this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
			headers: this.headers,
			schema: settings.db.schema,
			fetch: this.fetch,
		});
		if (!settings.accessToken) {
			this._listenForAuthEvents();
		}
	}
	/**
	 * Supabase Functions allows you to deploy and invoke edge functions.
	 */
	get functions() {
		return new FunctionsClient(this.functionsUrl, {
			headers: this.headers,
			customFetch: this.fetch,
		});
	}
	/**
	 * Supabase Storage allows you to manage user-generated content, such as photos or videos.
	 */
	get storage() {
		return new StorageClient(this.storageUrl, this.headers, this.fetch);
	}
	/**
	 * Perform a query on a table or a view.
	 *
	 * @param relation - The table or view name to query
	 */
	from(relation) {
		return this.rest.from(relation);
	}
	// NOTE: signatures must be kept in sync with PostgrestClient.schema
	/**
	 * Select a schema to query or perform an function (rpc) call.
	 *
	 * The schema needs to be on the list of exposed schemas inside Supabase.
	 *
	 * @param schema - The schema to query
	 */
	schema(schema) {
		return this.rest.schema(schema);
	}
	// NOTE: signatures must be kept in sync with PostgrestClient.rpc
	/**
	 * Perform a function call.
	 *
	 * @param fn - The function name to call
	 * @param args - The arguments to pass to the function call
	 * @param options - Named parameters
	 * @param options.head - When set to `true`, `data` will not be returned.
	 * Useful if you only need the count.
	 * @param options.get - When set to `true`, the function will be called with
	 * read-only access mode.
	 * @param options.count - Count algorithm to use to count rows returned by the
	 * function. Only applicable for [set-returning
	 * functions](https://www.postgresql.org/docs/current/functions-srf.html).
	 *
	 * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	 * hood.
	 *
	 * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	 * statistics under the hood.
	 *
	 * `"estimated"`: Uses exact count for low numbers and planned count for high
	 * numbers.
	 */
	rpc(fn, args = {}, options2 = {}) {
		return this.rest.rpc(fn, args, options2);
	}
	/**
	 * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	 *
	 * @param {string} name - The name of the Realtime channel.
	 * @param {Object} opts - The options to pass to the Realtime channel.
	 *
	 */
	channel(name, opts = { config: {} }) {
		return this.realtime.channel(name, opts);
	}
	/**
	 * Returns all Realtime channels.
	 */
	getChannels() {
		return this.realtime.getChannels();
	}
	/**
	 * Unsubscribes and removes Realtime channel from Realtime client.
	 *
	 * @param {RealtimeChannel} channel - The name of the Realtime channel.
	 *
	 */
	removeChannel(channel2) {
		return this.realtime.removeChannel(channel2);
	}
	/**
	 * Unsubscribes and removes all Realtime channels from Realtime client.
	 */
	removeAllChannels() {
		return this.realtime.removeAllChannels();
	}
	_getAccessToken() {
		var _a2, _b;
		return __awaiter8(this, void 0, void 0, function* () {
			if (this.accessToken) {
				return yield this.accessToken();
			}
			const { data } = yield this.auth.getSession();
			return (_b =
				(_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !==
				null && _b !== void 0
				? _b
				: null;
		});
	}
	_initSupabaseAuthClient(
		{
			autoRefreshToken,
			persistSession,
			detectSessionInUrl,
			storage,
			storageKey,
			flowType,
			lock,
			debug: debug3,
		},
		headers,
		fetch3,
	) {
		const authHeaders = {
			Authorization: `Bearer ${this.supabaseKey}`,
			apikey: `${this.supabaseKey}`,
		};
		return new SupabaseAuthClient({
			url: this.authUrl,
			headers: Object.assign(Object.assign({}, authHeaders), headers),
			storageKey,
			autoRefreshToken,
			persistSession,
			detectSessionInUrl,
			storage,
			flowType,
			lock,
			debug: debug3,
			fetch: fetch3,
			// auth checks if there is a custom authorizaiton header using this flag
			// so it knows whether to return an error when getUser is called with no session
			hasCustomAuthorizationHeader: "Authorization" in this.headers,
		});
	}
	_initRealtimeClient(options2) {
		return new RealtimeClient(
			this.realtimeUrl,
			Object.assign(Object.assign({}, options2), {
				params: Object.assign(
					{ apikey: this.supabaseKey },
					options2 === null || options2 === void 0 ? void 0 : options2.params,
				),
			}),
		);
	}
	_listenForAuthEvents() {
		const data = this.auth.onAuthStateChange((event, session) => {
			this._handleTokenChanged(
				event,
				"CLIENT",
				session === null || session === void 0 ? void 0 : session.access_token,
			);
		});
		return data;
	}
	_handleTokenChanged(event, source, token) {
		if (
			(event === "TOKEN_REFRESHED" || event === "SIGNED_IN") &&
			this.changedAccessToken !== token
		) {
			this.changedAccessToken = token;
		} else if (event === "SIGNED_OUT") {
			this.realtime.setAuth();
			if (source == "STORAGE") this.auth.signOut();
			this.changedAccessToken = void 0;
		}
	}
};

// node_modules/@supabase/supabase-js/dist/module/index.js
var createClient = /* @__PURE__ */ __name((supabaseUrl, supabaseKey, options2) => {
	return new SupabaseClient(supabaseUrl, supabaseKey, options2);
}, "createClient");

// node_modules/@supabase/ssr/dist/module/version.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var VERSION = "0.6.1";

// node_modules/@supabase/ssr/dist/module/utils/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@supabase/ssr/dist/module/utils/helpers.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_cookie = __toESM(require_dist());
function parseCookieHeader(header) {
	const parsed = (0, import_cookie.parse)(header);
	return Object.keys(parsed ?? {}).map((name) => ({
		name,
		value: parsed[name],
	}));
}
__name(parseCookieHeader, "parseCookieHeader");
function isBrowser2() {
	return typeof window !== "undefined" && typeof window.document !== "undefined";
}
__name(isBrowser2, "isBrowser");

// node_modules/@supabase/ssr/dist/module/utils/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var DEFAULT_COOKIE_OPTIONS = {
	path: "/",
	sameSite: "lax",
	httpOnly: false,
	// https://developer.chrome.com/blog/cookie-max-age-expires
	// https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-cookie-lifetime-limits
	maxAge: 400 * 24 * 60 * 60,
};

// node_modules/@supabase/ssr/dist/module/utils/chunker.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var MAX_CHUNK_SIZE = 3180;
var CHUNK_LIKE_REGEX = /^(.*)[.](0|[1-9][0-9]*)$/;
function isChunkLike(cookieName, key) {
	if (cookieName === key) {
		return true;
	}
	const chunkLike = cookieName.match(CHUNK_LIKE_REGEX);
	if (chunkLike && chunkLike[1] === key) {
		return true;
	}
	return false;
}
__name(isChunkLike, "isChunkLike");
function createChunks(key, value, chunkSize) {
	const resolvedChunkSize = chunkSize ?? MAX_CHUNK_SIZE;
	let encodedValue = encodeURIComponent(value);
	if (encodedValue.length <= resolvedChunkSize) {
		return [{ name: key, value }];
	}
	const chunks = [];
	while (encodedValue.length > 0) {
		let encodedChunkHead = encodedValue.slice(0, resolvedChunkSize);
		const lastEscapePos = encodedChunkHead.lastIndexOf("%");
		if (lastEscapePos > resolvedChunkSize - 3) {
			encodedChunkHead = encodedChunkHead.slice(0, lastEscapePos);
		}
		let valueHead = "";
		while (encodedChunkHead.length > 0) {
			try {
				valueHead = decodeURIComponent(encodedChunkHead);
				break;
			} catch (error3) {
				if (
					error3 instanceof URIError &&
					encodedChunkHead.at(-3) === "%" &&
					encodedChunkHead.length > 3
				) {
					encodedChunkHead = encodedChunkHead.slice(0, encodedChunkHead.length - 3);
				} else {
					throw error3;
				}
			}
		}
		chunks.push(valueHead);
		encodedValue = encodedValue.slice(encodedChunkHead.length);
	}
	return chunks.map((value2, i) => ({ name: `${key}.${i}`, value: value2 }));
}
__name(createChunks, "createChunks");
async function combineChunks(key, retrieveChunk) {
	const value = await retrieveChunk(key);
	if (value) {
		return value;
	}
	const values = [];
	for (let i = 0; ; i++) {
		const chunkName = `${key}.${i}`;
		const chunk = await retrieveChunk(chunkName);
		if (!chunk) {
			break;
		}
		values.push(chunk);
	}
	if (values.length > 0) {
		return values.join("");
	}
	return null;
}
__name(combineChunks, "combineChunks");

// node_modules/@supabase/ssr/dist/module/utils/base64url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var TO_BASE64URL2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var IGNORE_BASE64URL2 = " 	\n\r=".split("");
var FROM_BASE64URL2 = (() => {
	const charMap = new Array(128);
	for (let i = 0; i < charMap.length; i += 1) {
		charMap[i] = -1;
	}
	for (let i = 0; i < IGNORE_BASE64URL2.length; i += 1) {
		charMap[IGNORE_BASE64URL2[i].charCodeAt(0)] = -2;
	}
	for (let i = 0; i < TO_BASE64URL2.length; i += 1) {
		charMap[TO_BASE64URL2[i].charCodeAt(0)] = i;
	}
	return charMap;
})();
function stringToBase64URL(str) {
	const base64 = [];
	let queue = 0;
	let queuedBits = 0;
	const emitter = /* @__PURE__ */ __name((byte) => {
		queue = (queue << 8) | byte;
		queuedBits += 8;
		while (queuedBits >= 6) {
			const pos = (queue >> (queuedBits - 6)) & 63;
			base64.push(TO_BASE64URL2[pos]);
			queuedBits -= 6;
		}
	}, "emitter");
	stringToUTF82(str, emitter);
	if (queuedBits > 0) {
		queue = queue << (6 - queuedBits);
		queuedBits = 6;
		while (queuedBits >= 6) {
			const pos = (queue >> (queuedBits - 6)) & 63;
			base64.push(TO_BASE64URL2[pos]);
			queuedBits -= 6;
		}
	}
	return base64.join("");
}
__name(stringToBase64URL, "stringToBase64URL");
function stringFromBase64URL2(str) {
	const conv = [];
	const emit2 = /* @__PURE__ */ __name((codepoint) => {
		conv.push(String.fromCodePoint(codepoint));
	}, "emit");
	const state = {
		utf8seq: 0,
		codepoint: 0,
	};
	let queue = 0;
	let queuedBits = 0;
	for (let i = 0; i < str.length; i += 1) {
		const codepoint = str.charCodeAt(i);
		const bits = FROM_BASE64URL2[codepoint];
		if (bits > -1) {
			queue = (queue << 6) | bits;
			queuedBits += 6;
			while (queuedBits >= 8) {
				stringFromUTF82((queue >> (queuedBits - 8)) & 255, state, emit2);
				queuedBits -= 8;
			}
		} else if (bits === -2) {
			continue;
		} else {
			throw new Error(`Invalid Base64-URL character "${str.at(i)}" at position ${i}`);
		}
	}
	return conv.join("");
}
__name(stringFromBase64URL2, "stringFromBase64URL");
function codepointToUTF82(codepoint, emit2) {
	if (codepoint <= 127) {
		emit2(codepoint);
		return;
	} else if (codepoint <= 2047) {
		emit2(192 | (codepoint >> 6));
		emit2(128 | (codepoint & 63));
		return;
	} else if (codepoint <= 65535) {
		emit2(224 | (codepoint >> 12));
		emit2(128 | ((codepoint >> 6) & 63));
		emit2(128 | (codepoint & 63));
		return;
	} else if (codepoint <= 1114111) {
		emit2(240 | (codepoint >> 18));
		emit2(128 | ((codepoint >> 12) & 63));
		emit2(128 | ((codepoint >> 6) & 63));
		emit2(128 | (codepoint & 63));
		return;
	}
	throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
__name(codepointToUTF82, "codepointToUTF8");
function stringToUTF82(str, emit2) {
	for (let i = 0; i < str.length; i += 1) {
		let codepoint = str.charCodeAt(i);
		if (codepoint > 55295 && codepoint <= 56319) {
			const highSurrogate = ((codepoint - 55296) * 1024) & 65535;
			const lowSurrogate = (str.charCodeAt(i + 1) - 56320) & 65535;
			codepoint = (lowSurrogate | highSurrogate) + 65536;
			i += 1;
		}
		codepointToUTF82(codepoint, emit2);
	}
}
__name(stringToUTF82, "stringToUTF8");
function stringFromUTF82(byte, state, emit2) {
	if (state.utf8seq === 0) {
		if (byte <= 127) {
			emit2(byte);
			return;
		}
		for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
			if (((byte >> (7 - leadingBit)) & 1) === 0) {
				state.utf8seq = leadingBit;
				break;
			}
		}
		if (state.utf8seq === 2) {
			state.codepoint = byte & 31;
		} else if (state.utf8seq === 3) {
			state.codepoint = byte & 15;
		} else if (state.utf8seq === 4) {
			state.codepoint = byte & 7;
		} else {
			throw new Error("Invalid UTF-8 sequence");
		}
		state.utf8seq -= 1;
	} else if (state.utf8seq > 0) {
		if (byte <= 127) {
			throw new Error("Invalid UTF-8 sequence");
		}
		state.codepoint = (state.codepoint << 6) | (byte & 63);
		state.utf8seq -= 1;
		if (state.utf8seq === 0) {
			emit2(state.codepoint);
		}
	}
}
__name(stringFromUTF82, "stringFromUTF8");

// node_modules/@supabase/ssr/dist/module/cookies.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_cookie2 = __toESM(require_dist());
var BASE64_PREFIX = "base64-";
function createStorageFromOptions(options2, isServerClient) {
	const cookies = options2.cookies ?? null;
	const cookieEncoding = options2.cookieEncoding;
	const setItems = {};
	const removedItems = {};
	let getAll;
	let setAll;
	if (cookies) {
		if ("get" in cookies) {
			const getWithHints = /* @__PURE__ */ __name(async (keyHints) => {
				const chunkNames = keyHints.flatMap((keyHint) => [
					keyHint,
					...Array.from({ length: 5 }).map((_, i) => `${keyHint}.${i}`),
				]);
				const chunks = [];
				for (let i = 0; i < chunkNames.length; i += 1) {
					const value = await cookies.get(chunkNames[i]);
					if (!value && typeof value !== "string") {
						continue;
					}
					chunks.push({ name: chunkNames[i], value });
				}
				return chunks;
			}, "getWithHints");
			getAll = /* @__PURE__ */ __name(
				async (keyHints) => await getWithHints(keyHints),
				"getAll",
			);
			if ("set" in cookies && "remove" in cookies) {
				setAll = /* @__PURE__ */ __name(async (setCookies) => {
					for (let i = 0; i < setCookies.length; i += 1) {
						const { name, value, options: options3 } = setCookies[i];
						if (value) {
							await cookies.set(name, value, options3);
						} else {
							await cookies.remove(name, options3);
						}
					}
				}, "setAll");
			} else if (isServerClient) {
				setAll = /* @__PURE__ */ __name(async () => {
					console.warn(
						"@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.",
					);
				}, "setAll");
			} else {
				throw new Error(
					"@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)",
				);
			}
		} else if ("getAll" in cookies) {
			getAll = /* @__PURE__ */ __name(async () => await cookies.getAll(), "getAll");
			if ("setAll" in cookies) {
				setAll = cookies.setAll;
			} else if (isServerClient) {
				setAll = /* @__PURE__ */ __name(async () => {
					console.warn(
						"@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.",
					);
				}, "setAll");
			} else {
				throw new Error(
					"@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)",
				);
			}
		} else {
			throw new Error(
				`@supabase/ssr: ${isServerClient ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${isBrowser2() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`,
			);
		}
	} else if (!isServerClient && isBrowser2()) {
		const noHintGetAll = /* @__PURE__ */ __name(() => {
			const parsed = (0, import_cookie2.parse)(document.cookie);
			return Object.keys(parsed).map((name) => ({
				name,
				value: parsed[name] ?? "",
			}));
		}, "noHintGetAll");
		getAll = /* @__PURE__ */ __name(() => noHintGetAll(), "getAll");
		setAll = /* @__PURE__ */ __name((setCookies) => {
			setCookies.forEach(({ name, value, options: options3 }) => {
				document.cookie = (0, import_cookie2.serialize)(name, value, options3);
			});
		}, "setAll");
	} else if (isServerClient) {
		throw new Error(
			"@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)",
		);
	} else {
		getAll = /* @__PURE__ */ __name(() => {
			return [];
		}, "getAll");
		setAll = /* @__PURE__ */ __name(() => {
			throw new Error(
				"@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed",
			);
		}, "setAll");
	}
	if (!isServerClient) {
		return {
			getAll,
			// for type consistency
			setAll,
			// for type consistency
			setItems,
			// for type consistency
			removedItems,
			// for type consistency
			storage: {
				isServer: false,
				getItem: /* @__PURE__ */ __name(async (key) => {
					const allCookies = await getAll([key]);
					const chunkedCookie = await combineChunks(key, async (chunkName) => {
						const cookie = allCookies?.find(({ name }) => name === chunkName) || null;
						if (!cookie) {
							return null;
						}
						return cookie.value;
					});
					if (!chunkedCookie) {
						return null;
					}
					let decoded = chunkedCookie;
					if (chunkedCookie.startsWith(BASE64_PREFIX)) {
						decoded = stringFromBase64URL2(
							chunkedCookie.substring(BASE64_PREFIX.length),
						);
					}
					return decoded;
				}, "getItem"),
				setItem: /* @__PURE__ */ __name(async (key, value) => {
					const allCookies = await getAll([key]);
					const cookieNames = allCookies?.map(({ name }) => name) || [];
					const removeCookies = new Set(
						cookieNames.filter((name) => isChunkLike(name, key)),
					);
					let encoded = value;
					if (cookieEncoding === "base64url") {
						encoded = BASE64_PREFIX + stringToBase64URL(value);
					}
					const setCookies = createChunks(key, encoded);
					setCookies.forEach(({ name }) => {
						removeCookies.delete(name);
					});
					const removeCookieOptions = {
						...DEFAULT_COOKIE_OPTIONS,
						...options2?.cookieOptions,
						maxAge: 0,
					};
					const setCookieOptions = {
						...DEFAULT_COOKIE_OPTIONS,
						...options2?.cookieOptions,
						maxAge: DEFAULT_COOKIE_OPTIONS.maxAge,
					};
					delete removeCookieOptions.name;
					delete setCookieOptions.name;
					const allToSet = [
						...[...removeCookies].map((name) => ({
							name,
							value: "",
							options: removeCookieOptions,
						})),
						...setCookies.map(({ name, value: value2 }) => ({
							name,
							value: value2,
							options: setCookieOptions,
						})),
					];
					if (allToSet.length > 0) {
						await setAll(allToSet);
					}
				}, "setItem"),
				removeItem: /* @__PURE__ */ __name(async (key) => {
					const allCookies = await getAll([key]);
					const cookieNames = allCookies?.map(({ name }) => name) || [];
					const removeCookies = cookieNames.filter((name) => isChunkLike(name, key));
					const removeCookieOptions = {
						...DEFAULT_COOKIE_OPTIONS,
						...options2?.cookieOptions,
						maxAge: 0,
					};
					delete removeCookieOptions.name;
					if (removeCookies.length > 0) {
						await setAll(
							removeCookies.map((name) => ({
								name,
								value: "",
								options: removeCookieOptions,
							})),
						);
					}
				}, "removeItem"),
			},
		};
	}
	return {
		getAll,
		setAll,
		setItems,
		removedItems,
		storage: {
			// to signal to the libraries that these cookies are
			// coming from a server environment and their value
			// should not be trusted
			isServer: true,
			getItem: /* @__PURE__ */ __name(async (key) => {
				if (typeof setItems[key] === "string") {
					return setItems[key];
				}
				if (removedItems[key]) {
					return null;
				}
				const allCookies = await getAll([key]);
				const chunkedCookie = await combineChunks(key, async (chunkName) => {
					const cookie = allCookies?.find(({ name }) => name === chunkName) || null;
					if (!cookie) {
						return null;
					}
					return cookie.value;
				});
				if (!chunkedCookie) {
					return null;
				}
				let decoded = chunkedCookie;
				if (typeof chunkedCookie === "string" && chunkedCookie.startsWith(BASE64_PREFIX)) {
					decoded = stringFromBase64URL2(chunkedCookie.substring(BASE64_PREFIX.length));
				}
				return decoded;
			}, "getItem"),
			setItem: /* @__PURE__ */ __name(async (key, value) => {
				if (key.endsWith("-code-verifier")) {
					await applyServerStorage(
						{
							getAll,
							setAll,
							// pretend only that the code verifier was set
							setItems: { [key]: value },
							// pretend that nothing was removed
							removedItems: {},
						},
						{
							cookieOptions: options2?.cookieOptions ?? null,
							cookieEncoding,
						},
					);
				}
				setItems[key] = value;
				delete removedItems[key];
			}, "setItem"),
			removeItem: /* @__PURE__ */ __name(async (key) => {
				delete setItems[key];
				removedItems[key] = true;
			}, "removeItem"),
		},
	};
}
__name(createStorageFromOptions, "createStorageFromOptions");
async function applyServerStorage({ getAll, setAll, setItems, removedItems }, options2) {
	const cookieEncoding = options2.cookieEncoding;
	const cookieOptions = options2.cookieOptions ?? null;
	const allCookies = await getAll([
		...(setItems ? Object.keys(setItems) : []),
		...(removedItems ? Object.keys(removedItems) : []),
	]);
	const cookieNames = allCookies?.map(({ name }) => name) || [];
	const removeCookies = Object.keys(removedItems).flatMap((itemName) => {
		return cookieNames.filter((name) => isChunkLike(name, itemName));
	});
	const setCookies = Object.keys(setItems).flatMap((itemName) => {
		const removeExistingCookiesForItem = new Set(
			cookieNames.filter((name) => isChunkLike(name, itemName)),
		);
		let encoded = setItems[itemName];
		if (cookieEncoding === "base64url") {
			encoded = BASE64_PREFIX + stringToBase64URL(encoded);
		}
		const chunks = createChunks(itemName, encoded);
		chunks.forEach((chunk) => {
			removeExistingCookiesForItem.delete(chunk.name);
		});
		removeCookies.push(...removeExistingCookiesForItem);
		return chunks;
	});
	const removeCookieOptions = {
		...DEFAULT_COOKIE_OPTIONS,
		...cookieOptions,
		maxAge: 0,
	};
	const setCookieOptions = {
		...DEFAULT_COOKIE_OPTIONS,
		...cookieOptions,
		maxAge: DEFAULT_COOKIE_OPTIONS.maxAge,
	};
	delete removeCookieOptions.name;
	delete setCookieOptions.name;
	await setAll([
		...removeCookies.map((name) => ({
			name,
			value: "",
			options: removeCookieOptions,
		})),
		...setCookies.map(({ name, value }) => ({
			name,
			value,
			options: setCookieOptions,
		})),
	]);
}
__name(applyServerStorage, "applyServerStorage");

// node_modules/@supabase/ssr/dist/module/createServerClient.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function createServerClient(supabaseUrl, supabaseKey, options2) {
	if (!supabaseUrl || !supabaseKey) {
		throw new Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
	}
	const { storage, getAll, setAll, setItems, removedItems } = createStorageFromOptions(
		{
			...options2,
			cookieEncoding: options2?.cookieEncoding ?? "base64url",
		},
		true,
	);
	const client = createClient(supabaseUrl, supabaseKey, {
		...options2,
		global: {
			...options2?.global,
			headers: {
				...options2?.global?.headers,
				"X-Client-Info": `supabase-ssr/${VERSION} createServerClient`,
			},
		},
		auth: {
			...(options2?.cookieOptions?.name ? { storageKey: options2.cookieOptions.name } : null),
			...options2?.auth,
			flowType: "pkce",
			autoRefreshToken: false,
			detectSessionInUrl: false,
			persistSession: true,
			storage,
		},
	});
	client.auth.onAuthStateChange(async (event) => {
		const hasStorageChanges =
			Object.keys(setItems).length > 0 || Object.keys(removedItems).length > 0;
		if (
			hasStorageChanges &&
			(event === "SIGNED_IN" ||
				event === "TOKEN_REFRESHED" ||
				event === "USER_UPDATED" ||
				event === "PASSWORD_RECOVERY" ||
				event === "SIGNED_OUT" ||
				event === "MFA_CHALLENGE_VERIFIED")
		) {
			await applyServerStorage(
				{ getAll, setAll, setItems, removedItems },
				{
					cookieOptions: options2?.cookieOptions ?? null,
					cookieEncoding: options2?.cookieEncoding ?? "base64url",
				},
			);
		}
	});
	return client;
}
__name(createServerClient, "createServerClient");

// node_modules/@supabase/ssr/dist/module/types.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/helper/adapter/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var env3 = /* @__PURE__ */ __name((c, runtime) => {
	const global2 = globalThis;
	const globalEnv = global2?.process?.env;
	runtime ??= getRuntimeKey();
	const runtimeEnvHandlers = {
		bun: /* @__PURE__ */ __name(() => globalEnv, "bun"),
		node: /* @__PURE__ */ __name(() => globalEnv, "node"),
		"edge-light": /* @__PURE__ */ __name(() => globalEnv, "edge-light"),
		deno: /* @__PURE__ */ __name(() => {
			return Deno.env.toObject();
		}, "deno"),
		workerd: /* @__PURE__ */ __name(() => c.env, "workerd"),
		fastly: /* @__PURE__ */ __name(() => ({}), "fastly"),
		other: /* @__PURE__ */ __name(() => ({}), "other"),
	};
	return runtimeEnvHandlers[runtime]();
}, "env");
var knownUserAgents = {
	deno: "Deno",
	bun: "Bun",
	workerd: "Cloudflare-Workers",
	node: "Node.js",
};
var getRuntimeKey = /* @__PURE__ */ __name(() => {
	const global2 = globalThis;
	const userAgentSupported = typeof navigator !== "undefined" && true;
	if (userAgentSupported) {
		for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) {
			if (checkUserAgentEquals(userAgent)) {
				return runtimeKey;
			}
		}
	}
	if (typeof global2?.EdgeRuntime === "string") {
		return "edge-light";
	}
	if (global2?.fastly !== void 0) {
		return "fastly";
	}
	if (global2?.process?.release?.name === "node") {
		return "node";
	}
	return "other";
}, "getRuntimeKey");
var checkUserAgentEquals = /* @__PURE__ */ __name((platform2) => {
	const userAgent = "Cloudflare-Workers";
	return userAgent.startsWith(platform2);
}, "checkUserAgentEquals");

// node_modules/hono/dist/helper/cookie/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/cookie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse2 = /* @__PURE__ */ __name((cookie, name) => {
	if (name && cookie.indexOf(name) === -1) {
		return {};
	}
	const pairs = cookie.trim().split(";");
	const parsedCookie = {};
	for (let pairStr of pairs) {
		pairStr = pairStr.trim();
		const valueStartPos = pairStr.indexOf("=");
		if (valueStartPos === -1) {
			continue;
		}
		const cookieName = pairStr.substring(0, valueStartPos).trim();
		if ((name && name !== cookieName) || !validCookieNameRegEx.test(cookieName)) {
			continue;
		}
		let cookieValue = pairStr.substring(valueStartPos + 1).trim();
		if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
			cookieValue = cookieValue.slice(1, -1);
		}
		if (validCookieValueRegEx.test(cookieValue)) {
			parsedCookie[cookieName] = decodeURIComponent_(cookieValue);
			if (name) {
				break;
			}
		}
	}
	return parsedCookie;
}, "parse");
var _serialize = /* @__PURE__ */ __name((name, value, opt = {}) => {
	let cookie = `${name}=${value}`;
	if (name.startsWith("__Secure-") && !opt.secure) {
		throw new Error("__Secure- Cookie must have Secure attributes");
	}
	if (name.startsWith("__Host-")) {
		if (!opt.secure) {
			throw new Error("__Host- Cookie must have Secure attributes");
		}
		if (opt.path !== "/") {
			throw new Error('__Host- Cookie must have Path attributes with "/"');
		}
		if (opt.domain) {
			throw new Error("__Host- Cookie must not have Domain attributes");
		}
	}
	if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
		if (opt.maxAge > 3456e4) {
			throw new Error(
				"Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.",
			);
		}
		cookie += `; Max-Age=${opt.maxAge | 0}`;
	}
	if (opt.domain && opt.prefix !== "host") {
		cookie += `; Domain=${opt.domain}`;
	}
	if (opt.path) {
		cookie += `; Path=${opt.path}`;
	}
	if (opt.expires) {
		if (opt.expires.getTime() - Date.now() > 3456e7) {
			throw new Error(
				"Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.",
			);
		}
		cookie += `; Expires=${opt.expires.toUTCString()}`;
	}
	if (opt.httpOnly) {
		cookie += "; HttpOnly";
	}
	if (opt.secure) {
		cookie += "; Secure";
	}
	if (opt.sameSite) {
		cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
	}
	if (opt.priority) {
		cookie += `; Priority=${opt.priority}`;
	}
	if (opt.partitioned) {
		if (!opt.secure) {
			throw new Error("Partitioned Cookie must have Secure attributes");
		}
		cookie += "; Partitioned";
	}
	return cookie;
}, "_serialize");
var serialize2 = /* @__PURE__ */ __name((name, value, opt) => {
	value = encodeURIComponent(value);
	return _serialize(name, value, opt);
}, "serialize");

// node_modules/hono/dist/helper/cookie/index.js
var getCookie = /* @__PURE__ */ __name((c, key, prefix) => {
	const cookie = c.req.raw.headers.get("Cookie");
	if (typeof key === "string") {
		if (!cookie) {
			return void 0;
		}
		let finalKey = key;
		if (prefix === "secure") {
			finalKey = "__Secure-" + key;
		} else if (prefix === "host") {
			finalKey = "__Host-" + key;
		}
		const obj2 = parse2(cookie, finalKey);
		return obj2[finalKey];
	}
	if (!cookie) {
		return {};
	}
	const obj = parse2(cookie);
	return obj;
}, "getCookie");
var setCookie = /* @__PURE__ */ __name((c, name, value, opt) => {
	let cookie;
	if (opt?.prefix === "secure") {
		cookie = serialize2("__Secure-" + name, value, { path: "/", ...opt, secure: true });
	} else if (opt?.prefix === "host") {
		cookie = serialize2("__Host-" + name, value, {
			...opt,
			path: "/",
			secure: true,
			domain: void 0,
		});
	} else {
		cookie = serialize2(name, value, { path: "/", ...opt });
	}
	c.header("Set-Cookie", cookie, { append: true });
}, "setCookie");

// src/web/middleware/supabase.ts
var getSupabase = /* @__PURE__ */ __name((c) => {
	return c.get("supabase");
}, "getSupabase");
var supabaseMiddleware = /* @__PURE__ */ __name(() => {
	return async (c, next) => {
		console.log(`[Middleware] Running for path: ${c.req.path}`);
		const supabaseEnv = env3(c);
		const supabaseUrl = supabaseEnv.SUPABASE_URL;
		const supabaseAnonKey = supabaseEnv.SUPABASE_ANON_KEY;
		if (!supabaseUrl) {
			console.error("[Middleware] SUPABASE_URL is not set!");
			throw new Error("SUPABASE_URL environment variable is not set!");
		}
		if (!supabaseAnonKey) {
			console.error("[Middleware] SUPABASE_ANON_KEY is not set!");
			throw new Error("SUPABASE_ANON_KEY environment variable is not set!");
		}
		const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
			cookies: {
				getAll() {
					console.log("[Middleware] getAll cookies invoked.");
					const cookies = parseCookieHeader(c.req.header("Cookie") ?? "");
					return cookies.map(({ name, value }) => ({
						name,
						value: value ?? "",
						// Convert undefined to empty string
					}));
				},
				setAll(cookiesToSet) {
					console.log(
						`[Middleware] setAll cookies invoked with ${cookiesToSet.length} cookies.`,
					);
					try {
						cookiesToSet.forEach(({ name, value, options: options2 }) => {
							console.log(`[Middleware] Setting cookie: ${name}`);
							setCookie(c, name, value, options2);
						});
					} catch (error3) {
						console.error("[Middleware] Error setting cookies:", error3);
					}
				},
			},
		});
		c.set("supabase", supabase);
		console.log("[Middleware] Supabase client created and set in context.");
		await next();
		console.log(`[Middleware] Finished handling path: ${c.req.path}`);
	};
}, "supabaseMiddleware");

// src/web/templates/login.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_html2();
init_routes();
var renderLoginScreen = /* @__PURE__ */ __name(({ clientInfo }) => {
	return html`
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-heading font-bold mb-6 text-gray-900">
                Login to authorize <b>${clientInfo.clientName}</b>
            </h1>

            <div class="space-y-4 mb-8">
                <form method="POST" action='${AppRoutes.LOGIN}'>
                    <input type="hidden" name="provider" value="github">
                    <button
                            type="submit"
                            name="button"
                            value="github"
                            class="w-full py-3 px-4 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                    >
                        Login with GitHub
                    </button>
                </form>

                <form method="POST" action='${AppRoutes.LOGIN}'>
                    <input type="hidden" name="provider" value="google">
                    <button
                            type="submit"
                            name="button"
                            value="google"
                            class="w-full py-3 px-4 bg-red-600 text-white rounded-md font-medium hover:bg-red-500 transition-colors"
                    >
                        Login with Google
                    </button>
                </form>
            </div>

            <form method="POST" action='${AppRoutes.LOGIN}' class="space-y-4">
                <input type="hidden" name="provider" value="magic-link">
                <div>
                    <label
                            for="email"
                            class="block text-sm font-medium text-gray-700 mb-1"
                    >Email</label
                    >
                    <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                </div>
                <button
                        type="submit"
                        name="button"
                        value="magic-link"
                        class="w-full py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                    Send Magic Link
                </button>
            </form>
        </div>
    `;
}, "renderLoginScreen");

// src/web/templates/consent.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_html2();
init_routes();
var renderConsentScreen = /* @__PURE__ */ __name(({ oauthReq, clientInfo, user }) => {
	const userIdentifier = user.email || `User ${user.id.substring(0, 8)}`;
	return html`
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h2 class="text-2xl font-heading font-semibold mb-4 text-gray-900">
                Hi, ${userIdentifier}!
            </h2>
            <p class="text-lg text-gray-700 mb-6">
                <span class="font-semibold">${clientInfo.clientName}</span> wants to access your
                account.
            </p>

            <form method="POST" action='${AppRoutes.AUTHORIZE}'>
                <input type="hidden" name="client_id" value="${oauthReq.clientId}"/>
                <input type="hidden" name="state" value="${oauthReq.state}"/>
                <input type="hidden" name="code_challenge" value="${oauthReq.codeChallenge}"/>
                <input type="hidden" name="code_challenge_method"
                       value="${oauthReq.codeChallengeMethod}"/>
                <input type="hidden" name="scope" value="${oauthReq.scope}"/>
                <input type="hidden" name="redirect_uri" value="${oauthReq.redirectUri}"/>
                <button
                        type="submit"
                        class="w-full py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                    Authorize ${clientInfo.clientName}
                </button>
            </form>
        </div>
    `;
}, "renderConsentScreen");

// src/web/utils/auth.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function getCurrentUser(c) {
	const supabase = getSupabase(c);
	try {
		console.log("[getCurrentUser] Attempting to get user...");
		const { data, error: error3 } = await supabase.auth.getUser();
		if (error3) {
			if (error3.name === "AuthSessionMissingError") {
				return null;
			} else {
				console.error("[getCurrentUser] Unexpected error:", error3);
				throw error3;
			}
		} else {
			console.log("[getCurrentUserOrNull] User retrieved successfully:", data?.user?.id);
			return data?.user ?? null;
		}
	} catch (err) {
		console.error("[getCurrentUser] Caught exception during user retrieval:", err);
		if (err instanceof AuthError) {
			throw err;
		}
		if (err instanceof Error) {
			throw new Error(
				`[getCurrentUser] Unexpected runtime error: ${err.message} (${err.name})`,
			);
		} else {
			throw new Error(`[getCurrentUser] Unexpected non-Error thrown: ${err}`);
		}
	}
}
__name(getCurrentUser, "getCurrentUser");
function isValidOAuthRequest(oauthReq) {
	return !!(oauthReq && typeof oauthReq.clientId === "string" && oauthReq.clientId.length > 0);
}
__name(isValidOAuthRequest, "isValidOAuthRequest");
function extractOAuthReqFromCookie(c) {
	try {
		const cookieVal = getCookie(c, "oauthParams");
		if (!cookieVal) return null;
		const obj = JSON.parse(cookieVal);
		return isValidOAuthRequest(obj) ? obj : null;
	} catch {
		return null;
	}
}
__name(extractOAuthReqFromCookie, "extractOAuthReqFromCookie");
function persistOAuthReqToCookie(c, oauthReq) {
	if (!isValidOAuthRequest(oauthReq)) return;
	setCookie(c, "oauthParams", JSON.stringify(oauthReq), {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 5,
	});
}
__name(persistOAuthReqToCookie, "persistOAuthReqToCookie");

// src/web/utils/formParser.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var FormValidationError = class extends Error {
	static {
		__name(this, "FormValidationError");
	}
	constructor(issues) {
		super(`Form validation failed: ${issues[0]?.message || "Invalid input"}`);
		this.name = "FormValidationError";
		this.issues = issues;
	}
};
async function parseFormData2(c, schema) {
	console.log(`[parseAndValidateFormData] Attempting to parse and validate form data...`);
	try {
		const rawFormData = await c.req.parseBody();
		console.log(
			`[parseAndValidateFormData] Raw form data parsed:`,
			JSON.stringify(rawFormData, null, 2),
		);
		const validationResult = schema.safeParse(rawFormData);
		if (!validationResult.success) {
			console.error(
				"[parseAndValidateFormData] Zod validation failed:",
				validationResult.error.flatten(),
			);
			throw new FormValidationError(validationResult.error.issues);
		}
		console.log(`[parseAndValidateFormData] Validation successful.`);
		return validationResult.data;
	} catch (error3) {
		if (error3 instanceof FormValidationError) {
			throw error3;
		}
		console.error("[parseAndValidateFormData] Error during form parsing/validation:", error3);
		throw new Error("Failed to parse or validate form data.");
	}
}
__name(parseFormData2, "parseFormData");

// src/web/schemas/consentForm.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/lib/index.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var util;
((util2) => {
	util2.assertEqual = (val) => val;
	function assertIs(_arg) {}
	__name(assertIs, "assertIs");
	util2.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	__name(assertNever, "assertNever");
	util2.assertNever = assertNever;
	util2.arrayToEnum = (items) => {
		const obj = {};
		for (const item of items) {
			obj[item] = item;
		}
		return obj;
	};
	util2.getValidEnumValues = (obj) => {
		const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
		const filtered = {};
		for (const k of validKeys) {
			filtered[k] = obj[k];
		}
		return util2.objectValues(filtered);
	};
	util2.objectValues = (obj) => {
		return util2.objectKeys(obj).map((e) => obj[e]);
	};
	util2.objectKeys =
		typeof Object.keys === "function"
			? (obj) => Object.keys(obj)
			: (object) => {
					const keys = [];
					for (const key in object) {
						if (Object.prototype.hasOwnProperty.call(object, key)) {
							keys.push(key);
						}
					}
					return keys;
				};
	util2.find = (arr, checker) => {
		for (const item of arr) {
			if (checker(item)) return item;
		}
		return void 0;
	};
	util2.isInteger =
		typeof Number.isInteger === "function"
			? (val) => Number.isInteger(val)
			: (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
	function joinValues(array, separator = " | ") {
		return array.map((val) => (typeof val === "string" ? `'${val}'` : val)).join(separator);
	}
	__name(joinValues, "joinValues");
	util2.joinValues = joinValues;
	util2.jsonStringifyReplacer = (_, value) => {
		if (typeof value === "bigint") {
			return value.toString();
		}
		return value;
	};
})(util || (util = {}));
var objectUtil;
((objectUtil2) => {
	objectUtil2.mergeShapes = (first, second) => {
		return {
			...first,
			...second,
			// second overwrites first
		};
	};
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set",
]);
var getParsedType = /* @__PURE__ */ __name((data) => {
	const t = typeof data;
	switch (t) {
		case "undefined":
			return ZodParsedType.undefined;
		case "string":
			return ZodParsedType.string;
		case "number":
			return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
		case "boolean":
			return ZodParsedType.boolean;
		case "function":
			return ZodParsedType.function;
		case "bigint":
			return ZodParsedType.bigint;
		case "symbol":
			return ZodParsedType.symbol;
		case "object":
			if (Array.isArray(data)) {
				return ZodParsedType.array;
			}
			if (data === null) {
				return ZodParsedType.null;
			}
			if (
				data.then &&
				typeof data.then === "function" &&
				data.catch &&
				typeof data.catch === "function"
			) {
				return ZodParsedType.promise;
			}
			if (typeof Map !== "undefined" && data instanceof Map) {
				return ZodParsedType.map;
			}
			if (typeof Set !== "undefined" && data instanceof Set) {
				return ZodParsedType.set;
			}
			if (typeof Date !== "undefined" && data instanceof Date) {
				return ZodParsedType.date;
			}
			return ZodParsedType.object;
		default:
			return ZodParsedType.unknown;
	}
}, "getParsedType");
var ZodIssueCode = util.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite",
]);
var quotelessJson = /* @__PURE__ */ __name((obj) => {
	const json = JSON.stringify(obj, null, 2);
	return json.replace(/"([^"]+)":/g, "$1:");
}, "quotelessJson");
var ZodError = class _ZodError extends Error {
	static {
		__name(this, "ZodError");
	}
	get errors() {
		return this.issues;
	}
	constructor(issues) {
		super();
		this.issues = [];
		this.addIssue = (sub) => {
			this.issues = [...this.issues, sub];
		};
		this.addIssues = (subs = []) => {
			this.issues = [...this.issues, ...subs];
		};
		const actualProto = new.target.prototype;
		if (Object.setPrototypeOf) {
			Object.setPrototypeOf(this, actualProto);
		} else {
			this.__proto__ = actualProto;
		}
		this.name = "ZodError";
		this.issues = issues;
	}
	format(_mapper) {
		const mapper =
			_mapper ||
			((issue) => issue.message);
		const fieldErrors = { _errors: [] };
		const processError = /* @__PURE__ */ __name((error3) => {
			for (const issue of error3.issues) {
				if (issue.code === "invalid_union") {
					issue.unionErrors.map(processError);
				} else if (issue.code === "invalid_return_type") {
					processError(issue.returnTypeError);
				} else if (issue.code === "invalid_arguments") {
					processError(issue.argumentsError);
				} else if (issue.path.length === 0) {
					fieldErrors._errors.push(mapper(issue));
				} else {
					let curr = fieldErrors;
					let i = 0;
					while (i < issue.path.length) {
						const el = issue.path[i];
						const terminal = i === issue.path.length - 1;
						if (!terminal) {
							curr[el] = curr[el] || { _errors: [] };
						} else {
							curr[el] = curr[el] || { _errors: [] };
							curr[el]._errors.push(mapper(issue));
						}
						curr = curr[el];
						i++;
					}
				}
			}
		}, "processError");
		processError(this);
		return fieldErrors;
	}
	static assert(value) {
		if (!(value instanceof _ZodError)) {
			throw new Error(`Not a ZodError: ${value}`);
		}
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of this.issues) {
			if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else {
				formErrors.push(mapper(sub));
			}
		}
		return { formErrors, fieldErrors };
	}
	get formErrors() {
		return this.flatten();
	}
};
ZodError.create = (issues) => {
	const error3 = new ZodError(issues);
	return error3;
};
var errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
	let message;
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === ZodParsedType.undefined) {
				message = "Required";
			} else {
				message = `Expected ${issue.expected}, received ${issue.received}`;
			}
			break;
		case ZodIssueCode.invalid_literal:
			message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
			break;
		case ZodIssueCode.unrecognized_keys:
			message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
			break;
		case ZodIssueCode.invalid_union:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_union_discriminator:
			message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
			break;
		case ZodIssueCode.invalid_enum_value:
			message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
			break;
		case ZodIssueCode.invalid_arguments:
			message = `Invalid function arguments`;
			break;
		case ZodIssueCode.invalid_return_type:
			message = `Invalid function return type`;
			break;
		case ZodIssueCode.invalid_date:
			message = `Invalid date`;
			break;
		case ZodIssueCode.invalid_string:
			if (typeof issue.validation === "object") {
				if ("includes" in issue.validation) {
					message = `Invalid input: must include "${issue.validation.includes}"`;
					if (typeof issue.validation.position === "number") {
						message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
					}
				} else if ("startsWith" in issue.validation) {
					message = `Invalid input: must start with "${issue.validation.startsWith}"`;
				} else if ("endsWith" in issue.validation) {
					message = `Invalid input: must end with "${issue.validation.endsWith}"`;
				} else {
					util.assertNever(issue.validation);
				}
			} else if (issue.validation !== "regex") {
				message = `Invalid ${issue.validation}`;
			} else {
				message = "Invalid";
			}
			break;
		case ZodIssueCode.too_small:
			if (issue.type === "array")
				message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
			else if (issue.type === "string")
				message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
			else if (issue.type === "number")
				message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "date")
				message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.too_big:
			if (issue.type === "array")
				message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
			else if (issue.type === "string")
				message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
			else if (issue.type === "number")
				message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "bigint")
				message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "date")
				message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.custom:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_intersection_types:
			message = `Intersection results could not be merged`;
			break;
		case ZodIssueCode.not_multiple_of:
			message = `Number must be a multiple of ${issue.multipleOf}`;
			break;
		case ZodIssueCode.not_finite:
			message = "Number must be finite";
			break;
		default:
			message = _ctx.defaultError;
			util.assertNever(issue);
	}
	return { message };
}, "errorMap");
var overrideErrorMap = errorMap;
function setErrorMap(map) {
	overrideErrorMap = map;
}
__name(setErrorMap, "setErrorMap");
function getErrorMap() {
	return overrideErrorMap;
}
__name(getErrorMap, "getErrorMap");
var makeIssue = /* @__PURE__ */ __name((params) => {
	const { data, path, errorMaps, issueData } = params;
	const fullPath = [...path, ...(issueData.path || [])];
	const fullIssue = {
		...issueData,
		path: fullPath,
	};
	if (issueData.message !== void 0) {
		return {
			...issueData,
			path: fullPath,
			message: issueData.message,
		};
	}
	let errorMessage = "";
	const maps = errorMaps
		.filter((m) => !!m)
		.slice()
		.reverse();
	for (const map of maps) {
		errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
	}
	return {
		...issueData,
		path: fullPath,
		message: errorMessage,
	};
}, "makeIssue");
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			// contextual error map is first priority
			ctx.schemaErrorMap,
			// then schema-bound map if available
			overrideMap,
			// then global override map
			overrideMap === errorMap ? void 0 : errorMap,
			// then global default map
		].filter((x) => !!x),
	});
	ctx.common.issues.push(issue);
}
__name(addIssueToContext, "addIssueToContext");
var ParseStatus = class _ParseStatus {
	static {
		__name(this, "ParseStatus");
	}
	constructor() {
		this.value = "valid";
	}
	dirty() {
		if (this.value === "valid") this.value = "dirty";
	}
	abort() {
		if (this.value !== "aborted") this.value = "aborted";
	}
	static mergeArray(status, results) {
		const arrayValue = [];
		for (const s of results) {
			if (s.status === "aborted") return INVALID;
			if (s.status === "dirty") status.dirty();
			arrayValue.push(s.value);
		}
		return { status: status.value, value: arrayValue };
	}
	static async mergeObjectAsync(status, pairs) {
		const syncPairs = [];
		for (const pair of pairs) {
			const key = await pair.key;
			const value = await pair.value;
			syncPairs.push({
				key,
				value,
			});
		}
		return _ParseStatus.mergeObjectSync(status, syncPairs);
	}
	static mergeObjectSync(status, pairs) {
		const finalObject = {};
		for (const pair of pairs) {
			const { key, value } = pair;
			if (key.status === "aborted") return INVALID;
			if (value.status === "aborted") return INVALID;
			if (key.status === "dirty") status.dirty();
			if (value.status === "dirty") status.dirty();
			if (
				key.value !== "__proto__" &&
				(typeof value.value !== "undefined" || pair.alwaysSet)
			) {
				finalObject[key.value] = value.value;
			}
		}
		return { status: status.value, value: finalObject };
	}
};
var INVALID = Object.freeze({
	status: "aborted",
});
var DIRTY = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY");
var OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
var isAborted = /* @__PURE__ */ __name((x) => x.status === "aborted", "isAborted");
var isDirty = /* @__PURE__ */ __name((x) => x.status === "dirty", "isDirty");
var isValid = /* @__PURE__ */ __name((x) => x.status === "valid", "isValid");
var isAsync = /* @__PURE__ */ __name(
	(x) => typeof Promise !== "undefined" && x instanceof Promise,
	"isAsync",
);
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
		throw new TypeError(
			"Cannot read private member from an object whose class did not declare it",
		);
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
__name(__classPrivateFieldGet, "__classPrivateFieldGet");
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
		throw new TypeError(
			"Cannot write private member to an object whose class did not declare it",
		);
	return (
		kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
		value
	);
}
__name(__classPrivateFieldSet, "__classPrivateFieldSet");
var errorUtil;
((errorUtil2) => {
	errorUtil2.errToObj = (message) => (typeof message === "string" ? { message } : message || {});
	errorUtil2.toString = (message) =>
		typeof message === "string"
			? message
			: message === null || message === void 0
				? void 0
				: message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
	static {
		__name(this, "ParseInputLazyPath");
	}
	constructor(parent, value, path, key) {
		this._cachedPath = [];
		this.parent = parent;
		this.data = value;
		this._path = path;
		this._key = key;
	}
	get path() {
		if (!this._cachedPath.length) {
			if (this._key instanceof Array) {
				this._cachedPath.push(...this._path, ...this._key);
			} else {
				this._cachedPath.push(...this._path, this._key);
			}
		}
		return this._cachedPath;
	}
};
var handleResult = /* @__PURE__ */ __name((ctx, result) => {
	if (isValid(result)) {
		return { success: true, data: result.value };
	} else {
		if (!ctx.common.issues.length) {
			throw new Error("Validation failed but no issues detected.");
		}
		return {
			success: false,
			get error() {
				if (this._error) return this._error;
				const error3 = new ZodError(ctx.common.issues);
				this._error = error3;
				return this._error;
			},
		};
	}
}, "handleResult");
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
	if (errorMap2 && (invalid_type_error || required_error)) {
		throw new Error(
			`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
		);
	}
	if (errorMap2) return { errorMap: errorMap2, description };
	const customMap = /* @__PURE__ */ __name((iss, ctx) => {
		var _a2, _b;
		const { message } = params;
		if (iss.code === "invalid_enum_value") {
			return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
		}
		if (typeof ctx.data === "undefined") {
			return {
				message:
					(_a2 = message !== null && message !== void 0 ? message : required_error) !==
						null && _a2 !== void 0
						? _a2
						: ctx.defaultError,
			};
		}
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return {
			message:
				(_b = message !== null && message !== void 0 ? message : invalid_type_error) !==
					null && _b !== void 0
					? _b
					: ctx.defaultError,
		};
	}, "customMap");
	return { errorMap: customMap, description };
}
__name(processCreateParams, "processCreateParams");
var ZodType = class {
	static {
		__name(this, "ZodType");
	}
	get description() {
		return this._def.description;
	}
	_getType(input) {
		return getParsedType(input.data);
	}
	_getOrReturnCtx(input, ctx) {
		return (
			ctx || {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent,
			}
		);
	}
	_processInputParams(input) {
		return {
			status: new ParseStatus(),
			ctx: {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent,
			},
		};
	}
	_parseSync(input) {
		const result = this._parse(input);
		if (isAsync(result)) {
			throw new Error("Synchronous parse encountered promise.");
		}
		return result;
	}
	_parseAsync(input) {
		const result = this._parse(input);
		return Promise.resolve(result);
	}
	parse(data, params) {
		const result = this.safeParse(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	safeParse(data, params) {
		var _a2;
		const ctx = {
			common: {
				issues: [],
				async:
					(_a2 = params === null || params === void 0 ? void 0 : params.async) !== null &&
					_a2 !== void 0
						? _a2
						: false,
				contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
			},
			path: (params === null || params === void 0 ? void 0 : params.path) || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data),
		};
		const result = this._parseSync({ data, path: ctx.path, parent: ctx });
		return handleResult(ctx, result);
	}
	"~validate"(data) {
		var _a2, _b;
		const ctx = {
			common: {
				issues: [],
				async: !!this["~standard"].async,
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data),
		};
		if (!this["~standard"].async) {
			try {
				const result = this._parseSync({ data, path: [], parent: ctx });
				return isValid(result)
					? {
							value: result.value,
						}
					: {
							issues: ctx.common.issues,
						};
			} catch (err) {
				if (
					(_b =
						(_a2 = err === null || err === void 0 ? void 0 : err.message) === null ||
						_a2 === void 0
							? void 0
							: _a2.toLowerCase()) === null || _b === void 0
						? void 0
						: _b.includes("encountered")
				) {
					this["~standard"].async = true;
				}
				ctx.common = {
					issues: [],
					async: true,
				};
			}
		}
		return this._parseAsync({ data, path: [], parent: ctx }).then((result) =>
			isValid(result)
				? {
						value: result.value,
					}
				: {
						issues: ctx.common.issues,
					},
		);
	}
	async parseAsync(data, params) {
		const result = await this.safeParseAsync(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	async safeParseAsync(data, params) {
		const ctx = {
			common: {
				issues: [],
				contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
				async: true,
			},
			path: (params === null || params === void 0 ? void 0 : params.path) || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data),
		};
		const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
		const result = await (isAsync(maybeAsyncResult)
			? maybeAsyncResult
			: Promise.resolve(maybeAsyncResult));
		return handleResult(ctx, result);
	}
	refine(check, message) {
		const getIssueProperties = /* @__PURE__ */ __name((val) => {
			if (typeof message === "string" || typeof message === "undefined") {
				return { message };
			} else if (typeof message === "function") {
				return message(val);
			} else {
				return message;
			}
		}, "getIssueProperties");
		return this._refinement((val, ctx) => {
			const result = check(val);
			const setError = /* @__PURE__ */ __name(
				() =>
					ctx.addIssue({
						code: ZodIssueCode.custom,
						...getIssueProperties(val),
					}),
				"setError",
			);
			if (typeof Promise !== "undefined" && result instanceof Promise) {
				return result.then((data) => {
					if (!data) {
						setError();
						return false;
					} else {
						return true;
					}
				});
			}
			if (!result) {
				setError();
				return false;
			} else {
				return true;
			}
		});
	}
	refinement(check, refinementData) {
		return this._refinement((val, ctx) => {
			if (!check(val)) {
				ctx.addIssue(
					typeof refinementData === "function"
						? refinementData(val, ctx)
						: refinementData,
				);
				return false;
			} else {
				return true;
			}
		});
	}
	_refinement(refinement) {
		return new ZodEffects({
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: { type: "refinement", refinement },
		});
	}
	superRefine(refinement) {
		return this._refinement(refinement);
	}
	constructor(def2) {
		this.spa = this.safeParseAsync;
		this._def = def2;
		this.parse = this.parse.bind(this);
		this.safeParse = this.safeParse.bind(this);
		this.parseAsync = this.parseAsync.bind(this);
		this.safeParseAsync = this.safeParseAsync.bind(this);
		this.spa = this.spa.bind(this);
		this.refine = this.refine.bind(this);
		this.refinement = this.refinement.bind(this);
		this.superRefine = this.superRefine.bind(this);
		this.optional = this.optional.bind(this);
		this.nullable = this.nullable.bind(this);
		this.nullish = this.nullish.bind(this);
		this.array = this.array.bind(this);
		this.promise = this.promise.bind(this);
		this.or = this.or.bind(this);
		this.and = this.and.bind(this);
		this.transform = this.transform.bind(this);
		this.brand = this.brand.bind(this);
		this.default = this.default.bind(this);
		this.catch = this.catch.bind(this);
		this.describe = this.describe.bind(this);
		this.pipe = this.pipe.bind(this);
		this.readonly = this.readonly.bind(this);
		this.isNullable = this.isNullable.bind(this);
		this.isOptional = this.isOptional.bind(this);
		this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: /* @__PURE__ */ __name((data) => this["~validate"](data), "validate"),
		};
	}
	optional() {
		return ZodOptional.create(this, this._def);
	}
	nullable() {
		return ZodNullable.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return ZodArray.create(this);
	}
	promise() {
		return ZodPromise.create(this, this._def);
	}
	or(option) {
		return ZodUnion.create([this, option], this._def);
	}
	and(incoming) {
		return ZodIntersection.create(this, incoming, this._def);
	}
	transform(transform2) {
		return new ZodEffects({
			...processCreateParams(this._def),
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: { type: "transform", transform: transform2 },
		});
	}
	default(def2) {
		const defaultValueFunc = typeof def2 === "function" ? def2 : () => def2;
		return new ZodDefault({
			...processCreateParams(this._def),
			innerType: this,
			defaultValue: defaultValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodDefault,
		});
	}
	brand() {
		return new ZodBranded({
			typeName: ZodFirstPartyTypeKind.ZodBranded,
			type: this,
			...processCreateParams(this._def),
		});
	}
	catch(def2) {
		const catchValueFunc = typeof def2 === "function" ? def2 : () => def2;
		return new ZodCatch({
			...processCreateParams(this._def),
			innerType: this,
			catchValue: catchValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodCatch,
		});
	}
	describe(description) {
		const This = this.constructor;
		return new This({
			...this._def,
			description,
		});
	}
	pipe(target) {
		return ZodPipeline.create(this, target);
	}
	readonly() {
		return ZodReadonly.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex =
	/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex =
	/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex =
	/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex =
	/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex =
	/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex =
	/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex =
	/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
	let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
	if (args.precision) {
		regex = `${regex}\\.\\d{${args.precision}}`;
	} else if (args.precision == null) {
		regex = `${regex}(\\.\\d+)?`;
	}
	return regex;
}
__name(timeRegexSource, "timeRegexSource");
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
__name(timeRegex, "timeRegex");
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
__name(datetimeRegex, "datetimeRegex");
function isValidIP(ip, version6) {
	if ((version6 === "v4" || !version6) && ipv4Regex.test(ip)) {
		return true;
	}
	if ((version6 === "v6" || !version6) && ipv6Regex.test(ip)) {
		return true;
	}
	return false;
}
__name(isValidIP, "isValidIP");
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		const base64 = header
			.replace(/-/g, "+")
			.replace(/_/g, "/")
			.padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if (!decoded.typ || !decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch (_a2) {
		return false;
	}
}
__name(isValidJWT, "isValidJWT");
function isValidCidr(ip, version6) {
	if ((version6 === "v4" || !version6) && ipv4CidrRegex.test(ip)) {
		return true;
	}
	if ((version6 === "v6" || !version6) && ipv6CidrRegex.test(ip)) {
		return true;
	}
	return false;
}
__name(isValidCidr, "isValidCidr");
var ZodString = class _ZodString extends ZodType {
	static {
		__name(this, "ZodString");
	}
	_parse(input) {
		if (this._def.coerce) {
			input.data = String(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.string) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.string,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) {
			if (check.kind === "min") {
				if (input.data.length < check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "string",
						inclusive: true,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (input.data.length > check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "string",
						inclusive: true,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "length") {
				const tooBig = input.data.length > check.value;
				const tooSmall = input.data.length < check.value;
				if (tooBig || tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					if (tooBig) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message,
						});
					} else if (tooSmall) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message,
						});
					}
					status.dirty();
				}
			} else if (check.kind === "email") {
				if (!emailRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "email",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "emoji") {
				if (!emojiRegex) {
					emojiRegex = new RegExp(_emojiRegex, "u");
				}
				if (!emojiRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "emoji",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "uuid") {
				if (!uuidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "uuid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "nanoid") {
				if (!nanoidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "nanoid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "cuid") {
				if (!cuidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cuid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "cuid2") {
				if (!cuid2Regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cuid2",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "ulid") {
				if (!ulidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "ulid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "url") {
				try {
					new URL(input.data);
				} catch (_a2) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "url",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "regex") {
				check.regex.lastIndex = 0;
				const testResult = check.regex.test(input.data);
				if (!testResult) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "regex",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "trim") {
				input.data = input.data.trim();
			} else if (check.kind === "includes") {
				if (!input.data.includes(check.value, check.position)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { includes: check.value, position: check.position },
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "toLowerCase") {
				input.data = input.data.toLowerCase();
			} else if (check.kind === "toUpperCase") {
				input.data = input.data.toUpperCase();
			} else if (check.kind === "startsWith") {
				if (!input.data.startsWith(check.value)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { startsWith: check.value },
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "endsWith") {
				if (!input.data.endsWith(check.value)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { endsWith: check.value },
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "datetime") {
				const regex = datetimeRegex(check);
				if (!regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "datetime",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "date") {
				const regex = dateRegex;
				if (!regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "date",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "time") {
				const regex = timeRegex(check);
				if (!regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "time",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "duration") {
				if (!durationRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "duration",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "ip") {
				if (!isValidIP(input.data, check.version)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "ip",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "jwt") {
				if (!isValidJWT(input.data, check.alg)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "jwt",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "cidr") {
				if (!isValidCidr(input.data, check.version)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cidr",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "base64") {
				if (!base64Regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "base64",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "base64url") {
				if (!base64urlRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "base64url",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return { status: status.value, value: input.data };
	}
	_regex(regex, validation, message) {
		return this.refinement((data) => regex.test(data), {
			validation,
			code: ZodIssueCode.invalid_string,
			...errorUtil.errToObj(message),
		});
	}
	_addCheck(check) {
		return new _ZodString({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	email(message) {
		return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
	}
	url(message) {
		return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
	}
	emoji(message) {
		return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
	}
	uuid(message) {
		return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
	}
	nanoid(message) {
		return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
	}
	cuid(message) {
		return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
	}
	cuid2(message) {
		return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
	}
	ulid(message) {
		return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
	}
	base64(message) {
		return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
	}
	base64url(message) {
		return this._addCheck({
			kind: "base64url",
			...errorUtil.errToObj(message),
		});
	}
	jwt(options2) {
		return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options2) });
	}
	ip(options2) {
		return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options2) });
	}
	cidr(options2) {
		return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options2) });
	}
	datetime(options2) {
		var _a2, _b;
		if (typeof options2 === "string") {
			return this._addCheck({
				kind: "datetime",
				precision: null,
				offset: false,
				local: false,
				message: options2,
			});
		}
		return this._addCheck({
			kind: "datetime",
			precision:
				typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) ===
				"undefined"
					? null
					: options2 === null || options2 === void 0
						? void 0
						: options2.precision,
			offset:
				(_a2 = options2 === null || options2 === void 0 ? void 0 : options2.offset) !==
					null && _a2 !== void 0
					? _a2
					: false,
			local:
				(_b = options2 === null || options2 === void 0 ? void 0 : options2.local) !==
					null && _b !== void 0
					? _b
					: false,
			...errorUtil.errToObj(
				options2 === null || options2 === void 0 ? void 0 : options2.message,
			),
		});
	}
	date(message) {
		return this._addCheck({ kind: "date", message });
	}
	time(options2) {
		if (typeof options2 === "string") {
			return this._addCheck({
				kind: "time",
				precision: null,
				message: options2,
			});
		}
		return this._addCheck({
			kind: "time",
			precision:
				typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) ===
				"undefined"
					? null
					: options2 === null || options2 === void 0
						? void 0
						: options2.precision,
			...errorUtil.errToObj(
				options2 === null || options2 === void 0 ? void 0 : options2.message,
			),
		});
	}
	duration(message) {
		return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message),
		});
	}
	includes(value, options2) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options2 === null || options2 === void 0 ? void 0 : options2.position,
			...errorUtil.errToObj(
				options2 === null || options2 === void 0 ? void 0 : options2.message,
			),
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message),
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message),
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message),
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message),
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message),
		});
	}
	/**
	 * Equivalent to `.min(1)`
	 */
	nonempty(message) {
		return this.min(1, errorUtil.errToObj(message));
	}
	trim() {
		return new _ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }],
		});
	}
	toLowerCase() {
		return new _ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }],
		});
	}
	toUpperCase() {
		return new _ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }],
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((ch) => ch.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((ch) => ch.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((ch) => ch.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((ch) => ch.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((ch) => ch.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((ch) => ch.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((ch) => ch.kind === "base64url");
	}
	get minLength() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min;
	}
	get maxLength() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max;
	}
};
ZodString.create = (params) => {
	var _a2;
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce:
			(_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null &&
			_a2 !== void 0
				? _a2
				: false,
		...processCreateParams(params),
	});
};
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
	const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
	return (valInt % stepInt) / Math.pow(10, decCount);
}
__name(floatSafeRemainder, "floatSafeRemainder");
var ZodNumber = class _ZodNumber extends ZodType {
	static {
		__name(this, "ZodNumber");
	}
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
		this.step = this.multipleOf;
	}
	_parse(input) {
		if (this._def.coerce) {
			input.data = Number(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.number) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.number,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) {
			if (check.kind === "int") {
				if (!util.isInteger(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: "integer",
						received: "float",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "min") {
				const tooSmall = check.inclusive
					? input.data < check.value
					: input.data <= check.value;
				if (tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "number",
						inclusive: check.inclusive,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				const tooBig = check.inclusive
					? input.data > check.value
					: input.data >= check.value;
				if (tooBig) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "number",
						inclusive: check.inclusive,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "multipleOf") {
				if (floatSafeRemainder(input.data, check.value) !== 0) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_multiple_of,
						multipleOf: check.value,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "finite") {
				if (!Number.isFinite(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_finite,
						message: check.message,
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return { status: status.value, value: input.data };
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new _ZodNumber({
			...this._def,
			checks: [
				...this._def.checks,
				{
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message),
				},
			],
		});
	}
	_addCheck(check) {
		return new _ZodNumber({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message),
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message),
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message),
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: true,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message),
		})._addCheck({
			kind: "max",
			inclusive: true,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message),
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max;
	}
	get isInt() {
		return !!this._def.checks.find(
			(ch) => ch.kind === "int" || (ch.kind === "multipleOf" && util.isInteger(ch.value)),
		);
	}
	get isFinite() {
		let max = null,
			min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
				return true;
			} else if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			} else if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
};
ZodNumber.create = (params) => {
	return new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
		...processCreateParams(params),
	});
};
var ZodBigInt = class _ZodBigInt extends ZodType {
	static {
		__name(this, "ZodBigInt");
	}
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
	}
	_parse(input) {
		if (this._def.coerce) {
			try {
				input.data = BigInt(input.data);
			} catch (_a2) {
				return this._getInvalidInput(input);
			}
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.bigint) {
			return this._getInvalidInput(input);
		}
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) {
			if (check.kind === "min") {
				const tooSmall = check.inclusive
					? input.data < check.value
					: input.data <= check.value;
				if (tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						type: "bigint",
						minimum: check.value,
						inclusive: check.inclusive,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				const tooBig = check.inclusive
					? input.data > check.value
					: input.data >= check.value;
				if (tooBig) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						type: "bigint",
						maximum: check.value,
						inclusive: check.inclusive,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "multipleOf") {
				if (input.data % check.value !== BigInt(0)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_multiple_of,
						multipleOf: check.value,
						message: check.message,
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return { status: status.value, value: input.data };
	}
	_getInvalidInput(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.bigint,
			received: ctx.parsedType,
		});
		return INVALID;
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new _ZodBigInt({
			...this._def,
			checks: [
				...this._def.checks,
				{
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message),
				},
			],
		});
	}
	_addCheck(check) {
		return new _ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message),
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max;
	}
};
ZodBigInt.create = (params) => {
	var _a2;
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce:
			(_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null &&
			_a2 !== void 0
				? _a2
				: false,
		...processCreateParams(params),
	});
};
var ZodBoolean = class extends ZodType {
	static {
		__name(this, "ZodBoolean");
	}
	_parse(input) {
		if (this._def.coerce) {
			input.data = Boolean(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.boolean) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.boolean,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodBoolean.create = (params) => {
	return new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
		...processCreateParams(params),
	});
};
var ZodDate = class _ZodDate extends ZodType {
	static {
		__name(this, "ZodDate");
	}
	_parse(input) {
		if (this._def.coerce) {
			input.data = new Date(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.date) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.date,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		if (isNaN(input.data.getTime())) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_date,
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) {
			if (check.kind === "min") {
				if (input.data.getTime() < check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						message: check.message,
						inclusive: true,
						exact: false,
						minimum: check.value,
						type: "date",
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (input.data.getTime() > check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						message: check.message,
						inclusive: true,
						exact: false,
						maximum: check.value,
						type: "date",
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return {
			status: status.value,
			value: new Date(input.data.getTime()),
		};
	}
	_addCheck(check) {
		return new _ZodDate({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message),
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message),
		});
	}
	get minDate() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max != null ? new Date(max) : null;
	}
};
ZodDate.create = (params) => {
	return new ZodDate({
		checks: [],
		coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params),
	});
};
var ZodSymbol = class extends ZodType {
	static {
		__name(this, "ZodSymbol");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.symbol) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.symbol,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodSymbol.create = (params) => {
	return new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params),
	});
};
var ZodUndefined = class extends ZodType {
	static {
		__name(this, "ZodUndefined");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.undefined,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodUndefined.create = (params) => {
	return new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params),
	});
};
var ZodNull = class extends ZodType {
	static {
		__name(this, "ZodNull");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.null) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.null,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodNull.create = (params) => {
	return new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params),
	});
};
var ZodAny = class extends ZodType {
	static {
		__name(this, "ZodAny");
	}
	constructor() {
		super(...arguments);
		this._any = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodAny.create = (params) => {
	return new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params),
	});
};
var ZodUnknown = class extends ZodType {
	static {
		__name(this, "ZodUnknown");
	}
	constructor() {
		super(...arguments);
		this._unknown = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodUnknown.create = (params) => {
	return new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params),
	});
};
var ZodNever = class extends ZodType {
	static {
		__name(this, "ZodNever");
	}
	_parse(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.never,
			received: ctx.parsedType,
		});
		return INVALID;
	}
};
ZodNever.create = (params) => {
	return new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params),
	});
};
var ZodVoid = class extends ZodType {
	static {
		__name(this, "ZodVoid");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.void,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodVoid.create = (params) => {
	return new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params),
	});
};
var ZodArray = class _ZodArray extends ZodType {
	static {
		__name(this, "ZodArray");
	}
	_parse(input) {
		const { ctx, status } = this._processInputParams(input);
		const def2 = this._def;
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		if (def2.exactLength !== null) {
			const tooBig = ctx.data.length > def2.exactLength.value;
			const tooSmall = ctx.data.length < def2.exactLength.value;
			if (tooBig || tooSmall) {
				addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def2.exactLength.value : void 0,
					maximum: tooBig ? def2.exactLength.value : void 0,
					type: "array",
					inclusive: true,
					exact: true,
					message: def2.exactLength.message,
				});
				status.dirty();
			}
		}
		if (def2.minLength !== null) {
			if (ctx.data.length < def2.minLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def2.minLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def2.minLength.message,
				});
				status.dirty();
			}
		}
		if (def2.maxLength !== null) {
			if (ctx.data.length > def2.maxLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def2.maxLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def2.maxLength.message,
				});
				status.dirty();
			}
		}
		if (ctx.common.async) {
			return Promise.all(
				[...ctx.data].map((item, i) => {
					return def2.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
				}),
			).then((result2) => {
				return ParseStatus.mergeArray(status, result2);
			});
		}
		const result = [...ctx.data].map((item, i) => {
			return def2.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		});
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new _ZodArray({
			...this._def,
			minLength: { value: minLength, message: errorUtil.toString(message) },
		});
	}
	max(maxLength, message) {
		return new _ZodArray({
			...this._def,
			maxLength: { value: maxLength, message: errorUtil.toString(message) },
		});
	}
	length(len, message) {
		return new _ZodArray({
			...this._def,
			exactLength: { value: len, message: errorUtil.toString(message) },
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodArray.create = (schema, params) => {
	return new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params),
	});
};
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: /* @__PURE__ */ __name(() => newShape, "shape"),
		});
	} else if (schema instanceof ZodArray) {
		return new ZodArray({
			...schema._def,
			type: deepPartialify(schema.element),
		});
	} else if (schema instanceof ZodOptional) {
		return ZodOptional.create(deepPartialify(schema.unwrap()));
	} else if (schema instanceof ZodNullable) {
		return ZodNullable.create(deepPartialify(schema.unwrap()));
	} else if (schema instanceof ZodTuple) {
		return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	} else {
		return schema;
	}
}
__name(deepPartialify, "deepPartialify");
var ZodObject = class _ZodObject extends ZodType {
	static {
		__name(this, "ZodObject");
	}
	constructor() {
		super(...arguments);
		this._cached = null;
		this.nonstrict = this.passthrough;
		this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const shape = this._def.shape();
		const keys = util.objectKeys(shape);
		return (this._cached = { shape, keys });
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.object) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		const { status, ctx } = this._processInputParams(input);
		const { shape, keys: shapeKeys } = this._getCached();
		const extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
			for (const key in ctx.data) {
				if (!shapeKeys.includes(key)) {
					extraKeys.push(key);
				}
			}
		}
		const pairs = [];
		for (const key of shapeKeys) {
			const keyValidator = shape[key];
			const value = ctx.data[key];
			pairs.push({
				key: { status: "valid", value: key },
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data,
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			const unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough") {
				for (const key of extraKeys) {
					pairs.push({
						key: { status: "valid", value: key },
						value: { status: "valid", value: ctx.data[key] },
					});
				}
			} else if (unknownKeys === "strict") {
				if (extraKeys.length > 0) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys,
					});
					status.dirty();
				}
			} else if (unknownKeys === "strip");
			else {
				throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
			}
		} else {
			const catchall = this._def.catchall;
			for (const key of extraKeys) {
				const value = ctx.data[key];
				pairs.push({
					key: { status: "valid", value: key },
					value: catchall._parse(
						new ParseInputLazyPath(ctx, value, ctx.path, key),
						//, ctx.child(key), value, getParsedType(value)
					),
					alwaysSet: key in ctx.data,
				});
			}
		}
		if (ctx.common.async) {
			return Promise.resolve()
				.then(async () => {
					const syncPairs = [];
					for (const pair of pairs) {
						const key = await pair.key;
						const value = await pair.value;
						syncPairs.push({
							key,
							value,
							alwaysSet: pair.alwaysSet,
						});
					}
					return syncPairs;
				})
				.then((syncPairs) => {
					return ParseStatus.mergeObjectSync(status, syncPairs);
				});
		} else {
			return ParseStatus.mergeObjectSync(status, pairs);
		}
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		errorUtil.errToObj;
		return new _ZodObject({
			...this._def,
			unknownKeys: "strict",
			...(message !== void 0
				? {
						errorMap: /* @__PURE__ */ __name((issue, ctx) => {
							var _a2, _b, _c, _d;
							const defaultError =
								(_c =
									(_b = (_a2 = this._def).errorMap) === null || _b === void 0
										? void 0
										: _b.call(_a2, issue, ctx).message) !== null &&
								_c !== void 0
									? _c
									: ctx.defaultError;
							if (issue.code === "unrecognized_keys")
								return {
									message:
										(_d = errorUtil.errToObj(message).message) !== null &&
										_d !== void 0
											? _d
											: defaultError,
								};
							return {
								message: defaultError,
							};
						}, "errorMap"),
					}
				: {}),
		});
	}
	strip() {
		return new _ZodObject({
			...this._def,
			unknownKeys: "strip",
		});
	}
	passthrough() {
		return new _ZodObject({
			...this._def,
			unknownKeys: "passthrough",
		});
	}
	// const AugmentFactory =
	//   <Def extends ZodObjectDef>(def: Def) =>
	//   <Augmentation extends ZodRawShape>(
	//     augmentation: Augmentation
	//   ): ZodObject<
	//     extendShape<ReturnType<Def["shape"]>, Augmentation>,
	//     Def["unknownKeys"],
	//     Def["catchall"]
	//   > => {
	//     return new ZodObject({
	//       ...def,
	//       shape: () => ({
	//         ...def.shape(),
	//         ...augmentation,
	//       }),
	//     }) as any;
	//   };
	extend(augmentation) {
		return new _ZodObject({
			...this._def,
			shape: /* @__PURE__ */ __name(
				() => ({
					...this._def.shape(),
					...augmentation,
				}),
				"shape",
			),
		});
	}
	/**
	 * Prior to zod@1.0.12 there was a bug in the
	 * inferred type of merged objects. Please
	 * upgrade if you are experiencing issues.
	 */
	merge(merging) {
		const merged = new _ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: /* @__PURE__ */ __name(
				() => ({
					...this._def.shape(),
					...merging._def.shape(),
				}),
				"shape",
			),
			typeName: ZodFirstPartyTypeKind.ZodObject,
		});
		return merged;
	}
	// merge<
	//   Incoming extends AnyZodObject,
	//   Augmentation extends Incoming["shape"],
	//   NewOutput extends {
	//     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
	//       ? Augmentation[k]["_output"]
	//       : k extends keyof Output
	//       ? Output[k]
	//       : never;
	//   },
	//   NewInput extends {
	//     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
	//       ? Augmentation[k]["_input"]
	//       : k extends keyof Input
	//       ? Input[k]
	//       : never;
	//   }
	// >(
	//   merging: Incoming
	// ): ZodObject<
	//   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
	//   Incoming["_def"]["unknownKeys"],
	//   Incoming["_def"]["catchall"],
	//   NewOutput,
	//   NewInput
	// > {
	//   const merged: any = new ZodObject({
	//     unknownKeys: merging._def.unknownKeys,
	//     catchall: merging._def.catchall,
	//     shape: () =>
	//       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
	//     typeName: ZodFirstPartyTypeKind.ZodObject,
	//   }) as any;
	//   return merged;
	// }
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	// merge<Incoming extends AnyZodObject>(
	//   merging: Incoming
	// ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
	// ZodObject<
	//   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
	//   Incoming["_def"]["unknownKeys"],
	//   Incoming["_def"]["catchall"]
	// > {
	//   // const mergedShape = objectUtil.mergeShapes(
	//   //   this._def.shape(),
	//   //   merging._def.shape()
	//   // );
	//   const merged: any = new ZodObject({
	//     unknownKeys: merging._def.unknownKeys,
	//     catchall: merging._def.catchall,
	//     shape: () =>
	//       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
	//     typeName: ZodFirstPartyTypeKind.ZodObject,
	//   }) as any;
	//   return merged;
	// }
	catchall(index2) {
		return new _ZodObject({
			...this._def,
			catchall: index2,
		});
	}
	pick(mask) {
		const shape = {};
		util.objectKeys(mask).forEach((key) => {
			if (mask[key] && this.shape[key]) {
				shape[key] = this.shape[key];
			}
		});
		return new _ZodObject({
			...this._def,
			shape: /* @__PURE__ */ __name(() => shape, "shape"),
		});
	}
	omit(mask) {
		const shape = {};
		util.objectKeys(this.shape).forEach((key) => {
			if (!mask[key]) {
				shape[key] = this.shape[key];
			}
		});
		return new _ZodObject({
			...this._def,
			shape: /* @__PURE__ */ __name(() => shape, "shape"),
		});
	}
	/**
	 * @deprecated
	 */
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		const newShape = {};
		util.objectKeys(this.shape).forEach((key) => {
			const fieldSchema = this.shape[key];
			if (mask && !mask[key]) {
				newShape[key] = fieldSchema;
			} else {
				newShape[key] = fieldSchema.optional();
			}
		});
		return new _ZodObject({
			...this._def,
			shape: /* @__PURE__ */ __name(() => newShape, "shape"),
		});
	}
	required(mask) {
		const newShape = {};
		util.objectKeys(this.shape).forEach((key) => {
			if (mask && !mask[key]) {
				newShape[key] = this.shape[key];
			} else {
				const fieldSchema = this.shape[key];
				let newField = fieldSchema;
				while (newField instanceof ZodOptional) {
					newField = newField._def.innerType;
				}
				newShape[key] = newField;
			}
		});
		return new _ZodObject({
			...this._def,
			shape: /* @__PURE__ */ __name(() => newShape, "shape"),
		});
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
};
ZodObject.create = (shape, params) => {
	return new ZodObject({
		shape: /* @__PURE__ */ __name(() => shape, "shape"),
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
};
ZodObject.strictCreate = (shape, params) => {
	return new ZodObject({
		shape: /* @__PURE__ */ __name(() => shape, "shape"),
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
};
ZodObject.lazycreate = (shape, params) => {
	return new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
};
var ZodUnion = class extends ZodType {
	static {
		__name(this, "ZodUnion");
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const options2 = this._def.options;
		function handleResults(results) {
			for (const result of results) {
				if (result.result.status === "valid") {
					return result.result;
				}
			}
			for (const result of results) {
				if (result.result.status === "dirty") {
					ctx.common.issues.push(...result.ctx.common.issues);
					return result.result;
				}
			}
			const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors,
			});
			return INVALID;
		}
		__name(handleResults, "handleResults");
		if (ctx.common.async) {
			return Promise.all(
				options2.map(async (option) => {
					const childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: [],
						},
						parent: null,
					};
					return {
						result: await option._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx,
						}),
						ctx: childCtx,
					};
				}),
			).then(handleResults);
		} else {
			let dirty = void 0;
			const issues = [];
			for (const option of options2) {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: [],
					},
					parent: null,
				};
				const result = option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx,
				});
				if (result.status === "valid") {
					return result;
				} else if (result.status === "dirty" && !dirty) {
					dirty = { result, ctx: childCtx };
				}
				if (childCtx.common.issues.length) {
					issues.push(childCtx.common.issues);
				}
			}
			if (dirty) {
				ctx.common.issues.push(...dirty.ctx.common.issues);
				return dirty.result;
			}
			const unionErrors = issues.map((issues2) => new ZodError(issues2));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors,
			});
			return INVALID;
		}
	}
	get options() {
		return this._def.options;
	}
};
ZodUnion.create = (types, params) => {
	return new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params),
	});
};
var getDiscriminator = /* @__PURE__ */ __name((type) => {
	if (type instanceof ZodLazy) {
		return getDiscriminator(type.schema);
	} else if (type instanceof ZodEffects) {
		return getDiscriminator(type.innerType());
	} else if (type instanceof ZodLiteral) {
		return [type.value];
	} else if (type instanceof ZodEnum) {
		return type.options;
	} else if (type instanceof ZodNativeEnum) {
		return util.objectValues(type.enum);
	} else if (type instanceof ZodDefault) {
		return getDiscriminator(type._def.innerType);
	} else if (type instanceof ZodUndefined) {
		return [void 0];
	} else if (type instanceof ZodNull) {
		return [null];
	} else if (type instanceof ZodOptional) {
		return [void 0, ...getDiscriminator(type.unwrap())];
	} else if (type instanceof ZodNullable) {
		return [null, ...getDiscriminator(type.unwrap())];
	} else if (type instanceof ZodBranded) {
		return getDiscriminator(type.unwrap());
	} else if (type instanceof ZodReadonly) {
		return getDiscriminator(type.unwrap());
	} else if (type instanceof ZodCatch) {
		return getDiscriminator(type._def.innerType);
	} else {
		return [];
	}
}, "getDiscriminator");
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
	static {
		__name(this, "ZodDiscriminatedUnion");
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const discriminator = this.discriminator;
		const discriminatorValue = ctx.data[discriminator];
		const option = this.optionsMap.get(discriminatorValue);
		if (!option) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union_discriminator,
				options: Array.from(this.optionsMap.keys()),
				path: [discriminator],
			});
			return INVALID;
		}
		if (ctx.common.async) {
			return option._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx,
			});
		} else {
			return option._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx,
			});
		}
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	/**
	 * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
	 * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
	 * have a different value for each object in the union.
	 * @param discriminator the name of the discriminator property
	 * @param types an array of object schemas
	 * @param params
	 */
	static create(discriminator, options2, params) {
		const optionsMap = /* @__PURE__ */ new Map();
		for (const type of options2) {
			const discriminatorValues = getDiscriminator(type.shape[discriminator]);
			if (!discriminatorValues.length) {
				throw new Error(
					`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`,
				);
			}
			for (const value of discriminatorValues) {
				if (optionsMap.has(value)) {
					throw new Error(
						`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`,
					);
				}
				optionsMap.set(value, type);
			}
		}
		return new _ZodDiscriminatedUnion({
			typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
			discriminator,
			options: options2,
			optionsMap,
			...processCreateParams(params),
		});
	}
};
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) {
		return { valid: true, data: a };
	} else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = { ...a, ...b };
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) {
				return { valid: false };
			}
			newObj[key] = sharedValue.data;
		}
		return { valid: true, data: newObj };
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) {
			return { valid: false };
		}
		const newArray = [];
		for (let index2 = 0; index2 < a.length; index2++) {
			const itemA = a[index2];
			const itemB = b[index2];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) {
				return { valid: false };
			}
			newArray.push(sharedValue.data);
		}
		return { valid: true, data: newArray };
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
		return { valid: true, data: a };
	} else {
		return { valid: false };
	}
}
__name(mergeValues, "mergeValues");
var ZodIntersection = class extends ZodType {
	static {
		__name(this, "ZodIntersection");
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
			if (isAborted(parsedLeft) || isAborted(parsedRight)) {
				return INVALID;
			}
			const merged = mergeValues(parsedLeft.value, parsedRight.value);
			if (!merged.valid) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_intersection_types,
				});
				return INVALID;
			}
			if (isDirty(parsedLeft) || isDirty(parsedRight)) {
				status.dirty();
			}
			return { status: status.value, value: merged.data };
		}, "handleParsed");
		if (ctx.common.async) {
			return Promise.all([
				this._def.left._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
				this._def.right._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
			]).then(([left, right]) => handleParsed(left, right));
		} else {
			return handleParsed(
				this._def.left._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
				this._def.right._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
			);
		}
	}
};
ZodIntersection.create = (left, right, params) => {
	return new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params),
	});
};
var ZodTuple = class _ZodTuple extends ZodType {
	static {
		__name(this, "ZodTuple");
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		if (ctx.data.length < this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array",
			});
			return INVALID;
		}
		const rest = this._def.rest;
		if (!rest && ctx.data.length > this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array",
			});
			status.dirty();
		}
		const items = [...ctx.data]
			.map((item, itemIndex) => {
				const schema = this._def.items[itemIndex] || this._def.rest;
				if (!schema) return null;
				return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
			})
			.filter((x) => !!x);
		if (ctx.common.async) {
			return Promise.all(items).then((results) => {
				return ParseStatus.mergeArray(status, results);
			});
		} else {
			return ParseStatus.mergeArray(status, items);
		}
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new _ZodTuple({
			...this._def,
			rest,
		});
	}
};
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas)) {
		throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	}
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params),
	});
};
var ZodRecord = class _ZodRecord extends ZodType {
	static {
		__name(this, "ZodRecord");
	}
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const pairs = [];
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		for (const key in ctx.data) {
			pairs.push({
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
				value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
				alwaysSet: key in ctx.data,
			});
		}
		if (ctx.common.async) {
			return ParseStatus.mergeObjectAsync(status, pairs);
		} else {
			return ParseStatus.mergeObjectSync(status, pairs);
		}
	}
	get element() {
		return this._def.valueType;
	}
	static create(first, second, third) {
		if (second instanceof ZodType) {
			return new _ZodRecord({
				keyType: first,
				valueType: second,
				typeName: ZodFirstPartyTypeKind.ZodRecord,
				...processCreateParams(third),
			});
		}
		return new _ZodRecord({
			keyType: ZodString.create(),
			valueType: first,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(second),
		});
	}
};
var ZodMap = class extends ZodType {
	static {
		__name(this, "ZodMap");
	}
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.map) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.map,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		const pairs = [...ctx.data.entries()].map(([key, value], index2) => {
			return {
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index2, "key"])),
				value: valueType._parse(
					new ParseInputLazyPath(ctx, value, ctx.path, [index2, "value"]),
				),
			};
		});
		if (ctx.common.async) {
			const finalMap = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					if (key.status === "aborted" || value.status === "aborted") {
						return INVALID;
					}
					if (key.status === "dirty" || value.status === "dirty") {
						status.dirty();
					}
					finalMap.set(key.value, value.value);
				}
				return { status: status.value, value: finalMap };
			});
		} else {
			const finalMap = /* @__PURE__ */ new Map();
			for (const pair of pairs) {
				const key = pair.key;
				const value = pair.value;
				if (key.status === "aborted" || value.status === "aborted") {
					return INVALID;
				}
				if (key.status === "dirty" || value.status === "dirty") {
					status.dirty();
				}
				finalMap.set(key.value, value.value);
			}
			return { status: status.value, value: finalMap };
		}
	}
};
ZodMap.create = (keyType, valueType, params) => {
	return new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params),
	});
};
var ZodSet = class _ZodSet extends ZodType {
	static {
		__name(this, "ZodSet");
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.set,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const def2 = this._def;
		if (def2.minSize !== null) {
			if (ctx.data.size < def2.minSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def2.minSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def2.minSize.message,
				});
				status.dirty();
			}
		}
		if (def2.maxSize !== null) {
			if (ctx.data.size > def2.maxSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def2.maxSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def2.maxSize.message,
				});
				status.dirty();
			}
		}
		const valueType = this._def.valueType;
		function finalizeSet(elements2) {
			const parsedSet = /* @__PURE__ */ new Set();
			for (const element of elements2) {
				if (element.status === "aborted") return INVALID;
				if (element.status === "dirty") status.dirty();
				parsedSet.add(element.value);
			}
			return { status: status.value, value: parsedSet };
		}
		__name(finalizeSet, "finalizeSet");
		const elements = [...ctx.data.values()].map((item, i) =>
			valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)),
		);
		if (ctx.common.async) {
			return Promise.all(elements).then((elements2) => finalizeSet(elements2));
		} else {
			return finalizeSet(elements);
		}
	}
	min(minSize, message) {
		return new _ZodSet({
			...this._def,
			minSize: { value: minSize, message: errorUtil.toString(message) },
		});
	}
	max(maxSize, message) {
		return new _ZodSet({
			...this._def,
			maxSize: { value: maxSize, message: errorUtil.toString(message) },
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodSet.create = (valueType, params) => {
	return new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params),
	});
};
var ZodFunction = class _ZodFunction extends ZodType {
	static {
		__name(this, "ZodFunction");
	}
	constructor() {
		super(...arguments);
		this.validate = this.implement;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.function) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.function,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		function makeArgsIssue(args, error3) {
			return makeIssue({
				data: args,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap,
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_arguments,
					argumentsError: error3,
				},
			});
		}
		__name(makeArgsIssue, "makeArgsIssue");
		function makeReturnsIssue(returns, error3) {
			return makeIssue({
				data: returns,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap,
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_return_type,
					returnTypeError: error3,
				},
			});
		}
		__name(makeReturnsIssue, "makeReturnsIssue");
		const params = { errorMap: ctx.common.contextualErrorMap };
		const fn = ctx.data;
		if (this._def.returns instanceof ZodPromise) {
			const me = this;
			return OK(async function (...args) {
				const error3 = new ZodError([]);
				const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
					error3.addIssue(makeArgsIssue(args, e));
					throw error3;
				});
				const result = await Reflect.apply(fn, this, parsedArgs);
				const parsedReturns = await me._def.returns._def.type
					.parseAsync(result, params)
					.catch((e) => {
						error3.addIssue(makeReturnsIssue(result, e));
						throw error3;
					});
				return parsedReturns;
			});
		} else {
			const me = this;
			return OK(function (...args) {
				const parsedArgs = me._def.args.safeParse(args, params);
				if (!parsedArgs.success) {
					throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
				}
				const result = Reflect.apply(fn, this, parsedArgs.data);
				const parsedReturns = me._def.returns.safeParse(result, params);
				if (!parsedReturns.success) {
					throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
				}
				return parsedReturns.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...items) {
		return new _ZodFunction({
			...this._def,
			args: ZodTuple.create(items).rest(ZodUnknown.create()),
		});
	}
	returns(returnType) {
		return new _ZodFunction({
			...this._def,
			returns: returnType,
		});
	}
	implement(func) {
		const validatedFunc = this.parse(func);
		return validatedFunc;
	}
	strictImplement(func) {
		const validatedFunc = this.parse(func);
		return validatedFunc;
	}
	static create(args, returns, params) {
		return new _ZodFunction({
			args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
			returns: returns || ZodUnknown.create(),
			typeName: ZodFirstPartyTypeKind.ZodFunction,
			...processCreateParams(params),
		});
	}
};
var ZodLazy = class extends ZodType {
	static {
		__name(this, "ZodLazy");
	}
	get schema() {
		return this._def.getter();
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const lazySchema = this._def.getter();
		return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
	}
};
ZodLazy.create = (getter, params) => {
	return new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params),
	});
};
var ZodLiteral = class extends ZodType {
	static {
		__name(this, "ZodLiteral");
	}
	_parse(input) {
		if (input.data !== this._def.value) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_literal,
				expected: this._def.value,
			});
			return INVALID;
		}
		return { status: "valid", value: input.data };
	}
	get value() {
		return this._def.value;
	}
};
ZodLiteral.create = (value, params) => {
	return new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params),
	});
};
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params),
	});
}
__name(createZodEnum, "createZodEnum");
var ZodEnum = class _ZodEnum extends ZodType {
	static {
		__name(this, "ZodEnum");
	}
	constructor() {
		super(...arguments);
		_ZodEnum_cache.set(this, void 0);
	}
	_parse(input) {
		if (typeof input.data !== "string") {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type,
			});
			return INVALID;
		}
		if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
			__classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
		}
		if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues,
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const enumValues = {};
		for (const val of this._def.values) {
			enumValues[val] = val;
		}
		return enumValues;
	}
	get Values() {
		const enumValues = {};
		for (const val of this._def.values) {
			enumValues[val] = val;
		}
		return enumValues;
	}
	get Enum() {
		const enumValues = {};
		for (const val of this._def.values) {
			enumValues[val] = val;
		}
		return enumValues;
	}
	extract(values, newDef = this._def) {
		return _ZodEnum.create(values, {
			...this._def,
			...newDef,
		});
	}
	exclude(values, newDef = this._def) {
		return _ZodEnum.create(
			this.options.filter((opt) => !values.includes(opt)),
			{
				...this._def,
				...newDef,
			},
		);
	}
};
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
	static {
		__name(this, "ZodNativeEnum");
	}
	constructor() {
		super(...arguments);
		_ZodNativeEnum_cache.set(this, void 0);
	}
	_parse(input) {
		const nativeEnumValues = util.getValidEnumValues(this._def.values);
		const ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type,
			});
			return INVALID;
		}
		if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
			__classPrivateFieldSet(
				this,
				_ZodNativeEnum_cache,
				new Set(util.getValidEnumValues(this._def.values)),
				"f",
			);
		}
		if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues,
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
};
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
	return new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params),
	});
};
var ZodPromise = class extends ZodType {
	static {
		__name(this, "ZodPromise");
	}
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.promise,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const promisified =
			ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
		return OK(
			promisified.then((data) => {
				return this._def.type.parseAsync(data, {
					path: ctx.path,
					errorMap: ctx.common.contextualErrorMap,
				});
			}),
		);
	}
};
ZodPromise.create = (schema, params) => {
	return new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params),
	});
};
var ZodEffects = class extends ZodType {
	static {
		__name(this, "ZodEffects");
	}
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
			? this._def.schema.sourceType()
			: this._def.schema;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const effect = this._def.effect || null;
		const checkCtx = {
			addIssue: /* @__PURE__ */ __name((arg) => {
				addIssueToContext(ctx, arg);
				if (arg.fatal) {
					status.abort();
				} else {
					status.dirty();
				}
			}, "addIssue"),
			get path() {
				return ctx.path;
			},
		};
		checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
		if (effect.type === "preprocess") {
			const processed = effect.transform(ctx.data, checkCtx);
			if (ctx.common.async) {
				return Promise.resolve(processed).then(async (processed2) => {
					if (status.value === "aborted") return INVALID;
					const result = await this._def.schema._parseAsync({
						data: processed2,
						path: ctx.path,
						parent: ctx,
					});
					if (result.status === "aborted") return INVALID;
					if (result.status === "dirty") return DIRTY(result.value);
					if (status.value === "dirty") return DIRTY(result.value);
					return result;
				});
			} else {
				if (status.value === "aborted") return INVALID;
				const result = this._def.schema._parseSync({
					data: processed,
					path: ctx.path,
					parent: ctx,
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			}
		}
		if (effect.type === "refinement") {
			const executeRefinement = /* @__PURE__ */ __name((acc) => {
				const result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) {
					return Promise.resolve(result);
				}
				if (result instanceof Promise) {
					throw new Error(
						"Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
					);
				}
				return acc;
			}, "executeRefinement");
			if (ctx.common.async === false) {
				const inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				executeRefinement(inner.value);
				return { status: status.value, value: inner.value };
			} else {
				return this._def.schema
					._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
					.then((inner) => {
						if (inner.status === "aborted") return INVALID;
						if (inner.status === "dirty") status.dirty();
						return executeRefinement(inner.value).then(() => {
							return { status: status.value, value: inner.value };
						});
					});
			}
		}
		if (effect.type === "transform") {
			if (ctx.common.async === false) {
				const base = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (!isValid(base)) return base;
				const result = effect.transform(base.value, checkCtx);
				if (result instanceof Promise) {
					throw new Error(
						`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`,
					);
				}
				return { status: status.value, value: result };
			} else {
				return this._def.schema
					._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
					.then((base) => {
						if (!isValid(base)) return base;
						return Promise.resolve(effect.transform(base.value, checkCtx)).then(
							(result) => ({ status: status.value, value: result }),
						);
					});
			}
		}
		util.assertNever(effect);
	}
};
ZodEffects.create = (schema, effect, params) => {
	return new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params),
	});
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	return new ZodEffects({
		schema,
		effect: { type: "preprocess", transform: preprocess },
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params),
	});
};
var ZodOptional = class extends ZodType {
	static {
		__name(this, "ZodOptional");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType === ZodParsedType.undefined) {
			return OK(void 0);
		}
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodOptional.create = (type, params) => {
	return new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params),
	});
};
var ZodNullable = class extends ZodType {
	static {
		__name(this, "ZodNullable");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType === ZodParsedType.null) {
			return OK(null);
		}
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodNullable.create = (type, params) => {
	return new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params),
	});
};
var ZodDefault = class extends ZodType {
	static {
		__name(this, "ZodDefault");
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		let data = ctx.data;
		if (ctx.parsedType === ZodParsedType.undefined) {
			data = this._def.defaultValue();
		}
		return this._def.innerType._parse({
			data,
			path: ctx.path,
			parent: ctx,
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ZodDefault.create = (type, params) => {
	return new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default === "function" ? params.default : () => params.default,
		...processCreateParams(params),
	});
};
var ZodCatch = class extends ZodType {
	static {
		__name(this, "ZodCatch");
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const newCtx = {
			...ctx,
			common: {
				...ctx.common,
				issues: [],
			},
		};
		const result = this._def.innerType._parse({
			data: newCtx.data,
			path: newCtx.path,
			parent: {
				...newCtx,
			},
		});
		if (isAsync(result)) {
			return result.then((result2) => {
				return {
					status: "valid",
					value:
						result2.status === "valid"
							? result2.value
							: this._def.catchValue({
									get error() {
										return new ZodError(newCtx.common.issues);
									},
									input: newCtx.data,
								}),
				};
			});
		} else {
			return {
				status: "valid",
				value:
					result.status === "valid"
						? result.value
						: this._def.catchValue({
								get error() {
									return new ZodError(newCtx.common.issues);
								},
								input: newCtx.data,
							}),
			};
		}
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ZodCatch.create = (type, params) => {
	return new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
		...processCreateParams(params),
	});
};
var ZodNaN = class extends ZodType {
	static {
		__name(this, "ZodNaN");
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.nan) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.nan,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return { status: "valid", value: input.data };
	}
};
ZodNaN.create = (params) => {
	return new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params),
	});
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
	static {
		__name(this, "ZodBranded");
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx,
		});
	}
	unwrap() {
		return this._def.type;
	}
};
var ZodPipeline = class _ZodPipeline extends ZodType {
	static {
		__name(this, "ZodPipeline");
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.common.async) {
			const handleAsync = /* @__PURE__ */ __name(async () => {
				const inResult = await this._def.in._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return DIRTY(inResult.value);
				} else {
					return this._def.out._parseAsync({
						data: inResult.value,
						path: ctx.path,
						parent: ctx,
					});
				}
			}, "handleAsync");
			return handleAsync();
		} else {
			const inResult = this._def.in._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx,
			});
			if (inResult.status === "aborted") return INVALID;
			if (inResult.status === "dirty") {
				status.dirty();
				return {
					status: "dirty",
					value: inResult.value,
				};
			} else {
				return this._def.out._parseSync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx,
				});
			}
		}
	}
	static create(a, b) {
		return new _ZodPipeline({
			in: a,
			out: b,
			typeName: ZodFirstPartyTypeKind.ZodPipeline,
		});
	}
};
var ZodReadonly = class extends ZodType {
	static {
		__name(this, "ZodReadonly");
	}
	_parse(input) {
		const result = this._def.innerType._parse(input);
		const freeze = /* @__PURE__ */ __name((data) => {
			if (isValid(data)) {
				data.value = Object.freeze(data.value);
			}
			return data;
		}, "freeze");
		return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodReadonly.create = (type, params) => {
	return new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params),
	});
};
function cleanParams(params, data) {
	const p =
		typeof params === "function"
			? params(data)
			: typeof params === "string"
				? { message: params }
				: params;
	const p2 = typeof p === "string" ? { message: p } : p;
	return p2;
}
__name(cleanParams, "cleanParams");
function custom(check, _params = {}, fatal) {
	if (check)
		return ZodAny.create().superRefine((data, ctx) => {
			var _a2, _b;
			const r = check(data);
			if (r instanceof Promise) {
				return r.then((r2) => {
					var _a3, _b2;
					if (!r2) {
						const params = cleanParams(_params, data);
						const _fatal =
							(_b2 =
								(_a3 = params.fatal) !== null && _a3 !== void 0 ? _a3 : fatal) !==
								null && _b2 !== void 0
								? _b2
								: true;
						ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
					}
				});
			}
			if (!r) {
				const params = cleanParams(_params, data);
				const _fatal =
					(_b = (_a2 = params.fatal) !== null && _a2 !== void 0 ? _a2 : fatal) !== null &&
					_b !== void 0
						? _b
						: true;
				ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
			}
			return;
		});
	return ZodAny.create();
}
__name(custom, "custom");
var late = {
	object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
((ZodFirstPartyTypeKind2) => {
	ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
	ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
	ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
	ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
	ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
	ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
	ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
	ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
	ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
	ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
	ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
	ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
	ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
	ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
	ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
	ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
	ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
	ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
	ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
	ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
	ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
	ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
	ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
	ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
	ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
	ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
	ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
	ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
	ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
	ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
	ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
	ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
	ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
	ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
	ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = /* @__PURE__ */ __name(
	(
		cls,
		params = {
			message: `Input not instance of ${cls.name}`,
		},
	) => custom((data) => data instanceof cls, params),
	"instanceOfType",
);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
var onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
var oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
var coerce = {
	string: /* @__PURE__ */ __name((arg) => ZodString.create({ ...arg, coerce: true }), "string"),
	number: /* @__PURE__ */ __name((arg) => ZodNumber.create({ ...arg, coerce: true }), "number"),
	boolean: /* @__PURE__ */ __name(
		(arg) =>
			ZodBoolean.create({
				...arg,
				coerce: true,
			}),
		"boolean",
	),
	bigint: /* @__PURE__ */ __name((arg) => ZodBigInt.create({ ...arg, coerce: true }), "bigint"),
	date: /* @__PURE__ */ __name((arg) => ZodDate.create({ ...arg, coerce: true }), "date"),
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	defaultErrorMap: errorMap,
	setErrorMap,
	getErrorMap,
	makeIssue,
	EMPTY_PATH,
	addIssueToContext,
	ParseStatus,
	INVALID,
	DIRTY,
	OK,
	isAborted,
	isDirty,
	isValid,
	isAsync,
	get util() {
		return util;
	},
	get objectUtil() {
		return objectUtil;
	},
	ZodParsedType,
	getParsedType,
	ZodType,
	datetimeRegex,
	ZodString,
	ZodNumber,
	ZodBigInt,
	ZodBoolean,
	ZodDate,
	ZodSymbol,
	ZodUndefined,
	ZodNull,
	ZodAny,
	ZodUnknown,
	ZodNever,
	ZodVoid,
	ZodArray,
	ZodObject,
	ZodUnion,
	ZodDiscriminatedUnion,
	ZodIntersection,
	ZodTuple,
	ZodRecord,
	ZodMap,
	ZodSet,
	ZodFunction,
	ZodLazy,
	ZodLiteral,
	ZodEnum,
	ZodNativeEnum,
	ZodPromise,
	ZodEffects,
	ZodTransformer: ZodEffects,
	ZodOptional,
	ZodNullable,
	ZodDefault,
	ZodCatch,
	ZodNaN,
	BRAND,
	ZodBranded,
	ZodPipeline,
	ZodReadonly,
	custom,
	Schema: ZodType,
	ZodSchema: ZodType,
	late,
	get ZodFirstPartyTypeKind() {
		return ZodFirstPartyTypeKind;
	},
	coerce,
	any: anyType,
	array: arrayType,
	bigint: bigIntType,
	boolean: booleanType,
	date: dateType,
	discriminatedUnion: discriminatedUnionType,
	effect: effectsType,
	enum: enumType,
	function: functionType,
	instanceof: instanceOfType,
	intersection: intersectionType,
	lazy: lazyType,
	literal: literalType,
	map: mapType,
	nan: nanType,
	nativeEnum: nativeEnumType,
	never: neverType,
	null: nullType,
	nullable: nullableType,
	number: numberType,
	object: objectType,
	oboolean,
	onumber,
	optional: optionalType,
	ostring,
	pipeline: pipelineType,
	preprocess: preprocessType,
	promise: promiseType,
	record: recordType,
	set: setType,
	strictObject: strictObjectType,
	string: stringType,
	symbol: symbolType,
	transformer: effectsType,
	tuple: tupleType,
	undefined: undefinedType,
	union: unionType,
	unknown: unknownType,
	void: voidType,
	NEVER,
	ZodIssueCode,
	quotelessJson,
	ZodError,
});

// src/web/schemas/consentForm.ts
var ConsentFormSchema = z.object({
	client_id: z.string().min(1, "Client ID must be at least 1 character long"),
	redirect_uri: z.string().url({ message: "Invalid Redirect URI format" }),
	state: z.string().optional(),
	scope: z.string().optional(),
	code_challenge: z.string().min(1, { message: "Code challenge is required" }),
	code_challenge_method: z.enum(["S256", "plain"]).default("S256"),
	// Assuming S256 is default
	action: z.enum(["allow", "deny"]).optional(),
	// for actions on consent screen
});

// src/web/handlers/authorize.ts
var getAuthorizeHandler = /* @__PURE__ */ __name(async (c) => {
	console.log("[GET /authorize] Handling request.");
	const user = await getCurrentUser(c);
	console.log("[GET /authorize] Parsing OAuth request...");
	let oauthReq = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
	if (isValidOAuthRequest(oauthReq)) {
		persistOAuthReqToCookie(c, oauthReq);
	} else {
		oauthReq = extractOAuthReqFromCookie(c);
		if (!isValidOAuthRequest(oauthReq)) {
			return c.text("Missing or invalid OAuth request", 400);
		}
	}
	const clientInfo = await c.env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);
	if (!user) {
		console.log("[GET /authorize] No session found. Rendering login screen.");
		setCookie(c, "oauthParams", JSON.stringify(oauthReq), {
			path: "/",
			// valid for the entire domain
			httpOnly: true,
			// prevent client-side JS from accessing the cookie
			// secure: true, // only send over HTTPS
			// sameSite: 'strict', // prevent CSRF attacks
			maxAge: 60 * 5,
			// 5 min
		});
		const content2 = await renderLoginScreen({ clientInfo });
		return c.html(layout(content2, "Log in to authorize"));
	}
	if (!oauthReq) {
		const cookieVal = getCookie(c, "oauthParams");
		console.log(
			`[GET /authorize] No OAuth request found in cookie. Trying to parse from cookie value: ${cookieVal}`,
		);
		if (cookieVal) oauthReq = JSON.parse(cookieVal);
	}
	console.log(`[GET /authorize] Session found for user ${user.id}. Rendering consent screen.`);
	const content = await renderConsentScreen({ oauthReq, clientInfo, user });
	return c.html(layout(content, "Authorize access"));
}, "getAuthorizeHandler");
var postAuthorizeHandler = /* @__PURE__ */ __name(async (c) => {
	console.log("[POST /authorize] Handling request.");
	const supabase = getSupabase(c);
	console.log("[POST /authorize] Getting session...");
	const user = await getCurrentUser(c);
	if (!user) {
		console.log("[POST /authorize] No session found. Returning 401 Unauthorized.");
		return c.text("Unauthorized", 401);
	}
	let validatedFormData;
	try {
		validatedFormData = await parseFormData2(c, ConsentFormSchema);
		console.log(
			"[POST /authorize] Validated form data:",
			JSON.stringify(validatedFormData, null, 2),
		);
		if (validatedFormData.action === "deny") {
			console.log("[POST /authorize] User denied the request via form.");
			return c.text("Authorization Denied", 403);
		}
	} catch (error3) {
		if (error3 instanceof FormValidationError) {
			console.error("[POST /authorize] Form validation failed:", error3.issues);
			return c.text(`Bad Request: ${error3.message}`, 400);
		} else {
			console.error("[POST /authorize] Error processing form data:", error3);
			return c.text("Internal Server Error: Failed to process request form.", 500);
		}
	}
	const oauthReq = {
		clientId: validatedFormData.client_id,
		redirectUri: validatedFormData.redirect_uri,
		// Ensure this is always present if required
		state: validatedFormData.state || "",
		codeChallenge: validatedFormData.code_challenge,
		codeChallengeMethod: validatedFormData.code_challenge_method,
		scope: validatedFormData.scope ? validatedFormData.scope.split(" ") : [],
		responseType: "code",
		// Assuming 'code' flow
	};
	console.log(
		`[POST /authorize] Constructed oauthReq for completion:`,
		JSON.stringify(oauthReq, null, 2),
	);
	console.log(`[POST /authorize] Completing authorization for user ${user.id}.`);
	const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
		request: oauthReq,
		userId: user.id,
		metadata: { email: user.email },
		scope: oauthReq.scope,
		// Pass the parsed scope array
		props: { userId: user.id, email: user.email },
	});
	console.log(`[POST /authorize] Redirecting to: ${redirectTo}`);
	return c.redirect(redirectTo, 302);
}, "postAuthorizeHandler");

// src/web/handlers/callback.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_routes();
var authCallbackHandler = /* @__PURE__ */ __name(async (c) => {
	const supabase = getSupabase(c);
	const code = c.req.query("code");
	const state = c.req.query("state");
	const originalUrl = c.req.url;
	console.log(`[GET /auth/callback] All cookies:`, c.req.header("Cookie"));
	console.log(`[GET /auth/callback] Handling request for URL: ${originalUrl}`);
	console.log(
		`[GET /auth/callback] Code: ${code ? "present" : "missing"}, State: ${state ? "present" : "missing"}`,
	);
	console.log(`[GET /auth/callback] Query params: ${new URL(originalUrl).searchParams}`);
	if (!code) {
		console.error("[GET /auth/callback] No code found in the callback request from Supabase");
		return c.text("Authentication Error: Authorization code was missing.", 400);
	}
	try {
		console.log("[GET /auth/callback] Exchanging code for session...");
		const result = await supabase.auth.exchangeCodeForSession(code);
		if (result.error) {
			console.error(
				`[GET /auth/callback] Error: ${result.error.message}, Status: ${result.error.status}`,
			);
			return c.text(`Authentication Error: ${result.error.message}`, 400);
		}
		console.log("[GET /auth/callback] Code exchange successful.");
		return c.redirect(`${AppRoutes.AUTHORIZE}`);
	} catch (exchangeError) {
		console.error(`[GET /auth/callback] Unexpected error: ${exchangeError}`);
		return c.text("Internal Server Error: Failed to process authentication callback.", 500);
	}
}, "authCallbackHandler");

// src/web/handlers/confirm.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_routes();
var authConfirmHandler = /* @__PURE__ */ __name(async (c) => {
	console.log("[POST /auth/confirm] Handling request.");
	const supabase = getSupabase(c);
	const formData = await c.req.parseBody();
	console.log("[POST /auth/confirm] Form data received:", formData);
	const email = formData.email?.toString();
	const otp = formData.otp?.toString();
	if (!email || !otp) {
		console.error("[POST /auth/confirm] Missing email or OTP code");
		return c.text("Missing email or OTP code", 400);
	}
	console.log(`[POST /auth/confirm] Verifying OTP for email: ${email}`);
	try {
		const { data, error: error3 } = await supabase.auth.verifyOtp({
			email,
			token: otp,
			type: "email",
		});
		if (error3) {
			console.error("[POST /auth/confirm] OTP verification error:", error3.message);
			return c.text(`Error verifying OTP: ${error3.message}`, 400);
		}
		if (!data.session) {
			console.error("[POST /auth/confirm] No session returned after OTP verification");
			return c.text("Authentication failed", 401);
		}
		console.log(`[POST /auth/confirm] OTP verified successfully for user ${data.user?.id}`);
		return c.redirect(AppRoutes.AUTHORIZE, 302);
	} catch (error3) {
		console.error("[POST /auth/confirm] Unexpected error:", error3);
		return c.text("Internal server error", 500);
	}
}, "authConfirmHandler");

// src/web/handlers/login.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_routes();
var loginHandler = /* @__PURE__ */ __name(async (c) => {
	const supabase = getSupabase(c);
	const formData = await c.req.parseBody();
	console.log("[POST /login] Form data received:", formData);
	const url = new URL(c.req.url);
	const siteUrl = `${url.protocol}//${url.host}`;
	const redirectUrl = `${siteUrl}${AppRoutes.AUTH_CALLBACK}`;
	console.log(`[POST /login] Redirect URL: ${redirectUrl}`);
	if (
		formData.provider === "github" /* GITHUB */ ||
		formData.button === "github" ||
		(!formData.email && formData.button !== "google")
	) {
		console.log("[POST /login] Processing GitHub login");
		const { data, error: error3 } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: redirectUrl,
			},
		});
		if (error3) {
			console.error("[POST /login] GitHub OAuth error:", error3.message);
			return c.text(`Error logging in with GitHub: ${error3.message}`, 500);
		}
		if (data?.url) {
			console.log("[POST /login] Redirecting to GitHub OAuth URL");
			return c.redirect(data.url);
		} else {
			console.error("[POST /login] GitHub OAuth URL missing");
			return c.text("Error initiating GitHub login", 500);
		}
	}
	if (formData.provider === "google" /* GOOGLE */ || formData.button === "google") {
		console.log("[POST /login] Processing Google login");
		const { data, error: error3 } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: redirectUrl,
			},
		});
		if (error3) {
			console.error("[POST /login] Google OAuth error:", error3.message);
			return c.text(`Error logging in with Google: ${error3.message}`, 500);
		}
		if (data?.url) {
			console.log("[POST /login] Redirecting to Google OAuth URL");
			return c.redirect(data.url);
		} else {
			console.error("[POST /login] Google OAuth URL missing");
			return c.text("Error initiating Google login", 500);
		}
	}
	if (formData.email) {
		const email = formData.email.toString();
		console.log(`[POST /login] Processing Magic Link login for email: ${email}`);
		const { error: error3 } = await supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: redirectUrl,
			},
		});
		if (error3) {
			console.error("[POST /login] Magic Link error:", error3.message);
			return c.text(`Error sending magic link: ${error3.message}`, 500);
		}
		const { renderConfirmScreen: renderConfirmScreen2 } = await Promise.resolve().then(
			() => (init_confirm(), confirm_exports),
		);
		const content = await renderConfirmScreen2({ email });
		return c.html(layout(content, "Verify your email"));
	}
	console.error("[POST /login] No valid login method identified");
	return c.text("Invalid login request. Please provide a valid login method.", 400);
}, "loginHandler");

// src/web/handlers/all.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var allRoutesHandler = /* @__PURE__ */ __name(async (c, next) => {
	console.log(`[Router] Request received for ${c.req.method} ${c.req.path}`);
	if (c.req.path.startsWith("/sse")) {
		console.log(`[Router] Skipping Supabase middleware for ${c.req.path}`);
		return await next();
	}
	await supabaseMiddleware()(c, next);
}, "allRoutesHandler");

// src/web/app.ts
init_routes();

// src/web/handlers/logout.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_routes();
var logoutHandler = /* @__PURE__ */ __name((c) => {
	const supabase = getSupabase(c);
	console.log("[GET /logout] Logging out user...");
	supabase.auth.signOut();
	console.log("[GET /logout] User logged out.");
	return c.redirect(AppRoutes.AUTHORIZE);
}, "logoutHandler");

// src/web/app.ts
var app = new Hono2();
app.use(AppRoutes.ALL, allRoutesHandler);
app.get(AppRoutes.ROOT, rootHandler);
app.get(AppRoutes.AUTHORIZE, getAuthorizeHandler);
app.post(AppRoutes.AUTHORIZE, postAuthorizeHandler);
app.post(AppRoutes.AUTH_CONFIRM, authConfirmHandler);
app.get(AppRoutes.AUTH_CALLBACK, authCallbackHandler);
app.post(AppRoutes.LOGIN, loginHandler);
app.get(AppRoutes.LOGOUT, logoutHandler);
var app_default = app;

// node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import { WorkerEntrypoint } from "cloudflare:workers";
var __typeError = /* @__PURE__ */ __name((msg) => {
	throw TypeError(msg);
}, "__typeError");
var __accessCheck = /* @__PURE__ */ __name(
	(obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg),
	"__accessCheck",
);
var __privateGet = /* @__PURE__ */ __name(
	(obj, member, getter) => (
		__accessCheck(obj, member, "read from private field"),
		getter ? getter.call(obj) : member.get(obj)
	),
	"__privateGet",
);
var __privateAdd = /* @__PURE__ */ __name(
	(obj, member, value) =>
		member.has(obj)
			? __typeError("Cannot add the same private member more than once")
			: member instanceof WeakSet
				? member.add(obj)
				: member.set(obj, value),
	"__privateAdd",
);
var __privateSet = /* @__PURE__ */ __name(
	(obj, member, value, setter) => (
		__accessCheck(obj, member, "write to private field"),
		setter ? setter.call(obj, value) : member.set(obj, value),
		value
	),
	"__privateSet",
);
var _impl;
var OAuthProvider = class {
	static {
		__name(this, "OAuthProvider");
	}
	/**
	 * Creates a new OAuth provider instance
	 * @param options - Configuration options for the provider
	 */
	constructor(options2) {
		__privateAdd(this, _impl);
		__privateSet(this, _impl, new OAuthProviderImpl(options2));
	}
	/**
	 * Main fetch handler for the Worker
	 * Routes requests to the appropriate handler based on the URL
	 * @param request - The HTTP request
	 * @param env - Cloudflare Worker environment variables
	 * @param ctx - Cloudflare Worker execution context
	 * @returns A Promise resolving to an HTTP Response
	 */
	fetch(request, env4, ctx) {
		return __privateGet(this, _impl).fetch(request, env4, ctx);
	}
};
_impl = /* @__PURE__ */ new WeakMap();
var OAuthProviderImpl = class {
	static {
		__name(this, "OAuthProviderImpl");
	}
	/**
	 * Creates a new OAuth provider instance
	 * @param options - Configuration options for the provider
	 */
	constructor(options2) {
		this.typedApiHandler = this.validateHandler(options2.apiHandler, "apiHandler");
		this.typedDefaultHandler = this.validateHandler(options2.defaultHandler, "defaultHandler");
		if (Array.isArray(options2.apiRoute)) {
			options2.apiRoute.forEach((route, index2) => {
				this.validateEndpoint(route, `apiRoute[${index2}]`);
			});
		} else {
			this.validateEndpoint(options2.apiRoute, "apiRoute");
		}
		this.validateEndpoint(options2.authorizeEndpoint, "authorizeEndpoint");
		this.validateEndpoint(options2.tokenEndpoint, "tokenEndpoint");
		if (options2.clientRegistrationEndpoint) {
			this.validateEndpoint(
				options2.clientRegistrationEndpoint,
				"clientRegistrationEndpoint",
			);
		}
		this.options = {
			...options2,
			accessTokenTTL: options2.accessTokenTTL || DEFAULT_ACCESS_TOKEN_TTL,
		};
	}
	/**
	 * Validates that an endpoint is either an absolute path or a full URL
	 * @param endpoint - The endpoint to validate
	 * @param name - The name of the endpoint property for error messages
	 * @throws TypeError if the endpoint is invalid
	 */
	validateEndpoint(endpoint, name) {
		if (this.isPath(endpoint)) {
			if (!endpoint.startsWith("/")) {
				throw new TypeError(`${name} path must be an absolute path starting with /`);
			}
		} else {
			try {
				new URL(endpoint);
			} catch (e) {
				throw new TypeError(
					`${name} must be either an absolute path starting with / or a valid URL`,
				);
			}
		}
	}
	/**
	 * Validates that a handler is either an ExportedHandler or a class extending WorkerEntrypoint
	 * @param handler - The handler to validate
	 * @param name - The name of the handler property for error messages
	 * @returns The type of the handler (EXPORTED_HANDLER or WORKER_ENTRYPOINT)
	 * @throws TypeError if the handler is invalid
	 */
	validateHandler(handler, name) {
		if (
			typeof handler === "object" &&
			handler !== null &&
			typeof handler.fetch === "function"
		) {
			return { type: 0, handler };
		}
		if (typeof handler === "function" && handler.prototype instanceof WorkerEntrypoint) {
			return { type: 1, handler };
		}
		throw new TypeError(
			`${name} must be either an ExportedHandler object with a fetch method or a class extending WorkerEntrypoint`,
		);
	}
	/**
	 * Main fetch handler for the Worker
	 * Routes requests to the appropriate handler based on the URL
	 * @param request - The HTTP request
	 * @param env - Cloudflare Worker environment variables
	 * @param ctx - Cloudflare Worker execution context
	 * @returns A Promise resolving to an HTTP Response
	 */
	async fetch(request, env4, ctx) {
		const url = new URL(request.url);
		if (request.method === "OPTIONS") {
			if (
				this.isApiRequest(url) ||
				url.pathname === "/.well-known/oauth-authorization-server" ||
				this.isTokenEndpoint(url) ||
				(this.options.clientRegistrationEndpoint && this.isClientRegistrationEndpoint(url))
			) {
				return this.addCorsHeaders(
					new Response(null, {
						status: 204,
						headers: { "Content-Length": "0" },
					}),
					request,
				);
			}
		}
		if (url.pathname === "/.well-known/oauth-authorization-server") {
			const response = await this.handleMetadataDiscovery(url);
			return this.addCorsHeaders(response, request);
		}
		if (this.isTokenEndpoint(url)) {
			const response = await this.handleTokenRequest(request, env4);
			return this.addCorsHeaders(response, request);
		}
		if (this.options.clientRegistrationEndpoint && this.isClientRegistrationEndpoint(url)) {
			const response = await this.handleClientRegistration(request, env4);
			return this.addCorsHeaders(response, request);
		}
		if (this.isApiRequest(url)) {
			const response = await this.handleApiRequest(request, env4, ctx);
			return this.addCorsHeaders(response, request);
		}
		if (!env4.OAUTH_PROVIDER) {
			env4.OAUTH_PROVIDER = this.createOAuthHelpers(env4);
		}
		if (this.typedDefaultHandler.type === 0) {
			return this.typedDefaultHandler.handler.fetch(request, env4, ctx);
		} else {
			const handler = new this.typedDefaultHandler.handler(ctx, env4);
			return handler.fetch(request);
		}
	}
	/**
	 * Determines if an endpoint configuration is a path or a full URL
	 * @param endpoint - The endpoint configuration
	 * @returns True if the endpoint is a path (starts with /), false if it's a full URL
	 */
	isPath(endpoint) {
		return endpoint.startsWith("/");
	}
	/**
	 * Matches a URL against an endpoint pattern that can be a full URL or just a path
	 * @param url - The URL to check
	 * @param endpoint - The endpoint pattern (full URL or path)
	 * @returns True if the URL matches the endpoint pattern
	 */
	matchEndpoint(url, endpoint) {
		if (this.isPath(endpoint)) {
			return url.pathname === endpoint;
		} else {
			const endpointUrl = new URL(endpoint);
			return url.hostname === endpointUrl.hostname && url.pathname === endpointUrl.pathname;
		}
	}
	/**
	 * Checks if a URL matches the configured token endpoint
	 * @param url - The URL to check
	 * @returns True if the URL matches the token endpoint
	 */
	isTokenEndpoint(url) {
		return this.matchEndpoint(url, this.options.tokenEndpoint);
	}
	/**
	 * Checks if a URL matches the configured client registration endpoint
	 * @param url - The URL to check
	 * @returns True if the URL matches the client registration endpoint
	 */
	isClientRegistrationEndpoint(url) {
		if (!this.options.clientRegistrationEndpoint) return false;
		return this.matchEndpoint(url, this.options.clientRegistrationEndpoint);
	}
	/**
	 * Checks if a URL matches a specific API route
	 * @param url - The URL to check
	 * @param route - The API route to check against
	 * @returns True if the URL matches the API route
	 */
	matchApiRoute(url, route) {
		if (this.isPath(route)) {
			return url.pathname.startsWith(route);
		} else {
			const apiUrl = new URL(route);
			return url.hostname === apiUrl.hostname && url.pathname.startsWith(apiUrl.pathname);
		}
	}
	/**
	 * Checks if a URL is an API request based on the configured API route(s)
	 * @param url - The URL to check
	 * @returns True if the URL matches any of the API routes
	 */
	isApiRequest(url) {
		if (Array.isArray(this.options.apiRoute)) {
			return this.options.apiRoute.some((route) => this.matchApiRoute(url, route));
		} else {
			return this.matchApiRoute(url, this.options.apiRoute);
		}
	}
	/**
	 * Gets the full URL for an endpoint, using the provided request URL's
	 * origin for endpoints specified as just paths
	 * @param endpoint - The endpoint configuration (path or full URL)
	 * @param requestUrl - The URL of the incoming request
	 * @returns The full URL for the endpoint
	 */
	getFullEndpointUrl(endpoint, requestUrl) {
		if (this.isPath(endpoint)) {
			return `${requestUrl.origin}${endpoint}`;
		} else {
			return endpoint;
		}
	}
	/**
	 * Adds CORS headers to a response
	 * @param response - The response to add CORS headers to
	 * @param request - The original request
	 * @returns A new Response with CORS headers added
	 */
	addCorsHeaders(response, request) {
		const origin = request.headers.get("Origin");
		if (!origin) {
			return response;
		}
		const newResponse = new Response(response.body, response);
		newResponse.headers.set("Access-Control-Allow-Origin", origin);
		newResponse.headers.set("Access-Control-Allow-Methods", "*");
		newResponse.headers.set("Access-Control-Allow-Headers", "Authorization, *");
		newResponse.headers.set("Access-Control-Max-Age", "86400");
		return newResponse;
	}
	/**
	 * Handles the OAuth metadata discovery endpoint
	 * Implements RFC 8414 for OAuth Server Metadata
	 * @param requestUrl - The URL of the incoming request
	 * @returns Response with OAuth server metadata
	 */
	async handleMetadataDiscovery(requestUrl) {
		const tokenEndpoint = this.getFullEndpointUrl(this.options.tokenEndpoint, requestUrl);
		const authorizeEndpoint = this.getFullEndpointUrl(
			this.options.authorizeEndpoint,
			requestUrl,
		);
		let registrationEndpoint = void 0;
		if (this.options.clientRegistrationEndpoint) {
			registrationEndpoint = this.getFullEndpointUrl(
				this.options.clientRegistrationEndpoint,
				requestUrl,
			);
		}
		const responseTypesSupported = ["code"];
		if (this.options.allowImplicitFlow) {
			responseTypesSupported.push("token");
		}
		const metadata = {
			issuer: new URL(tokenEndpoint).origin,
			authorization_endpoint: authorizeEndpoint,
			token_endpoint: tokenEndpoint,
			// not implemented: jwks_uri
			registration_endpoint: registrationEndpoint,
			scopes_supported: this.options.scopesSupported,
			response_types_supported: responseTypesSupported,
			response_modes_supported: ["query"],
			grant_types_supported: ["authorization_code", "refresh_token"],
			// Support "none" auth method for public clients
			token_endpoint_auth_methods_supported: [
				"client_secret_basic",
				"client_secret_post",
				"none",
			],
			// not implemented: token_endpoint_auth_signing_alg_values_supported
			// not implemented: service_documentation
			// not implemented: ui_locales_supported
			// not implemented: op_policy_uri
			// not implemented: op_tos_uri
			revocation_endpoint: tokenEndpoint,
			// Reusing token endpoint for revocation
			// not implemented: revocation_endpoint_auth_methods_supported
			// not implemented: revocation_endpoint_auth_signing_alg_values_supported
			// not implemented: introspection_endpoint
			// not implemented: introspection_endpoint_auth_methods_supported
			// not implemented: introspection_endpoint_auth_signing_alg_values_supported
			code_challenge_methods_supported: ["plain", "S256"],
			// PKCE support
		};
		return new Response(JSON.stringify(metadata), {
			headers: { "Content-Type": "application/json" },
		});
	}
	/**
	 * Handles client authentication and token issuance via the token endpoint
	 * Supports authorization_code and refresh_token grant types
	 * @param request - The HTTP request
	 * @param env - Cloudflare Worker environment variables
	 * @returns Response with token data or error
	 */
	async handleTokenRequest(request, env4) {
		if (request.method !== "POST") {
			return createErrorResponse("invalid_request", "Method not allowed", 405);
		}
		const contentType = request.headers.get("Content-Type") || "";
		const body = {};
		if (!contentType.includes("application/x-www-form-urlencoded")) {
			return createErrorResponse(
				"invalid_request",
				"Content-Type must be application/x-www-form-urlencoded",
				400,
			);
		}
		const formData = await request.formData();
		for (const [key, value] of formData.entries()) {
			body[key] = value;
		}
		const authHeader = request.headers.get("Authorization");
		let clientId = "";
		let clientSecret = "";
		if (authHeader && authHeader.startsWith("Basic ")) {
			const credentials = atob(authHeader.substring(6));
			const [id, secret] = credentials.split(":");
			clientId = id;
			clientSecret = secret || "";
		} else {
			clientId = body.client_id;
			clientSecret = body.client_secret || "";
		}
		if (!clientId) {
			return createErrorResponse("invalid_client", "Client ID is required", 401);
		}
		const clientInfo = await this.getClient(env4, clientId);
		if (!clientInfo) {
			return createErrorResponse("invalid_client", "Client not found", 401);
		}
		const isPublicClient = clientInfo.tokenEndpointAuthMethod === "none";
		if (!isPublicClient) {
			if (!clientSecret) {
				return createErrorResponse(
					"invalid_client",
					"Client authentication failed: missing client_secret",
					401,
				);
			}
			if (!clientInfo.clientSecret) {
				return createErrorResponse(
					"invalid_client",
					"Client authentication failed: client has no registered secret",
					401,
				);
			}
			const providedSecretHash = await hashSecret(clientSecret);
			if (providedSecretHash !== clientInfo.clientSecret) {
				return createErrorResponse(
					"invalid_client",
					"Client authentication failed: invalid client_secret",
					401,
				);
			}
		}
		const grantType = body.grant_type;
		if (grantType === "authorization_code") {
			return this.handleAuthorizationCodeGrant(body, clientInfo, env4);
		} else if (grantType === "refresh_token") {
			return this.handleRefreshTokenGrant(body, clientInfo, env4);
		} else {
			return createErrorResponse("unsupported_grant_type", "Grant type not supported");
		}
	}
	/**
	 * Handles the authorization code grant type
	 * Exchanges an authorization code for access and refresh tokens
	 * @param body - The parsed request body
	 * @param clientInfo - The authenticated client information
	 * @param env - Cloudflare Worker environment variables
	 * @returns Response with token data or error
	 */
	async handleAuthorizationCodeGrant(body, clientInfo, env4) {
		const code = body.code;
		const redirectUri = body.redirect_uri;
		const codeVerifier = body.code_verifier;
		if (!code) {
			return createErrorResponse("invalid_request", "Authorization code is required");
		}
		const codeParts = code.split(":");
		if (codeParts.length !== 3) {
			return createErrorResponse("invalid_grant", "Invalid authorization code format");
		}
		const [userId, grantId, _] = codeParts;
		const grantKey = `grant:${userId}:${grantId}`;
		const grantData = await env4.OAUTH_KV.get(grantKey, { type: "json" });
		if (!grantData) {
			return createErrorResponse(
				"invalid_grant",
				"Grant not found or authorization code expired",
			);
		}
		if (!grantData.authCodeId) {
			return createErrorResponse("invalid_grant", "Authorization code already used");
		}
		const codeHash = await hashSecret(code);
		if (codeHash !== grantData.authCodeId) {
			return createErrorResponse("invalid_grant", "Invalid authorization code");
		}
		if (grantData.clientId !== clientInfo.clientId) {
			return createErrorResponse("invalid_grant", "Client ID mismatch");
		}
		const isPkceEnabled = !!grantData.codeChallenge;
		if (!redirectUri && !isPkceEnabled) {
			return createErrorResponse(
				"invalid_request",
				"redirect_uri is required when not using PKCE",
			);
		}
		if (redirectUri && !clientInfo.redirectUris.includes(redirectUri)) {
			return createErrorResponse("invalid_grant", "Invalid redirect URI");
		}
		if (isPkceEnabled) {
			if (!codeVerifier) {
				return createErrorResponse("invalid_request", "code_verifier is required for PKCE");
			}
			let calculatedChallenge;
			if (grantData.codeChallengeMethod === "S256") {
				const encoder = new TextEncoder();
				const data = encoder.encode(codeVerifier);
				const hashBuffer = await crypto.subtle.digest("SHA-256", data);
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				calculatedChallenge = base64UrlEncode(String.fromCharCode(...hashArray));
			} else {
				calculatedChallenge = codeVerifier;
			}
			if (calculatedChallenge !== grantData.codeChallenge) {
				return createErrorResponse("invalid_grant", "Invalid PKCE code_verifier");
			}
		}
		const accessTokenSecret = generateRandomString(TOKEN_LENGTH);
		const refreshTokenSecret = generateRandomString(TOKEN_LENGTH);
		const accessToken = `${userId}:${grantId}:${accessTokenSecret}`;
		const refreshToken = `${userId}:${grantId}:${refreshTokenSecret}`;
		const accessTokenId = await generateTokenId(accessToken);
		const refreshTokenId = await generateTokenId(refreshToken);
		let accessTokenTTL = this.options.accessTokenTTL;
		const encryptionKey = await unwrapKeyWithToken(code, grantData.authCodeWrappedKey);
		let grantEncryptionKey = encryptionKey;
		let accessTokenEncryptionKey = encryptionKey;
		let encryptedAccessTokenProps = grantData.encryptedProps;
		if (this.options.tokenExchangeCallback) {
			const decryptedProps = await decryptProps(encryptionKey, grantData.encryptedProps);
			let grantProps = decryptedProps;
			let accessTokenProps = decryptedProps;
			const callbackOptions = {
				grantType: "authorization_code",
				clientId: clientInfo.clientId,
				userId,
				scope: grantData.scope,
				props: decryptedProps,
			};
			const callbackResult = await Promise.resolve(
				this.options.tokenExchangeCallback(callbackOptions),
			);
			if (callbackResult) {
				if (callbackResult.newProps) {
					grantProps = callbackResult.newProps;
					if (!callbackResult.accessTokenProps) {
						accessTokenProps = callbackResult.newProps;
					}
				}
				if (callbackResult.accessTokenProps) {
					accessTokenProps = callbackResult.accessTokenProps;
				}
				if (callbackResult.accessTokenTTL !== void 0) {
					accessTokenTTL = callbackResult.accessTokenTTL;
				}
			}
			const grantResult = await encryptProps(grantProps);
			grantData.encryptedProps = grantResult.encryptedData;
			grantEncryptionKey = grantResult.key;
			if (accessTokenProps !== grantProps) {
				const tokenResult = await encryptProps(accessTokenProps);
				encryptedAccessTokenProps = tokenResult.encryptedData;
				accessTokenEncryptionKey = tokenResult.key;
			} else {
				encryptedAccessTokenProps = grantData.encryptedProps;
				accessTokenEncryptionKey = grantEncryptionKey;
			}
		}
		const now = Math.floor(Date.now() / 1e3);
		const accessTokenExpiresAt = now + accessTokenTTL;
		const accessTokenWrappedKey = await wrapKeyWithToken(accessToken, accessTokenEncryptionKey);
		const refreshTokenWrappedKey = await wrapKeyWithToken(refreshToken, grantEncryptionKey);
		delete grantData.authCodeId;
		delete grantData.codeChallenge;
		delete grantData.codeChallengeMethod;
		delete grantData.authCodeWrappedKey;
		grantData.refreshTokenId = refreshTokenId;
		grantData.refreshTokenWrappedKey = refreshTokenWrappedKey;
		grantData.previousRefreshTokenId = void 0;
		grantData.previousRefreshTokenWrappedKey = void 0;
		await env4.OAUTH_KV.put(grantKey, JSON.stringify(grantData));
		const accessTokenData = {
			id: accessTokenId,
			grantId,
			userId,
			createdAt: now,
			expiresAt: accessTokenExpiresAt,
			wrappedEncryptionKey: accessTokenWrappedKey,
			grant: {
				clientId: grantData.clientId,
				scope: grantData.scope,
				encryptedProps: encryptedAccessTokenProps,
			},
		};
		await env4.OAUTH_KV.put(
			`token:${userId}:${grantId}:${accessTokenId}`,
			JSON.stringify(accessTokenData),
			{
				expirationTtl: accessTokenTTL,
			},
		);
		return new Response(
			JSON.stringify({
				access_token: accessToken,
				token_type: "bearer",
				expires_in: accessTokenTTL,
				refresh_token: refreshToken,
				scope: grantData.scope.join(" "),
			}),
			{
				headers: { "Content-Type": "application/json" },
			},
		);
	}
	/**
	 * Handles the refresh token grant type
	 * Issues a new access token using a refresh token
	 * @param body - The parsed request body
	 * @param clientInfo - The authenticated client information
	 * @param env - Cloudflare Worker environment variables
	 * @returns Response with token data or error
	 */
	async handleRefreshTokenGrant(body, clientInfo, env4) {
		const refreshToken = body.refresh_token;
		if (!refreshToken) {
			return createErrorResponse("invalid_request", "Refresh token is required");
		}
		const tokenParts = refreshToken.split(":");
		if (tokenParts.length !== 3) {
			return createErrorResponse("invalid_grant", "Invalid token format");
		}
		const [userId, grantId, _] = tokenParts;
		const providedTokenHash = await generateTokenId(refreshToken);
		const grantKey = `grant:${userId}:${grantId}`;
		const grantData = await env4.OAUTH_KV.get(grantKey, { type: "json" });
		if (!grantData) {
			return createErrorResponse("invalid_grant", "Grant not found");
		}
		const isCurrentToken = grantData.refreshTokenId === providedTokenHash;
		const isPreviousToken = grantData.previousRefreshTokenId === providedTokenHash;
		if (!isCurrentToken && !isPreviousToken) {
			return createErrorResponse("invalid_grant", "Invalid refresh token");
		}
		if (grantData.clientId !== clientInfo.clientId) {
			return createErrorResponse("invalid_grant", "Client ID mismatch");
		}
		const accessTokenSecret = generateRandomString(TOKEN_LENGTH);
		const newAccessToken = `${userId}:${grantId}:${accessTokenSecret}`;
		const accessTokenId = await generateTokenId(newAccessToken);
		const refreshTokenSecret = generateRandomString(TOKEN_LENGTH);
		const newRefreshToken = `${userId}:${grantId}:${refreshTokenSecret}`;
		const newRefreshTokenId = await generateTokenId(newRefreshToken);
		let accessTokenTTL = this.options.accessTokenTTL;
		let wrappedKeyToUse;
		if (isCurrentToken) {
			wrappedKeyToUse = grantData.refreshTokenWrappedKey;
		} else {
			wrappedKeyToUse = grantData.previousRefreshTokenWrappedKey;
		}
		const encryptionKey = await unwrapKeyWithToken(refreshToken, wrappedKeyToUse);
		let grantEncryptionKey = encryptionKey;
		let accessTokenEncryptionKey = encryptionKey;
		let encryptedAccessTokenProps = grantData.encryptedProps;
		if (this.options.tokenExchangeCallback) {
			const decryptedProps = await decryptProps(encryptionKey, grantData.encryptedProps);
			let grantProps = decryptedProps;
			let accessTokenProps = decryptedProps;
			const callbackOptions = {
				grantType: "refresh_token",
				clientId: clientInfo.clientId,
				userId,
				scope: grantData.scope,
				props: decryptedProps,
			};
			const callbackResult = await Promise.resolve(
				this.options.tokenExchangeCallback(callbackOptions),
			);
			let grantPropsChanged = false;
			if (callbackResult) {
				if (callbackResult.newProps) {
					grantProps = callbackResult.newProps;
					grantPropsChanged = true;
					if (!callbackResult.accessTokenProps) {
						accessTokenProps = callbackResult.newProps;
					}
				}
				if (callbackResult.accessTokenProps) {
					accessTokenProps = callbackResult.accessTokenProps;
				}
				if (callbackResult.accessTokenTTL !== void 0) {
					accessTokenTTL = callbackResult.accessTokenTTL;
				}
			}
			if (grantPropsChanged) {
				const grantResult = await encryptProps(grantProps);
				grantData.encryptedProps = grantResult.encryptedData;
				if (grantResult.key !== encryptionKey) {
					grantEncryptionKey = grantResult.key;
					wrappedKeyToUse = await wrapKeyWithToken(refreshToken, grantEncryptionKey);
				} else {
					grantEncryptionKey = grantResult.key;
				}
			}
			if (accessTokenProps !== grantProps) {
				const tokenResult = await encryptProps(accessTokenProps);
				encryptedAccessTokenProps = tokenResult.encryptedData;
				accessTokenEncryptionKey = tokenResult.key;
			} else {
				encryptedAccessTokenProps = grantData.encryptedProps;
				accessTokenEncryptionKey = grantEncryptionKey;
			}
		}
		const now = Math.floor(Date.now() / 1e3);
		const accessTokenExpiresAt = now + accessTokenTTL;
		const accessTokenWrappedKey = await wrapKeyWithToken(
			newAccessToken,
			accessTokenEncryptionKey,
		);
		const newRefreshTokenWrappedKey = await wrapKeyWithToken(
			newRefreshToken,
			grantEncryptionKey,
		);
		grantData.previousRefreshTokenId = providedTokenHash;
		grantData.previousRefreshTokenWrappedKey = wrappedKeyToUse;
		grantData.refreshTokenId = newRefreshTokenId;
		grantData.refreshTokenWrappedKey = newRefreshTokenWrappedKey;
		await env4.OAUTH_KV.put(grantKey, JSON.stringify(grantData));
		const accessTokenData = {
			id: accessTokenId,
			grantId,
			userId,
			createdAt: now,
			expiresAt: accessTokenExpiresAt,
			wrappedEncryptionKey: accessTokenWrappedKey,
			grant: {
				clientId: grantData.clientId,
				scope: grantData.scope,
				encryptedProps: encryptedAccessTokenProps,
			},
		};
		await env4.OAUTH_KV.put(
			`token:${userId}:${grantId}:${accessTokenId}`,
			JSON.stringify(accessTokenData),
			{
				expirationTtl: accessTokenTTL,
			},
		);
		return new Response(
			JSON.stringify({
				access_token: newAccessToken,
				token_type: "bearer",
				expires_in: accessTokenTTL,
				refresh_token: newRefreshToken,
				scope: grantData.scope.join(" "),
			}),
			{
				headers: { "Content-Type": "application/json" },
			},
		);
	}
	/**
	 * Handles the dynamic client registration endpoint (RFC 7591)
	 * @param request - The HTTP request
	 * @param env - Cloudflare Worker environment variables
	 * @returns Response with client registration data or error
	 */
	async handleClientRegistration(request, env4) {
		if (!this.options.clientRegistrationEndpoint) {
			return createErrorResponse(
				"not_implemented",
				"Client registration is not enabled",
				501,
			);
		}
		if (request.method !== "POST") {
			return createErrorResponse("invalid_request", "Method not allowed", 405);
		}
		const contentLength = Number.parseInt(request.headers.get("Content-Length") || "0", 10);
		if (contentLength > 1048576) {
			return createErrorResponse(
				"invalid_request",
				"Request payload too large, must be under 1 MiB",
				413,
			);
		}
		let clientMetadata;
		try {
			const text = await request.text();
			if (text.length > 1048576) {
				return createErrorResponse(
					"invalid_request",
					"Request payload too large, must be under 1 MiB",
					413,
				);
			}
			clientMetadata = JSON.parse(text);
		} catch (error3) {
			return createErrorResponse("invalid_request", "Invalid JSON payload", 400);
		}
		const validateStringField = /* @__PURE__ */ __name((field) => {
			if (field === void 0) {
				return void 0;
			}
			if (typeof field !== "string") {
				throw new Error("Field must be a string");
			}
			return field;
		}, "validateStringField");
		const validateStringArray = /* @__PURE__ */ __name((arr) => {
			if (arr === void 0) {
				return void 0;
			}
			if (!Array.isArray(arr)) {
				throw new Error("Field must be an array");
			}
			for (const item of arr) {
				if (typeof item !== "string") {
					throw new Error("All array elements must be strings");
				}
			}
			return arr;
		}, "validateStringArray");
		const authMethod =
			validateStringField(clientMetadata.token_endpoint_auth_method) || "client_secret_basic";
		const isPublicClient = authMethod === "none";
		if (isPublicClient && this.options.disallowPublicClientRegistration) {
			return createErrorResponse(
				"invalid_client_metadata",
				"Public client registration is not allowed",
			);
		}
		const clientId = generateRandomString(16);
		let clientSecret;
		let hashedSecret;
		if (!isPublicClient) {
			clientSecret = generateRandomString(32);
			hashedSecret = await hashSecret(clientSecret);
		}
		let clientInfo;
		try {
			const redirectUris = validateStringArray(clientMetadata.redirect_uris);
			if (!redirectUris || redirectUris.length === 0) {
				throw new Error("At least one redirect URI is required");
			}
			clientInfo = {
				clientId,
				redirectUris,
				clientName: validateStringField(clientMetadata.client_name),
				logoUri: validateStringField(clientMetadata.logo_uri),
				clientUri: validateStringField(clientMetadata.client_uri),
				policyUri: validateStringField(clientMetadata.policy_uri),
				tosUri: validateStringField(clientMetadata.tos_uri),
				jwksUri: validateStringField(clientMetadata.jwks_uri),
				contacts: validateStringArray(clientMetadata.contacts),
				grantTypes: validateStringArray(clientMetadata.grant_types) || [
					"authorization_code",
					"refresh_token",
				],
				responseTypes: validateStringArray(clientMetadata.response_types) || ["code"],
				registrationDate: Math.floor(Date.now() / 1e3),
				tokenEndpointAuthMethod: authMethod,
			};
			if (!isPublicClient && hashedSecret) {
				clientInfo.clientSecret = hashedSecret;
			}
		} catch (error3) {
			return createErrorResponse(
				"invalid_client_metadata",
				error3 instanceof Error ? error3.message : "Invalid client metadata",
			);
		}
		await env4.OAUTH_KV.put(`client:${clientId}`, JSON.stringify(clientInfo));
		const response = {
			client_id: clientInfo.clientId,
			redirect_uris: clientInfo.redirectUris,
			client_name: clientInfo.clientName,
			logo_uri: clientInfo.logoUri,
			client_uri: clientInfo.clientUri,
			policy_uri: clientInfo.policyUri,
			tos_uri: clientInfo.tosUri,
			jwks_uri: clientInfo.jwksUri,
			contacts: clientInfo.contacts,
			grant_types: clientInfo.grantTypes,
			response_types: clientInfo.responseTypes,
			token_endpoint_auth_method: clientInfo.tokenEndpointAuthMethod,
			registration_client_uri: `${this.options.clientRegistrationEndpoint}/${clientId}`,
			client_id_issued_at: clientInfo.registrationDate,
		};
		if (clientSecret) {
			response.client_secret = clientSecret;
		}
		return new Response(JSON.stringify(response), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	}
	/**
	 * Handles API requests by validating the access token and calling the API handler
	 * @param request - The HTTP request
	 * @param env - Cloudflare Worker environment variables
	 * @param ctx - Cloudflare Worker execution context
	 * @returns Response from the API handler or error
	 */
	async handleApiRequest(request, env4, ctx) {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return createErrorResponse("invalid_token", "Missing or invalid access token", 401, {
				"WWW-Authenticate":
					'Bearer realm="OAuth", error="invalid_token", error_description="Missing or invalid access token"',
			});
		}
		const accessToken = authHeader.substring(7);
		const tokenParts = accessToken.split(":");
		if (tokenParts.length !== 3) {
			return createErrorResponse("invalid_token", "Invalid token format", 401, {
				"WWW-Authenticate": 'Bearer realm="OAuth", error="invalid_token"',
			});
		}
		const [userId, grantId, _] = tokenParts;
		const accessTokenId = await generateTokenId(accessToken);
		const tokenKey = `token:${userId}:${grantId}:${accessTokenId}`;
		const tokenData = await env4.OAUTH_KV.get(tokenKey, { type: "json" });
		if (!tokenData) {
			return createErrorResponse("invalid_token", "Invalid access token", 401, {
				"WWW-Authenticate": 'Bearer realm="OAuth", error="invalid_token"',
			});
		}
		const now = Math.floor(Date.now() / 1e3);
		if (tokenData.expiresAt < now) {
			return createErrorResponse("invalid_token", "Access token expired", 401, {
				"WWW-Authenticate": 'Bearer realm="OAuth", error="invalid_token"',
			});
		}
		const encryptionKey = await unwrapKeyWithToken(accessToken, tokenData.wrappedEncryptionKey);
		const decryptedProps = await decryptProps(encryptionKey, tokenData.grant.encryptedProps);
		ctx.props = decryptedProps;
		if (!env4.OAUTH_PROVIDER) {
			env4.OAUTH_PROVIDER = this.createOAuthHelpers(env4);
		}
		if (this.typedApiHandler.type === 0) {
			return this.typedApiHandler.handler.fetch(request, env4, ctx);
		} else {
			const handler = new this.typedApiHandler.handler(ctx, env4);
			return handler.fetch(request);
		}
	}
	/**
	 * Creates the helper methods object for OAuth operations
	 * This is passed to the handler functions to allow them to interact with the OAuth system
	 * @param env - Cloudflare Worker environment variables
	 * @returns An instance of OAuthHelpers
	 */
	createOAuthHelpers(env4) {
		return new OAuthHelpersImpl(env4, this);
	}
	/**
	 * Fetches client information from KV storage
	 * This method is not private because `OAuthHelpers` needs to call it. Note that since
	 * `OAuthProviderImpl` is not exposed outside this module, this is still effectively
	 * module-private.
	 * @param env - Cloudflare Worker environment variables
	 * @param clientId - The client ID to look up
	 * @returns The client information, or null if not found
	 */
	getClient(env4, clientId) {
		const clientKey = `client:${clientId}`;
		return env4.OAUTH_KV.get(clientKey, { type: "json" });
	}
};
var DEFAULT_ACCESS_TOKEN_TTL = 60 * 60;
var TOKEN_LENGTH = 32;
function createErrorResponse(code, description, status = 400, headers = {}) {
	const body = JSON.stringify({
		error: code,
		error_description: description,
	});
	return new Response(body, {
		status,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	});
}
__name(createErrorResponse, "createErrorResponse");
async function hashSecret(secret) {
	return generateTokenId(secret);
}
__name(hashSecret, "hashSecret");
function generateRandomString(length) {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const values = new Uint8Array(length);
	crypto.getRandomValues(values);
	for (let i = 0; i < length; i++) {
		result += characters.charAt(values[i] % characters.length);
	}
	return result;
}
__name(generateRandomString, "generateRandomString");
async function generateTokenId(token) {
	const encoder = new TextEncoder();
	const data = encoder.encode(token);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	return hashHex;
}
__name(generateTokenId, "generateTokenId");
function base64UrlEncode(str) {
	return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
__name(base64UrlEncode, "base64UrlEncode");
function arrayBufferToBase64(buffer) {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
__name(arrayBufferToBase64, "arrayBufferToBase64");
function base64ToArrayBuffer(base64) {
	const binaryString = atob(base64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}
__name(base64ToArrayBuffer, "base64ToArrayBuffer");
async function encryptProps(data) {
	const key = await crypto.subtle.generateKey(
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		// extractable
		["encrypt", "decrypt"],
	);
	const iv = new Uint8Array(12);
	const jsonData = JSON.stringify(data);
	const encoder = new TextEncoder();
	const encodedData = encoder.encode(jsonData);
	const encryptedBuffer = await crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv,
		},
		key,
		encodedData,
	);
	return {
		encryptedData: arrayBufferToBase64(encryptedBuffer),
		key,
	};
}
__name(encryptProps, "encryptProps");
async function decryptProps(key, encryptedData) {
	const encryptedBuffer = base64ToArrayBuffer(encryptedData);
	const iv = new Uint8Array(12);
	const decryptedBuffer = await crypto.subtle.decrypt(
		{
			name: "AES-GCM",
			iv,
		},
		key,
		encryptedBuffer,
	);
	const decoder = new TextDecoder();
	const jsonData = decoder.decode(decryptedBuffer);
	return JSON.parse(jsonData);
}
__name(decryptProps, "decryptProps");
var WRAPPING_KEY_HMAC_KEY = new Uint8Array([
	34, 126, 38, 134, 141, 241, 225, 109, 128, 112, 234, 23, 151, 91, 71, 166, 130, 24, 250, 135,
	40, 174, 222, 133, 181, 29, 74, 217, 150, 202, 202, 67,
]);
async function deriveKeyFromToken(tokenStr) {
	const encoder = new TextEncoder();
	const hmacKey = await crypto.subtle.importKey(
		"raw",
		WRAPPING_KEY_HMAC_KEY,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const hmacResult = await crypto.subtle.sign("HMAC", hmacKey, encoder.encode(tokenStr));
	return await crypto.subtle.importKey(
		"raw",
		hmacResult,
		{ name: "AES-KW" },
		false,
		// not extractable
		["wrapKey", "unwrapKey"],
	);
}
__name(deriveKeyFromToken, "deriveKeyFromToken");
async function wrapKeyWithToken(tokenStr, keyToWrap) {
	const wrappingKey = await deriveKeyFromToken(tokenStr);
	const wrappedKeyBuffer = await crypto.subtle.wrapKey("raw", keyToWrap, wrappingKey, {
		name: "AES-KW",
	});
	return arrayBufferToBase64(wrappedKeyBuffer);
}
__name(wrapKeyWithToken, "wrapKeyWithToken");
async function unwrapKeyWithToken(tokenStr, wrappedKeyBase64) {
	const wrappingKey = await deriveKeyFromToken(tokenStr);
	const wrappedKeyBuffer = base64ToArrayBuffer(wrappedKeyBase64);
	return await crypto.subtle.unwrapKey(
		"raw",
		wrappedKeyBuffer,
		wrappingKey,
		{ name: "AES-KW" },
		{ name: "AES-GCM" },
		true,
		// extractable
		["encrypt", "decrypt"],
	);
}
__name(unwrapKeyWithToken, "unwrapKeyWithToken");
var OAuthHelpersImpl = class {
	static {
		__name(this, "OAuthHelpersImpl");
	}
	/**
	 * Creates a new OAuthHelpers instance
	 * @param env - Cloudflare Worker environment variables
	 * @param provider - Reference to the parent provider instance
	 */
	constructor(env4, provider) {
		this.env = env4;
		this.provider = provider;
	}
	/**
	 * Parses an OAuth authorization request from the HTTP request
	 * @param request - The HTTP request containing OAuth parameters
	 * @returns The parsed authorization request parameters
	 */
	async parseAuthRequest(request) {
		const url = new URL(request.url);
		const responseType = url.searchParams.get("response_type") || "";
		const clientId = url.searchParams.get("client_id") || "";
		const redirectUri = url.searchParams.get("redirect_uri") || "";
		const scope = (url.searchParams.get("scope") || "").split(" ").filter(Boolean);
		const state = url.searchParams.get("state") || "";
		const codeChallenge = url.searchParams.get("code_challenge") || void 0;
		const codeChallengeMethod = url.searchParams.get("code_challenge_method") || "plain";
		if (responseType === "token" && !this.provider.options.allowImplicitFlow) {
			throw new Error("The implicit grant flow is not enabled for this provider");
		}
		return {
			responseType,
			clientId,
			redirectUri,
			scope,
			state,
			codeChallenge,
			codeChallengeMethod,
		};
	}
	/**
	 * Looks up a client by its client ID
	 * @param clientId - The client ID to look up
	 * @returns A Promise resolving to the client info, or null if not found
	 */
	async lookupClient(clientId) {
		return await this.provider.getClient(this.env, clientId);
	}
	/**
	 * Completes an authorization request by creating a grant and either:
	 * - For authorization code flow: generating an authorization code
	 * - For implicit flow: generating an access token directly
	 * @param options - Options specifying the grant details
	 * @returns A Promise resolving to an object containing the redirect URL
	 */
	async completeAuthorization(options2) {
		const grantId = generateRandomString(16);
		const { encryptedData, key: encryptionKey } = await encryptProps(options2.props);
		const now = Math.floor(Date.now() / 1e3);
		if (options2.request.responseType === "token") {
			const accessTokenSecret = generateRandomString(TOKEN_LENGTH);
			const accessToken = `${options2.userId}:${grantId}:${accessTokenSecret}`;
			const accessTokenId = await generateTokenId(accessToken);
			const accessTokenTTL = this.provider.options.accessTokenTTL || DEFAULT_ACCESS_TOKEN_TTL;
			const accessTokenExpiresAt = now + accessTokenTTL;
			const accessTokenWrappedKey = await wrapKeyWithToken(accessToken, encryptionKey);
			const grant = {
				id: grantId,
				clientId: options2.request.clientId,
				userId: options2.userId,
				scope: options2.scope,
				metadata: options2.metadata,
				encryptedProps: encryptedData,
				createdAt: now,
			};
			const grantKey = `grant:${options2.userId}:${grantId}`;
			await this.env.OAUTH_KV.put(grantKey, JSON.stringify(grant));
			const accessTokenData = {
				id: accessTokenId,
				grantId,
				userId: options2.userId,
				createdAt: now,
				expiresAt: accessTokenExpiresAt,
				wrappedEncryptionKey: accessTokenWrappedKey,
				grant: {
					clientId: options2.request.clientId,
					scope: options2.scope,
					encryptedProps: encryptedData,
				},
			};
			await this.env.OAUTH_KV.put(
				`token:${options2.userId}:${grantId}:${accessTokenId}`,
				JSON.stringify(accessTokenData),
				{ expirationTtl: accessTokenTTL },
			);
			const redirectUrl = new URL(options2.request.redirectUri);
			const fragment = new URLSearchParams();
			fragment.set("access_token", accessToken);
			fragment.set("token_type", "bearer");
			fragment.set("expires_in", accessTokenTTL.toString());
			fragment.set("scope", options2.scope.join(" "));
			if (options2.request.state) {
				fragment.set("state", options2.request.state);
			}
			redirectUrl.hash = fragment.toString();
			return { redirectTo: redirectUrl.toString() };
		} else {
			const authCodeSecret = generateRandomString(32);
			const authCode = `${options2.userId}:${grantId}:${authCodeSecret}`;
			const authCodeId = await hashSecret(authCode);
			const authCodeWrappedKey = await wrapKeyWithToken(authCode, encryptionKey);
			const grant = {
				id: grantId,
				clientId: options2.request.clientId,
				userId: options2.userId,
				scope: options2.scope,
				metadata: options2.metadata,
				encryptedProps: encryptedData,
				createdAt: now,
				authCodeId,
				// Store the auth code hash in the grant
				authCodeWrappedKey,
				// Store the wrapped key
				// Store PKCE parameters if provided
				codeChallenge: options2.request.codeChallenge,
				codeChallengeMethod: options2.request.codeChallengeMethod,
			};
			const grantKey = `grant:${options2.userId}:${grantId}`;
			const codeExpiresIn = 600;
			await this.env.OAUTH_KV.put(grantKey, JSON.stringify(grant), {
				expirationTtl: codeExpiresIn,
			});
			const redirectUrl = new URL(options2.request.redirectUri);
			redirectUrl.searchParams.set("code", authCode);
			if (options2.request.state) {
				redirectUrl.searchParams.set("state", options2.request.state);
			}
			return { redirectTo: redirectUrl.toString() };
		}
	}
	/**
	 * Creates a new OAuth client
	 * @param clientInfo - Partial client information to create the client with
	 * @returns A Promise resolving to the created client info
	 */
	async createClient(clientInfo) {
		const clientId = generateRandomString(16);
		const tokenEndpointAuthMethod = clientInfo.tokenEndpointAuthMethod || "client_secret_basic";
		const isPublicClient = tokenEndpointAuthMethod === "none";
		const newClient = {
			clientId,
			redirectUris: clientInfo.redirectUris || [],
			clientName: clientInfo.clientName,
			logoUri: clientInfo.logoUri,
			clientUri: clientInfo.clientUri,
			policyUri: clientInfo.policyUri,
			tosUri: clientInfo.tosUri,
			jwksUri: clientInfo.jwksUri,
			contacts: clientInfo.contacts,
			grantTypes: clientInfo.grantTypes || ["authorization_code", "refresh_token"],
			responseTypes: clientInfo.responseTypes || ["code"],
			registrationDate: Math.floor(Date.now() / 1e3),
			tokenEndpointAuthMethod,
		};
		let clientSecret;
		if (!isPublicClient) {
			clientSecret = generateRandomString(32);
			newClient.clientSecret = await hashSecret(clientSecret);
		}
		await this.env.OAUTH_KV.put(`client:${clientId}`, JSON.stringify(newClient));
		const clientResponse = { ...newClient };
		if (!isPublicClient && clientSecret) {
			clientResponse.clientSecret = clientSecret;
		}
		return clientResponse;
	}
	/**
	 * Lists all registered OAuth clients with pagination support
	 * @param options - Optional pagination parameters (limit and cursor)
	 * @returns A Promise resolving to the list result with items and optional cursor
	 */
	async listClients(options2) {
		const listOptions = {
			prefix: "client:",
		};
		if (options2?.limit !== void 0) {
			listOptions.limit = options2.limit;
		}
		if (options2?.cursor !== void 0) {
			listOptions.cursor = options2.cursor;
		}
		const response = await this.env.OAUTH_KV.list(listOptions);
		const clients = [];
		const promises = response.keys.map(async (key) => {
			const clientId = key.name.substring("client:".length);
			const client = await this.provider.getClient(this.env, clientId);
			if (client) {
				clients.push(client);
			}
		});
		await Promise.all(promises);
		return {
			items: clients,
			cursor: response.list_complete ? void 0 : response.cursor,
		};
	}
	/**
	 * Updates an existing OAuth client
	 * @param clientId - The ID of the client to update
	 * @param updates - Partial client information with fields to update
	 * @returns A Promise resolving to the updated client info, or null if not found
	 */
	async updateClient(clientId, updates) {
		const client = await this.provider.getClient(this.env, clientId);
		if (!client) {
			return null;
		}
		const authMethod =
			updates.tokenEndpointAuthMethod ||
			client.tokenEndpointAuthMethod ||
			"client_secret_basic";
		const isPublicClient = authMethod === "none";
		let secretToStore = client.clientSecret;
		let originalSecret = void 0;
		if (isPublicClient) {
			secretToStore = void 0;
		} else if (updates.clientSecret) {
			originalSecret = updates.clientSecret;
			secretToStore = await hashSecret(updates.clientSecret);
		}
		const updatedClient = {
			...client,
			...updates,
			clientId: client.clientId,
			// Ensure clientId doesn't change
			tokenEndpointAuthMethod: authMethod,
			// Use determined auth method
		};
		if (!isPublicClient && secretToStore) {
			updatedClient.clientSecret = secretToStore;
		} else {
			delete updatedClient.clientSecret;
		}
		await this.env.OAUTH_KV.put(`client:${clientId}`, JSON.stringify(updatedClient));
		const response = { ...updatedClient };
		if (!isPublicClient && originalSecret) {
			response.clientSecret = originalSecret;
		}
		return response;
	}
	/**
	 * Deletes an OAuth client
	 * @param clientId - The ID of the client to delete
	 * @returns A Promise resolving when the deletion is confirmed.
	 */
	async deleteClient(clientId) {
		await this.env.OAUTH_KV.delete(`client:${clientId}`);
	}
	/**
	 * Lists all authorization grants for a specific user with pagination support
	 * Returns a summary of each grant without sensitive information
	 * @param userId - The ID of the user whose grants to list
	 * @param options - Optional pagination parameters (limit and cursor)
	 * @returns A Promise resolving to the list result with grant summaries and optional cursor
	 */
	async listUserGrants(userId, options2) {
		const listOptions = {
			prefix: `grant:${userId}:`,
		};
		if (options2?.limit !== void 0) {
			listOptions.limit = options2.limit;
		}
		if (options2?.cursor !== void 0) {
			listOptions.cursor = options2.cursor;
		}
		const response = await this.env.OAUTH_KV.list(listOptions);
		const grantSummaries = [];
		const promises = response.keys.map(async (key) => {
			const grantData = await this.env.OAUTH_KV.get(key.name, { type: "json" });
			if (grantData) {
				const summary = {
					id: grantData.id,
					clientId: grantData.clientId,
					userId: grantData.userId,
					scope: grantData.scope,
					metadata: grantData.metadata,
					createdAt: grantData.createdAt,
				};
				grantSummaries.push(summary);
			}
		});
		await Promise.all(promises);
		return {
			items: grantSummaries,
			cursor: response.list_complete ? void 0 : response.cursor,
		};
	}
	/**
	 * Revokes an authorization grant and all its associated access tokens
	 * @param grantId - The ID of the grant to revoke
	 * @param userId - The ID of the user who owns the grant
	 * @returns A Promise resolving when the revocation is confirmed.
	 */
	async revokeGrant(grantId, userId) {
		const grantKey = `grant:${userId}:${grantId}`;
		const tokenPrefix = `token:${userId}:${grantId}:`;
		let cursor;
		let allTokensDeleted = false;
		while (!allTokensDeleted) {
			const listOptions = {
				prefix: tokenPrefix,
			};
			if (cursor) {
				listOptions.cursor = cursor;
			}
			const result = await this.env.OAUTH_KV.list(listOptions);
			if (result.keys.length > 0) {
				await Promise.all(
					result.keys.map((key) => {
						return this.env.OAUTH_KV.delete(key.name);
					}),
				);
			}
			if (result.list_complete) {
				allTokensDeleted = true;
			} else {
				cursor = result.cursor;
			}
		}
		await this.env.OAUTH_KV.delete(grantKey);
	}
};
var oauth_provider_default = OAuthProvider;

// src/mcp/server.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/agents/dist/mcp/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/agents/dist/chunk-YMUU7QHV.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/agents/dist/chunk-HMLY7DHA.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __typeError2 = /* @__PURE__ */ __name((msg) => {
	throw TypeError(msg);
}, "__typeError");
var __accessCheck2 = /* @__PURE__ */ __name(
	(obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg),
	"__accessCheck",
);
var __privateGet2 = /* @__PURE__ */ __name(
	(obj, member, getter) => (
		__accessCheck2(obj, member, "read from private field"),
		getter ? getter.call(obj) : member.get(obj)
	),
	"__privateGet",
);
var __privateAdd2 = /* @__PURE__ */ __name(
	(obj, member, value) =>
		member.has(obj)
			? __typeError2("Cannot add the same private member more than once")
			: member instanceof WeakSet
				? member.add(obj)
				: member.set(obj, value),
	"__privateAdd",
);
var __privateSet2 = /* @__PURE__ */ __name(
	(obj, member, value, setter) => (
		__accessCheck2(obj, member, "write to private field"),
		setter ? setter.call(obj, value) : member.set(obj, value),
		value
	),
	"__privateSet",
);
var __privateMethod = /* @__PURE__ */ __name(
	(obj, member, method) => (__accessCheck2(obj, member, "access private method"), method),
	"__privateMethod",
);

// node_modules/partyserver/dist/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import { DurableObject } from "cloudflare:workers";

// node_modules/nanoid/index.browser.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/nanoid/url-alphabet/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// node_modules/nanoid/index.browser.js
var nanoid = /* @__PURE__ */ __name((size = 21) => {
	let id = "";
	const bytes = crypto.getRandomValues(new Uint8Array((size |= 0)));
	while (size--) {
		id += urlAlphabet[bytes[size] & 63];
	}
	return id;
}, "nanoid");

// node_modules/partyserver/dist/index.js
if (!("OPEN" in WebSocket)) {
	const WebSocketStatus = {
		// @ts-expect-error
		CONNECTING: WebSocket.READY_STATE_CONNECTING,
		// @ts-expect-error
		OPEN: WebSocket.READY_STATE_OPEN,
		// @ts-expect-error
		CLOSING: WebSocket.READY_STATE_CLOSING,
		// @ts-expect-error
		CLOSED: WebSocket.READY_STATE_CLOSED,
	};
	Object.assign(WebSocket, WebSocketStatus);
	Object.assign(WebSocket.prototype, WebSocketStatus);
}
var AttachmentCache = class {
	static {
		__name(this, "AttachmentCache");
	}
	#cache = /* @__PURE__ */ new WeakMap();
	get(ws) {
		let attachment = this.#cache.get(ws);
		if (!attachment) {
			attachment = WebSocket.prototype.deserializeAttachment.call(ws);
			if (attachment !== void 0) {
				this.#cache.set(ws, attachment);
			} else {
				throw new Error(
					"Missing websocket attachment. This is most likely an issue in PartyServer, please open an issue at https://github.com/threepointone/partyserver/issues",
				);
			}
		}
		return attachment;
	}
	set(ws, attachment) {
		this.#cache.set(ws, attachment);
		WebSocket.prototype.serializeAttachment.call(ws, attachment);
	}
};
var attachments = new AttachmentCache();
var connections = /* @__PURE__ */ new WeakSet();
var isWrapped = /* @__PURE__ */ __name((ws) => {
	return connections.has(ws);
}, "isWrapped");
var createLazyConnection = /* @__PURE__ */ __name((ws) => {
	if (isWrapped(ws)) {
		return ws;
	}
	let initialState = void 0;
	if ("state" in ws) {
		initialState = ws.state;
		delete ws.state;
	}
	const connection = Object.defineProperties(ws, {
		id: {
			get() {
				return attachments.get(ws).__pk.id;
			},
		},
		server: {
			get() {
				return attachments.get(ws).__pk.server;
			},
		},
		socket: {
			get() {
				return ws;
			},
		},
		state: {
			get() {
				return ws.deserializeAttachment();
			},
		},
		setState: {
			value: /* @__PURE__ */ __name(function setState(setState) {
				let state;
				if (setState instanceof Function) {
					state = setState(this.state);
				} else {
					state = setState;
				}
				ws.serializeAttachment(state);
				return state;
			}, "setState"),
		},
		deserializeAttachment: {
			value: /* @__PURE__ */ __name(function deserializeAttachment() {
				const attachment = attachments.get(ws);
				return attachment.__user ?? null;
			}, "deserializeAttachment"),
		},
		serializeAttachment: {
			value: /* @__PURE__ */ __name(function serializeAttachment(attachment) {
				const setting = {
					...attachments.get(ws),
					__user: attachment ?? null,
				};
				attachments.set(ws, setting);
			}, "serializeAttachment"),
		},
	});
	if (initialState) {
		connection.setState(initialState);
	}
	connections.add(connection);
	return connection;
}, "createLazyConnection");
var HibernatingConnectionIterator = class {
	static {
		__name(this, "HibernatingConnectionIterator");
	}
	constructor(state, tag2) {
		this.state = state;
		this.tag = tag2;
	}
	index = 0;
	sockets;
	[Symbol.iterator]() {
		return this;
	}
	next() {
		const sockets =
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			this.sockets ?? (this.sockets = this.state.getWebSockets(this.tag));
		let socket;
		while ((socket = sockets[this.index++])) {
			if (socket.readyState === WebSocket.READY_STATE_OPEN) {
				const value = createLazyConnection(socket);
				return { done: false, value };
			}
		}
		return { done: true, value: void 0 };
	}
};
var InMemoryConnectionManager = class {
	static {
		__name(this, "InMemoryConnectionManager");
	}
	#connections = /* @__PURE__ */ new Map();
	tags = /* @__PURE__ */ new WeakMap();
	getCount() {
		return this.#connections.size;
	}
	getConnection(id) {
		return this.#connections.get(id);
	}
	*getConnections(tag2) {
		if (!tag2) {
			yield* this.#connections
				.values()
				.filter((c) => c.readyState === WebSocket.READY_STATE_OPEN);
			return;
		}
		for (const connection of this.#connections.values()) {
			const connectionTags = this.tags.get(connection) ?? [];
			if (connectionTags.includes(tag2)) {
				yield connection;
			}
		}
	}
	accept(connection, options2) {
		connection.accept();
		this.#connections.set(connection.id, connection);
		this.tags.set(connection, [
			// make sure we have id tag
			connection.id,
			...options2.tags.filter((t) => t !== connection.id),
		]);
		const removeConnection = /* @__PURE__ */ __name(() => {
			this.#connections.delete(connection.id);
			connection.removeEventListener("close", removeConnection);
			connection.removeEventListener("error", removeConnection);
		}, "removeConnection");
		connection.addEventListener("close", removeConnection);
		connection.addEventListener("error", removeConnection);
		return connection;
	}
};
var HibernatingConnectionManager = class {
	static {
		__name(this, "HibernatingConnectionManager");
	}
	constructor(controller) {
		this.controller = controller;
	}
	getCount() {
		return Number(this.controller.getWebSockets().length);
	}
	getConnection(id) {
		const sockets = this.controller.getWebSockets(id);
		if (sockets.length === 0) return void 0;
		if (sockets.length === 1) return createLazyConnection(sockets[0]);
		throw new Error(
			`More than one connection found for id ${id}. Did you mean to use getConnections(tag) instead?`,
		);
	}
	getConnections(tag2) {
		return new HibernatingConnectionIterator(this.controller, tag2);
	}
	accept(connection, options2) {
		const tags = [connection.id, ...options2.tags.filter((t) => t !== connection.id)];
		if (tags.length > 10) {
			throw new Error("A connection can only have 10 tags, including the default id tag.");
		}
		for (const tag2 of tags) {
			if (typeof tag2 !== "string") {
				throw new Error(`A connection tag must be a string. Received: ${tag2}`);
			}
			if (tag2 === "") {
				throw new Error("A connection tag must not be an empty string.");
			}
			if (tag2.length > 256) {
				throw new Error("A connection tag must not exceed 256 characters");
			}
		}
		this.controller.acceptWebSocket(connection, tags);
		connection.serializeAttachment({
			__pk: {
				id: connection.id,
				server: options2.server,
			},
			__user: null,
		});
		return createLazyConnection(connection);
	}
};
var Server = class extends DurableObject {
	static {
		__name(this, "Server");
	}
	static options = {
		hibernate: false,
	};
	#status = "zero";
	#ParentClass = Object.getPrototypeOf(this).constructor;
	#connectionManager = this.#ParentClass.options.hibernate
		? new HibernatingConnectionManager(this.ctx)
		: new InMemoryConnectionManager();
	// biome-ignore lint/complexity/noUselessConstructor: <explanation>
	constructor(ctx, env4) {
		super(ctx, env4);
	}
	/**
	 * Handle incoming requests to the server.
	 */
	async fetch(request) {
		if (!this.#_name) {
			const room = request.headers.get("x-partykit-room");
			if (
				// !namespace ||
				!room
			) {
				throw new Error(`Missing namespace or room headers when connecting to ${this.#ParentClass.name}.
Did you try connecting directly to this Durable Object? Try using getServerByName(namespace, id) instead.`);
			}
			await this.setName(room);
		}
		try {
			const url = new URL(request.url);
			if (url.pathname === "/cdn-cgi/partyserver/set-name/") {
				return Response.json({ ok: true });
			}
			if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
				return await this.onRequest(request);
			} else {
				const { 0: clientWebSocket, 1: serverWebSocket } = new WebSocketPair();
				let connectionId = url.searchParams.get("_pk");
				if (!connectionId) {
					connectionId = nanoid();
				}
				let connection = Object.assign(serverWebSocket, {
					id: connectionId,
					server: this.name,
					state: null,
					setState(setState) {
						let state;
						if (setState instanceof Function) {
							state = setState(this.state);
						} else {
							state = setState;
						}
						this.state = state;
						return this.state;
					},
				});
				const ctx = { request };
				const tags = await this.getConnectionTags(connection, ctx);
				connection = this.#connectionManager.accept(connection, {
					tags,
					server: this.name,
				});
				if (!this.#ParentClass.options.hibernate) {
					this.#attachSocketEventHandlers(connection);
				}
				await this.onConnect(connection, ctx);
				return new Response(null, { status: 101, webSocket: clientWebSocket });
			}
		} catch (err) {
			console.error(`Error in ${this.#ParentClass.name}:${this.name} fetch:`, err);
			if (!(err instanceof Error)) throw err;
			if (request.headers.get("Upgrade") === "websocket") {
				const pair = new WebSocketPair();
				pair[1].accept();
				pair[1].send(JSON.stringify({ error: err.stack }));
				pair[1].close(1011, "Uncaught exception during session setup");
				return new Response(null, { status: 101, webSocket: pair[0] });
			} else {
				return new Response(err.stack, { status: 500 });
			}
		}
	}
	async webSocketMessage(ws, message) {
		const connection = createLazyConnection(ws);
		await this.setName(connection.server);
		if (this.#status !== "started") {
			await this.#initialize();
		}
		return this.onMessage(connection, message);
	}
	async webSocketClose(ws, code, reason, wasClean) {
		const connection = createLazyConnection(ws);
		await this.setName(connection.server);
		if (this.#status !== "started") {
			await this.#initialize();
		}
		return this.onClose(connection, code, reason, wasClean);
	}
	async webSocketError(ws, error3) {
		const connection = createLazyConnection(ws);
		await this.setName(connection.server);
		if (this.#status !== "started") {
			await this.#initialize();
		}
		return this.onError(connection, error3);
	}
	async #initialize() {
		await this.ctx.blockConcurrencyWhile(async () => {
			this.#status = "starting";
			await this.onStart();
			this.#status = "started";
		});
	}
	#attachSocketEventHandlers(connection) {
		const handleMessageFromClient = /* @__PURE__ */ __name((event) => {
			this.onMessage(connection, event.data)?.catch((e) => {
				console.error("onMessage error:", e);
			});
		}, "handleMessageFromClient");
		const handleCloseFromClient = /* @__PURE__ */ __name((event) => {
			connection.removeEventListener("message", handleMessageFromClient);
			connection.removeEventListener("close", handleCloseFromClient);
			this.onClose(connection, event.code, event.reason, event.wasClean)?.catch((e) => {
				console.error("onClose error:", e);
			});
		}, "handleCloseFromClient");
		const handleErrorFromClient = /* @__PURE__ */ __name((e) => {
			connection.removeEventListener("message", handleMessageFromClient);
			connection.removeEventListener("error", handleErrorFromClient);
			this.onError(connection, e.error)?.catch((e2) => {
				console.error("onError error:", e2);
			});
		}, "handleErrorFromClient");
		connection.addEventListener("close", handleCloseFromClient);
		connection.addEventListener("error", handleErrorFromClient);
		connection.addEventListener("message", handleMessageFromClient);
	}
	// Public API
	#_name;
	#_longErrorAboutNameThrown = false;
	/**
	 * The name for this server. Write-once-only.
	 */
	get name() {
		if (!this.#_name) {
			if (!this.#_longErrorAboutNameThrown) {
				this.#_longErrorAboutNameThrown = true;
				throw new Error(
					`Attempting to read .name on ${this.#ParentClass.name} before it was set. The name can be set by explicitly calling .setName(name) on the stub, or by using routePartyKitRequest(). This is a known issue and will be fixed soon. Follow https://github.com/cloudflare/workerd/issues/2240 for more updates.`,
				);
			} else {
				throw new Error(
					`Attempting to read .name on ${this.#ParentClass.name} before it was set.`,
				);
			}
		}
		return this.#_name;
	}
	// We won't have an await inside this function
	// but it will be called remotely,
	// so we need to mark it as async
	async setName(name) {
		if (!name) {
			throw new Error("A name is required.");
		}
		if (this.#_name && this.#_name !== name) {
			throw new Error("This server already has a name.");
		}
		this.#_name = name;
		if (this.#status !== "started") {
			await this.ctx.blockConcurrencyWhile(async () => {
				await this.#initialize();
			});
		}
	}
	#sendMessageToConnection(connection, message) {
		try {
			connection.send(message);
		} catch (_e) {
			connection.close(1011, "Unexpected error");
		}
	}
	/** Send a message to all connected clients, except connection ids listed in `without` */
	broadcast(msg, without) {
		for (const connection of this.#connectionManager.getConnections()) {
			if (!without || !without.includes(connection.id)) {
				this.#sendMessageToConnection(connection, msg);
			}
		}
	}
	/** Get a connection by connection id */
	getConnection(id) {
		return this.#connectionManager.getConnection(id);
	}
	/**
	 * Get all connections. Optionally, you can provide a tag to filter returned connections.
	 * Use `Server#getConnectionTags` to tag the connection on connect.
	 */
	getConnections(tag2) {
		return this.#connectionManager.getConnections(tag2);
	}
	/**
	 * You can tag a connection to filter them in Server#getConnections.
	 * Each connection supports up to 9 tags, each tag max length is 256 characters.
	 */
	getConnectionTags(connection, context2) {
		return [];
	}
	// Implemented by the user
	/**
	 * Called when the server is started for the first time.
	 */
	onStart() {}
	/**
	 * Called when a new connection is made to the server.
	 */
	onConnect(connection, ctx) {
		console.log(
			`Connection ${connection.id} connected to ${this.#ParentClass.name}:${this.name}`,
		);
	}
	/**
	 * Called when a message is received from a connection.
	 */
	onMessage(connection, message) {
		console.log(`Received message on connection ${this.#ParentClass.name}:${connection.id}`);
		console.info(`Implement onMessage on ${this.#ParentClass.name} to handle this message.`);
	}
	/**
	 * Called when a connection is closed.
	 */
	onClose(connection, code, reason, wasClean) {}
	/**
	 * Called when an error occurs on a connection.
	 */
	onError(connection, error3) {
		console.error(
			`Error on connection ${connection.id} in ${this.#ParentClass.name}:${this.name}:`,
			error3,
		);
		console.info(`Implement onError on ${this.#ParentClass.name} to handle this error.`);
	}
	/**
	 * Called when a request is made to the server.
	 */
	onRequest(request) {
		console.warn(
			`onRequest hasn't been implemented on ${this.#ParentClass.name}:${this.name} responding to ${request.url}`,
		);
		return new Response("Not implemented", { status: 404 });
	}
	onAlarm() {
		console.log(`Implement onAlarm on ${this.#ParentClass.name} to handle alarms.`);
	}
	async alarm() {
		if (this.#status !== "started") {
			await this.#initialize();
		}
		await this.onAlarm();
	}
};

// node_modules/cron-schedule/dist/cron-parser.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/cron-schedule/dist/cron.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/cron-schedule/dist/utils.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function extractDateElements(date) {
	return {
		second: date.getSeconds(),
		minute: date.getMinutes(),
		hour: date.getHours(),
		day: date.getDate(),
		month: date.getMonth(),
		weekday: date.getDay(),
		year: date.getFullYear(),
	};
}
__name(extractDateElements, "extractDateElements");
function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}
__name(getDaysInMonth, "getDaysInMonth");
function getDaysBetweenWeekdays(weekday1, weekday2) {
	if (weekday1 <= weekday2) {
		return weekday2 - weekday1;
	}
	return 6 - weekday1 + weekday2 + 1;
}
__name(getDaysBetweenWeekdays, "getDaysBetweenWeekdays");

// node_modules/cron-schedule/dist/cron.js
var Cron = class {
	static {
		__name(this, "Cron");
	}
	constructor({ seconds, minutes, hours, days, months, weekdays }) {
		if (!seconds || seconds.size === 0)
			throw new Error("There must be at least one allowed second.");
		if (!minutes || minutes.size === 0)
			throw new Error("There must be at least one allowed minute.");
		if (!hours || hours.size === 0) throw new Error("There must be at least one allowed hour.");
		if (!months || months.size === 0)
			throw new Error("There must be at least one allowed month.");
		if ((!weekdays || weekdays.size === 0) && (!days || days.size === 0))
			throw new Error("There must be at least one allowed day or weekday.");
		this.seconds = Array.from(seconds).sort((a, b) => a - b);
		this.minutes = Array.from(minutes).sort((a, b) => a - b);
		this.hours = Array.from(hours).sort((a, b) => a - b);
		this.days = Array.from(days).sort((a, b) => a - b);
		this.months = Array.from(months).sort((a, b) => a - b);
		this.weekdays = Array.from(weekdays).sort((a, b) => a - b);
		const validateData = /* @__PURE__ */ __name((name, data, constraint) => {
			if (
				data.some(
					(x) =>
						typeof x !== "number" ||
						x % 1 !== 0 ||
						x < constraint.min ||
						x > constraint.max,
				)
			) {
				throw new Error(
					`${name} must only consist of integers which are within the range of ${constraint.min} and ${constraint.max}`,
				);
			}
		}, "validateData");
		validateData("seconds", this.seconds, { min: 0, max: 59 });
		validateData("minutes", this.minutes, { min: 0, max: 59 });
		validateData("hours", this.hours, { min: 0, max: 23 });
		validateData("days", this.days, { min: 1, max: 31 });
		validateData("months", this.months, { min: 0, max: 11 });
		validateData("weekdays", this.weekdays, { min: 0, max: 6 });
		this.reversed = {
			seconds: this.seconds.map((x) => x).reverse(),
			minutes: this.minutes.map((x) => x).reverse(),
			hours: this.hours.map((x) => x).reverse(),
			days: this.days.map((x) => x).reverse(),
			months: this.months.map((x) => x).reverse(),
			weekdays: this.weekdays.map((x) => x).reverse(),
		};
	}
	/**
	 * Find the next or previous hour, starting from the given start hour that matches the hour constraint.
	 * startHour itself might also be allowed.
	 */
	findAllowedHour(dir3, startHour) {
		return dir3 === "next"
			? this.hours.find((x) => x >= startHour)
			: this.reversed.hours.find((x) => x <= startHour);
	}
	/**
	 * Find the next or previous minute, starting from the given start minute that matches the minute constraint.
	 * startMinute itself might also be allowed.
	 */
	findAllowedMinute(dir3, startMinute) {
		return dir3 === "next"
			? this.minutes.find((x) => x >= startMinute)
			: this.reversed.minutes.find((x) => x <= startMinute);
	}
	/**
	 * Find the next or previous second, starting from the given start second that matches the second constraint.
	 * startSecond itself IS NOT allowed.
	 */
	findAllowedSecond(dir3, startSecond) {
		return dir3 === "next"
			? this.seconds.find((x) => x > startSecond)
			: this.reversed.seconds.find((x) => x < startSecond);
	}
	/**
	 * Find the next or previous time, starting from the given start time that matches the hour, minute
	 * and second constraints. startTime itself might also be allowed.
	 */
	findAllowedTime(dir3, startTime) {
		let hour = this.findAllowedHour(dir3, startTime.hour);
		if (hour !== void 0) {
			if (hour === startTime.hour) {
				let minute = this.findAllowedMinute(dir3, startTime.minute);
				if (minute !== void 0) {
					if (minute === startTime.minute) {
						const second = this.findAllowedSecond(dir3, startTime.second);
						if (second !== void 0) {
							return { hour, minute, second };
						}
						minute = this.findAllowedMinute(
							dir3,
							dir3 === "next" ? startTime.minute + 1 : startTime.minute - 1,
						);
						if (minute !== void 0) {
							return {
								hour,
								minute,
								second:
									dir3 === "next" ? this.seconds[0] : this.reversed.seconds[0],
							};
						}
					} else {
						return {
							hour,
							minute,
							second: dir3 === "next" ? this.seconds[0] : this.reversed.seconds[0],
						};
					}
				}
				hour = this.findAllowedHour(
					dir3,
					dir3 === "next" ? startTime.hour + 1 : startTime.hour - 1,
				);
				if (hour !== void 0) {
					return {
						hour,
						minute: dir3 === "next" ? this.minutes[0] : this.reversed.minutes[0],
						second: dir3 === "next" ? this.seconds[0] : this.reversed.seconds[0],
					};
				}
			} else {
				return {
					hour,
					minute: dir3 === "next" ? this.minutes[0] : this.reversed.minutes[0],
					second: dir3 === "next" ? this.seconds[0] : this.reversed.seconds[0],
				};
			}
		}
		return void 0;
	}
	/**
	 * Find the next or previous day in the given month, starting from the given startDay
	 * that matches either the day or the weekday constraint. startDay itself might also be allowed.
	 */
	findAllowedDayInMonth(dir3, year, month, startDay) {
		var _a2, _b;
		if (startDay < 1) throw new Error("startDay must not be smaller than 1.");
		const daysInMonth = getDaysInMonth(year, month);
		const daysRestricted = this.days.length !== 31;
		const weekdaysRestricted = this.weekdays.length !== 7;
		if (!daysRestricted && !weekdaysRestricted) {
			if (startDay > daysInMonth) {
				return dir3 === "next" ? void 0 : daysInMonth;
			}
			return startDay;
		}
		let allowedDayByDays;
		if (daysRestricted) {
			allowedDayByDays =
				dir3 === "next"
					? this.days.find((x) => x >= startDay)
					: this.reversed.days.find((x) => x <= startDay);
			if (allowedDayByDays !== void 0 && allowedDayByDays > daysInMonth) {
				allowedDayByDays = void 0;
			}
		}
		let allowedDayByWeekdays;
		if (weekdaysRestricted) {
			const startWeekday = new Date(year, month, startDay).getDay();
			const nearestAllowedWeekday =
				dir3 === "next"
					? (_a2 = this.weekdays.find((x) => x >= startWeekday)) !== null &&
						_a2 !== void 0
						? _a2
						: this.weekdays[0]
					: (_b = this.reversed.weekdays.find((x) => x <= startWeekday)) !== null &&
							_b !== void 0
						? _b
						: this.reversed.weekdays[0];
			if (nearestAllowedWeekday !== void 0) {
				const daysBetweenWeekdays =
					dir3 === "next"
						? getDaysBetweenWeekdays(startWeekday, nearestAllowedWeekday)
						: getDaysBetweenWeekdays(nearestAllowedWeekday, startWeekday);
				allowedDayByWeekdays =
					dir3 === "next"
						? startDay + daysBetweenWeekdays
						: startDay - daysBetweenWeekdays;
				if (allowedDayByWeekdays > daysInMonth || allowedDayByWeekdays < 1) {
					allowedDayByWeekdays = void 0;
				}
			}
		}
		if (allowedDayByDays !== void 0 && allowedDayByWeekdays !== void 0) {
			return dir3 === "next"
				? Math.min(allowedDayByDays, allowedDayByWeekdays)
				: Math.max(allowedDayByDays, allowedDayByWeekdays);
		}
		if (allowedDayByDays !== void 0) {
			return allowedDayByDays;
		}
		if (allowedDayByWeekdays !== void 0) {
			return allowedDayByWeekdays;
		}
		return void 0;
	}
	/** Gets the next date starting from the given start date or now. */
	getNextDate(startDate = /* @__PURE__ */ new Date()) {
		const startDateElements = extractDateElements(startDate);
		let minYear = startDateElements.year;
		let startIndexMonth = this.months.findIndex((x) => x >= startDateElements.month);
		if (startIndexMonth === -1) {
			startIndexMonth = 0;
			minYear++;
		}
		const maxIterations = this.months.length * 5;
		for (let i = 0; i < maxIterations; i++) {
			const year = minYear + Math.floor((startIndexMonth + i) / this.months.length);
			const month = this.months[(startIndexMonth + i) % this.months.length];
			const isStartMonth =
				year === startDateElements.year && month === startDateElements.month;
			let day = this.findAllowedDayInMonth(
				"next",
				year,
				month,
				isStartMonth ? startDateElements.day : 1,
			);
			let isStartDay = isStartMonth && day === startDateElements.day;
			if (day !== void 0 && isStartDay) {
				const nextTime = this.findAllowedTime("next", startDateElements);
				if (nextTime !== void 0) {
					return new Date(
						year,
						month,
						day,
						nextTime.hour,
						nextTime.minute,
						nextTime.second,
					);
				}
				day = this.findAllowedDayInMonth("next", year, month, day + 1);
				isStartDay = false;
			}
			if (day !== void 0 && !isStartDay) {
				return new Date(year, month, day, this.hours[0], this.minutes[0], this.seconds[0]);
			}
		}
		throw new Error("No valid next date was found.");
	}
	/** Gets the specified amount of future dates starting from the given start date or now. */
	getNextDates(amount, startDate) {
		const dates = [];
		let nextDate;
		for (let i = 0; i < amount; i++) {
			nextDate = this.getNextDate(
				nextDate !== null && nextDate !== void 0 ? nextDate : startDate,
			);
			dates.push(nextDate);
		}
		return dates;
	}
	/**
	 * Get an ES6 compatible iterator which iterates over the next dates starting from startDate or now.
	 * The iterator runs until the optional endDate is reached or forever.
	 */
	*getNextDatesIterator(startDate, endDate) {
		let nextDate;
		while (true) {
			nextDate = this.getNextDate(
				nextDate !== null && nextDate !== void 0 ? nextDate : startDate,
			);
			if (endDate && endDate.getTime() < nextDate.getTime()) {
				return;
			}
			yield nextDate;
		}
	}
	/** Gets the previous date starting from the given start date or now. */
	getPrevDate(startDate = /* @__PURE__ */ new Date()) {
		const startDateElements = extractDateElements(startDate);
		let maxYear = startDateElements.year;
		let startIndexMonth = this.reversed.months.findIndex((x) => x <= startDateElements.month);
		if (startIndexMonth === -1) {
			startIndexMonth = 0;
			maxYear--;
		}
		const maxIterations = this.reversed.months.length * 5;
		for (let i = 0; i < maxIterations; i++) {
			const year = maxYear - Math.floor((startIndexMonth + i) / this.reversed.months.length);
			const month = this.reversed.months[(startIndexMonth + i) % this.reversed.months.length];
			const isStartMonth =
				year === startDateElements.year && month === startDateElements.month;
			let day = this.findAllowedDayInMonth(
				"prev",
				year,
				month,
				isStartMonth
					? startDateElements.day
					: // Start searching from the last day of the month.
						getDaysInMonth(year, month),
			);
			let isStartDay = isStartMonth && day === startDateElements.day;
			if (day !== void 0 && isStartDay) {
				const prevTime = this.findAllowedTime("prev", startDateElements);
				if (prevTime !== void 0) {
					return new Date(
						year,
						month,
						day,
						prevTime.hour,
						prevTime.minute,
						prevTime.second,
					);
				}
				if (day > 1) {
					day = this.findAllowedDayInMonth("prev", year, month, day - 1);
					isStartDay = false;
				}
			}
			if (day !== void 0 && !isStartDay) {
				return new Date(
					year,
					month,
					day,
					this.reversed.hours[0],
					this.reversed.minutes[0],
					this.reversed.seconds[0],
				);
			}
		}
		throw new Error("No valid previous date was found.");
	}
	/** Gets the specified amount of previous dates starting from the given start date or now. */
	getPrevDates(amount, startDate) {
		const dates = [];
		let prevDate;
		for (let i = 0; i < amount; i++) {
			prevDate = this.getPrevDate(
				prevDate !== null && prevDate !== void 0 ? prevDate : startDate,
			);
			dates.push(prevDate);
		}
		return dates;
	}
	/**
	 * Get an ES6 compatible iterator which iterates over the previous dates starting from startDate or now.
	 * The iterator runs until the optional endDate is reached or forever.
	 */
	*getPrevDatesIterator(startDate, endDate) {
		let prevDate;
		while (true) {
			prevDate = this.getPrevDate(
				prevDate !== null && prevDate !== void 0 ? prevDate : startDate,
			);
			if (endDate && endDate.getTime() > prevDate.getTime()) {
				return;
			}
			yield prevDate;
		}
	}
	/** Returns true when there is a cron date at the given date. */
	matchDate(date) {
		const { second, minute, hour, day, month, weekday } = extractDateElements(date);
		if (
			this.seconds.indexOf(second) === -1 ||
			this.minutes.indexOf(minute) === -1 ||
			this.hours.indexOf(hour) === -1 ||
			this.months.indexOf(month) === -1
		) {
			return false;
		}
		if (this.days.length !== 31 && this.weekdays.length !== 7) {
			return this.days.indexOf(day) !== -1 || this.weekdays.indexOf(weekday) !== -1;
		}
		return this.days.indexOf(day) !== -1 && this.weekdays.indexOf(weekday) !== -1;
	}
};

// node_modules/cron-schedule/dist/cron-parser.js
var secondConstraint = {
	min: 0,
	max: 59,
};
var minuteConstraint = {
	min: 0,
	max: 59,
};
var hourConstraint = {
	min: 0,
	max: 23,
};
var dayConstraint = {
	min: 1,
	max: 31,
};
var monthConstraint = {
	min: 1,
	max: 12,
	aliases: {
		jan: "1",
		feb: "2",
		mar: "3",
		apr: "4",
		may: "5",
		jun: "6",
		jul: "7",
		aug: "8",
		sep: "9",
		oct: "10",
		nov: "11",
		dec: "12",
	},
};
var weekdayConstraint = {
	min: 0,
	max: 7,
	aliases: {
		mon: "1",
		tue: "2",
		wed: "3",
		thu: "4",
		fri: "5",
		sat: "6",
		sun: "7",
	},
};
var timeNicknames = {
	"@yearly": "0 0 1 1 *",
	"@annually": "0 0 1 1 *",
	"@monthly": "0 0 1 * *",
	"@weekly": "0 0 * * 0",
	"@daily": "0 0 * * *",
	"@hourly": "0 * * * *",
	"@minutely": "* * * * *",
};
function parseElement(element, constraint) {
	const result = /* @__PURE__ */ new Set();
	if (element === "*") {
		for (let i = constraint.min; i <= constraint.max; i = i + 1) {
			result.add(i);
		}
		return result;
	}
	const listElements = element.split(",");
	if (listElements.length > 1) {
		for (const listElement of listElements) {
			const parsedListElement = parseElement(listElement, constraint);
			for (const x of parsedListElement) {
				result.add(x);
			}
		}
		return result;
	}
	const parseSingleElement = /* @__PURE__ */ __name((singleElement) => {
		var _a2, _b;
		singleElement =
			(_b =
				(_a2 = constraint.aliases) === null || _a2 === void 0
					? void 0
					: _a2[singleElement.toLowerCase()]) !== null && _b !== void 0
				? _b
				: singleElement;
		const parsedElement = Number.parseInt(singleElement, 10);
		if (Number.isNaN(parsedElement)) {
			throw new Error(`Failed to parse ${element}: ${singleElement} is NaN.`);
		}
		if (parsedElement < constraint.min || parsedElement > constraint.max) {
			throw new Error(
				`Failed to parse ${element}: ${singleElement} is outside of constraint range of ${constraint.min} - ${constraint.max}.`,
			);
		}
		return parsedElement;
	}, "parseSingleElement");
	const rangeSegments = /^(([0-9a-zA-Z]+)-([0-9a-zA-Z]+)|\*)(\/([0-9]+))?$/.exec(element);
	if (rangeSegments === null) {
		result.add(parseSingleElement(element));
		return result;
	}
	let parsedStart =
		rangeSegments[1] === "*" ? constraint.min : parseSingleElement(rangeSegments[2]);
	const parsedEnd =
		rangeSegments[1] === "*" ? constraint.max : parseSingleElement(rangeSegments[3]);
	if (
		constraint === weekdayConstraint &&
		parsedStart === 7 && // this check ensures that sun-sun is not incorrectly parsed as [0,1,2,3,4,5,6]
		parsedEnd !== 7
	) {
		parsedStart = 0;
	}
	if (parsedStart > parsedEnd) {
		throw new Error(
			`Failed to parse ${element}: Invalid range (start: ${parsedStart}, end: ${parsedEnd}).`,
		);
	}
	const step = rangeSegments[5];
	let parsedStep = 1;
	if (step !== void 0) {
		parsedStep = Number.parseInt(step, 10);
		if (Number.isNaN(parsedStep)) {
			throw new Error(`Failed to parse step: ${step} is NaN.`);
		}
		if (parsedStep < 1) {
			throw new Error(`Failed to parse step: Expected ${step} to be greater than 0.`);
		}
	}
	for (let i = parsedStart; i <= parsedEnd; i = i + parsedStep) {
		result.add(i);
	}
	return result;
}
__name(parseElement, "parseElement");
function parseCronExpression(cronExpression) {
	var _a2;
	if (typeof cronExpression !== "string") {
		throw new TypeError("Invalid cron expression: must be of type string.");
	}
	cronExpression =
		(_a2 = timeNicknames[cronExpression.toLowerCase()]) !== null && _a2 !== void 0
			? _a2
			: cronExpression;
	const elements = cronExpression.split(" ").filter((elem) => elem.length > 0);
	if (elements.length < 5 || elements.length > 6) {
		throw new Error("Invalid cron expression: expected 5 or 6 elements.");
	}
	const rawSeconds = elements.length === 6 ? elements[0] : "0";
	const rawMinutes = elements.length === 6 ? elements[1] : elements[0];
	const rawHours = elements.length === 6 ? elements[2] : elements[1];
	const rawDays = elements.length === 6 ? elements[3] : elements[2];
	const rawMonths = elements.length === 6 ? elements[4] : elements[3];
	const rawWeekdays = elements.length === 6 ? elements[5] : elements[4];
	return new Cron({
		seconds: parseElement(rawSeconds, secondConstraint),
		minutes: parseElement(rawMinutes, minuteConstraint),
		hours: parseElement(rawHours, hourConstraint),
		days: parseElement(rawDays, dayConstraint),
		// months in cron are indexed by 1, but Cron expects indexes by 0, so we need to reduce all set values by one.
		months: new Set(Array.from(parseElement(rawMonths, monthConstraint)).map((x) => x - 1)),
		weekdays: new Set(
			Array.from(parseElement(rawWeekdays, weekdayConstraint)).map((x) => x % 7),
		),
	});
}
__name(parseCronExpression, "parseCronExpression");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/async_hooks.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var workerdAsyncHooks = process.getBuiltinModule("node:async_hooks");
var { AsyncLocalStorage, AsyncResource } = workerdAsyncHooks;

// node_modules/agents/dist/chunk-YMUU7QHV.js
import { WorkflowEntrypoint as CFWorkflowEntrypoint } from "cloudflare:workers";
function isRPCRequest(msg) {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		msg.type === "rpc" &&
		"id" in msg &&
		typeof msg.id === "string" &&
		"method" in msg &&
		typeof msg.method === "string" &&
		"args" in msg &&
		Array.isArray(msg.args)
	);
}
__name(isRPCRequest, "isRPCRequest");
function isStateUpdateMessage(msg) {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		msg.type === "cf_agent_state" &&
		"state" in msg
	);
}
__name(isStateUpdateMessage, "isStateUpdateMessage");
var callableMetadata = /* @__PURE__ */ new Map();
function getNextCronTime(cron) {
	const interval = parseCronExpression(cron);
	return interval.getNextDate();
}
__name(getNextCronTime, "getNextCronTime");
var STATE_ROW_ID = "cf_state_row_id";
var STATE_WAS_CHANGED = "cf_state_was_changed";
var DEFAULT_STATE = {};
var unstable_context = new AsyncLocalStorage();
var _state;
var _Agent_instances;
var setStateInternal_fn;
var tryCatch_fn;
var scheduleNextAlarm_fn;
var isCallable_fn;
var Agent = class extends Server {
	static {
		__name(this, "Agent");
	}
	constructor(ctx, env4) {
		super(ctx, env4);
		__privateAdd2(this, _Agent_instances);
		__privateAdd2(this, _state, DEFAULT_STATE);
		this.initialState = DEFAULT_STATE;
		this.sql`
      CREATE TABLE IF NOT EXISTS cf_agents_state (
        id TEXT PRIMARY KEY NOT NULL,
        state TEXT
      )
    `;
		void this.ctx.blockConcurrencyWhile(async () => {
			return __privateMethod(this, _Agent_instances, tryCatch_fn).call(this, async () => {
				this.sql`
        CREATE TABLE IF NOT EXISTS cf_agents_schedules (
          id TEXT PRIMARY KEY NOT NULL DEFAULT (randomblob(9)),
          callback TEXT,
          payload TEXT,
          type TEXT NOT NULL CHECK(type IN ('scheduled', 'delayed', 'cron')),
          time INTEGER,
          delayInSeconds INTEGER,
          cron TEXT,
          created_at INTEGER DEFAULT (unixepoch())
        )
      `;
				await this.alarm();
			});
		});
		const _onMessage = this.onMessage.bind(this);
		this.onMessage = async (connection, message) => {
			return unstable_context.run({ agent: this, connection, request: void 0 }, async () => {
				if (typeof message !== "string") {
					return __privateMethod(this, _Agent_instances, tryCatch_fn).call(this, () =>
						_onMessage(connection, message),
					);
				}
				let parsed;
				try {
					parsed = JSON.parse(message);
				} catch (e) {
					return __privateMethod(this, _Agent_instances, tryCatch_fn).call(this, () =>
						_onMessage(connection, message),
					);
				}
				if (isStateUpdateMessage(parsed)) {
					__privateMethod(this, _Agent_instances, setStateInternal_fn).call(
						this,
						parsed.state,
						connection,
					);
					return;
				}
				if (isRPCRequest(parsed)) {
					try {
						const { id, method, args } = parsed;
						const methodFn = this[method];
						if (typeof methodFn !== "function") {
							throw new Error(`Method ${method} does not exist`);
						}
						if (
							!__privateMethod(this, _Agent_instances, isCallable_fn).call(
								this,
								method,
							)
						) {
							throw new Error(`Method ${method} is not callable`);
						}
						const metadata = callableMetadata.get(methodFn);
						if (metadata?.streaming) {
							const stream = new StreamingResponse(connection, id);
							await methodFn.apply(this, [stream, ...args]);
							return;
						}
						const result = await methodFn.apply(this, args);
						const response = {
							type: "rpc",
							id,
							success: true,
							result,
							done: true,
						};
						connection.send(JSON.stringify(response));
					} catch (e) {
						const response = {
							type: "rpc",
							id: parsed.id,
							success: false,
							error: e instanceof Error ? e.message : "Unknown error occurred",
						};
						connection.send(JSON.stringify(response));
						console.error("RPC error:", e);
					}
					return;
				}
				return __privateMethod(this, _Agent_instances, tryCatch_fn).call(this, () =>
					_onMessage(connection, message),
				);
			});
		};
		const _onConnect = this.onConnect.bind(this);
		this.onConnect = (connection, ctx2) => {
			return unstable_context.run(
				{ agent: this, connection, request: ctx2.request },
				async () => {
					setTimeout(() => {
						if (this.state) {
							connection.send(
								JSON.stringify({
									type: "cf_agent_state",
									state: this.state,
								}),
							);
						}
						return __privateMethod(this, _Agent_instances, tryCatch_fn).call(this, () =>
							_onConnect(connection, ctx2),
						);
					}, 20);
				},
			);
		};
	}
	/**
	 * Current state of the Agent
	 */
	get state() {
		if (__privateGet2(this, _state) !== DEFAULT_STATE) {
			return __privateGet2(this, _state);
		}
		const wasChanged = this.sql`
        SELECT state FROM cf_agents_state WHERE id = ${STATE_WAS_CHANGED}
      `;
		const result = this.sql`
      SELECT state FROM cf_agents_state WHERE id = ${STATE_ROW_ID}
    `;
		if (
			wasChanged[0]?.state === "true" || // we do this check for people who updated their code before we shipped wasChanged
			result[0]?.state
		) {
			const state = result[0]?.state;
			__privateSet2(this, _state, JSON.parse(state));
			return __privateGet2(this, _state);
		}
		if (this.initialState === DEFAULT_STATE) {
			return void 0;
		}
		this.setState(this.initialState);
		return this.initialState;
	}
	/**
	 * Execute SQL queries against the Agent's database
	 * @template T Type of the returned rows
	 * @param strings SQL query template strings
	 * @param values Values to be inserted into the query
	 * @returns Array of query results
	 */
	sql(strings, ...values) {
		let query = "";
		try {
			query = strings.reduce((acc, str, i) => acc + str + (i < values.length ? "?" : ""), "");
			return [...this.ctx.storage.sql.exec(query, ...values)];
		} catch (e) {
			console.error(`failed to execute sql query: ${query}`, e);
			throw this.onError(e);
		}
	}
	/**
	 * Update the Agent's state
	 * @param state New state to set
	 */
	setState(state) {
		__privateMethod(this, _Agent_instances, setStateInternal_fn).call(this, state, "server");
	}
	/**
	 * Called when the Agent's state is updated
	 * @param state Updated state
	 * @param source Source of the state update ("server" or a client connection)
	 */
	onStateUpdate(state, source) {}
	/**
	 * Called when the Agent receives an email
	 * @param email Email message to process
	 */
	onEmail(email) {
		return unstable_context.run(
			{ agent: this, connection: void 0, request: void 0 },
			async () => {
				console.error("onEmail not implemented");
			},
		);
	}
	onError(connectionOrError, error3) {
		let theError;
		if (connectionOrError && error3) {
			theError = error3;
			console.error("Error on websocket connection:", connectionOrError.id, theError);
			console.error(
				"Override onError(connection, error) to handle websocket connection errors",
			);
		} else {
			theError = connectionOrError;
			console.error("Error on server:", theError);
			console.error("Override onError(error) to handle server errors");
		}
		throw theError;
	}
	/**
	 * Render content (not implemented in base class)
	 */
	render() {
		throw new Error("Not implemented");
	}
	/**
	 * Schedule a task to be executed in the future
	 * @template T Type of the payload data
	 * @param when When to execute the task (Date, seconds delay, or cron expression)
	 * @param callback Name of the method to call
	 * @param payload Data to pass to the callback
	 * @returns Schedule object representing the scheduled task
	 */
	async schedule(when, callback, payload) {
		const id = nanoid(9);
		if (typeof callback !== "string") {
			throw new Error("Callback must be a string");
		}
		if (typeof this[callback] !== "function") {
			throw new Error(`this.${callback} is not a function`);
		}
		if (when instanceof Date) {
			const timestamp = Math.floor(when.getTime() / 1e3);
			this.sql`
        INSERT OR REPLACE INTO cf_agents_schedules (id, callback, payload, type, time)
        VALUES (${id}, ${callback}, ${JSON.stringify(payload)}, 'scheduled', ${timestamp})
      `;
			await __privateMethod(this, _Agent_instances, scheduleNextAlarm_fn).call(this);
			return {
				id,
				callback,
				payload,
				time: timestamp,
				type: "scheduled",
			};
		}
		if (typeof when === "number") {
			const time3 = new Date(Date.now() + when * 1e3);
			const timestamp = Math.floor(time3.getTime() / 1e3);
			this.sql`
        INSERT OR REPLACE INTO cf_agents_schedules (id, callback, payload, type, delayInSeconds, time)
        VALUES (${id}, ${callback}, ${JSON.stringify(payload)}, 'delayed', ${when}, ${timestamp})
      `;
			await __privateMethod(this, _Agent_instances, scheduleNextAlarm_fn).call(this);
			return {
				id,
				callback,
				payload,
				delayInSeconds: when,
				time: timestamp,
				type: "delayed",
			};
		}
		if (typeof when === "string") {
			const nextExecutionTime = getNextCronTime(when);
			const timestamp = Math.floor(nextExecutionTime.getTime() / 1e3);
			this.sql`
        INSERT OR REPLACE INTO cf_agents_schedules (id, callback, payload, type, cron, time)
        VALUES (${id}, ${callback}, ${JSON.stringify(payload)}, 'cron', ${when}, ${timestamp})
      `;
			await __privateMethod(this, _Agent_instances, scheduleNextAlarm_fn).call(this);
			return {
				id,
				callback,
				payload,
				cron: when,
				time: timestamp,
				type: "cron",
			};
		}
		throw new Error("Invalid schedule type");
	}
	/**
	 * Get a scheduled task by ID
	 * @template T Type of the payload data
	 * @param id ID of the scheduled task
	 * @returns The Schedule object or undefined if not found
	 */
	async getSchedule(id) {
		const result = this.sql`
      SELECT * FROM cf_agents_schedules WHERE id = ${id}
    `;
		if (!result) {
			console.error(`schedule ${id} not found`);
			return void 0;
		}
		return { ...result[0], payload: JSON.parse(result[0].payload) };
	}
	/**
	 * Get scheduled tasks matching the given criteria
	 * @template T Type of the payload data
	 * @param criteria Criteria to filter schedules
	 * @returns Array of matching Schedule objects
	 */
	getSchedules(criteria = {}) {
		let query = "SELECT * FROM cf_agents_schedules WHERE 1=1";
		const params = [];
		if (criteria.id) {
			query += " AND id = ?";
			params.push(criteria.id);
		}
		if (criteria.type) {
			query += " AND type = ?";
			params.push(criteria.type);
		}
		if (criteria.timeRange) {
			query += " AND time >= ? AND time <= ?";
			const start = criteria.timeRange.start || /* @__PURE__ */ new Date(0);
			const end = criteria.timeRange.end || /* @__PURE__ */ new Date(999999999999999);
			params.push(Math.floor(start.getTime() / 1e3), Math.floor(end.getTime() / 1e3));
		}
		const result = this.ctx.storage.sql
			.exec(query, ...params)
			.toArray()
			.map((row) => ({
				...row,
				payload: JSON.parse(row.payload),
			}));
		return result;
	}
	/**
	 * Cancel a scheduled task
	 * @param id ID of the task to cancel
	 * @returns true if the task was cancelled, false otherwise
	 */
	async cancelSchedule(id) {
		this.sql`DELETE FROM cf_agents_schedules WHERE id = ${id}`;
		await __privateMethod(this, _Agent_instances, scheduleNextAlarm_fn).call(this);
		return true;
	}
	/**
	 * Method called when an alarm fires
	 * Executes any scheduled tasks that are due
	 */
	async alarm() {
		const now = Math.floor(Date.now() / 1e3);
		const result = this.sql`
      SELECT * FROM cf_agents_schedules WHERE time <= ${now}
    `;
		for (const row of result || []) {
			const callback = this[row.callback];
			if (!callback) {
				console.error(`callback ${row.callback} not found`);
				continue;
			}
			await unstable_context.run(
				{ agent: this, connection: void 0, request: void 0 },
				async () => {
					try {
						await callback.bind(this)(JSON.parse(row.payload), row);
					} catch (e) {
						console.error(`error executing callback "${row.callback}"`, e);
					}
				},
			);
			if (row.type === "cron") {
				const nextExecutionTime = getNextCronTime(row.cron);
				const nextTimestamp = Math.floor(nextExecutionTime.getTime() / 1e3);
				this.sql`
          UPDATE cf_agents_schedules SET time = ${nextTimestamp} WHERE id = ${row.id}
        `;
			} else {
				this.sql`
          DELETE FROM cf_agents_schedules WHERE id = ${row.id}
        `;
			}
		}
		await __privateMethod(this, _Agent_instances, scheduleNextAlarm_fn).call(this);
	}
	/**
	 * Destroy the Agent, removing all state and scheduled tasks
	 */
	async destroy() {
		this.sql`DROP TABLE IF EXISTS cf_agents_state`;
		this.sql`DROP TABLE IF EXISTS cf_agents_schedules`;
		await this.ctx.storage.deleteAlarm();
		await this.ctx.storage.deleteAll();
	}
};
_state = /* @__PURE__ */ new WeakMap();
_Agent_instances = /* @__PURE__ */ new WeakSet();
setStateInternal_fn = /* @__PURE__ */ __name(function (state, source = "server") {
	__privateSet2(this, _state, state);
	this.sql`
    INSERT OR REPLACE INTO cf_agents_state (id, state)
    VALUES (${STATE_ROW_ID}, ${JSON.stringify(state)})
  `;
	this.sql`
    INSERT OR REPLACE INTO cf_agents_state (id, state)
    VALUES (${STATE_WAS_CHANGED}, ${JSON.stringify(true)})
  `;
	this.broadcast(
		JSON.stringify({
			type: "cf_agent_state",
			state,
		}),
		source !== "server" ? [source.id] : [],
	);
	return __privateMethod(this, _Agent_instances, tryCatch_fn).call(this, () => {
		const { connection, request } = unstable_context.getStore() || {};
		return unstable_context.run({ agent: this, connection, request }, async () => {
			return this.onStateUpdate(state, source);
		});
	});
}, "setStateInternal_fn");
tryCatch_fn = /* @__PURE__ */ __name(async function (fn) {
	try {
		return await fn();
	} catch (e) {
		throw this.onError(e);
	}
}, "tryCatch_fn");
scheduleNextAlarm_fn = /* @__PURE__ */ __name(async function () {
	const result = this.sql`
      SELECT time FROM cf_agents_schedules 
      WHERE time > ${Math.floor(Date.now() / 1e3)}
      ORDER BY time ASC 
      LIMIT 1
    `;
	if (!result) return;
	if (result.length > 0 && "time" in result[0]) {
		const nextTime = result[0].time * 1e3;
		await this.ctx.storage.setAlarm(nextTime);
	}
}, "scheduleNextAlarm_fn");
isCallable_fn = /* @__PURE__ */ __name(function (method) {
	return callableMetadata.has(this[method]);
}, "isCallable_fn");
Agent.options = {
	/** Whether the Agent should hibernate when inactive */
	hibernate: true,
	// default to hibernate
};
var _connection;
var _id;
var _closed;
var StreamingResponse = class {
	static {
		__name(this, "StreamingResponse");
	}
	constructor(connection, id) {
		__privateAdd2(this, _connection);
		__privateAdd2(this, _id);
		__privateAdd2(this, _closed, false);
		__privateSet2(this, _connection, connection);
		__privateSet2(this, _id, id);
	}
	/**
	 * Send a chunk of data to the client
	 * @param chunk The data to send
	 */
	send(chunk) {
		if (__privateGet2(this, _closed)) {
			throw new Error("StreamingResponse is already closed");
		}
		const response = {
			type: "rpc",
			id: __privateGet2(this, _id),
			success: true,
			result: chunk,
			done: false,
		};
		__privateGet2(this, _connection).send(JSON.stringify(response));
	}
	/**
	 * End the stream and send the final chunk (if any)
	 * @param finalChunk Optional final chunk of data to send
	 */
	end(finalChunk) {
		if (__privateGet2(this, _closed)) {
			throw new Error("StreamingResponse is already closed");
		}
		__privateSet2(this, _closed, true);
		const response = {
			type: "rpc",
			id: __privateGet2(this, _id),
			success: true,
			result: finalChunk,
			done: true,
		};
		__privateGet2(this, _connection).send(JSON.stringify(response));
	}
};
_connection = /* @__PURE__ */ new WeakMap();
_id = /* @__PURE__ */ new WeakMap();
_closed = /* @__PURE__ */ new WeakMap();

// node_modules/agents/dist/mcp/index.js
import { DurableObject as DurableObject2 } from "cloudflare:workers";

// node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LATEST_PROTOCOL_VERSION = "2024-11-05";
var SUPPORTED_PROTOCOL_VERSIONS = [LATEST_PROTOCOL_VERSION, "2024-10-07"];
var JSONRPC_VERSION = "2.0";
var ProgressTokenSchema = z.union([z.string(), z.number().int()]);
var CursorSchema = z.string();
var BaseRequestParamsSchema = z
	.object({
		_meta: z.optional(
			z
				.object({
					/**
					 * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
					 */
					progressToken: z.optional(ProgressTokenSchema),
				})
				.passthrough(),
		),
	})
	.passthrough();
var RequestSchema = z.object({
	method: z.string(),
	params: z.optional(BaseRequestParamsSchema),
});
var BaseNotificationParamsSchema = z
	.object({
		/**
		 * This parameter name is reserved by MCP to allow clients and servers to attach additional metadata to their notifications.
		 */
		_meta: z.optional(z.object({}).passthrough()),
	})
	.passthrough();
var NotificationSchema = z.object({
	method: z.string(),
	params: z.optional(BaseNotificationParamsSchema),
});
var ResultSchema = z
	.object({
		/**
		 * This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses.
		 */
		_meta: z.optional(z.object({}).passthrough()),
	})
	.passthrough();
var RequestIdSchema = z.union([z.string(), z.number().int()]);
var JSONRPCRequestSchema = z
	.object({
		jsonrpc: z.literal(JSONRPC_VERSION),
		id: RequestIdSchema,
	})
	.merge(RequestSchema)
	.strict();
var isJSONRPCRequest = /* @__PURE__ */ __name(
	(value) => JSONRPCRequestSchema.safeParse(value).success,
	"isJSONRPCRequest",
);
var JSONRPCNotificationSchema = z
	.object({
		jsonrpc: z.literal(JSONRPC_VERSION),
	})
	.merge(NotificationSchema)
	.strict();
var isJSONRPCNotification = /* @__PURE__ */ __name(
	(value) => JSONRPCNotificationSchema.safeParse(value).success,
	"isJSONRPCNotification",
);
var JSONRPCResponseSchema = z
	.object({
		jsonrpc: z.literal(JSONRPC_VERSION),
		id: RequestIdSchema,
		result: ResultSchema,
	})
	.strict();
var isJSONRPCResponse = /* @__PURE__ */ __name(
	(value) => JSONRPCResponseSchema.safeParse(value).success,
	"isJSONRPCResponse",
);
var ErrorCode;
((ErrorCode2) => {
	ErrorCode2[(ErrorCode2["ConnectionClosed"] = -32e3)] = "ConnectionClosed";
	ErrorCode2[(ErrorCode2["RequestTimeout"] = -32001)] = "RequestTimeout";
	ErrorCode2[(ErrorCode2["ParseError"] = -32700)] = "ParseError";
	ErrorCode2[(ErrorCode2["InvalidRequest"] = -32600)] = "InvalidRequest";
	ErrorCode2[(ErrorCode2["MethodNotFound"] = -32601)] = "MethodNotFound";
	ErrorCode2[(ErrorCode2["InvalidParams"] = -32602)] = "InvalidParams";
	ErrorCode2[(ErrorCode2["InternalError"] = -32603)] = "InternalError";
})(ErrorCode || (ErrorCode = {}));
var JSONRPCErrorSchema = z
	.object({
		jsonrpc: z.literal(JSONRPC_VERSION),
		id: RequestIdSchema,
		error: z.object({
			/**
			 * The error type that occurred.
			 */
			code: z.number().int(),
			/**
			 * A short description of the error. The message SHOULD be limited to a concise single sentence.
			 */
			message: z.string(),
			/**
			 * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
			 */
			data: z.optional(z.unknown()),
		}),
	})
	.strict();
var isJSONRPCError = /* @__PURE__ */ __name(
	(value) => JSONRPCErrorSchema.safeParse(value).success,
	"isJSONRPCError",
);
var JSONRPCMessageSchema = z.union([
	JSONRPCRequestSchema,
	JSONRPCNotificationSchema,
	JSONRPCResponseSchema,
	JSONRPCErrorSchema,
]);
var EmptyResultSchema = ResultSchema.strict();
var CancelledNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/cancelled"),
	params: BaseNotificationParamsSchema.extend({
		/**
		 * The ID of the request to cancel.
		 *
		 * This MUST correspond to the ID of a request previously issued in the same direction.
		 */
		requestId: RequestIdSchema,
		/**
		 * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
		 */
		reason: z.string().optional(),
	}),
});
var ImplementationSchema = z
	.object({
		name: z.string(),
		version: z.string(),
	})
	.passthrough();
var ClientCapabilitiesSchema = z
	.object({
		/**
		 * Experimental, non-standard capabilities that the client supports.
		 */
		experimental: z.optional(z.object({}).passthrough()),
		/**
		 * Present if the client supports sampling from an LLM.
		 */
		sampling: z.optional(z.object({}).passthrough()),
		/**
		 * Present if the client supports listing roots.
		 */
		roots: z.optional(
			z
				.object({
					/**
					 * Whether the client supports issuing notifications for changes to the roots list.
					 */
					listChanged: z.optional(z.boolean()),
				})
				.passthrough(),
		),
	})
	.passthrough();
var InitializeRequestSchema = RequestSchema.extend({
	method: z.literal("initialize"),
	params: BaseRequestParamsSchema.extend({
		/**
		 * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
		 */
		protocolVersion: z.string(),
		capabilities: ClientCapabilitiesSchema,
		clientInfo: ImplementationSchema,
	}),
});
var ServerCapabilitiesSchema = z
	.object({
		/**
		 * Experimental, non-standard capabilities that the server supports.
		 */
		experimental: z.optional(z.object({}).passthrough()),
		/**
		 * Present if the server supports sending log messages to the client.
		 */
		logging: z.optional(z.object({}).passthrough()),
		/**
		 * Present if the server supports sending completions to the client.
		 */
		completions: z.optional(z.object({}).passthrough()),
		/**
		 * Present if the server offers any prompt templates.
		 */
		prompts: z.optional(
			z
				.object({
					/**
					 * Whether this server supports issuing notifications for changes to the prompt list.
					 */
					listChanged: z.optional(z.boolean()),
				})
				.passthrough(),
		),
		/**
		 * Present if the server offers any resources to read.
		 */
		resources: z.optional(
			z
				.object({
					/**
					 * Whether this server supports clients subscribing to resource updates.
					 */
					subscribe: z.optional(z.boolean()),
					/**
					 * Whether this server supports issuing notifications for changes to the resource list.
					 */
					listChanged: z.optional(z.boolean()),
				})
				.passthrough(),
		),
		/**
		 * Present if the server offers any tools to call.
		 */
		tools: z.optional(
			z
				.object({
					/**
					 * Whether this server supports issuing notifications for changes to the tool list.
					 */
					listChanged: z.optional(z.boolean()),
				})
				.passthrough(),
		),
	})
	.passthrough();
var InitializeResultSchema = ResultSchema.extend({
	/**
	 * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
	 */
	protocolVersion: z.string(),
	capabilities: ServerCapabilitiesSchema,
	serverInfo: ImplementationSchema,
	/**
	 * Instructions describing how to use the server and its features.
	 *
	 * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
	 */
	instructions: z.optional(z.string()),
});
var InitializedNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/initialized"),
});
var PingRequestSchema = RequestSchema.extend({
	method: z.literal("ping"),
});
var ProgressSchema = z
	.object({
		/**
		 * The progress thus far. This should increase every time progress is made, even if the total is unknown.
		 */
		progress: z.number(),
		/**
		 * Total number of items to process (or total progress required), if known.
		 */
		total: z.optional(z.number()),
	})
	.passthrough();
var ProgressNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/progress"),
	params: BaseNotificationParamsSchema.merge(ProgressSchema).extend({
		/**
		 * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
		 */
		progressToken: ProgressTokenSchema,
	}),
});
var PaginatedRequestSchema = RequestSchema.extend({
	params: BaseRequestParamsSchema.extend({
		/**
		 * An opaque token representing the current pagination position.
		 * If provided, the server should return results starting after this cursor.
		 */
		cursor: z.optional(CursorSchema),
	}).optional(),
});
var PaginatedResultSchema = ResultSchema.extend({
	/**
	 * An opaque token representing the pagination position after the last returned result.
	 * If present, there may be more results available.
	 */
	nextCursor: z.optional(CursorSchema),
});
var ResourceContentsSchema = z
	.object({
		/**
		 * The URI of this resource.
		 */
		uri: z.string(),
		/**
		 * The MIME type of this resource, if known.
		 */
		mimeType: z.optional(z.string()),
	})
	.passthrough();
var TextResourceContentsSchema = ResourceContentsSchema.extend({
	/**
	 * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
	 */
	text: z.string(),
});
var BlobResourceContentsSchema = ResourceContentsSchema.extend({
	/**
	 * A base64-encoded string representing the binary data of the item.
	 */
	blob: z.string().base64(),
});
var ResourceSchema = z
	.object({
		/**
		 * The URI of this resource.
		 */
		uri: z.string(),
		/**
		 * A human-readable name for this resource.
		 *
		 * This can be used by clients to populate UI elements.
		 */
		name: z.string(),
		/**
		 * A description of what this resource represents.
		 *
		 * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
		 */
		description: z.optional(z.string()),
		/**
		 * The MIME type of this resource, if known.
		 */
		mimeType: z.optional(z.string()),
	})
	.passthrough();
var ResourceTemplateSchema = z
	.object({
		/**
		 * A URI template (according to RFC 6570) that can be used to construct resource URIs.
		 */
		uriTemplate: z.string(),
		/**
		 * A human-readable name for the type of resource this template refers to.
		 *
		 * This can be used by clients to populate UI elements.
		 */
		name: z.string(),
		/**
		 * A description of what this template is for.
		 *
		 * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
		 */
		description: z.optional(z.string()),
		/**
		 * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
		 */
		mimeType: z.optional(z.string()),
	})
	.passthrough();
var ListResourcesRequestSchema = PaginatedRequestSchema.extend({
	method: z.literal("resources/list"),
});
var ListResourcesResultSchema = PaginatedResultSchema.extend({
	resources: z.array(ResourceSchema),
});
var ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
	method: z.literal("resources/templates/list"),
});
var ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
	resourceTemplates: z.array(ResourceTemplateSchema),
});
var ReadResourceRequestSchema = RequestSchema.extend({
	method: z.literal("resources/read"),
	params: BaseRequestParamsSchema.extend({
		/**
		 * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
		 */
		uri: z.string(),
	}),
});
var ReadResourceResultSchema = ResultSchema.extend({
	contents: z.array(z.union([TextResourceContentsSchema, BlobResourceContentsSchema])),
});
var ResourceListChangedNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/resources/list_changed"),
});
var SubscribeRequestSchema = RequestSchema.extend({
	method: z.literal("resources/subscribe"),
	params: BaseRequestParamsSchema.extend({
		/**
		 * The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
		 */
		uri: z.string(),
	}),
});
var UnsubscribeRequestSchema = RequestSchema.extend({
	method: z.literal("resources/unsubscribe"),
	params: BaseRequestParamsSchema.extend({
		/**
		 * The URI of the resource to unsubscribe from.
		 */
		uri: z.string(),
	}),
});
var ResourceUpdatedNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/resources/updated"),
	params: BaseNotificationParamsSchema.extend({
		/**
		 * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
		 */
		uri: z.string(),
	}),
});
var PromptArgumentSchema = z
	.object({
		/**
		 * The name of the argument.
		 */
		name: z.string(),
		/**
		 * A human-readable description of the argument.
		 */
		description: z.optional(z.string()),
		/**
		 * Whether this argument must be provided.
		 */
		required: z.optional(z.boolean()),
	})
	.passthrough();
var PromptSchema = z
	.object({
		/**
		 * The name of the prompt or prompt template.
		 */
		name: z.string(),
		/**
		 * An optional description of what this prompt provides
		 */
		description: z.optional(z.string()),
		/**
		 * A list of arguments to use for templating the prompt.
		 */
		arguments: z.optional(z.array(PromptArgumentSchema)),
	})
	.passthrough();
var ListPromptsRequestSchema = PaginatedRequestSchema.extend({
	method: z.literal("prompts/list"),
});
var ListPromptsResultSchema = PaginatedResultSchema.extend({
	prompts: z.array(PromptSchema),
});
var GetPromptRequestSchema = RequestSchema.extend({
	method: z.literal("prompts/get"),
	params: BaseRequestParamsSchema.extend({
		/**
		 * The name of the prompt or prompt template.
		 */
		name: z.string(),
		/**
		 * Arguments to use for templating the prompt.
		 */
		arguments: z.optional(z.record(z.string())),
	}),
});
var TextContentSchema = z
	.object({
		type: z.literal("text"),
		/**
		 * The text content of the message.
		 */
		text: z.string(),
	})
	.passthrough();
var ImageContentSchema = z
	.object({
		type: z.literal("image"),
		/**
		 * The base64-encoded image data.
		 */
		data: z.string().base64(),
		/**
		 * The MIME type of the image. Different providers may support different image types.
		 */
		mimeType: z.string(),
	})
	.passthrough();
var AudioContentSchema = z
	.object({
		type: z.literal("audio"),
		/**
		 * The base64-encoded audio data.
		 */
		data: z.string().base64(),
		/**
		 * The MIME type of the audio. Different providers may support different audio types.
		 */
		mimeType: z.string(),
	})
	.passthrough();
var EmbeddedResourceSchema = z
	.object({
		type: z.literal("resource"),
		resource: z.union([TextResourceContentsSchema, BlobResourceContentsSchema]),
	})
	.passthrough();
var PromptMessageSchema = z
	.object({
		role: z.enum(["user", "assistant"]),
		content: z.union([
			TextContentSchema,
			ImageContentSchema,
			AudioContentSchema,
			EmbeddedResourceSchema,
		]),
	})
	.passthrough();
var GetPromptResultSchema = ResultSchema.extend({
	/**
	 * An optional description for the prompt.
	 */
	description: z.optional(z.string()),
	messages: z.array(PromptMessageSchema),
});
var PromptListChangedNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/prompts/list_changed"),
});
var ToolSchema = z
	.object({
		/**
		 * The name of the tool.
		 */
		name: z.string(),
		/**
		 * A human-readable description of the tool.
		 */
		description: z.optional(z.string()),
		/**
		 * A JSON Schema object defining the expected parameters for the tool.
		 */
		inputSchema: z
			.object({
				type: z.literal("object"),
				properties: z.optional(z.object({}).passthrough()),
			})
			.passthrough(),
	})
	.passthrough();
var ListToolsRequestSchema = PaginatedRequestSchema.extend({
	method: z.literal("tools/list"),
});
var ListToolsResultSchema = PaginatedResultSchema.extend({
	tools: z.array(ToolSchema),
});
var CallToolResultSchema = ResultSchema.extend({
	content: z.array(
		z.union([
			TextContentSchema,
			ImageContentSchema,
			AudioContentSchema,
			EmbeddedResourceSchema,
		]),
	),
	isError: z.boolean().default(false).optional(),
});
var CompatibilityCallToolResultSchema = CallToolResultSchema.or(
	ResultSchema.extend({
		toolResult: z.unknown(),
	}),
);
var CallToolRequestSchema = RequestSchema.extend({
	method: z.literal("tools/call"),
	params: BaseRequestParamsSchema.extend({
		name: z.string(),
		arguments: z.optional(z.record(z.unknown())),
	}),
});
var ToolListChangedNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/tools/list_changed"),
});
var LoggingLevelSchema = z.enum([
	"debug",
	"info",
	"notice",
	"warning",
	"error",
	"critical",
	"alert",
	"emergency",
]);
var SetLevelRequestSchema = RequestSchema.extend({
	method: z.literal("logging/setLevel"),
	params: BaseRequestParamsSchema.extend({
		/**
		 * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
		 */
		level: LoggingLevelSchema,
	}),
});
var LoggingMessageNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/message"),
	params: BaseNotificationParamsSchema.extend({
		/**
		 * The severity of this log message.
		 */
		level: LoggingLevelSchema,
		/**
		 * An optional name of the logger issuing this message.
		 */
		logger: z.optional(z.string()),
		/**
		 * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
		 */
		data: z.unknown(),
	}),
});
var ModelHintSchema = z
	.object({
		/**
		 * A hint for a model name.
		 */
		name: z.string().optional(),
	})
	.passthrough();
var ModelPreferencesSchema = z
	.object({
		/**
		 * Optional hints to use for model selection.
		 */
		hints: z.optional(z.array(ModelHintSchema)),
		/**
		 * How much to prioritize cost when selecting a model.
		 */
		costPriority: z.optional(z.number().min(0).max(1)),
		/**
		 * How much to prioritize sampling speed (latency) when selecting a model.
		 */
		speedPriority: z.optional(z.number().min(0).max(1)),
		/**
		 * How much to prioritize intelligence and capabilities when selecting a model.
		 */
		intelligencePriority: z.optional(z.number().min(0).max(1)),
	})
	.passthrough();
var SamplingMessageSchema = z
	.object({
		role: z.enum(["user", "assistant"]),
		content: z.union([TextContentSchema, ImageContentSchema, AudioContentSchema]),
	})
	.passthrough();
var CreateMessageRequestSchema = RequestSchema.extend({
	method: z.literal("sampling/createMessage"),
	params: BaseRequestParamsSchema.extend({
		messages: z.array(SamplingMessageSchema),
		/**
		 * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
		 */
		systemPrompt: z.optional(z.string()),
		/**
		 * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
		 */
		includeContext: z.optional(z.enum(["none", "thisServer", "allServers"])),
		temperature: z.optional(z.number()),
		/**
		 * The maximum number of tokens to sample, as requested by the server. The client MAY choose to sample fewer tokens than requested.
		 */
		maxTokens: z.number().int(),
		stopSequences: z.optional(z.array(z.string())),
		/**
		 * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
		 */
		metadata: z.optional(z.object({}).passthrough()),
		/**
		 * The server's preferences for which model to select.
		 */
		modelPreferences: z.optional(ModelPreferencesSchema),
	}),
});
var CreateMessageResultSchema = ResultSchema.extend({
	/**
	 * The name of the model that generated the message.
	 */
	model: z.string(),
	/**
	 * The reason why sampling stopped.
	 */
	stopReason: z.optional(z.enum(["endTurn", "stopSequence", "maxTokens"]).or(z.string())),
	role: z.enum(["user", "assistant"]),
	content: z.discriminatedUnion("type", [
		TextContentSchema,
		ImageContentSchema,
		AudioContentSchema,
	]),
});
var ResourceReferenceSchema = z
	.object({
		type: z.literal("ref/resource"),
		/**
		 * The URI or URI template of the resource.
		 */
		uri: z.string(),
	})
	.passthrough();
var PromptReferenceSchema = z
	.object({
		type: z.literal("ref/prompt"),
		/**
		 * The name of the prompt or prompt template
		 */
		name: z.string(),
	})
	.passthrough();
var CompleteRequestSchema = RequestSchema.extend({
	method: z.literal("completion/complete"),
	params: BaseRequestParamsSchema.extend({
		ref: z.union([PromptReferenceSchema, ResourceReferenceSchema]),
		/**
		 * The argument's information
		 */
		argument: z
			.object({
				/**
				 * The name of the argument
				 */
				name: z.string(),
				/**
				 * The value of the argument to use for completion matching.
				 */
				value: z.string(),
			})
			.passthrough(),
	}),
});
var CompleteResultSchema = ResultSchema.extend({
	completion: z
		.object({
			/**
			 * An array of completion values. Must not exceed 100 items.
			 */
			values: z.array(z.string()).max(100),
			/**
			 * The total number of completion options available. This can exceed the number of values actually sent in the response.
			 */
			total: z.optional(z.number().int()),
			/**
			 * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
			 */
			hasMore: z.optional(z.boolean()),
		})
		.passthrough(),
});
var RootSchema = z
	.object({
		/**
		 * The URI identifying the root. This *must* start with file:// for now.
		 */
		uri: z.string().startsWith("file://"),
		/**
		 * An optional name for the root.
		 */
		name: z.optional(z.string()),
	})
	.passthrough();
var ListRootsRequestSchema = RequestSchema.extend({
	method: z.literal("roots/list"),
});
var ListRootsResultSchema = ResultSchema.extend({
	roots: z.array(RootSchema),
});
var RootsListChangedNotificationSchema = NotificationSchema.extend({
	method: z.literal("notifications/roots/list_changed"),
});
var ClientRequestSchema = z.union([
	PingRequestSchema,
	InitializeRequestSchema,
	CompleteRequestSchema,
	SetLevelRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourcesRequestSchema,
	ListResourceTemplatesRequestSchema,
	ReadResourceRequestSchema,
	SubscribeRequestSchema,
	UnsubscribeRequestSchema,
	CallToolRequestSchema,
	ListToolsRequestSchema,
]);
var ClientNotificationSchema = z.union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	InitializedNotificationSchema,
	RootsListChangedNotificationSchema,
]);
var ClientResultSchema = z.union([
	EmptyResultSchema,
	CreateMessageResultSchema,
	ListRootsResultSchema,
]);
var ServerRequestSchema = z.union([
	PingRequestSchema,
	CreateMessageRequestSchema,
	ListRootsRequestSchema,
]);
var ServerNotificationSchema = z.union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	LoggingMessageNotificationSchema,
	ResourceUpdatedNotificationSchema,
	ResourceListChangedNotificationSchema,
	ToolListChangedNotificationSchema,
	PromptListChangedNotificationSchema,
]);
var ServerResultSchema = z.union([
	EmptyResultSchema,
	InitializeResultSchema,
	CompleteResultSchema,
	GetPromptResultSchema,
	ListPromptsResultSchema,
	ListResourcesResultSchema,
	ListResourceTemplatesResultSchema,
	ReadResourceResultSchema,
	CallToolResultSchema,
	ListToolsResultSchema,
]);
var McpError = class extends Error {
	static {
		__name(this, "McpError");
	}
	constructor(code, message, data) {
		super(`MCP error ${code}: ${message}`);
		this.code = code;
		this.data = data;
		this.name = "McpError";
	}
};

// node_modules/agents/dist/mcp/index.js
var MAXIMUM_MESSAGE_SIZE = 4 * 1024 * 1024;
function handleCORS(request, corsOptions) {
	const origin = request.headers.get("Origin") || "*";
	const corsHeaders = {
		"Access-Control-Allow-Origin": corsOptions?.origin || origin,
		"Access-Control-Allow-Methods": corsOptions?.methods || "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": corsOptions?.headers || "Content-Type",
		"Access-Control-Max-Age": (corsOptions?.maxAge || 86400).toString(),
	};
	if (request.method === "OPTIONS") {
		return new Response(null, { headers: corsHeaders });
	}
	return null;
}
__name(handleCORS, "handleCORS");
var _getWebSocket;
var _started;
var McpTransport = class {
	static {
		__name(this, "McpTransport");
	}
	constructor(getWebSocket) {
		__privateAdd2(this, _getWebSocket);
		__privateAdd2(this, _started, false);
		__privateSet2(this, _getWebSocket, getWebSocket);
	}
	async start() {
		if (__privateGet2(this, _started)) {
			throw new Error("Transport already started");
		}
		__privateSet2(this, _started, true);
	}
	async send(message) {
		if (!__privateGet2(this, _started)) {
			throw new Error("Transport not started");
		}
		const websocket = __privateGet2(this, _getWebSocket).call(this);
		if (!websocket) {
			throw new Error("WebSocket not connected");
		}
		try {
			websocket.send(JSON.stringify(message));
		} catch (error3) {
			this.onerror?.(error3);
			throw error3;
		}
	}
	async close() {
		this.onclose?.();
	}
};
_getWebSocket = /* @__PURE__ */ new WeakMap();
_started = /* @__PURE__ */ new WeakMap();
var _status;
var _transport;
var _connected;
var _agent;
var _McpAgent_instances;
var initialize_fn;
var McpAgent = class extends DurableObject2 {
	static {
		__name(this, "McpAgent");
	}
	constructor(ctx, env4) {
		var _a2;
		super(ctx, env4);
		__privateAdd2(this, _McpAgent_instances);
		__privateAdd2(this, _status, "zero");
		__privateAdd2(this, _transport);
		__privateAdd2(this, _connected, false);
		__privateAdd2(this, _agent);
		this.initRun = false;
		const self2 = this;
		__privateSet2(
			this,
			_agent,
			new ((_a2 = class extends Agent {
				static {
					__name(this, "_a");
				}
				onStateUpdate(state, source) {
					return self2.onStateUpdate(state, source);
				}
			}),
			(_a2.options = {
				hibernate: true,
			}),
			_a2)(ctx, env4),
		);
	}
	get state() {
		if (this.initialState) __privateGet2(this, _agent).initialState = this.initialState;
		return __privateGet2(this, _agent).state;
	}
	sql(strings, ...values) {
		return __privateGet2(this, _agent).sql(strings, ...values);
	}
	setState(state) {
		return __privateGet2(this, _agent).setState(state);
	}
	onStateUpdate(state, source) {}
	async onStart() {
		this.props = await this.ctx.storage.get("props");
		this.init?.();
		__privateSet2(this, _transport, new McpTransport(() => this.getWebSocket()));
		await this.server.connect(__privateGet2(this, _transport));
	}
	async _init(props) {
		await this.ctx.storage.put("props", props);
		this.props = props;
		if (!this.initRun) {
			this.initRun = true;
			await this.init();
		}
	}
	// Allow the worker to fetch a websocket connection to the agent
	async fetch(request) {
		if (__privateGet2(this, _status) !== "started") {
			await __privateMethod(this, _McpAgent_instances, initialize_fn).call(this);
		}
		if (request.headers.get("Upgrade") !== "websocket") {
			return new Response("Expected WebSocket Upgrade request", {
				status: 400,
			});
		}
		const url = new URL(request.url);
		const sessionId = url.searchParams.get("sessionId");
		if (!sessionId) {
			return new Response("Missing sessionId", { status: 400 });
		}
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);
		if (__privateGet2(this, _connected)) {
			return new Response("WebSocket already connected", { status: 400 });
		}
		this.ctx.acceptWebSocket(server);
		__privateSet2(this, _connected, true);
		__privateSet2(this, _transport, new McpTransport(() => this.getWebSocket()));
		await this.server.connect(__privateGet2(this, _transport));
		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}
	getWebSocket() {
		const websockets = this.ctx.getWebSockets();
		if (websockets.length === 0) {
			return null;
		}
		return websockets[0];
	}
	async onMCPMessage(sessionId, request) {
		if (__privateGet2(this, _status) !== "started") {
			await __privateMethod(this, _McpAgent_instances, initialize_fn).call(this);
		}
		try {
			const contentType = request.headers.get("content-type") || "";
			if (!contentType.includes("application/json")) {
				return new Response(`Unsupported content-type: ${contentType}`, {
					status: 400,
				});
			}
			const contentLength = Number.parseInt(request.headers.get("content-length") || "0", 10);
			if (contentLength > MAXIMUM_MESSAGE_SIZE) {
				return new Response(`Request body too large: ${contentLength} bytes`, {
					status: 400,
				});
			}
			const message = await request.json();
			let parsedMessage;
			try {
				parsedMessage = JSONRPCMessageSchema.parse(message);
			} catch (error3) {
				__privateGet2(this, _transport)?.onerror?.(error3);
				throw error3;
			}
			__privateGet2(this, _transport)?.onmessage?.(parsedMessage);
			return new Response("Accepted", { status: 202 });
		} catch (error3) {
			__privateGet2(this, _transport)?.onerror?.(error3);
			return new Response(String(error3), { status: 400 });
		}
	}
	// This is unused since there are no incoming websocket messages
	async webSocketMessage(ws, event) {
		let message;
		try {
			const data = typeof event === "string" ? event : new TextDecoder().decode(event);
			message = JSONRPCMessageSchema.parse(JSON.parse(data));
		} catch (error3) {
			__privateGet2(this, _transport)?.onerror?.(error3);
			return;
		}
		if (__privateGet2(this, _status) !== "started") {
			await __privateMethod(this, _McpAgent_instances, initialize_fn).call(this);
		}
		__privateGet2(this, _transport)?.onmessage?.(message);
	}
	// WebSocket event handlers for hibernation support
	async webSocketError(ws, error3) {
		if (__privateGet2(this, _status) !== "started") {
			await __privateMethod(this, _McpAgent_instances, initialize_fn).call(this);
		}
		__privateGet2(this, _transport)?.onerror?.(error3);
	}
	async webSocketClose(ws, code, reason, wasClean) {
		if (__privateGet2(this, _status) !== "started") {
			await __privateMethod(this, _McpAgent_instances, initialize_fn).call(this);
		}
		__privateGet2(this, _transport)?.onclose?.();
		__privateSet2(this, _connected, false);
	}
	static mount(path, { binding: binding2 = "MCP_OBJECT", corsOptions } = {}) {
		let pathname = path;
		if (path === "/") {
			pathname = "/*";
		}
		const basePattern = new URLPattern({ pathname });
		const messagePattern = new URLPattern({ pathname: `${pathname}/message` });
		return {
			fetch: /* @__PURE__ */ __name(async (request, env4, ctx) => {
				const corsResponse = handleCORS(request, corsOptions);
				if (corsResponse) return corsResponse;
				const url = new URL(request.url);
				const namespace = env4[binding2];
				if (request.method === "GET" && basePattern.test(url)) {
					const sessionId =
						url.searchParams.get("sessionId") || namespace.newUniqueId().toString();
					const { readable, writable } = new TransformStream();
					const writer = writable.getWriter();
					const encoder = new TextEncoder();
					const endpointMessage = `event: endpoint
data: ${encodeURI(`${pathname}/message`)}?sessionId=${sessionId}

`;
					writer.write(encoder.encode(endpointMessage));
					const id = namespace.idFromString(sessionId);
					const doStub = namespace.get(id);
					await doStub._init(ctx.props);
					const upgradeUrl = new URL(request.url);
					upgradeUrl.searchParams.set("sessionId", sessionId);
					const response = await doStub.fetch(
						new Request(upgradeUrl, {
							headers: {
								Upgrade: "websocket",
							},
						}),
					);
					const ws = response.webSocket;
					if (!ws) {
						console.error("Failed to establish WebSocket connection");
						await writer.close();
						return;
					}
					ws.accept();
					ws.addEventListener("message", async (event) => {
						try {
							const message = JSON.parse(event.data);
							if (!(typeof message.id === "number" || message.id === null)) {
								throw new Error("Invalid jsonrpc message id");
							}
							if (message.jsonrpc !== "2.0") {
								throw new Error("Invalid jsonrpc version");
							}
							if (
								!Object.hasOwn(message, "result") &&
								!Object.hasOwn(message, "error")
							) {
								throw new Error(
									"Invalid jsonrpc message. Must have either result or error field",
								);
							}
							const messageText = `event: message
data: ${event.data}

`;
							await writer.write(encoder.encode(messageText));
						} catch (error3) {
							console.error("Error forwarding message to SSE:", error3);
						}
					});
					ws.addEventListener("error", async (error3) => {
						try {
							await writer.close();
						} catch (e) {}
					});
					ws.addEventListener("close", async () => {
						try {
							await writer.close();
						} catch (error3) {
							console.error("Error closing SSE connection:", error3);
						}
					});
					return new Response(readable, {
						headers: {
							"Content-Type": "text/event-stream",
							"Cache-Control": "no-cache",
							Connection: "keep-alive",
							"Access-Control-Allow-Origin": corsOptions?.origin || "*",
						},
					});
				}
				if (request.method === "POST" && messagePattern.test(url)) {
					const sessionId = url.searchParams.get("sessionId");
					if (!sessionId) {
						return new Response(
							`Missing sessionId. Expected POST to ${pathname} to initiate new one`,
							{ status: 400 },
						);
					}
					const object = namespace.get(namespace.idFromString(sessionId));
					const response = await object.onMCPMessage(sessionId, request);
					const headers = new Headers();
					response.headers.forEach?.((value, key) => {
						headers.set(key, value);
					});
					headers.set("Access-Control-Allow-Origin", corsOptions?.origin || "*");
					return new Response(response.body, {
						status: response.status,
						statusText: response.statusText,
						headers,
					});
				}
				return new Response("Not Found", { status: 404 });
			}, "fetch"),
		};
	}
};
_status = /* @__PURE__ */ new WeakMap();
_transport = /* @__PURE__ */ new WeakMap();
_connected = /* @__PURE__ */ new WeakMap();
_agent = /* @__PURE__ */ new WeakMap();
_McpAgent_instances = /* @__PURE__ */ new WeakSet();
initialize_fn = /* @__PURE__ */ __name(async function () {
	await this.ctx.blockConcurrencyWhile(async () => {
		__privateSet2(this, _status, "starting");
		await this.onStart();
		__privateSet2(this, _status, "started");
	});
}, "initialize_fn");

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var DEFAULT_REQUEST_TIMEOUT_MSEC = 6e4;
var Protocol = class {
	static {
		__name(this, "Protocol");
	}
	constructor(_options) {
		this._options = _options;
		this._requestMessageId = 0;
		this._requestHandlers = /* @__PURE__ */ new Map();
		this._requestHandlerAbortControllers = /* @__PURE__ */ new Map();
		this._notificationHandlers = /* @__PURE__ */ new Map();
		this._responseHandlers = /* @__PURE__ */ new Map();
		this._progressHandlers = /* @__PURE__ */ new Map();
		this._timeoutInfo = /* @__PURE__ */ new Map();
		this.setNotificationHandler(CancelledNotificationSchema, (notification) => {
			const controller = this._requestHandlerAbortControllers.get(
				notification.params.requestId,
			);
			controller === null || controller === void 0
				? void 0
				: controller.abort(notification.params.reason);
		});
		this.setNotificationHandler(ProgressNotificationSchema, (notification) => {
			this._onprogress(notification);
		});
		this.setRequestHandler(
			PingRequestSchema,
			// Automatic pong by default.
			(_request2) => ({}),
		);
	}
	_setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = false) {
		this._timeoutInfo.set(messageId, {
			timeoutId: setTimeout(onTimeout, timeout),
			startTime: Date.now(),
			timeout,
			maxTotalTimeout,
			resetTimeoutOnProgress,
			onTimeout,
		});
	}
	_resetTimeout(messageId) {
		const info3 = this._timeoutInfo.get(messageId);
		if (!info3) return false;
		const totalElapsed = Date.now() - info3.startTime;
		if (info3.maxTotalTimeout && totalElapsed >= info3.maxTotalTimeout) {
			this._timeoutInfo.delete(messageId);
			throw new McpError(ErrorCode.RequestTimeout, "Maximum total timeout exceeded", {
				maxTotalTimeout: info3.maxTotalTimeout,
				totalElapsed,
			});
		}
		clearTimeout(info3.timeoutId);
		info3.timeoutId = setTimeout(info3.onTimeout, info3.timeout);
		return true;
	}
	_cleanupTimeout(messageId) {
		const info3 = this._timeoutInfo.get(messageId);
		if (info3) {
			clearTimeout(info3.timeoutId);
			this._timeoutInfo.delete(messageId);
		}
	}
	/**
	 * Attaches to the given transport, starts it, and starts listening for messages.
	 *
	 * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
	 */
	async connect(transport) {
		this._transport = transport;
		this._transport.onclose = () => {
			this._onclose();
		};
		this._transport.onerror = (error3) => {
			this._onerror(error3);
		};
		this._transport.onmessage = (message, extra) => {
			if (isJSONRPCResponse(message) || isJSONRPCError(message)) {
				this._onresponse(message);
			} else if (isJSONRPCRequest(message)) {
				this._onrequest(message, extra);
			} else if (isJSONRPCNotification(message)) {
				this._onnotification(message);
			} else {
				this._onerror(new Error(`Unknown message type: ${JSON.stringify(message)}`));
			}
		};
		await this._transport.start();
	}
	_onclose() {
		var _a2;
		const responseHandlers = this._responseHandlers;
		this._responseHandlers = /* @__PURE__ */ new Map();
		this._progressHandlers.clear();
		this._transport = void 0;
		(_a2 = this.onclose) === null || _a2 === void 0 ? void 0 : _a2.call(this);
		const error3 = new McpError(ErrorCode.ConnectionClosed, "Connection closed");
		for (const handler of responseHandlers.values()) {
			handler(error3);
		}
	}
	_onerror(error3) {
		var _a2;
		(_a2 = this.onerror) === null || _a2 === void 0 ? void 0 : _a2.call(this, error3);
	}
	_onnotification(notification) {
		var _a2;
		const handler =
			(_a2 = this._notificationHandlers.get(notification.method)) !== null && _a2 !== void 0
				? _a2
				: this.fallbackNotificationHandler;
		if (handler === void 0) {
			return;
		}
		Promise.resolve()
			.then(() => handler(notification))
			.catch((error3) =>
				this._onerror(new Error(`Uncaught error in notification handler: ${error3}`)),
			);
	}
	_onrequest(request, extra) {
		var _a2, _b, _c;
		const handler =
			(_a2 = this._requestHandlers.get(request.method)) !== null && _a2 !== void 0
				? _a2
				: this.fallbackRequestHandler;
		if (handler === void 0) {
			(_b = this._transport) === null || _b === void 0
				? void 0
				: _b
						.send({
							jsonrpc: "2.0",
							id: request.id,
							error: {
								code: ErrorCode.MethodNotFound,
								message: "Method not found",
							},
						})
						.catch((error3) =>
							this._onerror(new Error(`Failed to send an error response: ${error3}`)),
						);
			return;
		}
		const abortController = new AbortController();
		this._requestHandlerAbortControllers.set(request.id, abortController);
		const fullExtra = {
			signal: abortController.signal,
			sessionId: (_c = this._transport) === null || _c === void 0 ? void 0 : _c.sessionId,
			sendNotification: /* @__PURE__ */ __name(
				(notification) => this.notification(notification, { relatedRequestId: request.id }),
				"sendNotification",
			),
			sendRequest: /* @__PURE__ */ __name(
				(r, resultSchema, options2) =>
					this.request(r, resultSchema, { ...options2, relatedRequestId: request.id }),
				"sendRequest",
			),
			authInfo: extra === null || extra === void 0 ? void 0 : extra.authInfo,
		};
		Promise.resolve()
			.then(() => handler(request, fullExtra))
			.then(
				(result) => {
					var _a3;
					if (abortController.signal.aborted) {
						return;
					}
					return (_a3 = this._transport) === null || _a3 === void 0
						? void 0
						: _a3.send({
								result,
								jsonrpc: "2.0",
								id: request.id,
							});
				},
				(error3) => {
					var _a3, _b2;
					if (abortController.signal.aborted) {
						return;
					}
					return (_a3 = this._transport) === null || _a3 === void 0
						? void 0
						: _a3.send({
								jsonrpc: "2.0",
								id: request.id,
								error: {
									code: Number.isSafeInteger(error3["code"])
										? error3["code"]
										: ErrorCode.InternalError,
									message:
										(_b2 = error3.message) !== null && _b2 !== void 0
											? _b2
											: "Internal error",
								},
							});
				},
			)
			.catch((error3) => this._onerror(new Error(`Failed to send response: ${error3}`)))
			.finally(() => {
				this._requestHandlerAbortControllers.delete(request.id);
			});
	}
	_onprogress(notification) {
		const { progressToken, ...params } = notification.params;
		const messageId = Number(progressToken);
		const handler = this._progressHandlers.get(messageId);
		if (!handler) {
			this._onerror(
				new Error(
					`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`,
				),
			);
			return;
		}
		const responseHandler = this._responseHandlers.get(messageId);
		const timeoutInfo = this._timeoutInfo.get(messageId);
		if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) {
			try {
				this._resetTimeout(messageId);
			} catch (error3) {
				responseHandler(error3);
				return;
			}
		}
		handler(params);
	}
	_onresponse(response) {
		const messageId = Number(response.id);
		const handler = this._responseHandlers.get(messageId);
		if (handler === void 0) {
			this._onerror(
				new Error(
					`Received a response for an unknown message ID: ${JSON.stringify(response)}`,
				),
			);
			return;
		}
		this._responseHandlers.delete(messageId);
		this._progressHandlers.delete(messageId);
		this._cleanupTimeout(messageId);
		if (isJSONRPCResponse(response)) {
			handler(response);
		} else {
			const error3 = new McpError(
				response.error.code,
				response.error.message,
				response.error.data,
			);
			handler(error3);
		}
	}
	get transport() {
		return this._transport;
	}
	/**
	 * Closes the connection.
	 */
	async close() {
		var _a2;
		await ((_a2 = this._transport) === null || _a2 === void 0 ? void 0 : _a2.close());
	}
	/**
	 * Sends a request and wait for a response.
	 *
	 * Do not use this method to emit notifications! Use notification() instead.
	 */
	request(request, resultSchema, options2) {
		const { relatedRequestId, resumptionToken, onresumptiontoken } =
			options2 !== null && options2 !== void 0 ? options2 : {};
		return new Promise((resolve, reject) => {
			var _a2, _b, _c, _d, _e;
			if (!this._transport) {
				reject(new Error("Not connected"));
				return;
			}
			if (
				((_a2 = this._options) === null || _a2 === void 0
					? void 0
					: _a2.enforceStrictCapabilities) === true
			) {
				this.assertCapabilityForMethod(request.method);
			}
			(_b = options2 === null || options2 === void 0 ? void 0 : options2.signal) === null ||
			_b === void 0
				? void 0
				: _b.throwIfAborted();
			const messageId = this._requestMessageId++;
			const jsonrpcRequest = {
				...request,
				jsonrpc: "2.0",
				id: messageId,
			};
			if (options2 === null || options2 === void 0 ? void 0 : options2.onprogress) {
				this._progressHandlers.set(messageId, options2.onprogress);
				jsonrpcRequest.params = {
					...request.params,
					_meta: { progressToken: messageId },
				};
			}
			const cancel = /* @__PURE__ */ __name((reason) => {
				var _a3;
				this._responseHandlers.delete(messageId);
				this._progressHandlers.delete(messageId);
				this._cleanupTimeout(messageId);
				(_a3 = this._transport) === null || _a3 === void 0
					? void 0
					: _a3
							.send(
								{
									jsonrpc: "2.0",
									method: "notifications/cancelled",
									params: {
										requestId: messageId,
										reason: String(reason),
									},
								},
								{ relatedRequestId, resumptionToken, onresumptiontoken },
							)
							.catch((error3) =>
								this._onerror(new Error(`Failed to send cancellation: ${error3}`)),
							);
				reject(reason);
			}, "cancel");
			this._responseHandlers.set(messageId, (response) => {
				var _a3;
				if (
					(_a3 = options2 === null || options2 === void 0 ? void 0 : options2.signal) ===
						null || _a3 === void 0
						? void 0
						: _a3.aborted
				) {
					return;
				}
				if (response instanceof Error) {
					return reject(response);
				}
				try {
					const result = resultSchema.parse(response.result);
					resolve(result);
				} catch (error3) {
					reject(error3);
				}
			});
			(_c = options2 === null || options2 === void 0 ? void 0 : options2.signal) === null ||
			_c === void 0
				? void 0
				: _c.addEventListener("abort", () => {
						var _a3;
						cancel(
							(_a3 =
								options2 === null || options2 === void 0
									? void 0
									: options2.signal) === null || _a3 === void 0
								? void 0
								: _a3.reason,
						);
					});
			const timeout =
				(_d = options2 === null || options2 === void 0 ? void 0 : options2.timeout) !==
					null && _d !== void 0
					? _d
					: DEFAULT_REQUEST_TIMEOUT_MSEC;
			const timeoutHandler = /* @__PURE__ */ __name(
				() =>
					cancel(
						new McpError(ErrorCode.RequestTimeout, "Request timed out", { timeout }),
					),
				"timeoutHandler",
			);
			this._setupTimeout(
				messageId,
				timeout,
				options2 === null || options2 === void 0 ? void 0 : options2.maxTotalTimeout,
				timeoutHandler,
				(_e =
					options2 === null || options2 === void 0
						? void 0
						: options2.resetTimeoutOnProgress) !== null && _e !== void 0
					? _e
					: false,
			);
			this._transport
				.send(jsonrpcRequest, { relatedRequestId, resumptionToken, onresumptiontoken })
				.catch((error3) => {
					this._cleanupTimeout(messageId);
					reject(error3);
				});
		});
	}
	/**
	 * Emits a notification, which is a one-way message that does not expect a response.
	 */
	async notification(notification, options2) {
		if (!this._transport) {
			throw new Error("Not connected");
		}
		this.assertNotificationCapability(notification.method);
		const jsonrpcNotification = {
			...notification,
			jsonrpc: "2.0",
		};
		await this._transport.send(jsonrpcNotification, options2);
	}
	/**
	 * Registers a handler to invoke when this protocol object receives a request with the given method.
	 *
	 * Note that this will replace any previous request handler for the same method.
	 */
	setRequestHandler(requestSchema, handler) {
		const method = requestSchema.shape.method.value;
		this.assertRequestHandlerCapability(method);
		this._requestHandlers.set(method, (request, extra) => {
			return Promise.resolve(handler(requestSchema.parse(request), extra));
		});
	}
	/**
	 * Removes the request handler for the given method.
	 */
	removeRequestHandler(method) {
		this._requestHandlers.delete(method);
	}
	/**
	 * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
	 */
	assertCanSetRequestHandler(method) {
		if (this._requestHandlers.has(method)) {
			throw new Error(
				`A request handler for ${method} already exists, which would be overridden`,
			);
		}
	}
	/**
	 * Registers a handler to invoke when this protocol object receives a notification with the given method.
	 *
	 * Note that this will replace any previous notification handler for the same method.
	 */
	setNotificationHandler(notificationSchema, handler) {
		this._notificationHandlers.set(notificationSchema.shape.method.value, (notification) =>
			Promise.resolve(handler(notificationSchema.parse(notification))),
		);
	}
	/**
	 * Removes the notification handler for the given method.
	 */
	removeNotificationHandler(method) {
		this._notificationHandlers.delete(method);
	}
};
function mergeCapabilities(base, additional) {
	return Object.entries(additional).reduce(
		(acc, [key, value]) => {
			if (value && typeof value === "object") {
				acc[key] = acc[key] ? { ...acc[key], ...value } : value;
			} else {
				acc[key] = value;
			}
			return acc;
		},
		{ ...base },
	);
}
__name(mergeCapabilities, "mergeCapabilities");

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js
var Server2 = class extends Protocol {
	static {
		__name(this, "Server");
	}
	/**
	 * Initializes this server with the given name and version information.
	 */
	constructor(_serverInfo, options2) {
		var _a2;
		super(options2);
		this._serverInfo = _serverInfo;
		this._capabilities =
			(_a2 = options2 === null || options2 === void 0 ? void 0 : options2.capabilities) !==
				null && _a2 !== void 0
				? _a2
				: {};
		this._instructions =
			options2 === null || options2 === void 0 ? void 0 : options2.instructions;
		this.setRequestHandler(InitializeRequestSchema, (request) => this._oninitialize(request));
		this.setNotificationHandler(InitializedNotificationSchema, () => {
			var _a3;
			return (_a3 = this.oninitialized) === null || _a3 === void 0 ? void 0 : _a3.call(this);
		});
	}
	/**
	 * Registers new capabilities. This can only be called before connecting to a transport.
	 *
	 * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
	 */
	registerCapabilities(capabilities) {
		if (this.transport) {
			throw new Error("Cannot register capabilities after connecting to transport");
		}
		this._capabilities = mergeCapabilities(this._capabilities, capabilities);
	}
	assertCapabilityForMethod(method) {
		var _a2, _b;
		switch (method) {
			case "sampling/createMessage":
				if (
					!((_a2 = this._clientCapabilities) === null || _a2 === void 0
						? void 0
						: _a2.sampling)
				) {
					throw new Error(`Client does not support sampling (required for ${method})`);
				}
				break;
			case "roots/list":
				if (
					!((_b = this._clientCapabilities) === null || _b === void 0 ? void 0 : _b.roots)
				) {
					throw new Error(
						`Client does not support listing roots (required for ${method})`,
					);
				}
				break;
			case "ping":
				break;
		}
	}
	assertNotificationCapability(method) {
		switch (method) {
			case "notifications/message":
				if (!this._capabilities.logging) {
					throw new Error(`Server does not support logging (required for ${method})`);
				}
				break;
			case "notifications/resources/updated":
			case "notifications/resources/list_changed":
				if (!this._capabilities.resources) {
					throw new Error(
						`Server does not support notifying about resources (required for ${method})`,
					);
				}
				break;
			case "notifications/tools/list_changed":
				if (!this._capabilities.tools) {
					throw new Error(
						`Server does not support notifying of tool list changes (required for ${method})`,
					);
				}
				break;
			case "notifications/prompts/list_changed":
				if (!this._capabilities.prompts) {
					throw new Error(
						`Server does not support notifying of prompt list changes (required for ${method})`,
					);
				}
				break;
			case "notifications/cancelled":
				break;
			case "notifications/progress":
				break;
		}
	}
	assertRequestHandlerCapability(method) {
		switch (method) {
			case "sampling/createMessage":
				if (!this._capabilities.sampling) {
					throw new Error(`Server does not support sampling (required for ${method})`);
				}
				break;
			case "logging/setLevel":
				if (!this._capabilities.logging) {
					throw new Error(`Server does not support logging (required for ${method})`);
				}
				break;
			case "prompts/get":
			case "prompts/list":
				if (!this._capabilities.prompts) {
					throw new Error(`Server does not support prompts (required for ${method})`);
				}
				break;
			case "resources/list":
			case "resources/templates/list":
			case "resources/read":
				if (!this._capabilities.resources) {
					throw new Error(`Server does not support resources (required for ${method})`);
				}
				break;
			case "tools/call":
			case "tools/list":
				if (!this._capabilities.tools) {
					throw new Error(`Server does not support tools (required for ${method})`);
				}
				break;
			case "ping":
			case "initialize":
				break;
		}
	}
	async _oninitialize(request) {
		const requestedVersion = request.params.protocolVersion;
		this._clientCapabilities = request.params.capabilities;
		this._clientVersion = request.params.clientInfo;
		return {
			protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.includes(requestedVersion)
				? requestedVersion
				: LATEST_PROTOCOL_VERSION,
			capabilities: this.getCapabilities(),
			serverInfo: this._serverInfo,
			...(this._instructions && { instructions: this._instructions }),
		};
	}
	/**
	 * After initialization has completed, this will be populated with the client's reported capabilities.
	 */
	getClientCapabilities() {
		return this._clientCapabilities;
	}
	/**
	 * After initialization has completed, this will be populated with information about the client's name and version.
	 */
	getClientVersion() {
		return this._clientVersion;
	}
	getCapabilities() {
		return this._capabilities;
	}
	async ping() {
		return this.request({ method: "ping" }, EmptyResultSchema);
	}
	async createMessage(params, options2) {
		return this.request(
			{ method: "sampling/createMessage", params },
			CreateMessageResultSchema,
			options2,
		);
	}
	async listRoots(params, options2) {
		return this.request({ method: "roots/list", params }, ListRootsResultSchema, options2);
	}
	async sendLoggingMessage(params) {
		return this.notification({ method: "notifications/message", params });
	}
	async sendResourceUpdated(params) {
		return this.notification({
			method: "notifications/resources/updated",
			params,
		});
	}
	async sendResourceListChanged() {
		return this.notification({
			method: "notifications/resources/list_changed",
		});
	}
	async sendToolListChanged() {
		return this.notification({ method: "notifications/tools/list_changed" });
	}
	async sendPromptListChanged() {
		return this.notification({ method: "notifications/prompts/list_changed" });
	}
};

// node_modules/zod-to-json-schema/dist/esm/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/Options.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
	name: void 0,
	$refStrategy: "root",
	basePath: ["#"],
	effectStrategy: "input",
	pipeStrategy: "all",
	dateStrategy: "format:date-time",
	mapStrategy: "entries",
	removeAdditionalStrategy: "passthrough",
	allowedAdditionalProperties: true,
	rejectedAdditionalProperties: false,
	definitionPath: "definitions",
	target: "jsonSchema7",
	strictUnions: false,
	definitions: {},
	errorMessages: false,
	markdownDescription: false,
	patternStrategy: "escape",
	applyRegexFlags: false,
	emailStrategy: "format:email",
	base64Strategy: "contentEncoding:base64",
	nameStrategy: "ref",
};
var getDefaultOptions = /* @__PURE__ */ __name(
	(options2) =>
		typeof options2 === "string"
			? {
					...defaultOptions,
					name: options2,
				}
			: {
					...defaultOptions,
					...options2,
				},
	"getDefaultOptions",
);

// node_modules/zod-to-json-schema/dist/esm/Refs.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var getRefs = /* @__PURE__ */ __name((options2) => {
	const _options = getDefaultOptions(options2);
	const currentPath =
		_options.name !== void 0
			? [..._options.basePath, _options.definitionPath, _options.name]
			: _options.basePath;
	return {
		..._options,
		currentPath,
		propertyPath: void 0,
		seen: new Map(
			Object.entries(_options.definitions).map(([name, def2]) => [
				def2._def,
				{
					def: def2._def,
					path: [..._options.basePath, _options.definitionPath, name],
					// Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
					jsonSchema: void 0,
				},
			]),
		),
	};
}, "getRefs");

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function addErrorMessage(res, key, errorMessage, refs) {
	if (!refs?.errorMessages) return;
	if (errorMessage) {
		res.errorMessage = {
			...res.errorMessage,
			[key]: errorMessage,
		};
	}
}
__name(addErrorMessage, "addErrorMessage");
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
	res[key] = value;
	addErrorMessage(res, key, errorMessage, refs);
}
__name(setResponseValueAndErrors, "setResponseValueAndErrors");

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseAnyDef() {
	return {};
}
__name(parseAnyDef, "parseAnyDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseArrayDef(def2, refs) {
	const res = {
		type: "array",
	};
	if (def2.type?._def && def2.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
		res.items = parseDef(def2.type._def, {
			...refs,
			currentPath: [...refs.currentPath, "items"],
		});
	}
	if (def2.minLength) {
		setResponseValueAndErrors(
			res,
			"minItems",
			def2.minLength.value,
			def2.minLength.message,
			refs,
		);
	}
	if (def2.maxLength) {
		setResponseValueAndErrors(
			res,
			"maxItems",
			def2.maxLength.value,
			def2.maxLength.message,
			refs,
		);
	}
	if (def2.exactLength) {
		setResponseValueAndErrors(
			res,
			"minItems",
			def2.exactLength.value,
			def2.exactLength.message,
			refs,
		);
		setResponseValueAndErrors(
			res,
			"maxItems",
			def2.exactLength.value,
			def2.exactLength.message,
			refs,
		);
	}
	return res;
}
__name(parseArrayDef, "parseArrayDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseBigintDef(def2, refs) {
	const res = {
		type: "integer",
		format: "int64",
	};
	if (!def2.checks) return res;
	for (const check of def2.checks) {
		switch (check.kind) {
			case "min":
				if (refs.target === "jsonSchema7") {
					if (check.inclusive) {
						setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
					} else {
						setResponseValueAndErrors(
							res,
							"exclusiveMinimum",
							check.value,
							check.message,
							refs,
						);
					}
				} else {
					if (!check.inclusive) {
						res.exclusiveMinimum = true;
					}
					setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
				}
				break;
			case "max":
				if (refs.target === "jsonSchema7") {
					if (check.inclusive) {
						setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
					} else {
						setResponseValueAndErrors(
							res,
							"exclusiveMaximum",
							check.value,
							check.message,
							refs,
						);
					}
				} else {
					if (!check.inclusive) {
						res.exclusiveMaximum = true;
					}
					setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
				}
				break;
			case "multipleOf":
				setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
				break;
		}
	}
	return res;
}
__name(parseBigintDef, "parseBigintDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseBooleanDef() {
	return {
		type: "boolean",
	};
}
__name(parseBooleanDef, "parseBooleanDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseBrandedDef(_def, refs) {
	return parseDef(_def.type._def, refs);
}
__name(parseBrandedDef, "parseBrandedDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var parseCatchDef = /* @__PURE__ */ __name((def2, refs) => {
	return parseDef(def2.innerType._def, refs);
}, "parseCatchDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseDateDef(def2, refs, overrideDateStrategy) {
	const strategy = overrideDateStrategy ?? refs.dateStrategy;
	if (Array.isArray(strategy)) {
		return {
			anyOf: strategy.map((item, i) => parseDateDef(def2, refs, item)),
		};
	}
	switch (strategy) {
		case "string":
		case "format:date-time":
			return {
				type: "string",
				format: "date-time",
			};
		case "format:date":
			return {
				type: "string",
				format: "date",
			};
		case "integer":
			return integerDateParser(def2, refs);
	}
}
__name(parseDateDef, "parseDateDef");
var integerDateParser = /* @__PURE__ */ __name((def2, refs) => {
	const res = {
		type: "integer",
		format: "unix-time",
	};
	if (refs.target === "openApi3") {
		return res;
	}
	for (const check of def2.checks) {
		switch (check.kind) {
			case "min":
				setResponseValueAndErrors(
					res,
					"minimum",
					check.value,
					// This is in milliseconds
					check.message,
					refs,
				);
				break;
			case "max":
				setResponseValueAndErrors(
					res,
					"maximum",
					check.value,
					// This is in milliseconds
					check.message,
					refs,
				);
				break;
		}
	}
	return res;
}, "integerDateParser");

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseDefaultDef(_def, refs) {
	return {
		...parseDef(_def.innerType._def, refs),
		default: _def.defaultValue(),
	};
}
__name(parseDefaultDef, "parseDefaultDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseEffectsDef(_def, refs) {
	return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}
__name(parseEffectsDef, "parseEffectsDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseEnumDef(def2) {
	return {
		type: "string",
		enum: Array.from(def2.values),
	};
}
__name(parseEnumDef, "parseEnumDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var isJsonSchema7AllOfType = /* @__PURE__ */ __name((type) => {
	if ("type" in type && type.type === "string") return false;
	return "allOf" in type;
}, "isJsonSchema7AllOfType");
function parseIntersectionDef(def2, refs) {
	const allOf = [
		parseDef(def2.left._def, {
			...refs,
			currentPath: [...refs.currentPath, "allOf", "0"],
		}),
		parseDef(def2.right._def, {
			...refs,
			currentPath: [...refs.currentPath, "allOf", "1"],
		}),
	].filter((x) => !!x);
	let unevaluatedProperties =
		refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
	const mergedAllOf = [];
	allOf.forEach((schema) => {
		if (isJsonSchema7AllOfType(schema)) {
			mergedAllOf.push(...schema.allOf);
			if (schema.unevaluatedProperties === void 0) {
				unevaluatedProperties = void 0;
			}
		} else {
			let nestedSchema = schema;
			if ("additionalProperties" in schema && schema.additionalProperties === false) {
				const { additionalProperties, ...rest } = schema;
				nestedSchema = rest;
			} else {
				unevaluatedProperties = void 0;
			}
			mergedAllOf.push(nestedSchema);
		}
	});
	return mergedAllOf.length
		? {
				allOf: mergedAllOf,
				...unevaluatedProperties,
			}
		: void 0;
}
__name(parseIntersectionDef, "parseIntersectionDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseLiteralDef(def2, refs) {
	const parsedType = typeof def2.value;
	if (
		parsedType !== "bigint" &&
		parsedType !== "number" &&
		parsedType !== "boolean" &&
		parsedType !== "string"
	) {
		return {
			type: Array.isArray(def2.value) ? "array" : "object",
		};
	}
	if (refs.target === "openApi3") {
		return {
			type: parsedType === "bigint" ? "integer" : parsedType,
			enum: [def2.value],
		};
	}
	return {
		type: parsedType === "bigint" ? "integer" : parsedType,
		const: def2.value,
	};
}
__name(parseLiteralDef, "parseLiteralDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emojiRegex2 = void 0;
var zodPatterns = {
	/**
	 * `c` was changed to `[cC]` to replicate /i flag
	 */
	cuid: /^[cC][^\s-]{8,}$/,
	cuid2: /^[0-9a-z]+$/,
	ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
	/**
	 * `a-z` was added to replicate /i flag
	 */
	email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
	/**
	 * Constructed a valid Unicode RegExp
	 *
	 * Lazily instantiate since this type of regex isn't supported
	 * in all envs (e.g. React Native).
	 *
	 * See:
	 * https://github.com/colinhacks/zod/issues/2433
	 * Fix in Zod:
	 * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
	 */
	emoji: /* @__PURE__ */ __name(() => {
		if (emojiRegex2 === void 0) {
			emojiRegex2 = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
		}
		return emojiRegex2;
	}, "emoji"),
	/**
	 * Unused
	 */
	uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
	/**
	 * Unused
	 */
	ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ipv4Cidr:
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	/**
	 * Unused
	 */
	ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
	ipv6Cidr:
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	nanoid: /^[a-zA-Z0-9_-]{21}$/,
	jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
};
function parseStringDef(def2, refs) {
	const res = {
		type: "string",
	};
	if (def2.checks) {
		for (const check of def2.checks) {
			switch (check.kind) {
				case "min":
					setResponseValueAndErrors(
						res,
						"minLength",
						typeof res.minLength === "number"
							? Math.max(res.minLength, check.value)
							: check.value,
						check.message,
						refs,
					);
					break;
				case "max":
					setResponseValueAndErrors(
						res,
						"maxLength",
						typeof res.maxLength === "number"
							? Math.min(res.maxLength, check.value)
							: check.value,
						check.message,
						refs,
					);
					break;
				case "email":
					switch (refs.emailStrategy) {
						case "format:email":
							addFormat(res, "email", check.message, refs);
							break;
						case "format:idn-email":
							addFormat(res, "idn-email", check.message, refs);
							break;
						case "pattern:zod":
							addPattern(res, zodPatterns.email, check.message, refs);
							break;
					}
					break;
				case "url":
					addFormat(res, "uri", check.message, refs);
					break;
				case "uuid":
					addFormat(res, "uuid", check.message, refs);
					break;
				case "regex":
					addPattern(res, check.regex, check.message, refs);
					break;
				case "cuid":
					addPattern(res, zodPatterns.cuid, check.message, refs);
					break;
				case "cuid2":
					addPattern(res, zodPatterns.cuid2, check.message, refs);
					break;
				case "startsWith":
					addPattern(
						res,
						RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`),
						check.message,
						refs,
					);
					break;
				case "endsWith":
					addPattern(
						res,
						RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`),
						check.message,
						refs,
					);
					break;
				case "datetime":
					addFormat(res, "date-time", check.message, refs);
					break;
				case "date":
					addFormat(res, "date", check.message, refs);
					break;
				case "time":
					addFormat(res, "time", check.message, refs);
					break;
				case "duration":
					addFormat(res, "duration", check.message, refs);
					break;
				case "length":
					setResponseValueAndErrors(
						res,
						"minLength",
						typeof res.minLength === "number"
							? Math.max(res.minLength, check.value)
							: check.value,
						check.message,
						refs,
					);
					setResponseValueAndErrors(
						res,
						"maxLength",
						typeof res.maxLength === "number"
							? Math.min(res.maxLength, check.value)
							: check.value,
						check.message,
						refs,
					);
					break;
				case "includes": {
					addPattern(
						res,
						RegExp(escapeLiteralCheckValue(check.value, refs)),
						check.message,
						refs,
					);
					break;
				}
				case "ip": {
					if (check.version !== "v6") {
						addFormat(res, "ipv4", check.message, refs);
					}
					if (check.version !== "v4") {
						addFormat(res, "ipv6", check.message, refs);
					}
					break;
				}
				case "base64url":
					addPattern(res, zodPatterns.base64url, check.message, refs);
					break;
				case "jwt":
					addPattern(res, zodPatterns.jwt, check.message, refs);
					break;
				case "cidr": {
					if (check.version !== "v6") {
						addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
					}
					if (check.version !== "v4") {
						addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
					}
					break;
				}
				case "emoji":
					addPattern(res, zodPatterns.emoji(), check.message, refs);
					break;
				case "ulid": {
					addPattern(res, zodPatterns.ulid, check.message, refs);
					break;
				}
				case "base64": {
					switch (refs.base64Strategy) {
						case "format:binary": {
							addFormat(res, "binary", check.message, refs);
							break;
						}
						case "contentEncoding:base64": {
							setResponseValueAndErrors(
								res,
								"contentEncoding",
								"base64",
								check.message,
								refs,
							);
							break;
						}
						case "pattern:zod": {
							addPattern(res, zodPatterns.base64, check.message, refs);
							break;
						}
					}
					break;
				}
				case "nanoid": {
					addPattern(res, zodPatterns.nanoid, check.message, refs);
				}
				case "toLowerCase":
				case "toUpperCase":
				case "trim":
					break;
				default:
					/* @__PURE__ */ ((_) => {})(check);
			}
		}
	}
	return res;
}
__name(parseStringDef, "parseStringDef");
function escapeLiteralCheckValue(literal, refs) {
	return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
__name(escapeLiteralCheckValue, "escapeLiteralCheckValue");
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
	let result = "";
	for (let i = 0; i < source.length; i++) {
		if (!ALPHA_NUMERIC.has(source[i])) {
			result += "\\";
		}
		result += source[i];
	}
	return result;
}
__name(escapeNonAlphaNumeric, "escapeNonAlphaNumeric");
function addFormat(schema, value, message, refs) {
	if (schema.format || schema.anyOf?.some((x) => x.format)) {
		if (!schema.anyOf) {
			schema.anyOf = [];
		}
		if (schema.format) {
			schema.anyOf.push({
				format: schema.format,
				...(schema.errorMessage &&
					refs.errorMessages && {
						errorMessage: { format: schema.errorMessage.format },
					}),
			});
			delete schema.format;
			if (schema.errorMessage) {
				delete schema.errorMessage.format;
				if (Object.keys(schema.errorMessage).length === 0) {
					delete schema.errorMessage;
				}
			}
		}
		schema.anyOf.push({
			format: value,
			...(message && refs.errorMessages && { errorMessage: { format: message } }),
		});
	} else {
		setResponseValueAndErrors(schema, "format", value, message, refs);
	}
}
__name(addFormat, "addFormat");
function addPattern(schema, regex, message, refs) {
	if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
		if (!schema.allOf) {
			schema.allOf = [];
		}
		if (schema.pattern) {
			schema.allOf.push({
				pattern: schema.pattern,
				...(schema.errorMessage &&
					refs.errorMessages && {
						errorMessage: { pattern: schema.errorMessage.pattern },
					}),
			});
			delete schema.pattern;
			if (schema.errorMessage) {
				delete schema.errorMessage.pattern;
				if (Object.keys(schema.errorMessage).length === 0) {
					delete schema.errorMessage;
				}
			}
		}
		schema.allOf.push({
			pattern: stringifyRegExpWithFlags(regex, refs),
			...(message && refs.errorMessages && { errorMessage: { pattern: message } }),
		});
	} else {
		setResponseValueAndErrors(
			schema,
			"pattern",
			stringifyRegExpWithFlags(regex, refs),
			message,
			refs,
		);
	}
}
__name(addPattern, "addPattern");
function stringifyRegExpWithFlags(regex, refs) {
	if (!refs.applyRegexFlags || !regex.flags) {
		return regex.source;
	}
	const flags = {
		i: regex.flags.includes("i"),
		m: regex.flags.includes("m"),
		s: regex.flags.includes("s"),
		// `.` matches newlines
	};
	const source = flags.i ? regex.source.toLowerCase() : regex.source;
	let pattern = "";
	let isEscaped = false;
	let inCharGroup = false;
	let inCharRange = false;
	for (let i = 0; i < source.length; i++) {
		if (isEscaped) {
			pattern += source[i];
			isEscaped = false;
			continue;
		}
		if (flags.i) {
			if (inCharGroup) {
				if (source[i].match(/[a-z]/)) {
					if (inCharRange) {
						pattern += source[i];
						pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
						inCharRange = false;
					} else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
						pattern += source[i];
						inCharRange = true;
					} else {
						pattern += `${source[i]}${source[i].toUpperCase()}`;
					}
					continue;
				}
			} else if (source[i].match(/[a-z]/)) {
				pattern += `[${source[i]}${source[i].toUpperCase()}]`;
				continue;
			}
		}
		if (flags.m) {
			if (source[i] === "^") {
				pattern += `(^|(?<=[\r
]))`;
				continue;
			} else if (source[i] === "$") {
				pattern += `($|(?=[\r
]))`;
				continue;
			}
		}
		if (flags.s && source[i] === ".") {
			pattern += inCharGroup
				? `${source[i]}\r
`
				: `[${source[i]}\r
]`;
			continue;
		}
		pattern += source[i];
		if (source[i] === "\\") {
			isEscaped = true;
		} else if (inCharGroup && source[i] === "]") {
			inCharGroup = false;
		} else if (!inCharGroup && source[i] === "[") {
			inCharGroup = true;
		}
	}
	try {
		new RegExp(pattern);
	} catch {
		console.warn(
			`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`,
		);
		return regex.source;
	}
	return pattern;
}
__name(stringifyRegExpWithFlags, "stringifyRegExpWithFlags");

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def2, refs) {
	if (refs.target === "openAi") {
		console.warn(
			"Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.",
		);
	}
	if (
		refs.target === "openApi3" &&
		def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum
	) {
		return {
			type: "object",
			required: def2.keyType._def.values,
			properties: def2.keyType._def.values.reduce(
				(acc, key) => ({
					...acc,
					[key]:
						parseDef(def2.valueType._def, {
							...refs,
							currentPath: [...refs.currentPath, "properties", key],
						}) ?? {},
				}),
				{},
			),
			additionalProperties: refs.rejectedAdditionalProperties,
		};
	}
	const schema = {
		type: "object",
		additionalProperties:
			parseDef(def2.valueType._def, {
				...refs,
				currentPath: [...refs.currentPath, "additionalProperties"],
			}) ?? refs.allowedAdditionalProperties,
	};
	if (refs.target === "openApi3") {
		return schema;
	}
	if (
		def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString &&
		def2.keyType._def.checks?.length
	) {
		const { type, ...keyType } = parseStringDef(def2.keyType._def, refs);
		return {
			...schema,
			propertyNames: keyType,
		};
	} else if (def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
		return {
			...schema,
			propertyNames: {
				enum: def2.keyType._def.values,
			},
		};
	} else if (
		def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded &&
		def2.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString &&
		def2.keyType._def.type._def.checks?.length
	) {
		const { type, ...keyType } = parseBrandedDef(def2.keyType._def, refs);
		return {
			...schema,
			propertyNames: keyType,
		};
	}
	return schema;
}
__name(parseRecordDef, "parseRecordDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def2, refs) {
	if (refs.mapStrategy === "record") {
		return parseRecordDef(def2, refs);
	}
	const keys =
		parseDef(def2.keyType._def, {
			...refs,
			currentPath: [...refs.currentPath, "items", "items", "0"],
		}) || {};
	const values =
		parseDef(def2.valueType._def, {
			...refs,
			currentPath: [...refs.currentPath, "items", "items", "1"],
		}) || {};
	return {
		type: "array",
		maxItems: 125,
		items: {
			type: "array",
			items: [keys, values],
			minItems: 2,
			maxItems: 2,
		},
	};
}
__name(parseMapDef, "parseMapDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseNativeEnumDef(def2) {
	const object = def2.values;
	const actualKeys = Object.keys(def2.values).filter((key) => {
		return typeof object[object[key]] !== "number";
	});
	const actualValues = actualKeys.map((key) => object[key]);
	const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
	return {
		type:
			parsedTypes.length === 1
				? parsedTypes[0] === "string"
					? "string"
					: "number"
				: ["string", "number"],
		enum: actualValues,
	};
}
__name(parseNativeEnumDef, "parseNativeEnumDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseNeverDef() {
	return {
		not: {},
	};
}
__name(parseNeverDef, "parseNeverDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseNullDef(refs) {
	return refs.target === "openApi3"
		? {
				enum: ["null"],
				nullable: true,
			}
		: {
				type: "null",
			};
}
__name(parseNullDef, "parseNullDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var primitiveMappings = {
	ZodString: "string",
	ZodNumber: "number",
	ZodBigInt: "integer",
	ZodBoolean: "boolean",
	ZodNull: "null",
};
function parseUnionDef(def2, refs) {
	if (refs.target === "openApi3") return asAnyOf(def2, refs);
	const options2 = def2.options instanceof Map ? Array.from(def2.options.values()) : def2.options;
	if (
		options2.every(
			(x) =>
				x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length),
		)
	) {
		const types = options2.reduce((types2, x) => {
			const type = primitiveMappings[x._def.typeName];
			return type && !types2.includes(type) ? [...types2, type] : types2;
		}, []);
		return {
			type: types.length > 1 ? types : types[0],
		};
	} else if (options2.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
		const types = options2.reduce((acc, x) => {
			const type = typeof x._def.value;
			switch (type) {
				case "string":
				case "number":
				case "boolean":
					return [...acc, type];
				case "bigint":
					return [...acc, "integer"];
				case "object":
					if (x._def.value === null) return [...acc, "null"];
				case "symbol":
				case "undefined":
				case "function":
				default:
					return acc;
			}
		}, []);
		if (types.length === options2.length) {
			const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
			return {
				type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
				enum: options2.reduce((acc, x) => {
					return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
				}, []),
			};
		}
	} else if (options2.every((x) => x._def.typeName === "ZodEnum")) {
		return {
			type: "string",
			enum: options2.reduce(
				(acc, x) => [...acc, ...x._def.values.filter((x2) => !acc.includes(x2))],
				[],
			),
		};
	}
	return asAnyOf(def2, refs);
}
__name(parseUnionDef, "parseUnionDef");
var asAnyOf = /* @__PURE__ */ __name((def2, refs) => {
	const anyOf = (def2.options instanceof Map ? Array.from(def2.options.values()) : def2.options)
		.map((x, i) =>
			parseDef(x._def, {
				...refs,
				currentPath: [...refs.currentPath, "anyOf", `${i}`],
			}),
		)
		.filter(
			(x) =>
				!!x && (!refs.strictUnions || (typeof x === "object" && Object.keys(x).length > 0)),
		);
	return anyOf.length ? { anyOf } : void 0;
}, "asAnyOf");

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def2, refs) {
	if (
		["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(
			def2.innerType._def.typeName,
		) &&
		(!def2.innerType._def.checks || !def2.innerType._def.checks.length)
	) {
		if (refs.target === "openApi3") {
			return {
				type: primitiveMappings[def2.innerType._def.typeName],
				nullable: true,
			};
		}
		return {
			type: [primitiveMappings[def2.innerType._def.typeName], "null"],
		};
	}
	if (refs.target === "openApi3") {
		const base2 = parseDef(def2.innerType._def, {
			...refs,
			currentPath: [...refs.currentPath],
		});
		if (base2 && "$ref" in base2) return { allOf: [base2], nullable: true };
		return base2 && { ...base2, nullable: true };
	}
	const base = parseDef(def2.innerType._def, {
		...refs,
		currentPath: [...refs.currentPath, "anyOf", "0"],
	});
	return base && { anyOf: [base, { type: "null" }] };
}
__name(parseNullableDef, "parseNullableDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseNumberDef(def2, refs) {
	const res = {
		type: "number",
	};
	if (!def2.checks) return res;
	for (const check of def2.checks) {
		switch (check.kind) {
			case "int":
				res.type = "integer";
				addErrorMessage(res, "type", check.message, refs);
				break;
			case "min":
				if (refs.target === "jsonSchema7") {
					if (check.inclusive) {
						setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
					} else {
						setResponseValueAndErrors(
							res,
							"exclusiveMinimum",
							check.value,
							check.message,
							refs,
						);
					}
				} else {
					if (!check.inclusive) {
						res.exclusiveMinimum = true;
					}
					setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
				}
				break;
			case "max":
				if (refs.target === "jsonSchema7") {
					if (check.inclusive) {
						setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
					} else {
						setResponseValueAndErrors(
							res,
							"exclusiveMaximum",
							check.value,
							check.message,
							refs,
						);
					}
				} else {
					if (!check.inclusive) {
						res.exclusiveMaximum = true;
					}
					setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
				}
				break;
			case "multipleOf":
				setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
				break;
		}
	}
	return res;
}
__name(parseNumberDef, "parseNumberDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseObjectDef(def2, refs) {
	const forceOptionalIntoNullable = refs.target === "openAi";
	const result = {
		type: "object",
		properties: {},
	};
	const required = [];
	const shape = def2.shape();
	for (const propName in shape) {
		let propDef = shape[propName];
		if (propDef === void 0 || propDef._def === void 0) {
			continue;
		}
		let propOptional = safeIsOptional(propDef);
		if (propOptional && forceOptionalIntoNullable) {
			if (propDef instanceof ZodOptional) {
				propDef = propDef._def.innerType;
			}
			if (!propDef.isNullable()) {
				propDef = propDef.nullable();
			}
			propOptional = false;
		}
		const parsedDef = parseDef(propDef._def, {
			...refs,
			currentPath: [...refs.currentPath, "properties", propName],
			propertyPath: [...refs.currentPath, "properties", propName],
		});
		if (parsedDef === void 0) {
			continue;
		}
		result.properties[propName] = parsedDef;
		if (!propOptional) {
			required.push(propName);
		}
	}
	if (required.length) {
		result.required = required;
	}
	const additionalProperties = decideAdditionalProperties(def2, refs);
	if (additionalProperties !== void 0) {
		result.additionalProperties = additionalProperties;
	}
	return result;
}
__name(parseObjectDef, "parseObjectDef");
function decideAdditionalProperties(def2, refs) {
	if (def2.catchall._def.typeName !== "ZodNever") {
		return parseDef(def2.catchall._def, {
			...refs,
			currentPath: [...refs.currentPath, "additionalProperties"],
		});
	}
	switch (def2.unknownKeys) {
		case "passthrough":
			return refs.allowedAdditionalProperties;
		case "strict":
			return refs.rejectedAdditionalProperties;
		case "strip":
			return refs.removeAdditionalStrategy === "strict"
				? refs.allowedAdditionalProperties
				: refs.rejectedAdditionalProperties;
	}
}
__name(decideAdditionalProperties, "decideAdditionalProperties");
function safeIsOptional(schema) {
	try {
		return schema.isOptional();
	} catch {
		return true;
	}
}
__name(safeIsOptional, "safeIsOptional");

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var parseOptionalDef = /* @__PURE__ */ __name((def2, refs) => {
	if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
		return parseDef(def2.innerType._def, refs);
	}
	const innerSchema = parseDef(def2.innerType._def, {
		...refs,
		currentPath: [...refs.currentPath, "anyOf", "1"],
	});
	return innerSchema
		? {
				anyOf: [
					{
						not: {},
					},
					innerSchema,
				],
			}
		: {};
}, "parseOptionalDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var parsePipelineDef = /* @__PURE__ */ __name((def2, refs) => {
	if (refs.pipeStrategy === "input") {
		return parseDef(def2.in._def, refs);
	} else if (refs.pipeStrategy === "output") {
		return parseDef(def2.out._def, refs);
	}
	const a = parseDef(def2.in._def, {
		...refs,
		currentPath: [...refs.currentPath, "allOf", "0"],
	});
	const b = parseDef(def2.out._def, {
		...refs,
		currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"],
	});
	return {
		allOf: [a, b].filter((x) => x !== void 0),
	};
}, "parsePipelineDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parsePromiseDef(def2, refs) {
	return parseDef(def2.type._def, refs);
}
__name(parsePromiseDef, "parsePromiseDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseSetDef(def2, refs) {
	const items = parseDef(def2.valueType._def, {
		...refs,
		currentPath: [...refs.currentPath, "items"],
	});
	const schema = {
		type: "array",
		uniqueItems: true,
		items,
	};
	if (def2.minSize) {
		setResponseValueAndErrors(
			schema,
			"minItems",
			def2.minSize.value,
			def2.minSize.message,
			refs,
		);
	}
	if (def2.maxSize) {
		setResponseValueAndErrors(
			schema,
			"maxItems",
			def2.maxSize.value,
			def2.maxSize.message,
			refs,
		);
	}
	return schema;
}
__name(parseSetDef, "parseSetDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseTupleDef(def2, refs) {
	if (def2.rest) {
		return {
			type: "array",
			minItems: def2.items.length,
			items: def2.items
				.map((x, i) =>
					parseDef(x._def, {
						...refs,
						currentPath: [...refs.currentPath, "items", `${i}`],
					}),
				)
				.reduce((acc, x) => (x === void 0 ? acc : [...acc, x]), []),
			additionalItems: parseDef(def2.rest._def, {
				...refs,
				currentPath: [...refs.currentPath, "additionalItems"],
			}),
		};
	} else {
		return {
			type: "array",
			minItems: def2.items.length,
			maxItems: def2.items.length,
			items: def2.items
				.map((x, i) =>
					parseDef(x._def, {
						...refs,
						currentPath: [...refs.currentPath, "items", `${i}`],
					}),
				)
				.reduce((acc, x) => (x === void 0 ? acc : [...acc, x]), []),
		};
	}
}
__name(parseTupleDef, "parseTupleDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseUndefinedDef() {
	return {
		not: {},
	};
}
__name(parseUndefinedDef, "parseUndefinedDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseUnknownDef() {
	return {};
}
__name(parseUnknownDef, "parseUnknownDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var parseReadonlyDef = /* @__PURE__ */ __name((def2, refs) => {
	return parseDef(def2.innerType._def, refs);
}, "parseReadonlyDef");

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = /* @__PURE__ */ __name((def2, typeName, refs) => {
	switch (typeName) {
		case ZodFirstPartyTypeKind.ZodString:
			return parseStringDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodNumber:
			return parseNumberDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodObject:
			return parseObjectDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodBigInt:
			return parseBigintDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodBoolean:
			return parseBooleanDef();
		case ZodFirstPartyTypeKind.ZodDate:
			return parseDateDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodUndefined:
			return parseUndefinedDef();
		case ZodFirstPartyTypeKind.ZodNull:
			return parseNullDef(refs);
		case ZodFirstPartyTypeKind.ZodArray:
			return parseArrayDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodUnion:
		case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
			return parseUnionDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodIntersection:
			return parseIntersectionDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodTuple:
			return parseTupleDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodRecord:
			return parseRecordDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodLiteral:
			return parseLiteralDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodEnum:
			return parseEnumDef(def2);
		case ZodFirstPartyTypeKind.ZodNativeEnum:
			return parseNativeEnumDef(def2);
		case ZodFirstPartyTypeKind.ZodNullable:
			return parseNullableDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodOptional:
			return parseOptionalDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodMap:
			return parseMapDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodSet:
			return parseSetDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodLazy:
			return () => def2.getter()._def;
		case ZodFirstPartyTypeKind.ZodPromise:
			return parsePromiseDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodNaN:
		case ZodFirstPartyTypeKind.ZodNever:
			return parseNeverDef();
		case ZodFirstPartyTypeKind.ZodEffects:
			return parseEffectsDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodAny:
			return parseAnyDef();
		case ZodFirstPartyTypeKind.ZodUnknown:
			return parseUnknownDef();
		case ZodFirstPartyTypeKind.ZodDefault:
			return parseDefaultDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodBranded:
			return parseBrandedDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodReadonly:
			return parseReadonlyDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodCatch:
			return parseCatchDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodPipeline:
			return parsePipelineDef(def2, refs);
		case ZodFirstPartyTypeKind.ZodFunction:
		case ZodFirstPartyTypeKind.ZodVoid:
		case ZodFirstPartyTypeKind.ZodSymbol:
			return void 0;
		default:
			return /* @__PURE__ */ ((_) => void 0)(typeName);
	}
}, "selectParser");

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def2, refs, forceResolution = false) {
	const seenItem = refs.seen.get(def2);
	if (refs.override) {
		const overrideResult = refs.override?.(def2, refs, seenItem, forceResolution);
		if (overrideResult !== ignoreOverride) {
			return overrideResult;
		}
	}
	if (seenItem && !forceResolution) {
		const seenSchema = get$ref(seenItem, refs);
		if (seenSchema !== void 0) {
			return seenSchema;
		}
	}
	const newItem = { def: def2, path: refs.currentPath, jsonSchema: void 0 };
	refs.seen.set(def2, newItem);
	const jsonSchemaOrGetter = selectParser(def2, def2.typeName, refs);
	const jsonSchema =
		typeof jsonSchemaOrGetter === "function"
			? parseDef(jsonSchemaOrGetter(), refs)
			: jsonSchemaOrGetter;
	if (jsonSchema) {
		addMeta(def2, refs, jsonSchema);
	}
	if (refs.postProcess) {
		const postProcessResult = refs.postProcess(jsonSchema, def2, refs);
		newItem.jsonSchema = jsonSchema;
		return postProcessResult;
	}
	newItem.jsonSchema = jsonSchema;
	return jsonSchema;
}
__name(parseDef, "parseDef");
var get$ref = /* @__PURE__ */ __name((item, refs) => {
	switch (refs.$refStrategy) {
		case "root":
			return { $ref: item.path.join("/") };
		case "relative":
			return { $ref: getRelativePath(refs.currentPath, item.path) };
		case "none":
		case "seen": {
			if (
				item.path.length < refs.currentPath.length &&
				item.path.every((value, index2) => refs.currentPath[index2] === value)
			) {
				console.warn(
					`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`,
				);
				return {};
			}
			return refs.$refStrategy === "seen" ? {} : void 0;
		}
	}
}, "get$ref");
var getRelativePath = /* @__PURE__ */ __name((pathA, pathB) => {
	let i = 0;
	for (; i < pathA.length && i < pathB.length; i++) {
		if (pathA[i] !== pathB[i]) break;
	}
	return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
}, "getRelativePath");
var addMeta = /* @__PURE__ */ __name((def2, refs, jsonSchema) => {
	if (def2.description) {
		jsonSchema.description = def2.description;
		if (refs.markdownDescription) {
			jsonSchema.markdownDescription = def2.description;
		}
	}
	return jsonSchema;
}, "addMeta");

// node_modules/zod-to-json-schema/dist/esm/parseTypes.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var zodToJsonSchema = /* @__PURE__ */ __name((schema, options2) => {
	const refs = getRefs(options2);
	const definitions =
		typeof options2 === "object" && options2.definitions
			? Object.entries(options2.definitions).reduce(
					(acc, [name2, schema2]) => ({
						...acc,
						[name2]:
							parseDef(
								schema2._def,
								{
									...refs,
									currentPath: [...refs.basePath, refs.definitionPath, name2],
								},
								true,
							) ?? {},
					}),
					{},
				)
			: void 0;
	const name =
		typeof options2 === "string"
			? options2
			: options2?.nameStrategy === "title"
				? void 0
				: options2?.name;
	const main =
		parseDef(
			schema._def,
			name === void 0
				? refs
				: {
						...refs,
						currentPath: [...refs.basePath, refs.definitionPath, name],
					},
			false,
		) ?? {};
	const title2 =
		typeof options2 === "object" &&
		options2.name !== void 0 &&
		options2.nameStrategy === "title"
			? options2.name
			: void 0;
	if (title2 !== void 0) {
		main.title = title2;
	}
	const combined =
		name === void 0
			? definitions
				? {
						...main,
						[refs.definitionPath]: definitions,
					}
				: main
			: {
					$ref: [
						...(refs.$refStrategy === "relative" ? [] : refs.basePath),
						refs.definitionPath,
						name,
					].join("/"),
					[refs.definitionPath]: {
						...definitions,
						[name]: main,
					},
				};
	if (refs.target === "jsonSchema7") {
		combined.$schema = "http://json-schema.org/draft-07/schema#";
	} else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
		combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
	}
	if (
		refs.target === "openAi" &&
		("anyOf" in combined ||
			"oneOf" in combined ||
			"allOf" in combined ||
			("type" in combined && Array.isArray(combined.type)))
	) {
		console.warn(
			"Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.",
		);
	}
	return combined;
}, "zodToJsonSchema");

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/completable.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var McpZodTypeKind;
((McpZodTypeKind2) => {
	McpZodTypeKind2["Completable"] = "McpCompletable";
})(McpZodTypeKind || (McpZodTypeKind = {}));
var Completable = class extends ZodType {
	static {
		__name(this, "Completable");
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx,
		});
	}
	unwrap() {
		return this._def.type;
	}
};
Completable.create = (type, params) => {
	return new Completable({
		type,
		typeName: McpZodTypeKind.Completable,
		complete: params.complete,
		...processCreateParams2(params),
	});
};
function processCreateParams2(params) {
	if (!params) return {};
	const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
	if (errorMap2 && (invalid_type_error || required_error)) {
		throw new Error(
			`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
		);
	}
	if (errorMap2) return { errorMap: errorMap2, description };
	const customMap = /* @__PURE__ */ __name((iss, ctx) => {
		var _a2, _b;
		const { message } = params;
		if (iss.code === "invalid_enum_value") {
			return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
		}
		if (typeof ctx.data === "undefined") {
			return {
				message:
					(_a2 = message !== null && message !== void 0 ? message : required_error) !==
						null && _a2 !== void 0
						? _a2
						: ctx.defaultError,
			};
		}
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return {
			message:
				(_b = message !== null && message !== void 0 ? message : invalid_type_error) !==
					null && _b !== void 0
					? _b
					: ctx.defaultError,
		};
	}, "customMap");
	return { errorMap: customMap, description };
}
__name(processCreateParams2, "processCreateParams");

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/uriTemplate.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js
var McpServer = class {
	static {
		__name(this, "McpServer");
	}
	constructor(serverInfo, options2) {
		this._registeredResources = {};
		this._registeredResourceTemplates = {};
		this._registeredTools = {};
		this._registeredPrompts = {};
		this._toolHandlersInitialized = false;
		this._completionHandlerInitialized = false;
		this._resourceHandlersInitialized = false;
		this._promptHandlersInitialized = false;
		this.server = new Server2(serverInfo, options2);
	}
	/**
	 * Attaches to the given transport, starts it, and starts listening for messages.
	 *
	 * The `server` object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
	 */
	async connect(transport) {
		return await this.server.connect(transport);
	}
	/**
	 * Closes the connection.
	 */
	async close() {
		await this.server.close();
	}
	setToolRequestHandlers() {
		if (this._toolHandlersInitialized) {
			return;
		}
		this.server.assertCanSetRequestHandler(ListToolsRequestSchema.shape.method.value);
		this.server.assertCanSetRequestHandler(CallToolRequestSchema.shape.method.value);
		this.server.registerCapabilities({
			tools: {
				listChanged: true,
			},
		});
		this.server.setRequestHandler(ListToolsRequestSchema, () => ({
			tools: Object.entries(this._registeredTools)
				.filter(([, tool]) => tool.enabled)
				.map(([name, tool]) => {
					return {
						name,
						description: tool.description,
						inputSchema: tool.inputSchema
							? zodToJsonSchema(tool.inputSchema, {
									strictUnions: true,
								})
							: EMPTY_OBJECT_JSON_SCHEMA,
					};
				}),
		}));
		this.server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
			const tool = this._registeredTools[request.params.name];
			if (!tool) {
				throw new McpError(
					ErrorCode.InvalidParams,
					`Tool ${request.params.name} not found`,
				);
			}
			if (!tool.enabled) {
				throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} disabled`);
			}
			if (tool.inputSchema) {
				const parseResult = await tool.inputSchema.safeParseAsync(request.params.arguments);
				if (!parseResult.success) {
					throw new McpError(
						ErrorCode.InvalidParams,
						`Invalid arguments for tool ${request.params.name}: ${parseResult.error.message}`,
					);
				}
				const args = parseResult.data;
				const cb = tool.callback;
				try {
					return await Promise.resolve(cb(args, extra));
				} catch (error3) {
					return {
						content: [
							{
								type: "text",
								text: error3 instanceof Error ? error3.message : String(error3),
							},
						],
						isError: true,
					};
				}
			} else {
				const cb = tool.callback;
				try {
					return await Promise.resolve(cb(extra));
				} catch (error3) {
					return {
						content: [
							{
								type: "text",
								text: error3 instanceof Error ? error3.message : String(error3),
							},
						],
						isError: true,
					};
				}
			}
		});
		this._toolHandlersInitialized = true;
	}
	setCompletionRequestHandler() {
		if (this._completionHandlerInitialized) {
			return;
		}
		this.server.assertCanSetRequestHandler(CompleteRequestSchema.shape.method.value);
		this.server.setRequestHandler(CompleteRequestSchema, async (request) => {
			switch (request.params.ref.type) {
				case "ref/prompt":
					return this.handlePromptCompletion(request, request.params.ref);
				case "ref/resource":
					return this.handleResourceCompletion(request, request.params.ref);
				default:
					throw new McpError(
						ErrorCode.InvalidParams,
						`Invalid completion reference: ${request.params.ref}`,
					);
			}
		});
		this._completionHandlerInitialized = true;
	}
	async handlePromptCompletion(request, ref) {
		const prompt = this._registeredPrompts[ref.name];
		if (!prompt) {
			throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref.name} not found`);
		}
		if (!prompt.enabled) {
			throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref.name} disabled`);
		}
		if (!prompt.argsSchema) {
			return EMPTY_COMPLETION_RESULT;
		}
		const field = prompt.argsSchema.shape[request.params.argument.name];
		if (!(field instanceof Completable)) {
			return EMPTY_COMPLETION_RESULT;
		}
		const def2 = field._def;
		const suggestions = await def2.complete(request.params.argument.value);
		return createCompletionResult(suggestions);
	}
	async handleResourceCompletion(request, ref) {
		const template = Object.values(this._registeredResourceTemplates).find(
			(t) => t.resourceTemplate.uriTemplate.toString() === ref.uri,
		);
		if (!template) {
			if (this._registeredResources[ref.uri]) {
				return EMPTY_COMPLETION_RESULT;
			}
			throw new McpError(
				ErrorCode.InvalidParams,
				`Resource template ${request.params.ref.uri} not found`,
			);
		}
		const completer = template.resourceTemplate.completeCallback(request.params.argument.name);
		if (!completer) {
			return EMPTY_COMPLETION_RESULT;
		}
		const suggestions = await completer(request.params.argument.value);
		return createCompletionResult(suggestions);
	}
	setResourceRequestHandlers() {
		if (this._resourceHandlersInitialized) {
			return;
		}
		this.server.assertCanSetRequestHandler(ListResourcesRequestSchema.shape.method.value);
		this.server.assertCanSetRequestHandler(
			ListResourceTemplatesRequestSchema.shape.method.value,
		);
		this.server.assertCanSetRequestHandler(ReadResourceRequestSchema.shape.method.value);
		this.server.registerCapabilities({
			resources: {
				listChanged: true,
			},
		});
		this.server.setRequestHandler(ListResourcesRequestSchema, async (request, extra) => {
			const resources = Object.entries(this._registeredResources)
				.filter(([_, resource]) => resource.enabled)
				.map(([uri, resource]) => ({
					uri,
					name: resource.name,
					...resource.metadata,
				}));
			const templateResources = [];
			for (const template of Object.values(this._registeredResourceTemplates)) {
				if (!template.resourceTemplate.listCallback) {
					continue;
				}
				const result = await template.resourceTemplate.listCallback(extra);
				for (const resource of result.resources) {
					templateResources.push({
						...resource,
						...template.metadata,
					});
				}
			}
			return { resources: [...resources, ...templateResources] };
		});
		this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
			const resourceTemplates = Object.entries(this._registeredResourceTemplates).map(
				([name, template]) => ({
					name,
					uriTemplate: template.resourceTemplate.uriTemplate.toString(),
					...template.metadata,
				}),
			);
			return { resourceTemplates };
		});
		this.server.setRequestHandler(ReadResourceRequestSchema, async (request, extra) => {
			const uri = new URL(request.params.uri);
			const resource = this._registeredResources[uri.toString()];
			if (resource) {
				if (!resource.enabled) {
					throw new McpError(ErrorCode.InvalidParams, `Resource ${uri} disabled`);
				}
				return resource.readCallback(uri, extra);
			}
			for (const template of Object.values(this._registeredResourceTemplates)) {
				const variables = template.resourceTemplate.uriTemplate.match(uri.toString());
				if (variables) {
					return template.readCallback(uri, variables, extra);
				}
			}
			throw new McpError(ErrorCode.InvalidParams, `Resource ${uri} not found`);
		});
		this.setCompletionRequestHandler();
		this._resourceHandlersInitialized = true;
	}
	setPromptRequestHandlers() {
		if (this._promptHandlersInitialized) {
			return;
		}
		this.server.assertCanSetRequestHandler(ListPromptsRequestSchema.shape.method.value);
		this.server.assertCanSetRequestHandler(GetPromptRequestSchema.shape.method.value);
		this.server.registerCapabilities({
			prompts: {
				listChanged: true,
			},
		});
		this.server.setRequestHandler(ListPromptsRequestSchema, () => ({
			prompts: Object.entries(this._registeredPrompts)
				.filter(([, prompt]) => prompt.enabled)
				.map(([name, prompt]) => {
					return {
						name,
						description: prompt.description,
						arguments: prompt.argsSchema
							? promptArgumentsFromSchema(prompt.argsSchema)
							: void 0,
					};
				}),
		}));
		this.server.setRequestHandler(GetPromptRequestSchema, async (request, extra) => {
			const prompt = this._registeredPrompts[request.params.name];
			if (!prompt) {
				throw new McpError(
					ErrorCode.InvalidParams,
					`Prompt ${request.params.name} not found`,
				);
			}
			if (!prompt.enabled) {
				throw new McpError(
					ErrorCode.InvalidParams,
					`Prompt ${request.params.name} disabled`,
				);
			}
			if (prompt.argsSchema) {
				const parseResult = await prompt.argsSchema.safeParseAsync(
					request.params.arguments,
				);
				if (!parseResult.success) {
					throw new McpError(
						ErrorCode.InvalidParams,
						`Invalid arguments for prompt ${request.params.name}: ${parseResult.error.message}`,
					);
				}
				const args = parseResult.data;
				const cb = prompt.callback;
				return await Promise.resolve(cb(args, extra));
			} else {
				const cb = prompt.callback;
				return await Promise.resolve(cb(extra));
			}
		});
		this.setCompletionRequestHandler();
		this._promptHandlersInitialized = true;
	}
	resource(name, uriOrTemplate, ...rest) {
		let metadata;
		if (typeof rest[0] === "object") {
			metadata = rest.shift();
		}
		const readCallback = rest[0];
		if (typeof uriOrTemplate === "string") {
			if (this._registeredResources[uriOrTemplate]) {
				throw new Error(`Resource ${uriOrTemplate} is already registered`);
			}
			const registeredResource = {
				name,
				metadata,
				readCallback,
				enabled: true,
				disable: /* @__PURE__ */ __name(
					() => registeredResource.update({ enabled: false }),
					"disable",
				),
				enable: /* @__PURE__ */ __name(
					() => registeredResource.update({ enabled: true }),
					"enable",
				),
				remove: /* @__PURE__ */ __name(
					() => registeredResource.update({ uri: null }),
					"remove",
				),
				update: /* @__PURE__ */ __name((updates) => {
					if (typeof updates.uri !== "undefined" && updates.uri !== uriOrTemplate) {
						delete this._registeredResources[uriOrTemplate];
						if (updates.uri)
							this._registeredResources[updates.uri] = registeredResource;
					}
					if (typeof updates.name !== "undefined") registeredResource.name = updates.name;
					if (typeof updates.metadata !== "undefined")
						registeredResource.metadata = updates.metadata;
					if (typeof updates.callback !== "undefined")
						registeredResource.readCallback = updates.callback;
					if (typeof updates.enabled !== "undefined")
						registeredResource.enabled = updates.enabled;
					this.sendResourceListChanged();
				}, "update"),
			};
			this._registeredResources[uriOrTemplate] = registeredResource;
			this.setResourceRequestHandlers();
			this.sendResourceListChanged();
			return registeredResource;
		} else {
			if (this._registeredResourceTemplates[name]) {
				throw new Error(`Resource template ${name} is already registered`);
			}
			const registeredResourceTemplate = {
				resourceTemplate: uriOrTemplate,
				metadata,
				readCallback,
				enabled: true,
				disable: /* @__PURE__ */ __name(
					() => registeredResourceTemplate.update({ enabled: false }),
					"disable",
				),
				enable: /* @__PURE__ */ __name(
					() => registeredResourceTemplate.update({ enabled: true }),
					"enable",
				),
				remove: /* @__PURE__ */ __name(
					() => registeredResourceTemplate.update({ name: null }),
					"remove",
				),
				update: /* @__PURE__ */ __name((updates) => {
					if (typeof updates.name !== "undefined" && updates.name !== name) {
						delete this._registeredResourceTemplates[name];
						if (updates.name)
							this._registeredResourceTemplates[updates.name] =
								registeredResourceTemplate;
					}
					if (typeof updates.template !== "undefined")
						registeredResourceTemplate.resourceTemplate = updates.template;
					if (typeof updates.metadata !== "undefined")
						registeredResourceTemplate.metadata = updates.metadata;
					if (typeof updates.callback !== "undefined")
						registeredResourceTemplate.readCallback = updates.callback;
					if (typeof updates.enabled !== "undefined")
						registeredResourceTemplate.enabled = updates.enabled;
					this.sendResourceListChanged();
				}, "update"),
			};
			this._registeredResourceTemplates[name] = registeredResourceTemplate;
			this.setResourceRequestHandlers();
			this.sendResourceListChanged();
			return registeredResourceTemplate;
		}
	}
	tool(name, ...rest) {
		if (this._registeredTools[name]) {
			throw new Error(`Tool ${name} is already registered`);
		}
		let description;
		if (typeof rest[0] === "string") {
			description = rest.shift();
		}
		let paramsSchema;
		if (rest.length > 1) {
			paramsSchema = rest.shift();
		}
		const cb = rest[0];
		const registeredTool = {
			description,
			inputSchema: paramsSchema === void 0 ? void 0 : z.object(paramsSchema),
			callback: cb,
			enabled: true,
			disable: /* @__PURE__ */ __name(
				() => registeredTool.update({ enabled: false }),
				"disable",
			),
			enable: /* @__PURE__ */ __name(
				() => registeredTool.update({ enabled: true }),
				"enable",
			),
			remove: /* @__PURE__ */ __name(() => registeredTool.update({ name: null }), "remove"),
			update: /* @__PURE__ */ __name((updates) => {
				if (typeof updates.name !== "undefined" && updates.name !== name) {
					delete this._registeredTools[name];
					if (updates.name) this._registeredTools[updates.name] = registeredTool;
				}
				if (typeof updates.description !== "undefined")
					registeredTool.description = updates.description;
				if (typeof updates.paramsSchema !== "undefined")
					registeredTool.inputSchema = z.object(updates.paramsSchema);
				if (typeof updates.callback !== "undefined")
					registeredTool.callback = updates.callback;
				if (typeof updates.enabled !== "undefined")
					registeredTool.enabled = updates.enabled;
				this.sendToolListChanged();
			}, "update"),
		};
		this._registeredTools[name] = registeredTool;
		this.setToolRequestHandlers();
		this.sendToolListChanged();
		return registeredTool;
	}
	prompt(name, ...rest) {
		if (this._registeredPrompts[name]) {
			throw new Error(`Prompt ${name} is already registered`);
		}
		let description;
		if (typeof rest[0] === "string") {
			description = rest.shift();
		}
		let argsSchema;
		if (rest.length > 1) {
			argsSchema = rest.shift();
		}
		const cb = rest[0];
		const registeredPrompt = {
			description,
			argsSchema: argsSchema === void 0 ? void 0 : z.object(argsSchema),
			callback: cb,
			enabled: true,
			disable: /* @__PURE__ */ __name(
				() => registeredPrompt.update({ enabled: false }),
				"disable",
			),
			enable: /* @__PURE__ */ __name(
				() => registeredPrompt.update({ enabled: true }),
				"enable",
			),
			remove: /* @__PURE__ */ __name(() => registeredPrompt.update({ name: null }), "remove"),
			update: /* @__PURE__ */ __name((updates) => {
				if (typeof updates.name !== "undefined" && updates.name !== name) {
					delete this._registeredPrompts[name];
					if (updates.name) this._registeredPrompts[updates.name] = registeredPrompt;
				}
				if (typeof updates.description !== "undefined")
					registeredPrompt.description = updates.description;
				if (typeof updates.argsSchema !== "undefined")
					registeredPrompt.argsSchema = z.object(updates.argsSchema);
				if (typeof updates.callback !== "undefined")
					registeredPrompt.callback = updates.callback;
				if (typeof updates.enabled !== "undefined")
					registeredPrompt.enabled = updates.enabled;
				this.sendPromptListChanged();
			}, "update"),
		};
		this._registeredPrompts[name] = registeredPrompt;
		this.setPromptRequestHandlers();
		this.sendPromptListChanged();
		return registeredPrompt;
	}
	/**
	 * Checks if the server is connected to a transport.
	 * @returns True if the server is connected
	 */
	isConnected() {
		return this.server.transport !== void 0;
	}
	/**
	 * Sends a resource list changed event to the client, if connected.
	 */
	sendResourceListChanged() {
		if (this.isConnected()) {
			this.server.sendResourceListChanged();
		}
	}
	/**
	 * Sends a tool list changed event to the client, if connected.
	 */
	sendToolListChanged() {
		if (this.isConnected()) {
			this.server.sendToolListChanged();
		}
	}
	/**
	 * Sends a prompt list changed event to the client, if connected.
	 */
	sendPromptListChanged() {
		if (this.isConnected()) {
			this.server.sendPromptListChanged();
		}
	}
};
var EMPTY_OBJECT_JSON_SCHEMA = {
	type: "object",
};
function promptArgumentsFromSchema(schema) {
	return Object.entries(schema.shape).map(([name, field]) => ({
		name,
		description: field.description,
		required: !field.isOptional(),
	}));
}
__name(promptArgumentsFromSchema, "promptArgumentsFromSchema");
function createCompletionResult(suggestions) {
	return {
		completion: {
			values: suggestions.slice(0, 100),
			total: suggestions.length,
			hasMore: suggestions.length > 100,
		},
	};
}
__name(createCompletionResult, "createCompletionResult");
var EMPTY_COMPLETION_RESULT = {
	completion: {
		values: [],
		hasMore: false,
	},
};

// src/mcp/tools/index.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/mcp/tools/queryTool.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/mcp/api/client/index.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/mcp/api/client/config.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/mcp/api/client/client.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/mcp/api/client/base.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/mcp/api/utils/caseConverter.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_snakecase_keys = __toESM(require_snakecase_keys());

// node_modules/camelcase-keys/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/map-obj/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var isObject = /* @__PURE__ */ __name(
	(value) => typeof value === "object" && value !== null,
	"isObject",
);
var isObjectCustom = /* @__PURE__ */ __name(
	(value) =>
		isObject(value) &&
		!(value instanceof RegExp) &&
		!(value instanceof Error) &&
		!(value instanceof Date),
	"isObjectCustom",
);
var mapObjectSkip = Symbol("mapObjectSkip");
var _mapObject = /* @__PURE__ */ __name(
	(object, mapper, options2, isSeen = /* @__PURE__ */ new WeakMap()) => {
		options2 = {
			deep: false,
			target: {},
			...options2,
		};
		if (isSeen.has(object)) {
			return isSeen.get(object);
		}
		isSeen.set(object, options2.target);
		const { target } = options2;
		delete options2.target;
		const mapArray = /* @__PURE__ */ __name(
			(array) =>
				array.map((element) =>
					isObjectCustom(element)
						? _mapObject(element, mapper, options2, isSeen)
						: element,
				),
			"mapArray",
		);
		if (Array.isArray(object)) {
			return mapArray(object);
		}
		for (const [key, value] of Object.entries(object)) {
			const mapResult = mapper(key, value, object);
			if (mapResult === mapObjectSkip) {
				continue;
			}
			let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
			if (newKey === "__proto__") {
				continue;
			}
			if (options2.deep && shouldRecurse && isObjectCustom(newValue)) {
				newValue = Array.isArray(newValue)
					? mapArray(newValue)
					: _mapObject(newValue, mapper, options2, isSeen);
			}
			target[newKey] = newValue;
		}
		return target;
	},
	"_mapObject",
);
function mapObject(object, mapper, options2) {
	if (!isObject(object)) {
		throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
	}
	return _mapObject(object, mapper, options2);
}
__name(mapObject, "mapObject");

// node_modules/camelcase/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var UPPERCASE = /[\p{Lu}]/u;
var LOWERCASE = /[\p{Ll}]/u;
var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
var SEPARATORS = /[_.\- ]+/;
var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
var preserveCamelCase = /* @__PURE__ */ __name(
	(string, toLowerCase, toUpperCase, preserveConsecutiveUppercase2) => {
		let isLastCharLower = false;
		let isLastCharUpper = false;
		let isLastLastCharUpper = false;
		let isLastLastCharPreserved = false;
		for (let index2 = 0; index2 < string.length; index2++) {
			const character = string[index2];
			isLastLastCharPreserved = index2 > 2 ? string[index2 - 3] === "-" : true;
			if (isLastCharLower && UPPERCASE.test(character)) {
				string = string.slice(0, index2) + "-" + string.slice(index2);
				isLastCharLower = false;
				isLastLastCharUpper = isLastCharUpper;
				isLastCharUpper = true;
				index2++;
			} else if (
				isLastCharUpper &&
				isLastLastCharUpper &&
				LOWERCASE.test(character) &&
				(!isLastLastCharPreserved || preserveConsecutiveUppercase2)
			) {
				string = string.slice(0, index2 - 1) + "-" + string.slice(index2 - 1);
				isLastLastCharUpper = isLastCharUpper;
				isLastCharUpper = false;
				isLastCharLower = true;
			} else {
				isLastCharLower =
					toLowerCase(character) === character && toUpperCase(character) !== character;
				isLastLastCharUpper = isLastCharUpper;
				isLastCharUpper =
					toUpperCase(character) === character && toLowerCase(character) !== character;
			}
		}
		return string;
	},
	"preserveCamelCase",
);
var preserveConsecutiveUppercase = /* @__PURE__ */ __name((input, toLowerCase) => {
	LEADING_CAPITAL.lastIndex = 0;
	return input.replaceAll(LEADING_CAPITAL, (match) => toLowerCase(match));
}, "preserveConsecutiveUppercase");
var postProcess = /* @__PURE__ */ __name((input, toUpperCase) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;
	return input
		.replaceAll(NUMBERS_AND_IDENTIFIER, (match, pattern, offset) =>
			["_", "-"].includes(input.charAt(offset + match.length)) ? match : toUpperCase(match),
		)
		.replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier));
}, "postProcess");
function camelCase(input, options2) {
	if (!(typeof input === "string" || Array.isArray(input))) {
		throw new TypeError("Expected the input to be `string | string[]`");
	}
	options2 = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options2,
	};
	if (Array.isArray(input)) {
		input = input
			.map((x) => x.trim())
			.filter((x) => x.length)
			.join("-");
	} else {
		input = input.trim();
	}
	if (input.length === 0) {
		return "";
	}
	const toLowerCase =
		options2.locale === false
			? (string) => string.toLowerCase()
			: (string) => string.toLocaleLowerCase(options2.locale);
	const toUpperCase =
		options2.locale === false
			? (string) => string.toUpperCase()
			: (string) => string.toLocaleUpperCase(options2.locale);
	if (input.length === 1) {
		if (SEPARATORS.test(input)) {
			return "";
		}
		return options2.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}
	const hasUpperCase = input !== toLowerCase(input);
	if (hasUpperCase) {
		input = preserveCamelCase(
			input,
			toLowerCase,
			toUpperCase,
			options2.preserveConsecutiveUppercase,
		);
	}
	input = input.replace(LEADING_SEPARATORS, "");
	input = options2.preserveConsecutiveUppercase
		? preserveConsecutiveUppercase(input, toLowerCase)
		: toLowerCase(input);
	if (options2.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}
	return postProcess(input, toUpperCase);
}
__name(camelCase, "camelCase");

// node_modules/quick-lru/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var QuickLRU = class extends Map {
	static {
		__name(this, "QuickLRU");
	}
	constructor(options2 = {}) {
		super();
		if (!(options2.maxSize && options2.maxSize > 0)) {
			throw new TypeError("`maxSize` must be a number greater than 0");
		}
		if (typeof options2.maxAge === "number" && options2.maxAge === 0) {
			throw new TypeError("`maxAge` must be a number greater than 0");
		}
		this.maxSize = options2.maxSize;
		this.maxAge = options2.maxAge || Number.POSITIVE_INFINITY;
		this.onEviction = options2.onEviction;
		this.cache = /* @__PURE__ */ new Map();
		this.oldCache = /* @__PURE__ */ new Map();
		this._size = 0;
	}
	// TODO: Use private class methods when targeting Node.js 16.
	_emitEvictions(cache2) {
		if (typeof this.onEviction !== "function") {
			return;
		}
		for (const [key, item] of cache2) {
			this.onEviction(key, item.value);
		}
	}
	_deleteIfExpired(key, item) {
		if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
			if (typeof this.onEviction === "function") {
				this.onEviction(key, item.value);
			}
			return this.delete(key);
		}
		return false;
	}
	_getOrDeleteIfExpired(key, item) {
		const deleted = this._deleteIfExpired(key, item);
		if (deleted === false) {
			return item.value;
		}
	}
	_getItemValue(key, item) {
		return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
	}
	_peek(key, cache2) {
		const item = cache2.get(key);
		return this._getItemValue(key, item);
	}
	_set(key, value) {
		this.cache.set(key, value);
		this._size++;
		if (this._size >= this.maxSize) {
			this._size = 0;
			this._emitEvictions(this.oldCache);
			this.oldCache = this.cache;
			this.cache = /* @__PURE__ */ new Map();
		}
	}
	_moveToRecent(key, item) {
		this.oldCache.delete(key);
		this._set(key, item);
	}
	*_entriesAscending() {
		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield item;
				}
			}
		}
		for (const item of this.cache) {
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield item;
			}
		}
	}
	get(key) {
		if (this.cache.has(key)) {
			const item = this.cache.get(key);
			return this._getItemValue(key, item);
		}
		if (this.oldCache.has(key)) {
			const item = this.oldCache.get(key);
			if (this._deleteIfExpired(key, item) === false) {
				this._moveToRecent(key, item);
				return item.value;
			}
		}
	}
	set(key, value, { maxAge = this.maxAge } = {}) {
		const expiry =
			typeof maxAge === "number" && maxAge !== Number.POSITIVE_INFINITY
				? Date.now() + maxAge
				: void 0;
		if (this.cache.has(key)) {
			this.cache.set(key, {
				value,
				expiry,
			});
		} else {
			this._set(key, { value, expiry });
		}
		return this;
	}
	has(key) {
		if (this.cache.has(key)) {
			return !this._deleteIfExpired(key, this.cache.get(key));
		}
		if (this.oldCache.has(key)) {
			return !this._deleteIfExpired(key, this.oldCache.get(key));
		}
		return false;
	}
	peek(key) {
		if (this.cache.has(key)) {
			return this._peek(key, this.cache);
		}
		if (this.oldCache.has(key)) {
			return this._peek(key, this.oldCache);
		}
	}
	delete(key) {
		const deleted = this.cache.delete(key);
		if (deleted) {
			this._size--;
		}
		return this.oldCache.delete(key) || deleted;
	}
	clear() {
		this.cache.clear();
		this.oldCache.clear();
		this._size = 0;
	}
	resize(newSize) {
		if (!(newSize && newSize > 0)) {
			throw new TypeError("`maxSize` must be a number greater than 0");
		}
		const items = [...this._entriesAscending()];
		const removeCount = items.length - newSize;
		if (removeCount < 0) {
			this.cache = new Map(items);
			this.oldCache = /* @__PURE__ */ new Map();
			this._size = items.length;
		} else {
			if (removeCount > 0) {
				this._emitEvictions(items.slice(0, removeCount));
			}
			this.oldCache = new Map(items.slice(removeCount));
			this.cache = /* @__PURE__ */ new Map();
			this._size = 0;
		}
		this.maxSize = newSize;
	}
	*keys() {
		for (const [key] of this) {
			yield key;
		}
	}
	*values() {
		for (const [, value] of this) {
			yield value;
		}
	}
	*[Symbol.iterator]() {
		for (const item of this.cache) {
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}
		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}
	*entriesDescending() {
		let items = [...this.cache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}
		items = [...this.oldCache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}
	*entriesAscending() {
		for (const [key, value] of this._entriesAscending()) {
			yield [key, value.value];
		}
	}
	get size() {
		if (!this._size) {
			return this.oldCache.size;
		}
		let oldCacheSize = 0;
		for (const key of this.oldCache.keys()) {
			if (!this.cache.has(key)) {
				oldCacheSize++;
			}
		}
		return Math.min(this._size + oldCacheSize, this.maxSize);
	}
	entries() {
		return this.entriesAscending();
	}
	forEach(callbackFunction, thisArgument = this) {
		for (const [key, value] of this.entriesAscending()) {
			callbackFunction.call(thisArgument, value, key, this);
		}
	}
	get [Symbol.toStringTag]() {
		return JSON.stringify([...this.entriesAscending()]);
	}
};

// node_modules/camelcase-keys/index.js
var has = /* @__PURE__ */ __name(
	(array, key) =>
		array.some((element) => {
			if (typeof element === "string") {
				return element === key;
			}
			element.lastIndex = 0;
			return element.test(key);
		}),
	"has",
);
var cache = new QuickLRU({ maxSize: 1e5 });
var isObject2 = /* @__PURE__ */ __name(
	(value) =>
		typeof value === "object" &&
		value !== null &&
		!(value instanceof RegExp) &&
		!(value instanceof Error) &&
		!(value instanceof Date),
	"isObject",
);
var transform = /* @__PURE__ */ __name((input, options2 = {}) => {
	if (!isObject2(input)) {
		return input;
	}
	const {
		exclude,
		pascalCase = false,
		stopPaths,
		deep = false,
		preserveConsecutiveUppercase: preserveConsecutiveUppercase2 = false,
	} = options2;
	const stopPathsSet = new Set(stopPaths);
	const makeMapper = /* @__PURE__ */ __name(
		(parentPath) => (key, value) => {
			if (deep && isObject2(value)) {
				const path = parentPath === void 0 ? key : `${parentPath}.${key}`;
				if (!stopPathsSet.has(path)) {
					value = mapObject(value, makeMapper(path));
				}
			}
			if (!(exclude && has(exclude, key))) {
				const cacheKey = pascalCase ? `${key}_` : key;
				if (cache.has(cacheKey)) {
					key = cache.get(cacheKey);
				} else {
					const returnValue = camelCase(key, {
						pascalCase,
						locale: false,
						preserveConsecutiveUppercase: preserveConsecutiveUppercase2,
					});
					if (key.length < 100) {
						cache.set(cacheKey, returnValue);
					}
					key = returnValue;
				}
			}
			return [key, value];
		},
		"makeMapper",
	);
	return mapObject(input, makeMapper(void 0));
}, "transform");
function camelcaseKeys(input, options2) {
	if (Array.isArray(input)) {
		return Object.keys(input).map((key) => transform(input[key], options2));
	}
	return transform(input, options2);
}
__name(camelcaseKeys, "camelcaseKeys");

// src/mcp/api/utils/caseConverter.ts
function convertToSnakeCase(body) {
	if (body == null) return {};
	if (typeof body === "object" && !Array.isArray(body)) {
		return (0, import_snakecase_keys.default)(body, { deep: true });
	}
	return body;
}
__name(convertToSnakeCase, "convertToSnakeCase");
function convertToCamelCase(body) {
	if (body == null) return {};
	if (typeof body === "object" && !Array.isArray(body)) {
		return camelcaseKeys(body, { deep: true });
	}
	return body;
}
__name(convertToCamelCase, "convertToCamelCase");

// src/mcp/api/client/base.ts
function createApiClient(options2) {
	const baseUrl = options2.baseUrl;
	const timeout = options2.timeout || 6e4;
	const defaultHeaders = {
		"Content-Type": "application/json",
		Accept: "application/json",
		...options2.headers,
	};
	function buildApiUrl(path, pathParams, queryParams) {
		let normalizedPath = path.startsWith("/") ? path : `/${path}`;
		if (pathParams) {
			Object.entries(pathParams).forEach(([key, value]) => {
				normalizedPath = normalizedPath.replace(`:${key}`, encodeURIComponent(value));
			});
		}
		const url = new URL(`${baseUrl}${normalizedPath}`);
		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				if (value !== void 0 && value !== null) {
					url.searchParams.append(key, String(value));
				}
			});
		}
		return url;
	}
	__name(buildApiUrl, "buildApiUrl");
	async function request(method, path, options3, body) {
		const url = buildApiUrl(path, options3.pathParams, options3.queryParams);
		const headers = {
			...defaultHeaders,
			...(options3.headers || {}),
		};
		const fetchOptions = {
			method,
			headers,
			body: body ? JSON.stringify(convertToSnakeCase(body)) : void 0,
			// signal: (for abort/timeout, add if needed)
		};
		let timeoutId;
		const abortController = new AbortController();
		if (options3.timeoutMs) {
			timeoutId = setTimeout(() => abortController.abort(), options3.timeoutMs);
			fetchOptions.signal = abortController.signal;
		}
		try {
			const response = await fetch(url.toString(), fetchOptions);
			return processResponse(response);
		} catch (rawError) {
			let error3;
			if (rawError instanceof DOMException && rawError.name === "AbortError") {
				error3 = {
					message: "Request was cancelled",
					status: 0,
					statusText: "Request Cancelled",
					name: "AbortError",
				};
			} else if (rawError instanceof Error) {
				error3 = {
					message: rawError.message,
					status: 0,
					statusText: "Network Error",
					name: rawError.name || "NetworkError",
				};
			} else {
				error3 = {
					message: String(rawError) || "Unknown error occured when making request.",
					status: 0,
					statusText: "Unknown Error",
					name: "UnknownError",
				};
			}
			return { data: null, error: error3 };
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
		}
	}
	__name(request, "request");
	async function processResponse(response) {
		if (!response.ok) {
			let errorMsg = response.statusText;
			try {
				const text = await response.text();
				try {
					const body = JSON.parse(text);
					if (typeof body === "string") {
						errorMsg = body;
					} else if (body && typeof body === "object") {
						errorMsg = body.message || body.error || JSON.stringify(body);
					}
				} catch {
					if (text.trim()) errorMsg = text;
				}
			} catch {}
			return {
				data: null,
				error: {
					message: errorMsg,
					status: response.status,
					statusText: response.statusText,
					name: "ApiError",
				},
			};
		}
		if (response.status === 204) {
			return { data: {}, error: null };
		}
		try {
			const jsonResponse = await response.json();
			const processedResponse = convertToCamelCase(jsonResponse);
			return { data: processedResponse, error: null };
		} catch (error3) {
			throw new Error(
				`Failed to parse JSON response: ${error3 instanceof Error ? error3.message : String(error3)}`,
			);
		}
	}
	__name(processResponse, "processResponse");
	async function get2(path, options3 = {}) {
		return request("GET", path, options3);
	}
	__name(get2, "get");
	async function post2(path, body, options3 = {}) {
		return request("POST", path, options3, body);
	}
	__name(post2, "post");
	async function put2(path, body, options3 = {}) {
		return request("PUT", path, options3, body);
	}
	__name(put2, "put");
	async function del(path, options3 = {}) {
		return request("DELETE", path, options3);
	}
	__name(del, "del");
	return {
		get: get2,
		post: post2,
		put: put2,
		delete: del,
		// Renamed to avoid conflict with JavaScript keyword
	};
}
__name(createApiClient, "createApiClient");

// src/mcp/api/client/client.ts
var KollektivAPIConfig = {
	baseUrl: "https://mcp.thekollektiv.ai",
};
var api = createApiClient(KollektivAPIConfig);

// src/mcp/api/routes.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ApiRoutes = {
	QUERY: "/query",
	RETRIEVE: "/retrieve",
};

// src/mcp/tools/queryTool.ts
var queryToolSchema = z.object({
	query: z.string().min(1),
});
var queryToolHandler = /* @__PURE__ */ __name(async (query) => {
	const userId = "hardcoded";
	console.log(`[queryDocsTool] User ${userId} querying with: "${query}"`);
	try {
		const apiResponse = await api.post(ApiRoutes.QUERY, { query });
		console.log(`[queryDocsTool] Received response from backend for user ${userId}`);
		if (apiResponse.error) {
			console.error(`[queryDocsTool] API Error for user ${userId}.`, apiResponse.error);
			return {
				isError: true,
				content: [
					{
						type: "text",
						text: `API Error: ${apiResponse.error.message} (Status: ${apiResponse.error.status})`,
					},
				],
			};
		}
		if (apiResponse.data === null || apiResponse.data === void 0) {
			console.error(
				`[queryDocsTool] API call succeeded for user ${userId} but returned no data.`,
			);
			return {
				isError: true,
				content: [
					{
						type: "text",
						text: "API call succeeded but returned no data.",
					},
				],
			};
		}
		const toolResponse = apiResponse.data;
		if (toolResponse.success) {
			const resultText =
				toolResponse.response ?? "Query successful, but no specific response content.";
			console.log(`[queryDocsTool] Success for user ${userId}. Returning result.`);
			return {
				// isError: false is implied if omitted
				content: [
					{
						type: "text",
						text: resultText,
					},
					// Future: Could add metadata here if needed, e.g.,
					// ...(toolResponse.metadata ? [{ type: "json", data: toolResponse.metadata }] : [])
				],
			};
		} else {
			const failureText =
				toolResponse.response ?? "Tool execution failed (backend reported success: false).";
			console.warn(
				`[queryDocsTool] Logical failure reported by backend for user ${userId}. Message: ${failureText}`,
			);
			return {
				isError: true,
				content: [
					{
						type: "text",
						text: failureText,
					},
				],
			};
		}
	} catch (error3) {
		console.error(`[queryDocsTool] Caught unexpected exception for user ${userId}.`, error3);
		return {
			isError: true,
			content: [
				{
					type: "text",
					text: `Tool execution failed unexpectedly: ${error3.message || "Unknown error"}`,
				},
			],
		};
	}
}, "queryToolHandler");
var queryTool = {
	name: "query",
	description:
		"Query the documents uploaded by the user and return a response from LLM based on retrieved documents. The response will be LLM summary based on retrieved documents (if any). ",
	schema: queryToolSchema,
	handler: queryToolHandler,
};

// src/mcp/tools/index.ts
var allTools = [
	queryTool,
	// Add other imported tools here
];

// src/mcp/server.ts
var KollektivMCP = class extends McpAgent {
	constructor() {
		super(...arguments);
		// Create a new MCP server instance
		this.server = new McpServer({
			name: "Kollektiv MCP",
			version: "0.1.0",
		});
	}
	static {
		__name(this, "KollektivMCP");
	}
	// Register all tools
	async init() {
		console.log("Initializing MCP server...");
		for (const tool of allTools) {
			console.log("Registering tool: " + tool.name);
			this.server.tool(tool.name, tool.schema, tool.handler);
		}
	}
};

// src/index.ts
var index_default = new oauth_provider_default({
	apiRoute: "/sse",
	// @ts-ignore
	apiHandler: KollektivMCP.mount("/sse"),
	// @ts-ignore
	defaultHandler: app_default,
	authorizeEndpoint: "/authorize",
	tokenEndpoint: "/token",
	clientRegistrationEndpoint: "/register",
});
export { KollektivMCP, index_default as default };
//# sourceMappingURL=index.js.map
