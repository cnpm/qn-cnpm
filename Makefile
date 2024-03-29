TESTS = test/*.test.js
REPORTER = tap
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install --registry=https://registry.npmmirror.com

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		--require should \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--require should \
		$(TESTS) \
		--bail

jshint:
	@./node_modules/.bin/jshint ./

autod:
	@node_modules/.bin/autod -w -e example.js --prefix=~
	@$(MAKE) install

contributors:
	@node_modules/.bin/contributors -f plain -o AUTHORS

.PHONY: test
