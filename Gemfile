# frozen_string_literal: true

source "https://rubygems.org"

# Use GitHub Pages for the local development environment
gem "github-pages", group: :jekyll_plugins

# For testing purposes, include HTML proofer
gem "html-proofer", "~> 5.0", group: :test

# Add the Hacker theme via remote theme
gem "jekyll-remote-theme"

# Platform-specific dependencies for Windows
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Windows-specific gem for handling file watching
gem "wdm", "~> 0.2.0", :platforms => [:mingw, :x64_mingw, :mswin]
