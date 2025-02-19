/*
 * SonarQube
 * Copyright (C) 2009-2024 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { LargeCenteredLayout, PageContentFontWrapper } from 'design-system';
import * as React from 'react';
import A11ySkipTarget from '../../../components/a11y/A11ySkipTarget';
import { parseDate } from '../../../helpers/dates';
import { ApplicationPeriod } from '../../../types/application';
import { Branch } from '../../../types/branch-like';
import { ComponentQualifier } from '../../../types/component';
import { Analysis, GraphType, MeasureHistory } from '../../../types/project-activity';
import { QualityGateStatus } from '../../../types/quality-gates';
import { Component, MeasureEnhanced, Metric, Period, QualityGate } from '../../../types/types';
import ActivityPanel from './ActivityPanel';
import FirstAnalysisNextStepsNotif from './FirstAnalysisNextStepsNotif';
import MeasuresPanel from './MeasuresPanel';
import NoCodeWarning from './NoCodeWarning';
import QualityGatePanel from './QualityGatePanel';

export interface BranchOverviewRendererProps {
  analyses?: Analysis[];
  appLeak?: ApplicationPeriod;
  branch?: Branch;
  branchesEnabled?: boolean;
  component: Component;
  detectedCIOnLastAnalysis?: boolean;
  graph?: GraphType;
  loadingHistory?: boolean;
  loadingStatus?: boolean;
  measures?: MeasureEnhanced[];
  measuresHistory?: MeasureHistory[];
  metrics?: Metric[];
  onGraphChange: (graph: GraphType) => void;
  period?: Period;
  projectIsEmpty?: boolean;
  qgStatuses?: QualityGateStatus[];
  qualityGate?: QualityGate;
}

export default function BranchOverviewRenderer(props: BranchOverviewRendererProps) {
  const {
    analyses,
    appLeak,
    branch,
    branchesEnabled,
    component,
    detectedCIOnLastAnalysis,
    graph,
    loadingHistory,
    loadingStatus,
    measures,
    measuresHistory = [],
    metrics = [],
    onGraphChange,
    period,
    projectIsEmpty,
    qgStatuses,
    qualityGate,
  } = props;

  const leakPeriod = component.qualifier === ComponentQualifier.Application ? appLeak : period;

  return (
    <>
      <FirstAnalysisNextStepsNotif
        component={component}
        branchesEnabled={branchesEnabled}
        detectedCIOnLastAnalysis={detectedCIOnLastAnalysis}
      />
      <LargeCenteredLayout>
        <PageContentFontWrapper>
          <div className="overview sw-my-6 sw-body-sm">
            <A11ySkipTarget anchor="overview_main" />

            {projectIsEmpty ? (
              <NoCodeWarning branchLike={branch} component={component} measures={measures} />
            ) : (
              <div className="sw-flex">
                <div className="sw-w-1/3 sw-mr-12 sw-pt-6">
                  <QualityGatePanel
                    component={component}
                    loading={loadingStatus}
                    qgStatuses={qgStatuses}
                    qualityGate={qualityGate}
                  />
                </div>

                <div className="sw-flex-1">
                  <div className="sw-flex sw-flex-col sw-pt-6">
                    <MeasuresPanel
                      analyses={analyses}
                      appLeak={appLeak}
                      branch={branch}
                      component={component}
                      loading={loadingStatus}
                      measures={measures}
                      period={period}
                      qgStatuses={qgStatuses}
                    />

                    <ActivityPanel
                      analyses={analyses}
                      branchLike={branch}
                      component={component}
                      graph={graph}
                      leakPeriodDate={leakPeriod && parseDate(leakPeriod.date)}
                      loading={loadingHistory}
                      measuresHistory={measuresHistory}
                      metrics={metrics}
                      onGraphChange={onGraphChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </PageContentFontWrapper>
      </LargeCenteredLayout>
    </>
  );
}
