import {Count} from '../../../shared/domain-models/count';
import {PrimaryMetricStrategyBase} from '../../../shared/strategies/primary-metric-strategy-base';
import {Injectable} from '@angular/core';
import {MetricValueModel} from '../../../shared/component-models/metric-value-model';
import {StaticCodeAnalysisConfiguration} from '../static-code-analysis.configuration';

@Injectable()
export class StaticCodeAnalysisPrimaryMetricStrategy extends PrimaryMetricStrategyBase {
  parse(counts: Count[]): MetricValueModel {
    const validSet = new Set(['blocker', 'critical', 'major']);

    return {
      name: StaticCodeAnalysisConfiguration.buildingBlockLabel,
      value: counts
          .filter(c => validSet.has(c.label['type']))
          .reduce((a, b) => a + b.value, 0)
    };
  }
}
